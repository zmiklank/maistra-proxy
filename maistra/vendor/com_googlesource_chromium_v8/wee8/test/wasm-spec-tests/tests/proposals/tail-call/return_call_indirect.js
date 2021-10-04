'use strict';

let spectest = {
  print: console.log.bind(console),
  print_i32: console.log.bind(console),
  print_i32_f32: console.log.bind(console),
  print_f64_f64: console.log.bind(console),
  print_f32: console.log.bind(console),
  print_f64: console.log.bind(console),
  global_i32: 666,
  global_f32: 666,
  global_f64: 666,
  table: new WebAssembly.Table({initial: 10, maximum: 20, element: 'anyfunc'}),
  memory: new WebAssembly.Memory({initial: 1, maximum: 2})
};
let handler = {
  get(target, prop) {
    return (prop in target) ?  target[prop] : {};
  }
};
let registry = new Proxy({spectest}, handler);

function register(name, instance) {
  registry[name] = instance.exports;
}

function module(bytes, valid = true) {
  let buffer = new ArrayBuffer(bytes.length);
  let view = new Uint8Array(buffer);
  for (let i = 0; i < bytes.length; ++i) {
    view[i] = bytes.charCodeAt(i);
  }
  let validated;
  try {
    validated = WebAssembly.validate(buffer);
  } catch (e) {
    throw new Error("Wasm validate throws");
  }
  if (validated !== valid) {
    throw new Error("Wasm validate failure" + (valid ? "" : " expected"));
  }
  return new WebAssembly.Module(buffer);
}

function instance(bytes, imports = registry) {
  return new WebAssembly.Instance(module(bytes), imports);
}

function call(instance, name, args) {
  return instance.exports[name](...args);
}

function get(instance, name) {
  return instance.exports[name];
}

function exports(name, instance) {
  return {[name]: instance.exports};
}

function run(action) {
  action();
}

function assert_malformed(bytes) {
  try { module(bytes, false) } catch (e) {
    if (e instanceof WebAssembly.CompileError) return;
  }
  throw new Error("Wasm decoding failure expected");
}

function assert_invalid(bytes) {
  try { module(bytes, false) } catch (e) {
    if (e instanceof WebAssembly.CompileError) return;
  }
  throw new Error("Wasm validation failure expected");
}

function assert_unlinkable(bytes) {
  let mod = module(bytes);
  try { new WebAssembly.Instance(mod, registry) } catch (e) {
    if (e instanceof WebAssembly.LinkError) return;
  }
  throw new Error("Wasm linking failure expected");
}

function assert_uninstantiable(bytes) {
  let mod = module(bytes);
  try { new WebAssembly.Instance(mod, registry) } catch (e) {
    if (e instanceof WebAssembly.RuntimeError) return;
  }
  throw new Error("Wasm trap expected");
}

function assert_trap(action) {
  try { action() } catch (e) {
    if (e instanceof WebAssembly.RuntimeError) return;
  }
  throw new Error("Wasm trap expected");
}

let StackOverflow;
try { (function f() { 1 + f() })() } catch (e) { StackOverflow = e.constructor }

function assert_exhaustion(action) {
  try { action() } catch (e) {
    if (e instanceof StackOverflow) return;
  }
  throw new Error("Wasm resource exhaustion expected");
}

function assert_return(action, expected) {
  let actual = action();
  if (!Object.is(actual, expected)) {
    throw new Error("Wasm return value " + expected + " expected, got " + actual);
  };
}

function assert_return_canonical_nan(action) {
  let actual = action();
  // Note that JS can't reliably distinguish different NaN values,
  // so there's no good way to test that it's a canonical NaN.
  if (!Number.isNaN(actual)) {
    throw new Error("Wasm return value NaN expected, got " + actual);
  };
}

function assert_return_arithmetic_nan(action) {
  // Note that JS can't reliably distinguish different NaN values,
  // so there's no good way to test for specific bitpatterns here.
  let actual = action();
  if (!Number.isNaN(actual)) {
    throw new Error("Wasm return value NaN expected, got " + actual);
  };
}


