// Copyright 2020 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

#include <cstdio>
#include <cstdlib>

extern "C" int main(int argc, char** argv) __attribute__((weak));

int main(int argc, char** argv) {
  (void)argc;
  (void)argv;
  fprintf(stderr, "*** ERROR *** This is a stub *** ERROR ***\n");
  fprintf(stderr,
          " * You have attempted to build a libFuzzer fuzz test, but did not "
          "link in the fuzzing engine.\n");
  fprintf(stderr, " * Use the '-fsanitize=fuzzer' linker option instead.\n");
  abort();
}
