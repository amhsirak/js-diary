import { program } from "commander";
import { openCommand } from "./commands/open";

program.addCommand(openCommand);

program.parse(process.argv);