// return_call_indirect.wast:3
let $1 = instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\xf7\x80\x80\x80\x00\x17\x60\x00\x00\x60\x00\x01\x7f\x60\x00\x01\x7e\x60\x00\x01\x7d\x60\x00\x01\x7c\x60\x01\x7f\x01\x7f\x60\x01\x7e\x01\x7e\x60\x01\x7d\x01\x7d\x60\x01\x7c\x01\x7c\x60\x02\x7d\x7f\x01\x7f\x60\x02\x7f\x7e\x01\x7e\x60\x02\x7c\x7d\x01\x7d\x60\x02\x7e\x7c\x01\x7c\x60\x01\x7f\x01\x7f\x60\x01\x7e\x01\x7e\x60\x01\x7d\x01\x7d\x60\x01\x7c\x01\x7c\x60\x04\x7e\x7c\x7f\x7e\x00\x60\x01\x7e\x00\x60\x04\x7e\x7c\x7f\x7e\x01\x7f\x60\x01\x7e\x01\x7f\x60\x01\x7f\x01\x7e\x60\x02\x7e\x7e\x01\x7e\x03\xa7\x80\x80\x80\x00\x26\x01\x02\x03\x04\x05\x06\x07\x08\x0a\x0c\x09\x0b\x0d\x0e\x0f\x10\x00\x01\x02\x01\x02\x03\x04\x02\x01\x02\x03\x04\x01\x02\x03\x04\x0a\x15\x06\x16\x05\x05\x04\x85\x80\x80\x80\x00\x01\x70\x01\x14\x14\x07\xfa\x81\x80\x80\x00\x12\x08\x74\x79\x70\x65\x2d\x69\x33\x32\x00\x13\x08\x74\x79\x70\x65\x2d\x69\x36\x34\x00\x14\x08\x74\x79\x70\x65\x2d\x66\x33\x32\x00\x15\x08\x74\x79\x70\x65\x2d\x66\x36\x34\x00\x16\x0a\x74\x79\x70\x65\x2d\x69\x6e\x64\x65\x78\x00\x17\x0e\x74\x79\x70\x65\x2d\x66\x69\x72\x73\x74\x2d\x69\x33\x32\x00\x18\x0e\x74\x79\x70\x65\x2d\x66\x69\x72\x73\x74\x2d\x69\x36\x34\x00\x19\x0e\x74\x79\x70\x65\x2d\x66\x69\x72\x73\x74\x2d\x66\x33\x32\x00\x1a\x0e\x74\x79\x70\x65\x2d\x66\x69\x72\x73\x74\x2d\x66\x36\x34\x00\x1b\x0f\x74\x79\x70\x65\x2d\x73\x65\x63\x6f\x6e\x64\x2d\x69\x33\x32\x00\x1c\x0f\x74\x79\x70\x65\x2d\x73\x65\x63\x6f\x6e\x64\x2d\x69\x36\x34\x00\x1d\x0f\x74\x79\x70\x65\x2d\x73\x65\x63\x6f\x6e\x64\x2d\x66\x33\x32\x00\x1e\x0f\x74\x79\x70\x65\x2d\x73\x65\x63\x6f\x6e\x64\x2d\x66\x36\x34\x00\x1f\x08\x64\x69\x73\x70\x61\x74\x63\x68\x00\x20\x13\x64\x69\x73\x70\x61\x74\x63\x68\x2d\x73\x74\x72\x75\x63\x74\x75\x72\x61\x6c\x00\x21\x03\x66\x61\x63\x00\x22\x04\x65\x76\x65\x6e\x00\x24\x03\x6f\x64\x64\x00\x25\x09\x9a\x80\x80\x80\x00\x01\x00\x41\x00\x0b\x14\x00\x01\x02\x03\x04\x05\x06\x07\x0a\x08\x0b\x09\x22\x23\x24\x25\x0c\x0d\x0e\x0f\x0a\xdb\x84\x80\x80\x00\x26\x85\x80\x80\x80\x00\x00\x41\xb2\x02\x0b\x85\x80\x80\x80\x00\x00\x42\xe4\x02\x0b\x87\x80\x80\x80\x00\x00\x43\x00\x20\x73\x45\x0b\x8b\x80\x80\x80\x00\x00\x44\x00\x00\x00\x00\x00\xc8\xae\x40\x0b\x84\x80\x80\x80\x00\x00\x20\x00\x0b\x84\x80\x80\x80\x00\x00\x20\x00\x0b\x84\x80\x80\x80\x00\x00\x20\x00\x0b\x84\x80\x80\x80\x00\x00\x20\x00\x0b\x84\x80\x80\x80\x00\x00\x20\x01\x0b\x84\x80\x80\x80\x00\x00\x20\x01\x0b\x84\x80\x80\x80\x00\x00\x20\x01\x0b\x84\x80\x80\x80\x00\x00\x20\x01\x0b\x84\x80\x80\x80\x00\x00\x20\x00\x0b\x84\x80\x80\x80\x00\x00\x20\x00\x0b\x84\x80\x80\x80\x00\x00\x20\x00\x0b\x84\x80\x80\x80\x00\x00\x20\x00\x0b\xa7\x80\x80\x80\x00\x00\x41\x00\x13\x00\x00\x42\x00\x41\x00\x13\x12\x00\x42\x00\x44\x00\x00\x00\x00\x00\x00\x00\x00\x41\x00\x42\x00\x41\x00\x13\x11\x00\x41\x00\x13\x00\x00\x0b\xa7\x80\x80\x80\x00\x00\x41\x00\x13\x01\x00\x41\x00\x13\x01\x00\x42\x00\x41\x00\x13\x14\x00\x42\x00\x44\x00\x00\x00\x00\x00\x00\x00\x00\x41\x00\x42\x00\x41\x00\x13\x13\x00\x0b\x89\x80\x80\x80\x00\x00\x42\x00\x41\x00\x13\x06\x00\x0b\x87\x80\x80\x80\x00\x00\x41\x00\x13\x01\x00\x0b\x87\x80\x80\x80\x00\x00\x41\x01\x13\x02\x00\x0b\x87\x80\x80\x80\x00\x00\x41\x02\x13\x03\x00\x0b\x87\x80\x80\x80\x00\x00\x41\x03\x13\x04\x00\x0b\x8a\x80\x80\x80\x00\x00\x42\xe4\x00\x41\x05\x13\x06\x00\x0b\x89\x80\x80\x80\x00\x00\x41\x20\x41\x04\x13\x05\x00\x0b\x8a\x80\x80\x80\x00\x00\x42\xc0\x00\x41\x05\x13\x06\x00\x0b\x8c\x80\x80\x80\x00\x00\x43\xc3\xf5\xa8\x3f\x41\x06\x13\x07\x00\x0b\x90\x80\x80\x80\x00\x00\x44\x3d\x0a\xd7\xa3\x70\x3d\xfa\x3f\x41\x07\x13\x08\x00\x0b\x8e\x80\x80\x80\x00\x00\x43\x66\x66\x00\x42\x41\x20\x41\x08\x13\x09\x00\x0b\x8c\x80\x80\x80\x00\x00\x41\x20\x42\xc0\x00\x41\x09\x13\x0a\x00\x0b\x95\x80\x80\x80\x00\x00\x44\x00\x00\x00\x00\x00\x00\x50\x40\x43\x00\x00\x00\x42\x41\x0a\x13\x0b\x00\x0b\x93\x80\x80\x80\x00\x00\x42\xc0\x00\x44\x66\x66\x66\x66\x66\x06\x50\x40\x41\x0b\x13\x0c\x00\x0b\x89\x80\x80\x80\x00\x00\x20\x01\x20\x00\x13\x06\x00\x0b\x89\x80\x80\x80\x00\x00\x42\x09\x20\x00\x13\x0e\x00\x0b\x8b\x80\x80\x80\x00\x00\x20\x00\x42\x01\x41\x0d\x13\x16\x00\x0b\x9a\x80\x80\x80\x00\x00\x20\x00\x50\x04\x7e\x20\x01\x05\x20\x00\x42\x01\x7d\x20\x00\x20\x01\x7e\x41\x0d\x13\x16\x00\x0b\x0b\x95\x80\x80\x80\x00\x00\x20\x00\x45\x04\x7f\x41\x2c\x05\x20\x00\x41\x01\x6b\x41\x0f\x13\x05\x00\x0b\x0b\x96\x80\x80\x80\x00\x00\x20\x00\x45\x04\x7f\x41\xe3\x00\x05\x20\x00\x41\x01\x6b\x41\x0e\x13\x05\x00\x0b\x0b");

