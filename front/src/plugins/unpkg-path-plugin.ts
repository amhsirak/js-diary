import * as esbuild from "esbuild-wasm";
import axios from "axios";
import localForage from "localforage";

const fileCache = localForage.createInstance({
  name: "crescentcache",
});

export const unpkgPathPlugin = (inputCode: string) => {
  return {
    name: "unpkg-path-plugin",
    setup(build: esbuild.PluginBuild) {
      // onResolve: Find path where the module is stored
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        console.log("onResolve", args);
        if (args.path === "index.js") {
          return { path: args.path, namespace: "a" };
        }

        if (args.path.includes('./') || args.path.includes('../')) {
          return {
            namespace: 'a',
            path: new URL(args.path, "https://unpkg.com" + args.resolveDir + "/").href,
          }
        }

        return {
          namespace: "a",
          path: `https://unpkg.com/${args.path}`,
        };
      });

      // onLoad: Attempts to load a file
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log("onLoad", args);

        if (args.path === "index.js") {
          return {
            loader: "jsx",
            contents: inputCode,
          };
        }

        
        const cacheResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path);
        if (cacheResult) {
          return cacheResult;
        }

        const { data, request } = await axios.get(args.path);
       
        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents: data,
          // where we found the nested package
          resolveDir: new URL("./", request.responseURL).pathname,
        };
        
        await fileCache.setItem(args.path, result);
        return result;
      });
    },
  };
};
