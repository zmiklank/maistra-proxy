# Generated file, do not modify by hand
# Generated by 'rbe_windows_clang_cl_gen' rbe_autoconfig rule
"""Definitions to be used in rbe_repo attr of an rbe_autoconf rule  """
toolchain_config_spec0 = struct(config_repos = [], create_cc_configs = True, create_java_configs = False, env = {}, java_home = None, name = "msvc-cl")
toolchain_config_spec1 = struct(config_repos = [], create_cc_configs = True, create_java_configs = False, env = {"USE_CLANG_CL": "1"}, java_home = None, name = "clang-cl")
_TOOLCHAIN_CONFIG_SPECS = [toolchain_config_spec0,toolchain_config_spec1]
_BAZEL_TO_CONFIG_SPEC_NAMES = {"3.7.2": ["msvc-cl", "clang-cl"]}
LATEST = "sha256:4f28bbcbf24933011fdd8527f5a1579e36a4a7fea63c4aff830a60efc6fb22f1"
CONTAINER_TO_CONFIG_SPEC_NAMES = {"sha256:4f28bbcbf24933011fdd8527f5a1579e36a4a7fea63c4aff830a60efc6fb22f1": ["msvc-cl", "clang-cl"]}
_DEFAULT_TOOLCHAIN_CONFIG_SPEC = toolchain_config_spec0
TOOLCHAIN_CONFIG_AUTOGEN_SPEC = struct(
        bazel_to_config_spec_names_map = _BAZEL_TO_CONFIG_SPEC_NAMES,
        container_to_config_spec_names_map = CONTAINER_TO_CONFIG_SPEC_NAMES,
        default_toolchain_config_spec = _DEFAULT_TOOLCHAIN_CONFIG_SPEC,
        latest_container = LATEST,
        toolchain_config_specs = _TOOLCHAIN_CONFIG_SPECS,
    )