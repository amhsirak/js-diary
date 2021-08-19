import { Command } from "commander";

export const openCommand = new Command()
    .command("open")
    .description("Open a file for editing")
    .action(() => {
        console.log("Getting ready to open a file");
    });