// return_call_indirect.wast:192
assert_return(() => call($1, "type-i32", []), 306);

// return_call_indirect.wast:193
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x88\x80\x80\x80\x00\x02\x60\x00\x00\x60\x00\x01\x7e\x02\x8f\x80\x80\x80\x00\x01\x02\x24\x31\x08\x74\x79\x70\x65\x2d\x69\x36\x34\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x98\x80\x80\x80\x00\x01\x92\x80\x80\x80\x00\x00\x02\x40\x10\x00\x01\x42\xe4\x02\x01\x51\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "type-i64", []), int64("356"))

// return_call_indirect.wast:194
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x88\x80\x80\x80\x00\x02\x60\x00\x00\x60\x00\x01\x7d\x02\x8f\x80\x80\x80\x00\x01\x02\x24\x31\x08\x74\x79\x70\x65\x2d\x66\x33\x32\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x9a\x80\x80\x80\x00\x01\x94\x80\x80\x80\x00\x00\x02\x40\x10\x00\xbc\x43\x00\x20\x73\x45\xbc\x46\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "type-f32", []), 3890.)

// return_call_indirect.wast:195
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x88\x80\x80\x80\x00\x02\x60\x00\x00\x60\x00\x01\x7c\x02\x8f\x80\x80\x80\x00\x01\x02\x24\x31\x08\x74\x79\x70\x65\x2d\x66\x36\x34\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x9e\x80\x80\x80\x00\x01\x98\x80\x80\x80\x00\x00\x02\x40\x10\x00\xbd\x44\x00\x00\x00\x00\x00\xc8\xae\x40\xbd\x51\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "type-f64", []), 3940.)

// return_call_indirect.wast:197
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x88\x80\x80\x80\x00\x02\x60\x00\x00\x60\x00\x01\x7e\x02\x91\x80\x80\x80\x00\x01\x02\x24\x31\x0a\x74\x79\x70\x65\x2d\x69\x6e\x64\x65\x78\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x98\x80\x80\x80\x00\x01\x92\x80\x80\x80\x00\x00\x02\x40\x10\x00\x01\x42\xe4\x00\x01\x51\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "type-index", []), int64("100"))

// return_call_indirect.wast:199
assert_return(() => call($1, "type-first-i32", []), 32);

