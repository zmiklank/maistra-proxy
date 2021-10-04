use more_asserts::assert_gt;
use std::{cmp::min, env, mem, process, slice, str};
use wasi_tests::open_scratch_directory;

const BUF_LEN: usize = 256;

struct DirEntry {
    dirent: wasi::Dirent,
    name: String,
}

// Manually reading the output from fd_readdir is tedious and repetitive,
// so encapsulate it into an iterator
struct ReadDir<'a> {
    buf: &'a [u8],
}

impl<'a> ReadDir<'a> {
    fn from_slice(buf: &'a [u8]) -> Self {
        Self { buf }
    }
}

impl<'a> Iterator for ReadDir<'a> {
    type Item = DirEntry;

    fn next(&mut self) -> Option<DirEntry> {
        unsafe {
            if self.buf.is_empty() {
                return None;
            }

            // Read the data
            let dirent_ptr = self.buf.as_ptr() as *const wasi::Dirent;
            let dirent = dirent_ptr.read_unaligned();
            let name_ptr = dirent_ptr.offset(1) as *const u8;
            // NOTE Linux syscall returns a NULL-terminated name, but WASI doesn't
            let namelen = dirent.d_namlen as usize;
            let slice = slice::from_raw_parts(name_ptr, namelen);
            let name = str::from_utf8(slice).expect("invalid utf8").to_owned();

            // Update the internal state
            let delta = mem::size_of_val(&dirent) + namelen;
            self.buf = &self.buf[delta..];

            DirEntry { dirent, name }.into()
        }
    }
}

unsafe fn exec_fd_readdir(fd: wasi::Fd, cookie: wasi::Dircookie) -> Vec<DirEntry> {
    let mut buf: [u8; BUF_LEN] = [0; BUF_LEN];
    let bufused =
        wasi::fd_readdir(fd, buf.as_mut_ptr(), BUF_LEN, cookie).expect("failed fd_readdir");

    let sl = slice::from_raw_parts(buf.as_ptr(), min(BUF_LEN, bufused));
    let dirs: Vec<_> = ReadDir::from_slice(sl).collect();
    dirs
}

unsafe fn test_fd_readdir(dir_fd: wasi::Fd) {
    let stat = wasi::fd_filestat_get(dir_fd).expect("failed filestat");

    // Check the behavior in an empty directory
    let mut dirs = exec_fd_readdir(dir_fd, 0);
    dirs.sort_by_key(|d| d.name.clone());
    assert_eq!(dirs.len(), 2, "expected two entries in an empty directory");
    let mut dirs = dirs.into_iter();

    // the first entry should be `.`
    let dir = dirs.next().expect("first entry is None");
    assert_eq!(dir.name, ".", "first name");
    assert_eq!(dir.dirent.d_type, wasi::FILETYPE_DIRECTORY, "first type");
    assert_eq!(dir.dirent.d_ino, stat.ino);
    assert_eq!(dir.dirent.d_namlen, 1);

    // the second entry should be `..`
    let dir = dirs.next().expect("second entry is None");
    assert_eq!(dir.name, "..", "second name");
    assert_eq!(dir.dirent.d_type, wasi::FILETYPE_DIRECTORY, "second type");

    assert!(
        dirs.next().is_none(),
        "the directory should be seen as empty"
    );

    // Add a file and check the behavior
    let file_fd = wasi::path_open(
        dir_fd,
        0,
        "file",
        wasi::OFLAGS_CREAT,
        wasi::RIGHTS_FD_READ
            | wasi::RIGHTS_FD_WRITE
            | wasi::RIGHTS_FD_READDIR
            | wasi::RIGHTS_FD_FILESTAT_GET,
        0,
        0,
    )
    .expect("failed to create file");
    assert_gt!(
        file_fd,
        libc::STDERR_FILENO as wasi::Fd,
        "file descriptor range check",
    );

    let stat = wasi::fd_filestat_get(file_fd).expect("failed filestat");

    // Execute another readdir
    let mut dirs = exec_fd_readdir(dir_fd, 0);
    assert_eq!(dirs.len(), 3, "expected three entries");
    // Save the data about the last entry. We need to do it before sorting.
    let lastfile_cookie = dirs[1].dirent.d_next;
    let lastfile_name = dirs[2].name.clone();
    dirs.sort_by_key(|d| d.name.clone());
    let mut dirs = dirs.into_iter();

    let dir = dirs.next().expect("first entry is None");
    assert_eq!(dir.name, ".", "first name");
    let dir = dirs.next().expect("second entry is None");
    assert_eq!(dir.name, "..", "second name");
    let dir = dirs.next().expect("third entry is None");
    // check the file info
    assert_eq!(dir.name, "file", "file name doesn't match");
    assert_eq!(
        dir.dirent.d_type,
        wasi::FILETYPE_REGULAR_FILE,
        "type for the real file"
    );
    assert_eq!(dir.dirent.d_ino, stat.ino);

    // check if cookie works as expected
    let dirs = exec_fd_readdir(dir_fd, lastfile_cookie);
    assert_eq!(dirs.len(), 1, "expected one entry");
    assert_eq!(dirs[0].name, lastfile_name, "name of the only entry");
}

fn main() {
    let mut args = env::args();
    let prog = args.next().unwrap();
    let arg = if let Some(arg) = args.next() {
        arg
    } else {
        eprintln!("usage: {} <scratch directory>", prog);
        process::exit(1);
    };

    // Open scratch directory
    let dir_fd = match open_scratch_directory(&arg) {
        Ok(dir_fd) => dir_fd,
        Err(err) => {
            eprintln!("{}", err);
            process::exit(1)
        }
    };

    // Run the tests.
    unsafe { test_fd_readdir(dir_fd) }
}