import path from "path";
import { Command } from "commander";
import { serve } from "local-api";

export const serveCommand = new Command()
    .command("serve [filename]")
    .description("Open a file for editing")
    .option("-p, --port <number>", "Port to run server on", "4050")
    .action((filename = "log.js", options: {port: string}) => {
       const dir = path.join(process.cwd(), path.dirname(filename));
        serve(parseInt(options.port), path.basename(filename), dir);
    });