// return_call_indirect.wast:200
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x88\x80\x80\x80\x00\x02\x60\x00\x00\x60\x00\x01\x7e\x02\x95\x80\x80\x80\x00\x01\x02\x24\x31\x0e\x74\x79\x70\x65\x2d\x66\x69\x72\x73\x74\x2d\x69\x36\x34\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x98\x80\x80\x80\x00\x01\x92\x80\x80\x80\x00\x00\x02\x40\x10\x00\x01\x42\xc0\x00\x01\x51\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "type-first-i64", []), int64("64"))

// return_call_indirect.wast:201
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x88\x80\x80\x80\x00\x02\x60\x00\x00\x60\x00\x01\x7d\x02\x95\x80\x80\x80\x00\x01\x02\x24\x31\x0e\x74\x79\x70\x65\x2d\x66\x69\x72\x73\x74\x2d\x66\x33\x32\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x9a\x80\x80\x80\x00\x01\x94\x80\x80\x80\x00\x00\x02\x40\x10\x00\xbc\x43\xc3\xf5\xa8\x3f\xbc\x46\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "type-first-f32", []), 1.32000005245)

// return_call_indirect.wast:202
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x88\x80\x80\x80\x00\x02\x60\x00\x00\x60\x00\x01\x7c\x02\x95\x80\x80\x80\x00\x01\x02\x24\x31\x0e\x74\x79\x70\x65\x2d\x66\x69\x72\x73\x74\x2d\x66\x36\x34\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x9e\x80\x80\x80\x00\x01\x98\x80\x80\x80\x00\x00\x02\x40\x10\x00\xbd\x44\x3d\x0a\xd7\xa3\x70\x3d\xfa\x3f\xbd\x51\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "type-first-f64", []), 1.64)

// return_call_indirect.wast:204
assert_return(() => call($1, "type-second-i32", []), 32);

// return_call_indirect.wast:205
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x88\x80\x80\x80\x00\x02\x60\x00\x00\x60\x00\x01\x7e\x02\x96\x80\x80\x80\x00\x01\x02\x24\x31\x0f\x74\x79\x70\x65\x2d\x73\x65\x63\x6f\x6e\x64\x2d\x69\x36\x34\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x98\x80\x80\x80\x00\x01\x92\x80\x80\x80\x00\x00\x02\x40\x10\x00\x01\x42\xc0\x00\x01\x51\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "type-second-i64", []), int64("64"))

// return_call_indirect.wast:206
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x88\x80\x80\x80\x00\x02\x60\x00\x00\x60\x00\x01\x7d\x02\x96\x80\x80\x80\x00\x01\x02\x24\x31\x0f\x74\x79\x70\x65\x2d\x73\x65\x63\x6f\x6e\x64\x2d\x66\x33\x32\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x9a\x80\x80\x80\x00\x01\x94\x80\x80\x80\x00\x00\x02\x40\x10\x00\xbc\x43\x00\x00\x00\x42\xbc\x46\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "type-second-f32", []), 32.)

// return_call_indirect.wast:207
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x88\x80\x80\x80\x00\x02\x60\x00\x00\x60\x00\x01\x7c\x02\x96\x80\x80\x80\x00\x01\x02\x24\x31\x0f\x74\x79\x70\x65\x2d\x73\x65\x63\x6f\x6e\x64\x2d\x66\x36\x34\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x9e\x80\x80\x80\x00\x01\x98\x80\x80\x80\x00\x00\x02\x40\x10\x00\xbd\x44\x66\x66\x66\x66\x66\x06\x50\x40\xbd\x51\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "type-second-f64", []), 64.1)

// return_call_indirect.wast:209
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x8a\x80\x80\x80\x00\x02\x60\x00\x00\x60\x02\x7f\x7e\x01\x7e\x02\x8f\x80\x80\x80\x00\x01\x02\x24\x31\x08\x64\x69\x73\x70\x61\x74\x63\x68\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x9b\x80\x80\x80\x00\x01\x95\x80\x80\x80\x00\x00\x02\x40\x41\x05\x42\x02\x10\x00\x01\x42\x02\x01\x51\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "dispatch", [5, int64("2")]), int64("2"))

// return_call_indirect.wast:210
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x8a\x80\x80\x80\x00\x02\x60\x00\x00\x60\x02\x7f\x7e\x01\x7e\x02\x8f\x80\x80\x80\x00\x01\x02\x24\x31\x08\x64\x69\x73\x70\x61\x74\x63\x68\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x9b\x80\x80\x80\x00\x01\x95\x80\x80\x80\x00\x00\x02\x40\x41\x05\x42\x05\x10\x00\x01\x42\x05\x01\x51\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "dispatch", [5, int64("5")]), int64("5"))

// return_call_indirect.wast:211
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x8a\x80\x80\x80\x00\x02\x60\x00\x00\x60\x02\x7f\x7e\x01\x7e\x02\x8f\x80\x80\x80\x00\x01\x02\x24\x31\x08\x64\x69\x73\x70\x61\x74\x63\x68\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x9c\x80\x80\x80\x00\x01\x96\x80\x80\x80\x00\x00\x02\x40\x41\x0c\x42\x05\x10\x00\x01\x42\xf8\x00\x01\x51\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "dispatch", [12, int64("5")]), int64("120"))

