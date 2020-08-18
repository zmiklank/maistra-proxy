# Copyright 2017 The Bazel Authors. All rights reserved.
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

load(
    "@io_bazel_rules_go//go:def.bzl",
    _go_context = "go_context",
    _go_rule = "go_rule",
)
load(
    "@bazel_skylib//lib:shell.bzl",
    "shell",
)
load(
    "//internal:go_repository.bzl",
    _go_repository = "go_repository",
)
load(
    "//internal:overlay_repository.bzl",
    _git_repository = "git_repository",
    _http_archive = "http_archive",
)
load(
    "//internal:gazelle_binary.bzl",
    _gazelle_binary = "gazelle_binary",
)

go_repository = _go_repository
git_repository = _git_repository
http_archive = _http_archive
gazelle_binary = _gazelle_binary

DEFAULT_LANGUAGES = [
    "@bazel_gazelle//language/proto:go_default_library",
    "@bazel_gazelle//language/go:go_default_library",
]

def _gazelle_runner_impl(ctx):
    go = _go_context(ctx)
    args = [
        ctx.attr.command,
        "-mode",
        ctx.attr.mode,
    ]
    if ctx.attr.external:
        args.extend(["-external", ctx.attr.external])
    if ctx.attr.prefix:
        args.extend(["-go_prefix", ctx.attr.prefix])
    if ctx.attr.build_tags:
        args.extend(["-build_tags", ",".join(ctx.attr.build_tags)])
    args.extend(ctx.attr.extra_args)

    out_file = ctx.actions.declare_file(ctx.label.name + ".bash")
    substitutions = {
        "@@ARGS@@": shell.array_literal(args),
        "@@GAZELLE_LABEL@@": shell.quote(str(ctx.attr.gazelle.label)),
        "@@GAZELLE_SHORT_PATH@@": shell.quote(ctx.executable.gazelle.short_path),
        "@@GENERATED_MESSAGE@@": """
# Generated by {label}
# DO NOT EDIT
""".format(label = str(ctx.label)),
        "@@RUNNER_LABEL@@": shell.quote(str(ctx.label)),
        "@@GOTOOL@@": shell.quote(go.go.path),
    }
    ctx.actions.expand_template(
        template = ctx.file._template,
        output = out_file,
        substitutions = substitutions,
        is_executable = True,
    )
    runfiles = ctx.runfiles(files = [
        ctx.executable.gazelle,
        go.go,
    ])
    return [DefaultInfo(
        files = depset([out_file]),
        runfiles = runfiles,
        executable = out_file,
    )]

_gazelle_runner = _go_rule(
    implementation = _gazelle_runner_impl,
    attrs = {
        "gazelle": attr.label(
            default = "@bazel_gazelle//cmd/gazelle",
            executable = True,
            cfg = "host",
        ),
        "command": attr.string(
            values = ["update", "fix"],
            default = "update",
        ),
        "mode": attr.string(
            values = ["print", "fix", "diff"],
            default = "fix",
        ),
        "external": attr.string(
            values = ["", "external", "vendored"],
            default = "",
        ),
        "build_tags": attr.string_list(),
        "prefix": attr.string(),
        "extra_args": attr.string_list(),
        "_template": attr.label(
            default = "@bazel_gazelle//internal:gazelle.bash.in",
            allow_single_file = True,
        ),
    },
    executable = True,
)

def gazelle(name, **kwargs):
    if "args" in kwargs:
        # The args attribute has special meaning for executable rules, but we
        # always want extra_args here instead.
        if "extra_args" in kwargs:
            fail("{}: both args and extra_args were provided".format(name))
        kwargs["extra_args"] = kwargs["args"]
        kwargs.pop("args")
    runner_name = name + "-runner"
    _gazelle_runner(
        name = runner_name,
        tags = ["manual"],
        **kwargs
    )
    native.sh_binary(
        name = name,
        srcs = [runner_name],
        args = ["-bazel_run"],
        tags = ["manual"],
    )