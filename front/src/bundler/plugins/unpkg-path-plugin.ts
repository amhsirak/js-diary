import * as esbuild from "esbuild-wasm";

export const unpkgPathPlugin = () => {
  return {
    name: "unpkg-path-plugin",
    setup(build: esbuild.PluginBuild) {

      // Regex : if(args.path === index.js) 
      build.onResolve({ filter: /(^index\.js$)/}, () => {
        return { path: "index.js", namespace: "a" };
      });
      
      // Regex : if (args.path.includes('./') || args.path.includes('../')) find relative paths
      build.onResolve({ filter: /^\.+\// }, (args: any) => {
        return {
          namespace: 'a',
          path: new URL(args.path, "https://unpkg.com" + args.resolveDir + "/").href,
        }
      });

      // Regex: find main file of a module
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        return {
          namespace: "a",
          path: `https://unpkg.com/${args.path}`,
        };
      });

    },
  };
};

// onResolve: Find path where the module is stored
