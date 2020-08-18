# Copyright 2019 The Bazel Authors. All rights reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

DEFAULT_VERSION = "1.14.4"

MIN_SUPPORTED_VERSION = "1.13"

SDK_REPOSITORIES = {
    "1.14.4": {
        "darwin_amd64": ("go1.14.4.darwin-amd64.tar.gz", "3fa7ed8dc44fdd50c0bfe72676250cceca527d59950aef20af906a670cf88de2"),
        "freebsd_386": ("go1.14.4.freebsd-386.tar.gz", "3fa0ab73cddf4117010285a00df5c7c0b0c8617a3b8aa4e3876197e433986897"),
        "freebsd_amd64": ("go1.14.4.freebsd-amd64.tar.gz", "73da292c1b5980f5e3d6506d6d9ef65a67533936f8e0cb775d726fe3a715e519"),
        "linux_386": ("go1.14.4.linux-386.tar.gz", "4179f406ea0efd455a8071eaaaf1dea92cac5c17aab89fbad18ea2a37623c810"),
        "linux_amd64": ("go1.14.4.linux-amd64.tar.gz", "aed845e4185a0b2a3c3d5e1d0a35491702c55889192bb9c30e67a3de6849c067"),
        "linux_arm64": ("go1.14.4.linux-arm64.tar.gz", "05dc46ada4e23a1f58e72349f7c366aae2e9c7a7f1e7653095538bc5bba5e077"),
        "linux_arm": ("go1.14.4.linux-armv6l.tar.gz", "e20211425b3f797ca6cd5e9a99ab6d5eaf1b009d08d19fc8a7835544fa58c703"),
        "linux_ppc64le": ("go1.14.4.linux-ppc64le.tar.gz", "b335f85bc935ca3f553ad1bac37da311aaec887ffd8a48cb58a0abb0d8adf324"),
        "linux_s390x": ("go1.14.4.linux-s390x.tar.gz", "17f2ae0bae968b3d909daabc5cc4a37471ddb70ec49076b78702291e6772d71a"),
        "windows_386": ("go1.14.4.windows-386.zip", "555d7e9919ca58d5c64b2377ca09095eeba3a5d19766f2581ff02e9eb004f6fc"),
        "windows_amd64": ("go1.14.4.windows-amd64.zip", "e04f591219b18e7cabe73eb79c90405b5c7a5baee61377670d7a48429c5c978d"),
    },
    "1.14.3": {
        "darwin_amd64": ("go1.14.3.darwin-amd64.tar.gz", "a8b43d9f65c2768ac2e377793383630a9be2c8c71b643c9a9520855a0d2af41c"),
        "freebsd_386": ("go1.14.3.freebsd-386.tar.gz", "7c5adb1a481d899b782d633541affe17f0d5ebdd97e32bfc01f274603555e14d"),
        "freebsd_amd64": ("go1.14.3.freebsd-amd64.tar.gz", "86da72a7da23c10af39fcc191ab15ad42e77c13ea7bd41c7ea3460f1f502bbe6"),
        "linux_386": ("go1.14.3.linux-386.tar.gz", "46f8c744788103e8aeceb12c7d71eb16a58fe43e7e4711055fa9ef4bae50bff7"),
        "linux_amd64": ("go1.14.3.linux-amd64.tar.gz", "1c39eac4ae95781b066c144c58e45d6859652247f7515f0d2cba7be7d57d2226"),
        "linux_arm64": ("go1.14.3.linux-arm64.tar.gz", "a7a593e2ee079d83a1943edcd1c9ed2dae7529666fce04de8c142fb61c7cdd3e"),
        "linux_arm": ("go1.14.3.linux-armv6l.tar.gz", "b1c3a648c3c8877b98dfba1996dec604c8fb8899db07994b2dfd47b0063367c8"),
        "linux_ppc64le": ("go1.14.3.linux-ppc64le.tar.gz", "329359e2b72839696e78b6c0a96fd939e28e7435d852f31107f68037dd5f7442"),
        "linux_s390x": ("go1.14.3.linux-s390x.tar.gz", "1aad312fc7fa85d663e8226237cc7519b2599b88a213098abc10de8e84d6cfab"),
        "windows_386": ("go1.14.3.windows-386.zip", "b0007593f4e293980d968acc97162692e04cec12b07b5a4928dba64462574abd"),
        "windows_amd64": ("go1.14.3.windows-amd64.zip", "6811c14341fa0e5ebe05b28a4a8086e51a25ee54bc860f83183e1c478e3b1b60"),
    },
    "1.14.2": {
        "darwin_amd64": ("go1.14.2.darwin-amd64.tar.gz", "e0db81f890bb253552b3fd783fccbc2cdda02552295cb305e75984eef1c1e2b9"),
        "freebsd_386": ("go1.14.2.freebsd-386.tar.gz", "7b8eccc27bf0a6a57999c1d30447ab61be19509a244ac3617bc4d1797eecb555"),
        "freebsd_amd64": ("go1.14.2.freebsd-amd64.tar.gz", "b9a26f5e2443898b54d7778d6861df70e8342d33a74bd7e02cf1105c4144ec05"),
        "linux_386": ("go1.14.2.linux-386.tar.gz", "cab5f51e6ffb616c6ee963c3d0650ca4e3c4108307c44f2baf233fcb8ff098f6"),
        "linux_amd64": ("go1.14.2.linux-amd64.tar.gz", "6272d6e940ecb71ea5636ddb5fab3933e087c1356173c61f4a803895e947ebb3"),
        "linux_arm64": ("go1.14.2.linux-arm64.tar.gz", "bb6d22fe5806352c3d0826676654e09b6e41eb1af52e8d506d3fa85adf7f8d88"),
        "linux_arm": ("go1.14.2.linux-armv6l.tar.gz", "eb4550ba741506c2a4057ea4d3a5ad7ed5a887de67c7232f1e4795464361c83c"),
        "linux_ppc64le": ("go1.14.2.linux-ppc64le.tar.gz", "48c22268c81ced9084a43bbe2c1596d3e636b5560b30a32434a7f15e561de160"),
        "linux_s390x": ("go1.14.2.linux-s390x.tar.gz", "501cc919648c9d85b901963303c5061ea6814c80f0d35fda9e62980d3ff58cf4"),
        "windows_386": ("go1.14.2.windows-386.zip", "76beccad98b6d3f8de935e5c9dbd69934cca1baa45b880965cdcf2779df56524"),
        "windows_amd64": ("go1.14.2.windows-amd64.zip", "1b5a60b3bbaa81106d5ee03499b5734ec093c6a255abf9a6a067f0f497a57916"),
    },
    "1.14.1": {
        "darwin_amd64": ("go1.14.1.darwin-amd64.tar.gz", "6632f9d53fd95632e431e8c34295349cca3f0a124e3a28b760ae5c42b32816e3"),
        "freebsd_386": ("go1.14.1.freebsd-386.tar.gz", "1c52e3b72d1802a516709f7908007987c3ec902d847708539eb1acfee810ec7a"),
        "freebsd_amd64": ("go1.14.1.freebsd-amd64.tar.gz", "7d840ba12c6aade31b0e24c59a824a35a40a48686087e6423fa526f048328246"),
        "linux_386": ("go1.14.1.linux-386.tar.gz", "92d465accdebbe2d0749b2f90c22ecb1fd2492435144923f88ce410cd56b6546"),
        "linux_amd64": ("go1.14.1.linux-amd64.tar.gz", "2f49eb17ce8b48c680cdb166ffd7389702c0dec6effa090c324804a5cac8a7f8"),
        "linux_arm64": ("go1.14.1.linux-arm64.tar.gz", "5d8f2c202f35481617e24e63cca30c6afb1ec2585006c4a6ecf16c5f4928ab3c"),
        "linux_arm": ("go1.14.1.linux-armv6l.tar.gz", "04f10e345dae0d7c6c32ffd6356b47f2d4d0e8a0cb757f4ef48ead6c5bef206f"),
        "linux_ppc64le": ("go1.14.1.linux-ppc64le.tar.gz", "6559201d452ee2782dfd684d59c05e3ecf789dc40a7ec0ad9ae2dd9f489c0fe1"),
        "linux_s390x": ("go1.14.1.linux-s390x.tar.gz", "af009bd6e7729c441fec78af427743fefbf11f919c562e01b37836d835f74226"),
        "windows_386": ("go1.14.1.windows-386.zip", "66a6dcf28298ce2c3311487af0822adfec789e07bebc3b5cc6a75be9fadaef24"),
        "windows_amd64": ("go1.14.1.windows-amd64.zip", "4bcc3bbdeba4b298120b4ea78e22b8c0fe93478b47dd7b84d70d97d2b264a0a6"),
    },
    "1.14": {
        "darwin_amd64": ("go1.14.darwin-amd64.tar.gz", "2472dcd681b761501fadb35ec361503efd27de2ba2270b2fe35cb6ece7362243"),
        "freebsd_386": ("go1.14.freebsd-386.tar.gz", "9717901860aab759ff1e555b0e62d58669939f7b2a86fc45d4015db29c92614d"),
        "freebsd_amd64": ("go1.14.freebsd-amd64.tar.gz", "d86041687515ac3729807cdaa6787a1a10ee4cfdefd427043dcdb20544096fa1"),
        "linux_386": ("go1.14.linux-386.tar.gz", "cdcdab6c8d1f2dcea3bbec793352ef84db167a2eb6c60ff69e5cf94dca575f9a"),
        "linux_amd64": ("go1.14.linux-amd64.tar.gz", "08df79b46b0adf498ea9f320a0f23d6ec59e9003660b4c9c1ce8e5e2c6f823ca"),
        "linux_arm64": ("go1.14.linux-arm64.tar.gz", "cd813387f770c07819912f8ff4b9796a4e317dee92548b7226a19e60ac79eb27"),
        "linux_arm": ("go1.14.linux-armv6l.tar.gz", "b5e682176d7ad3944404619a39b585453a740a2f82683e789f4279ec285b7ecd"),
        "linux_ppc64le": ("go1.14.linux-ppc64le.tar.gz", "b896b5eba616d27fd3bb8218de6bef557cb62221e42f73c84ae4b89cdb602dec"),
        "linux_s390x": ("go1.14.linux-s390x.tar.gz", "22e67470fe872c893face196f02323a11ffe89999260c136b9c50f06619e0243"),
        "windows_386": ("go1.14.windows-386.zip", "adb634bedc4143b67c50b2e60f36a2cbcad6ab05ec41a972e2115701584170a2"),
        "windows_amd64": ("go1.14.windows-amd64.zip", "cc2f1e8d19744fe0b2e979bf9a4f9d224e416f4f54cb6cf3aa8b5e9c0865de37"),
    },
    "1.13.12": {
        "darwin_amd64": ("go1.13.12.darwin-amd64.tar.gz", "beaab00ed7c60594201b47a0228b058c2c23a93b9d7a45697591e10273970049"),
        "freebsd_386": ("go1.13.12.freebsd-386.tar.gz", "b67385a062206630b85a9efe0abcbd0afc399ff79182d06aae2a3677ccc9dbcb"),
        "freebsd_amd64": ("go1.13.12.freebsd-amd64.tar.gz", "875e9e264aceb97275637366b05d27ed24afa05cf3af9b5b0a248c76ba73ba02"),
        "linux_386": ("go1.13.12.linux-386.tar.gz", "625d9cdb25ba55e1afba9490c79c55767117fa272e067f81643d22268d51308a"),
        "linux_amd64": ("go1.13.12.linux-amd64.tar.gz", "9cacc6653563771b458c13056265aa0c21b8a23ca9408278484e4efde4160618"),
        "linux_arm64": ("go1.13.12.linux-arm64.tar.gz", "7a8b4e7841d978c95dae8ef53e19811ee2d5c595a1c5ec7afed74bb8f71588b8"),
        "linux_arm": ("go1.13.12.linux-armv6l.tar.gz", "552db731a120d341a1756c6ce0b1029cb5f5c756c09de9f45273893268d19c23"),
        "linux_ppc64le": ("go1.13.12.linux-ppc64le.tar.gz", "97d762a62eae2e1f4d89ce09a89407a63e12c22d5c0fb952e409b323927cd38e"),
        "linux_s390x": ("go1.13.12.linux-s390x.tar.gz", "8dd2d50666176cbe5cab7557081acb0f380cef2240e18d05db7faffc03d8f356"),
        "windows_386": ("go1.13.12.windows-386.zip", "8d45cae6d2138b6ad470cee8b78b4739a1d02cdd976a9c9861f067a102e9affe"),
        "windows_amd64": ("go1.13.12.windows-amd64.zip", "43c4b434f965efa9015c47a1f65858f62ab425fba9fa36a48ed40d1805dd0479"),
    },
    "1.13.11": {
        "darwin_amd64": ("go1.13.11.darwin-amd64.tar.gz", "37f748b464f823eb91922013eb64f263961724c30ebddb47c39d485ae08e9874"),
        "freebsd_386": ("go1.13.11.freebsd-386.tar.gz", "99e707170751b19ec70fa9ab1d13d78c9df9ac804e5ed50ed6e9387b45b9eb16"),
        "freebsd_amd64": ("go1.13.11.freebsd-amd64.tar.gz", "12a855728f26266dc8a1a77f524197ba16455315e879ae9dcab904391f679cdb"),
        "linux_386": ("go1.13.11.linux-386.tar.gz", "c61ea511a4e82e9a7d31684d33c7b8bbb275e4110490f9a320c8026b76cac4ee"),
        "linux_amd64": ("go1.13.11.linux-amd64.tar.gz", "a4d71ca9e02923fa96669a4b5faf78ee8331b18e7209b09dd87fe763b4838ada"),
        "linux_arm64": ("go1.13.11.linux-arm64.tar.gz", "6c81c0ce79be2bd3ac5ea69c709ea9bd588069632ded4ac39d58dadf4d2f93e6"),
        "linux_arm": ("go1.13.11.linux-armv6l.tar.gz", "f762f3acdaf2bb8d32041110022104aa430d96c39a8fc9cf3d4ab74faa607fca"),
        "linux_ppc64le": ("go1.13.11.linux-ppc64le.tar.gz", "d9697e5bcf3a3ac0ba1ff299bb72ffd4957b9893a19a1e65adce683144d795e3"),
        "linux_s390x": ("go1.13.11.linux-s390x.tar.gz", "076f31fb29aa5129151aaf850593b16b4391157870a15a3f0199554a99db0b9b"),
        "windows_386": ("go1.13.11.windows-386.zip", "d36e85f6a99a9955b5b348dc13378f2bf15eb32bbc691f0e582fc5c3a09d71ed"),
        "windows_amd64": ("go1.13.11.windows-amd64.zip", "e6d1805cc70d042133b94a598c7e666b166ee804d541ec35e63ca8eb3053036b"),
    },
    "1.13.10": {
        "darwin_amd64": ("go1.13.10.darwin-amd64.tar.gz", "ce26375c1aee62a7826e02bd0b807a6bb3e32e18492b48648410fa37ab5057c7"),
        "freebsd_386": ("go1.13.10.freebsd-386.tar.gz", "c768c2aca1dbacfedaeccf825118abb8ba1dbfff7d1d01988aed806a9ffa9315"),
        "freebsd_amd64": ("go1.13.10.freebsd-amd64.tar.gz", "0b292bfdcc1d278ef46dfed074d21f7620cbc4096ed546cd487264a36fac3a03"),
        "linux_386": ("go1.13.10.linux-386.tar.gz", "233c9d43fe2fab27ee489efea08b84665aec5855cce95a81dba3846636de5fed"),
        "linux_amd64": ("go1.13.10.linux-amd64.tar.gz", "8a4cbc9f2b95d114c38f6cbe94a45372d48c604b707db2057c787398dfbf8e7f"),
        "linux_arm64": ("go1.13.10.linux-arm64.tar.gz", "f16f19947855b410e48f395ca488bd39223c7b35e8b69c7f15ec00201e20b572"),
        "linux_arm": ("go1.13.10.linux-armv6l.tar.gz", "3c581f11ed49eaf0954f62ffebc123f8c392fc536f01c5a44cb38185701101fc"),
        "linux_ppc64le": ("go1.13.10.linux-ppc64le.tar.gz", "6b9505388ecafa3cb04d5f51638276b25f7d80c5f70bd74ed72f8013f5006fd9"),
        "linux_s390x": ("go1.13.10.linux-s390x.tar.gz", "41cb67266e809920363ff620e8cabce152ab54bebd6a337e9f903f5c1996ec35"),
        "windows_386": ("go1.13.10.windows-386.zip", "c04d2d86826f06b35ae88ae077bfe9027e74adc25516caf8ddb7cf5e7b497736"),
        "windows_amd64": ("go1.13.10.windows-amd64.zip", "e56ff68ab0d0ebdd9d11e9f3ef4b47fb7bd3a379cb07d444b9f7d77c7009088a"),
    },
    "1.13.9": {
        "darwin_amd64": ("go1.13.9.darwin-amd64.tar.gz", "450e59538ed5d3f2b165ba5107530afce6e8e89c6cc5c90a0cbf0a58846ef3b1"),
        "freebsd_386": ("go1.13.9.freebsd-386.tar.gz", "6b75a5a46ebbdf06aa5023f2bd0ad7e9e37389125468243368d5795e1c15c9cd"),
        "freebsd_amd64": ("go1.13.9.freebsd-amd64.tar.gz", "87716246da52c193226df44031aaf45e45ebfc23e01bdc845311c1b560e76e2b"),
        "linux_386": ("go1.13.9.linux-386.tar.gz", "a2744aa2ddc68d888e9f65c2cbe4c8b527b139688ce232ead90dc2961f8d51a8"),
        "linux_amd64": ("go1.13.9.linux-amd64.tar.gz", "f4ad8180dd0aaf7d7cda7e2b0a2bf27e84131320896d376549a7d849ecf237d7"),
        "linux_arm64": ("go1.13.9.linux-arm64.tar.gz", "b53cb466d7986e5e17a3d4c196bc95df08a35968eced5efd7e128387a246c46e"),
        "linux_arm": ("go1.13.9.linux-armv6l.tar.gz", "a3c2941a1fde8692514ece7e2180a0e3ca70609f52756a66bc0ab68c63572361"),
        "linux_ppc64le": ("go1.13.9.linux-ppc64le.tar.gz", "90beb01962202f332be0a7c8dad2db3d30242759ba863db3f36c45d241940efc"),
        "linux_s390x": ("go1.13.9.linux-s390x.tar.gz", "a40949aaf55912b06df8fda511c33fde3e52d377706bdc095332652c1ad225e3"),
        "windows_386": ("go1.13.9.windows-386.zip", "e22406377448f1aea2dd1517327e5ae452d826c0c7624b3511d5af510c57b69a"),
        "windows_amd64": ("go1.13.9.windows-amd64.zip", "cf066aabdf4d83c251aaace14b57a35aafffd1fa67d54d907f27fb31e470a135"),
    },
    "1.13.8": {
        "darwin_amd64": ("go1.13.8.darwin-amd64.tar.gz", "e7bad54950e1d18c716ac9202b5406e7d4aca9aa4ca9e334a9742f75c2167a9c"),
        "freebsd_386": ("go1.13.8.freebsd-386.tar.gz", "5e02b9d3a3b5d7c61d43eea80b27875a9350472ffcb80c08fad857076d670d8b"),
        "freebsd_amd64": ("go1.13.8.freebsd-amd64.tar.gz", "d8ea8fa5f93ba66f1f011fe40706635a95d754704da68ec7c406ba52ed4ec93a"),
        "linux_386": ("go1.13.8.linux-386.tar.gz", "2305c1c46b3eaf574c7b03cfa6b167c199a2b52da85872317438c90074fdb46e"),
        "linux_amd64": ("go1.13.8.linux-amd64.tar.gz", "0567734d558aef19112f2b2873caa0c600f1b4a5827930eb5a7f35235219e9d8"),
        "linux_arm64": ("go1.13.8.linux-arm64.tar.gz", "b46c0235054d0eb69a295a2634aec8a11c7ae19b3dc53556a626b89dc1f8cdb0"),
        "linux_arm": ("go1.13.8.linux-armv6l.tar.gz", "75f590d8e048a97cbf8b09837b15b3e6b44e1374718a96a5c3a994843ef44a4d"),
        "linux_ppc64le": ("go1.13.8.linux-ppc64le.tar.gz", "4c987b3969d33a93880a218064d2330d7f55c9b58698e78db6b56012058e91a9"),
        "linux_s390x": ("go1.13.8.linux-s390x.tar.gz", "994f961df0d7bdbfa6f7eed604539acf9159444dabdff3ce8e938d095d85f756"),
        "windows_386": ("go1.13.8.windows-386.zip", "00c765048392c78fd3681ea5279c408e21fc94f033a504a1158fc6279fb068e3"),
        "windows_amd64": ("go1.13.8.windows-amd64.zip", "aaf0888907144ca7070c8dad03fcf1308f77a42d2f6e4d2a609e64e9ae73cf4f"),
    },
    "1.13.7": {
        "darwin_amd64": ("go1.13.7.darwin-amd64.tar.gz", "8436f846b49c2b14a96d90eef6b2a6e0a0e1943bbb767299c1ecabb795b042b9"),
        "freebsd_386": ("go1.13.7.freebsd-386.tar.gz", "b205d3657ca050b0c69d1fe4a76a2f66aa879f5ef87cc2814241610906e19924"),
        "freebsd_amd64": ("go1.13.7.freebsd-amd64.tar.gz", "6952d9746ba04ea86341690dc93763f6b68319f7bec2b11d7028e1cffa408bdb"),
        "linux_386": ("go1.13.7.linux-386.tar.gz", "93e82683f32d9fe7fda9b686415aeee599a92c4e450b69519bb53e1d62144a85"),
        "linux_amd64": ("go1.13.7.linux-amd64.tar.gz", "b3dd4bd781a0271b33168e627f7f43886b4c5d1c794a4015abf34e99c6526ca3"),
        "linux_arm64": ("go1.13.7.linux-arm64.tar.gz", "8717de6c662ada01b7bf318f5025c046b57f8c10cd39a88268bdc171cc7e4eab"),
        "linux_arm": ("go1.13.7.linux-armv6l.tar.gz", "ff8b870222d82c38a0108810706811dcbd1fcdbddc877789184a0f903cbdf11a"),
        "linux_ppc64le": ("go1.13.7.linux-ppc64le.tar.gz", "8fe0aeb41e87fd901845c9598f17f1aae90dca25d2d2744e9664c173fbf7f784"),
        "linux_s390x": ("go1.13.7.linux-s390x.tar.gz", "7d405e515029d19131bae2820310681c31b665178998335ecc4494e8de01dfeb"),
        "windows_386": ("go1.13.7.windows-386.zip", "cf9b1a2f96240adb98dc4081121ac308bf6f8d2760f96d45f429ec571602cefc"),
        "windows_amd64": ("go1.13.7.windows-amd64.zip", "03befd335ee9ddf1d10cae52e84eb5a37408b8e105acc1c29e30bbbbd8143749"),
    },
    "1.13.6": {
        "darwin_amd64": ("go1.13.6.darwin-amd64.tar.gz", "1ee0dc6a7abf389dac898cbe27e28c4388a61e45cba2632c01d749e25003007f"),
        "freebsd_386": ("go1.13.6.freebsd-386.tar.gz", "e02727feb4680cd643f9b8f5e953196675d0b9d4129dba1d5fbd98db01c24643"),
        "freebsd_amd64": ("go1.13.6.freebsd-amd64.tar.gz", "c8153d236558aa878b7bc844ebede38f09ac846bee037f0f57a8dd75e36d8056"),
        "linux_386": ("go1.13.6.linux-386.tar.gz", "27feb013106da784f09e560720aa41ab395c67f7eed4c4a0fce04bc6e3d01c7d"),
        "linux_amd64": ("go1.13.6.linux-amd64.tar.gz", "a1bc06deb070155c4f67c579f896a45eeda5a8fa54f35ba233304074c4abbbbd"),
        "linux_arm64": ("go1.13.6.linux-arm64.tar.gz", "0a18125c4ed80f9c3045cf92384670907c4796b43ed63c4307210fe93e5bbca5"),
        "linux_arm": ("go1.13.6.linux-armv6l.tar.gz", "37a1a83e363dcf146a67fa839d170fd1afb13009585fdd493d0a3370fbe6f785"),
        "linux_ppc64le": ("go1.13.6.linux-ppc64le.tar.gz", "26a977a8af5dc50a562f0a57b58dded5fa3bacfe77722cf8a84ea54ca54728dd"),
        "linux_s390x": ("go1.13.6.linux-s390x.tar.gz", "5cd9900a1fa0f0cac657930b648381cad9b8c5e2bbc77caf86a6fb5cedad0017"),
        "windows_386": ("go1.13.6.windows-386.zip", "6b1595d3b5b5fbdbaf6031502d90a694d1e7ae297433fc01c6c48fe8bc987495"),
        "windows_amd64": ("go1.13.6.windows-amd64.zip", "66eae07e03310b67d279701028ba8dc6948cd0acdc6fbe21c22bfa9a2bc48884"),
    },
    "1.13.5": {
        "darwin_amd64": ("go1.13.5.darwin-amd64.tar.gz", "97f9ec90d54f3a580789f1f855b17282e7dbccb69a44b20a20c2167e907db800"),
        "freebsd_386": ("go1.13.5.freebsd-386.tar.gz", "005b45ed277374d50acef5daa889139ed4e8fdd34c7e5c6e134d846cbe12c7f2"),
        "freebsd_amd64": ("go1.13.5.freebsd-amd64.tar.gz", "9da24f876f321c1485d46f597546d72c3d38a5d8eade45724fdc40cc19fc042a"),
        "linux_386": ("go1.13.5.linux-386.tar.gz", "3b830fa25f79ab08b476f02c84ea4125f41296b074017b492ac1ff748cf1c7c9"),
        "linux_amd64": ("go1.13.5.linux-amd64.tar.gz", "512103d7ad296467814a6e3f635631bd35574cab3369a97a323c9a585ccaa569"),
        "linux_arm64": ("go1.13.5.linux-arm64.tar.gz", "227b718923e20c846460bbecddde9cb86bad73acc5fb6f8e1a96b81b5c84668b"),
        "linux_arm": ("go1.13.5.linux-armv6l.tar.gz", "26259f61d52ee2297b1e8feef3a0fc82144b666a2b95512402c31cc49713c133"),
        "linux_ppc64le": ("go1.13.5.linux-ppc64le.tar.gz", "292814a5ea42a6fc43e1d1ea61c01334e53959e7ab34de86eb5f6efa9742afb6"),
        "linux_s390x": ("go1.13.5.linux-s390x.tar.gz", "cfbb2959f243880abd1e2efd85d798b8d7ae4a502ab87c4b722c1bd3541e5dc3"),
        "windows_386": ("go1.13.5.windows-386.zip", "5a9ace58c0fb487a07a3dec494a59957aa8425fbefd04d1a3fb1d0aa0d95fb8d"),
        "windows_amd64": ("go1.13.5.windows-amd64.zip", "027275e04d795fbadc898ba7a50ed0ab2161ff4c5e613c94dbb066b2ca24ec11"),
    },
    "1.13.4": {
        "darwin_amd64": ("go1.13.4.darwin-amd64.tar.gz", "a9088c44a984c4ba64179619606cc65d9d0cb92988012cfc94fbb29ca09edac7"),
        "freebsd_386": ("go1.13.4.freebsd-386.tar.gz", "ecb75927a71e232ef849c4f75388e2132c04bc429b0e2501d7bac5598fbd34f2"),
        "freebsd_amd64": ("go1.13.4.freebsd-amd64.tar.gz", "2eeb50a31c61a8ce468ab7c350e6b6c43d8e9572c796742c8b3da8422c46e470"),
        "linux_386": ("go1.13.4.linux-386.tar.gz", "497934398ca57c7c207ce3388f099823923b4c7b74394d6ed64cd2d3751aecb8"),
        "linux_amd64": ("go1.13.4.linux-amd64.tar.gz", "692d17071736f74be04a72a06dab9cac1cd759377bd85316e52b2227604c004c"),
        "linux_arm64": ("go1.13.4.linux-arm64.tar.gz", "8b8d99eb07206f082468fb4d0ec962a819ae45d54065fc1ed6e2c502e774aaf0"),
        "linux_arm": ("go1.13.4.linux-armv6l.tar.gz", "9f76e6353c9ae2dcad1731b7239531eb8be2fe171f29f2a9c5040945a930fd41"),
        "linux_ppc64le": ("go1.13.4.linux-ppc64le.tar.gz", "815bf3c7100e73cfac50c4a07c8eeb4b0458a49ffa0e13a74a6cf7ad8e2a6499"),
        "linux_s390x": ("go1.13.4.linux-s390x.tar.gz", "efc6947e8eb0a6409f4c8ba62b00ae4e54404064bc221df1b73364a95945a350"),
        "windows_386": ("go1.13.4.windows-386.zip", "a6956184e31b5c97ee76ed736f1c5b708ace7f5673511862f9fcb8ab64851286"),
        "windows_amd64": ("go1.13.4.windows-amd64.zip", "ab8b7f7a2a4f7b58720fb2128b32c7471092961ff46a01d9384fb489d8212a0b"),
    },
    "1.13.3": {
        "darwin_amd64": ("go1.13.3.darwin-amd64.tar.gz", "dde04dec8730d72e4d350a4e1b123a3f94aa15e7f34ed8163e72c948916c48ae"),
        "freebsd_386": ("go1.13.3.freebsd-386.tar.gz", "1a79e9013a4421b5e99c0bed81b97460a012d22513a0efedc6107add43e579e7"),
        "freebsd_amd64": ("go1.13.3.freebsd-amd64.tar.gz", "d5337c217ae111ade704a4c3ca618921d4d7ef6d52236a137e70e691e4188c02"),
        "linux_386": ("go1.13.3.linux-386.tar.gz", "c68ebb127924ee753d05fcd4cc893e3409a6754e8884bb04e5248e9b5849f6ba"),
        "linux_amd64": ("go1.13.3.linux-amd64.tar.gz", "0804bf02020dceaa8a7d7275ee79f7a142f1996bfd0c39216ccb405f93f994c0"),
        "linux_arm64": ("go1.13.3.linux-arm64.tar.gz", "9fa65ae42665baff53802091b49b83af6f2e397986b6cbea2ae30e2c7ee0f2f2"),
        "linux_arm": ("go1.13.3.linux-armv6l.tar.gz", "9f15d6aa4098cd53ec5cb48d1a1e554d062b2263a03985d50c2568757d966dc6"),
        "linux_ppc64le": ("go1.13.3.linux-ppc64le.tar.gz", "2373b60d7f7b4825b1d0ec195079833a3dac72ddd55b207ee22b0032b1a658d9"),
        "linux_s390x": ("go1.13.3.linux-s390x.tar.gz", "9241ce5bf362b7066c90da5abc4c85ec7b4054637e1a8a01b8cc83281e228b7e"),
        "windows_386": ("go1.13.3.windows-386.zip", "b27a4266652f1a72b4023bccd1b036ba356cc6a27c18d329a8e624759626298d"),
        "windows_amd64": ("go1.13.3.windows-amd64.zip", "9585efeab37783152c81c6ce373b22e68f45c6801dc2c208bfd1e47b646efbef"),
    },
    "1.13.2": {
        "darwin_amd64": ("go1.13.2.darwin-amd64.tar.gz", "fdf29cc185ece8b038b41b469c2c6095891059b4acad94042e4a777f2f0a1116"),
        "freebsd_386": ("go1.13.2.freebsd-386.tar.gz", "687206009c7643d8657c7b15573e1a399e15fecef301184fb8684a11ae885e3e"),
        "freebsd_amd64": ("go1.13.2.freebsd-amd64.tar.gz", "71f163fdf4a2a0d82a951f07237978f852def373294daa481d487d15e0c5cb76"),
        "linux_386": ("go1.13.2.linux-386.tar.gz", "468f116889631405da0c89b1765985e8bbeddbf8642c2a552a81f0bfbe58ab55"),
        "linux_amd64": ("go1.13.2.linux-amd64.tar.gz", "293b41a6ccd735eebcfb4094b6931bfd187595555cecf3e4386e9e119220c0b7"),
        "linux_arm64": ("go1.13.2.linux-arm64.tar.gz", "a2d27f341d6b7968f9da229990aa9ab7a6d4bd1c722945be11576a09eb538482"),
        "linux_arm": ("go1.13.2.linux-armv6l.tar.gz", "6f2e90b5d08a177be14938a905f7b91e9b17052318b5ea0e6d7c0a83af252421"),
        "linux_ppc64le": ("go1.13.2.linux-ppc64le.tar.gz", "ffcc3651fce34fc6418e33836d5417c0e6b713fda99033259e67538fa802900a"),
        "linux_s390x": ("go1.13.2.linux-s390x.tar.gz", "dbed59db3e4f57df7c86120be37bdbf3516891214174b771cff40d81ba8577e2"),
        "windows_386": ("go1.13.2.windows-386.zip", "c0c5ac83e354b76f78532ed83590151648dfd52d58dd832ecaee9ea0daa07c42"),
        "windows_amd64": ("go1.13.2.windows-amd64.zip", "003c99e778d6f73ba677fec4b66c3bdbbb144b318cfe6ffbe26ed8493b2db9a5"),
    },
    "1.13.1": {
        "darwin_amd64": ("go1.13.1.darwin-amd64.tar.gz", "f3985fced3adecb62dd1e636cfa5eb9fea8f3e98101d9fcc4964d8f1ec255b7f"),
        "freebsd_386": ("go1.13.1.freebsd-386.tar.gz", "3d3a97cc1c778326df13a9a5460bce14094402edbcfb9f529f507344cfea0bc4"),
        "freebsd_amd64": ("go1.13.1.freebsd-amd64.tar.gz", "1ae71f3a02c95cd559f5943aced2f337fb8b58b95db47001ebca48992c7df1d3"),
        "linux_386": ("go1.13.1.linux-386.tar.gz", "4bf7a961fda7ad892b8824002036de8c0f290df05df2e8f11252d1f8c77dcd8f"),
        "linux_amd64": ("go1.13.1.linux-amd64.tar.gz", "94f874037b82ea5353f4061e543681a0e79657f787437974214629af8407d124"),
        "linux_arm64": ("go1.13.1.linux-arm64.tar.gz", "8af8787b7c2a3c0eb3f20f872577fcb6c36098bf725c59c4923921443084c807"),
        "linux_arm": ("go1.13.1.linux-armv6l.tar.gz", "7c75d4002321ea4a066dfe13f6dd5168076e9a231317c5afd55e78b86f478e37"),
        "linux_ppc64le": ("go1.13.1.linux-ppc64le.tar.gz", "72422c68dbed013ee321a05dbb97d9c8d6b2c75f347de707138c2c748fc4aceb"),
        "linux_s390x": ("go1.13.1.linux-s390x.tar.gz", "5f0859ae1037ad7af6cdb6d16f638de908fd9de044d463eeab92b9578d4c7c75"),
        "windows_386": ("go1.13.1.windows-386.zip", "bc0010efa39d5d46e2d7c7bbb702ca37796d95b395003e22080414076556c590"),
        "windows_amd64": ("go1.13.1.windows-amd64.zip", "24cb08d369c1962cccacedc56fd79dc130f623b3b667a316554621ad6ac9b442"),
    },
    "1.13": {
        "darwin_amd64": ("go1.13.darwin-amd64.tar.gz", "234ebbba1fbed8474340f79059cfb3af2a0f8b531c4ff0785346e0710e4003dd"),
        "freebsd_386": ("go1.13.freebsd-386.tar.gz", "4035d0a07c1cfa0e75f56414757ac7c609a801c78cc6df9d1d41927426c325a7"),
        "freebsd_amd64": ("go1.13.freebsd-amd64.tar.gz", "a8391447ea6c77b67163f7dd9fd3708fd9ba396ae128fd77dac4f8c249c8c223"),
        "linux_386": ("go1.13.linux-386.tar.gz", "519b3e6ae4db011b93b60e6fabb055773ae6448355b6909a6befef87e02d98f5"),
        "linux_amd64": ("go1.13.linux-amd64.tar.gz", "68a2297eb099d1a76097905a2ce334e3155004ec08cdea85f24527be3c48e856"),
        "linux_arm64": ("go1.13.linux-arm64.tar.gz", "e2a61328101eff3b9c1ba47ecfec5eb2fdc3eb35d8c27d505737ba98bfcb197b"),
        "linux_arm": ("go1.13.linux-armv6l.tar.gz", "931906d67cae1222f501e7be26e0ee73ba89420be0c4591925901cb9a4e156f0"),
        "linux_ppc64le": ("go1.13.linux-ppc64le.tar.gz", "807b036bb058061b6090635e2a8612aaf301895dce70a773bbcd67fa1e57337c"),
        "linux_s390x": ("go1.13.linux-s390x.tar.gz", "b7122795910b70b68e4118d0d34685a30925f4dd861c065cf20b699a7783807a"),
        "windows_386": ("go1.13.windows-386.zip", "c9ad29eff640bf8cb551853c649fd63acd777fcb28db26712d07983a973cb327"),
        "windows_amd64": ("go1.13.windows-amd64.zip", "7d162b83157d3171961f8e05a55b7da8476244df3fac28a5da1c9e215acfea89"),
    },
}