// return_call_indirect.wast:212
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x8a\x80\x80\x80\x00\x02\x60\x00\x00\x60\x02\x7f\x7e\x01\x7e\x02\x8f\x80\x80\x80\x00\x01\x02\x24\x31\x08\x64\x69\x73\x70\x61\x74\x63\x68\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x9b\x80\x80\x80\x00\x01\x95\x80\x80\x80\x00\x00\x02\x40\x41\x11\x42\x02\x10\x00\x01\x42\x02\x01\x51\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "dispatch", [17, int64("2")]), int64("2"))

// return_call_indirect.wast:213
assert_trap(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x8a\x80\x80\x80\x00\x02\x60\x00\x00\x60\x02\x7f\x7e\x01\x7e\x02\x8f\x80\x80\x80\x00\x01\x02\x24\x31\x08\x64\x69\x73\x70\x61\x74\x63\x68\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x93\x80\x80\x80\x00\x01\x8d\x80\x80\x80\x00\x00\x02\x40\x41\x00\x42\x02\x10\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_trap(() => call($1, "dispatch", [0, int64("2")]))

// return_call_indirect.wast:214
assert_trap(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x8a\x80\x80\x80\x00\x02\x60\x00\x00\x60\x02\x7f\x7e\x01\x7e\x02\x8f\x80\x80\x80\x00\x01\x02\x24\x31\x08\x64\x69\x73\x70\x61\x74\x63\x68\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x93\x80\x80\x80\x00\x01\x8d\x80\x80\x80\x00\x00\x02\x40\x41\x0f\x42\x02\x10\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_trap(() => call($1, "dispatch", [15, int64("2")]))

// return_call_indirect.wast:215
assert_trap(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x8a\x80\x80\x80\x00\x02\x60\x00\x00\x60\x02\x7f\x7e\x01\x7e\x02\x8f\x80\x80\x80\x00\x01\x02\x24\x31\x08\x64\x69\x73\x70\x61\x74\x63\x68\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x93\x80\x80\x80\x00\x01\x8d\x80\x80\x80\x00\x00\x02\x40\x41\x14\x42\x02\x10\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_trap(() => call($1, "dispatch", [20, int64("2")]))

// return_call_indirect.wast:216
assert_trap(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x8a\x80\x80\x80\x00\x02\x60\x00\x00\x60\x02\x7f\x7e\x01\x7e\x02\x8f\x80\x80\x80\x00\x01\x02\x24\x31\x08\x64\x69\x73\x70\x61\x74\x63\x68\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x93\x80\x80\x80\x00\x01\x8d\x80\x80\x80\x00\x00\x02\x40\x41\x7f\x42\x02\x10\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_trap(() => call($1, "dispatch", [-1, int64("2")]))

// return_call_indirect.wast:217
assert_trap(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x8a\x80\x80\x80\x00\x02\x60\x00\x00\x60\x02\x7f\x7e\x01\x7e\x02\x8f\x80\x80\x80\x00\x01\x02\x24\x31\x08\x64\x69\x73\x70\x61\x74\x63\x68\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x97\x80\x80\x80\x00\x01\x91\x80\x80\x80\x00\x00\x02\x40\x41\xe7\x84\xce\xc2\x04\x42\x02\x10\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_trap(() => call($1, "dispatch", [1213432423, int64("2")]))

// return_call_indirect.wast:219
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x89\x80\x80\x80\x00\x02\x60\x00\x00\x60\x01\x7f\x01\x7e\x02\x9a\x80\x80\x80\x00\x01\x02\x24\x31\x13\x64\x69\x73\x70\x61\x74\x63\x68\x2d\x73\x74\x72\x75\x63\x74\x75\x72\x61\x6c\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x99\x80\x80\x80\x00\x01\x93\x80\x80\x80\x00\x00\x02\x40\x41\x05\x10\x00\x01\x42\x09\x01\x51\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "dispatch-structural", [5]), int64("9"))

// return_call_indirect.wast:220
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x89\x80\x80\x80\x00\x02\x60\x00\x00\x60\x01\x7f\x01\x7e\x02\x9a\x80\x80\x80\x00\x01\x02\x24\x31\x13\x64\x69\x73\x70\x61\x74\x63\x68\x2d\x73\x74\x72\x75\x63\x74\x75\x72\x61\x6c\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x99\x80\x80\x80\x00\x01\x93\x80\x80\x80\x00\x00\x02\x40\x41\x05\x10\x00\x01\x42\x09\x01\x51\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "dispatch-structural", [5]), int64("9"))

// return_call_indirect.wast:221
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x89\x80\x80\x80\x00\x02\x60\x00\x00\x60\x01\x7f\x01\x7e\x02\x9a\x80\x80\x80\x00\x01\x02\x24\x31\x13\x64\x69\x73\x70\x61\x74\x63\x68\x2d\x73\x74\x72\x75\x63\x74\x75\x72\x61\x6c\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x9b\x80\x80\x80\x00\x01\x95\x80\x80\x80\x00\x00\x02\x40\x41\x0c\x10\x00\x01\x42\x80\x93\x16\x01\x51\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "dispatch-structural", [12]), int64("362880"))

