import * as esbuild from "esbuild-wasm";

export const unpkgPathPlugin = () => {
  return {
    name: "unpkg-path-plugin",
    setup(build: esbuild.PluginBuild) {
      // Hanlde root entry file of 'index.js'
      build.onResolve({ filter: /(^index\.js$)/ }, () => {
        return { path: "index.js", namespace: "a" };
      });

      // Hanlde relative paths in a module
      build.onResolve({ filter: /^\.+\// }, (args: any) => {
        return {
          path: new URL(args.path, "https://unpkg.com" + args.resolveDir + "/")
            .href,
          namespace: "a",
        };
      });

      // Hanlde main file of a module
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        return {
          path: `https://unpkg.com/${args.path}`,
          namespace: "a",
        };
      });
    },
  };
};
