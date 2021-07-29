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

       // Regex : if(args.path === index.js) 
      build.onLoad({ filter: /(^index\.js$)/ }, () => {
        return {
          loader: "jsx",
          contents: inputCode,
        };
      }); 

      // Regex: find css file
      build.onLoad({ filter: /.css$/}, async (args: any) => {
          const cacheResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path);
          if (cacheResult) {
           return cacheResult;
         }

        const { data, request } = await axios.get(args.path);

        const escaped = data
        .replace(/\n/g, "") // replace new line chars by a single string
        .replace(/"/g, '\\"')  // escape double quotes
        .replace(/'/g, "\\'"); // escape single quotes 

        const contents =
           ` 
              const style = document.createElement('style');
              style.innerText = '${escaped}';
              document.head.appendChild(style);
            `
            
        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents: contents,
          resolveDir: new URL("./", request.responseURL).pathname,
        };

        await fileCache.setItem(args.path, result);
        return result;
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
       
        const cacheResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path);
        if (cacheResult) {
          return cacheResult;
        }

        const { data, request } = await axios.get(args.path);

        //console.log(args.path);
        
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

// onLoad: Attempts to load a file