// return_call_indirect.wast:222
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x89\x80\x80\x80\x00\x02\x60\x00\x00\x60\x01\x7f\x01\x7e\x02\x9a\x80\x80\x80\x00\x01\x02\x24\x31\x13\x64\x69\x73\x70\x61\x74\x63\x68\x2d\x73\x74\x72\x75\x63\x74\x75\x72\x61\x6c\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x99\x80\x80\x80\x00\x01\x93\x80\x80\x80\x00\x00\x02\x40\x41\x11\x10\x00\x01\x42\x09\x01\x51\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "dispatch-structural", [17]), int64("9"))

// return_call_indirect.wast:223
assert_trap(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x89\x80\x80\x80\x00\x02\x60\x00\x00\x60\x01\x7f\x01\x7e\x02\x9a\x80\x80\x80\x00\x01\x02\x24\x31\x13\x64\x69\x73\x70\x61\x74\x63\x68\x2d\x73\x74\x72\x75\x63\x74\x75\x72\x61\x6c\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x91\x80\x80\x80\x00\x01\x8b\x80\x80\x80\x00\x00\x02\x40\x41\x0b\x10\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_trap(() => call($1, "dispatch-structural", [11]))

// return_call_indirect.wast:224
assert_trap(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x89\x80\x80\x80\x00\x02\x60\x00\x00\x60\x01\x7f\x01\x7e\x02\x9a\x80\x80\x80\x00\x01\x02\x24\x31\x13\x64\x69\x73\x70\x61\x74\x63\x68\x2d\x73\x74\x72\x75\x63\x74\x75\x72\x61\x6c\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x91\x80\x80\x80\x00\x01\x8b\x80\x80\x80\x00\x00\x02\x40\x41\x10\x10\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_trap(() => call($1, "dispatch-structural", [16]))

// return_call_indirect.wast:226
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x89\x80\x80\x80\x00\x02\x60\x00\x00\x60\x01\x7e\x01\x7e\x02\x8a\x80\x80\x80\x00\x01\x02\x24\x31\x03\x66\x61\x63\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x99\x80\x80\x80\x00\x01\x93\x80\x80\x80\x00\x00\x02\x40\x42\x00\x10\x00\x01\x42\x01\x01\x51\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "fac", [int64("0")]), int64("1"))

// return_call_indirect.wast:227
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x89\x80\x80\x80\x00\x02\x60\x00\x00\x60\x01\x7e\x01\x7e\x02\x8a\x80\x80\x80\x00\x01\x02\x24\x31\x03\x66\x61\x63\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x99\x80\x80\x80\x00\x01\x93\x80\x80\x80\x00\x00\x02\x40\x42\x01\x10\x00\x01\x42\x01\x01\x51\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "fac", [int64("1")]), int64("1"))

// return_call_indirect.wast:228
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x89\x80\x80\x80\x00\x02\x60\x00\x00\x60\x01\x7e\x01\x7e\x02\x8a\x80\x80\x80\x00\x01\x02\x24\x31\x03\x66\x61\x63\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\x9a\x80\x80\x80\x00\x01\x94\x80\x80\x80\x00\x00\x02\x40\x42\x05\x10\x00\x01\x42\xf8\x00\x01\x51\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "fac", [int64("5")]), int64("120"))

