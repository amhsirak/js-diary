import * as esbuild from "esbuild-wasm";
import axios from "axios";
import localForage from "localforage";

const fileCache = localForage.createInstance({
    name: "crescentcache",
});

export const fetchPlugin = (inputCode: string) => {
    return {
        name: "fetch-plugin",
        setup(build: esbuild.PluginBuild) {

        build.onLoad({ filter: /.*/ }, async (args: any) => {
       
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
        }
    }
}

 // onLoad: Attempts to load a file