// return_call_indirect.wast:229
run(() => call(instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x89\x80\x80\x80\x00\x02\x60\x00\x00\x60\x01\x7e\x01\x7e\x02\x8a\x80\x80\x80\x00\x01\x02\x24\x31\x03\x66\x61\x63\x00\x01\x03\x82\x80\x80\x80\x00\x01\x00\x07\x87\x80\x80\x80\x00\x01\x03\x72\x75\x6e\x00\x01\x0a\xa2\x80\x80\x80\x00\x01\x9c\x80\x80\x80\x00\x00\x02\x40\x42\x19\x10\x00\x01\x42\x80\x80\x80\xde\x87\x92\xec\xcf\xe1\x00\x01\x51\x45\x0d\x00\x0f\x0b\x00\x0b", exports("$1", $1)),  "run", []));  // assert_return(() => call($1, "fac", [int64("25")]), int64("7034535277573963776"))

// return_call_indirect.wast:231
assert_return(() => call($1, "even", [0]), 44);

// return_call_indirect.wast:232
assert_return(() => call($1, "even", [1]), 99);

// return_call_indirect.wast:233
assert_return(() => call($1, "even", [100]), 44);

// return_call_indirect.wast:234
assert_return(() => call($1, "even", [77]), 99);

// return_call_indirect.wast:235
assert_return(() => call($1, "even", [100000]), 44);

// return_call_indirect.wast:236
assert_return(() => call($1, "even", [111111]), 99);

// return_call_indirect.wast:237
assert_return(() => call($1, "odd", [0]), 99);

// return_call_indirect.wast:238
assert_return(() => call($1, "odd", [1]), 44);

// return_call_indirect.wast:239
assert_return(() => call($1, "odd", [200]), 99);

// return_call_indirect.wast:240
assert_return(() => call($1, "odd", [77]), 44);

// return_call_indirect.wast:241
assert_return(() => call($1, "odd", [200002]), 99);

// return_call_indirect.wast:242
assert_return(() => call($1, "odd", [300003]), 44);

// return_call_indirect.wast:247
assert_malformed("\x3c\x6d\x61\x6c\x66\x6f\x72\x6d\x65\x64\x20\x71\x75\x6f\x74\x65\x3e");

// return_call_indirect.wast:259
assert_malformed("\x3c\x6d\x61\x6c\x66\x6f\x72\x6d\x65\x64\x20\x71\x75\x6f\x74\x65\x3e");

// return_call_indirect.wast:271
assert_malformed("\x3c\x6d\x61\x6c\x66\x6f\x72\x6d\x65\x64\x20\x71\x75\x6f\x74\x65\x3e");

// return_call_indirect.wast:283
assert_malformed("\x3c\x6d\x61\x6c\x66\x6f\x72\x6d\x65\x64\x20\x71\x75\x6f\x74\x65\x3e");

// return_call_indirect.wast:295
assert_malformed("\x3c\x6d\x61\x6c\x66\x6f\x72\x6d\x65\x64\x20\x71\x75\x6f\x74\x65\x3e");

// return_call_indirect.wast:307
assert_malformed("\x3c\x6d\x61\x6c\x66\x6f\x72\x6d\x65\x64\x20\x71\x75\x6f\x74\x65\x3e");

// return_call_indirect.wast:319
assert_malformed("\x3c\x6d\x61\x6c\x66\x6f\x72\x6d\x65\x64\x20\x71\x75\x6f\x74\x65\x3e");

// return_call_indirect.wast:326
assert_malformed("\x3c\x6d\x61\x6c\x66\x6f\x72\x6d\x65\x64\x20\x71\x75\x6f\x74\x65\x3e");

// return_call_indirect.wast:336
assert_malformed("\x3c\x6d\x61\x6c\x66\x6f\x72\x6d\x65\x64\x20\x71\x75\x6f\x74\x65\x3e");

// return_call_indirect.wast:346
assert_malformed("\x3c\x6d\x61\x6c\x66\x6f\x72\x6d\x65\x64\x20\x71\x75\x6f\x74\x65\x3e");

// return_call_indirect.wast:358
assert_malformed("\x3c\x6d\x61\x6c\x66\x6f\x72\x6d\x65\x64\x20\x71\x75\x6f\x74\x65\x3e");

// return_call_indirect.wast:373
assert_invalid("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x84\x80\x80\x80\x00\x01\x60\x00\x00\x03\x82\x80\x80\x80\x00\x01\x00\x0a\x8d\x80\x80\x80\x00\x01\x87\x80\x80\x80\x00\x00\x41\x00\x13\x00\x00\x0b");

// return_call_indirect.wast:381
assert_invalid("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x84\x80\x80\x80\x00\x01\x60\x00\x00\x03\x82\x80\x80\x80\x00\x01\x00\x04\x84\x80\x80\x80\x00\x01\x70\x00\x00\x0a\x8e\x80\x80\x80\x00\x01\x88\x80\x80\x80\x00\x00\x41\x00\x13\x00\x00\x45\x0b");

// return_call_indirect.wast:389
assert_invalid("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x88\x80\x80\x80\x00\x02\x60\x00\x01\x7e\x60\x00\x00\x03\x82\x80\x80\x80\x00\x01\x01\x04\x84\x80\x80\x80\x00\x01\x70\x00\x00\x0a\x8e\x80\x80\x80\x00\x01\x88\x80\x80\x80\x00\x00\x41\x00\x13\x00\x00\x45\x0b");

// return_call_indirect.wast:398
assert_invalid("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x88\x80\x80\x80\x00\x02\x60\x01\x7f\x00\x60\x00\x00\x03\x82\x80\x80\x80\x00\x01\x01\x04\x84\x80\x80\x80\x00\x01\x70\x00\x00\x0a\x8d\x80\x80\x80\x00\x01\x87\x80\x80\x80\x00\x00\x41\x00\x13\x00\x00\x0b");

// return_call_indirect.wast:406
assert_invalid("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x89\x80\x80\x80\x00\x02\x60\x02\x7c\x7f\x00\x60\x00\x00\x03\x82\x80\x80\x80\x00\x01\x01\x04\x84\x80\x80\x80\x00\x01\x70\x00\x00\x0a\x8d\x80\x80\x80\x00\x01\x87\x80\x80\x80\x00\x00\x41\x00\x13\x00\x00\x0b");

// return_call_indirect.wast:415
let $2 = instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x84\x80\x80\x80\x00\x01\x60\x00\x00\x03\x82\x80\x80\x80\x00\x01\x00\x04\x84\x80\x80\x80\x00\x01\x70\x00\x00\x0a\x8f\x80\x80\x80\x00\x01\x89\x80\x80\x80\x00\x00\x41\x01\x41\x00\x13\x00\x00\x0b");

// return_call_indirect.wast:421
let $3 = instance("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x84\x80\x80\x80\x00\x01\x60\x00\x00\x03\x82\x80\x80\x80\x00\x01\x00\x04\x84\x80\x80\x80\x00\x01\x70\x00\x00\x0a\x98\x80\x80\x80\x00\x01\x92\x80\x80\x80\x00\x00\x44\x00\x00\x00\x00\x00\x00\x00\x40\x41\x01\x41\x00\x13\x00\x00\x0b");

// return_call_indirect.wast:429
assert_invalid("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x88\x80\x80\x80\x00\x02\x60\x01\x7f\x00\x60\x00\x00\x03\x82\x80\x80\x80\x00\x01\x01\x04\x84\x80\x80\x80\x00\x01\x70\x00\x00\x0a\x8e\x80\x80\x80\x00\x01\x88\x80\x80\x80\x00\x00\x41\x01\x01\x13\x00\x00\x0b");

// return_call_indirect.wast:437
assert_invalid("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x88\x80\x80\x80\x00\x02\x60\x01\x7f\x00\x60\x00\x00\x03\x82\x80\x80\x80\x00\x01\x01\x04\x84\x80\x80\x80\x00\x01\x70\x00\x00\x0a\x8f\x80\x80\x80\x00\x01\x89\x80\x80\x80\x00\x00\x41\x00\x42\x01\x13\x00\x00\x0b");

// return_call_indirect.wast:446
assert_invalid("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x89\x80\x80\x80\x00\x02\x60\x02\x7f\x7f\x00\x60\x00\x00\x03\x82\x80\x80\x80\x00\x01\x01\x04\x84\x80\x80\x80\x00\x01\x70\x00\x00\x0a\x90\x80\x80\x80\x00\x01\x8a\x80\x80\x80\x00\x00\x01\x41\x01\x41\x00\x13\x00\x00\x0b");

// return_call_indirect.wast:456
assert_invalid("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x89\x80\x80\x80\x00\x02\x60\x02\x7f\x7f\x00\x60\x00\x00\x03\x82\x80\x80\x80\x00\x01\x01\x04\x84\x80\x80\x80\x00\x01\x70\x00\x00\x0a\x90\x80\x80\x80\x00\x01\x8a\x80\x80\x80\x00\x00\x41\x01\x01\x41\x00\x13\x00\x00\x0b");

// return_call_indirect.wast:466
assert_invalid("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x89\x80\x80\x80\x00\x02\x60\x02\x7f\x7c\x00\x60\x00\x00\x03\x82\x80\x80\x80\x00\x01\x01\x04\x84\x80\x80\x80\x00\x01\x70\x00\x00\x0a\x98\x80\x80\x80\x00\x01\x92\x80\x80\x80\x00\x00\x44\x00\x00\x00\x00\x00\x00\xf0\x3f\x41\x01\x41\x00\x13\x00\x00\x0b");

// return_call_indirect.wast:476
assert_invalid("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x89\x80\x80\x80\x00\x02\x60\x02\x7c\x7f\x00\x60\x00\x00\x03\x82\x80\x80\x80\x00\x01\x01\x04\x84\x80\x80\x80\x00\x01\x70\x00\x00\x0a\x98\x80\x80\x80\x00\x01\x92\x80\x80\x80\x00\x00\x41\x01\x44\x00\x00\x00\x00\x00\x00\xf0\x3f\x41\x00\x13\x00\x00\x0b");

// return_call_indirect.wast:490
assert_invalid("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x84\x80\x80\x80\x00\x01\x60\x00\x00\x03\x82\x80\x80\x80\x00\x01\x00\x04\x84\x80\x80\x80\x00\x01\x70\x00\x00\x0a\x8d\x80\x80\x80\x00\x01\x87\x80\x80\x80\x00\x00\x41\x00\x13\x01\x00\x0b");

// return_call_indirect.wast:497
assert_invalid("\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x84\x80\x80\x80\x00\x01\x60\x00\x00\x03\x82\x80\x80\x80\x00\x01\x00\x04\x84\x80\x80\x80\x00\x01\x70\x00\x00\x0a\x91\x80\x80\x80\x00\x01\x8b\x80\x80\x80\x00\x00\x41\x00\x13\x94\x98\xdb\xe2\x03\x00\x0b");

// return_call_indirect.wast:508
assert_invalid("\x00\x61\x73\x6d\x01\x00\x00\x00\x04\x85\x80\x80\x80\x00\x01\x70\x01\x02\x02\x09\x88\x80\x80\x80\x00\x01\x00\x41\x00\x0b\x02\x00\x00");