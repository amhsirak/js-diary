"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serveCommand = void 0;
var commander_1 = require("commander");
exports.serveCommand = new commander_1.Command()
    .command("serve [filename]")
    .description("Open a file for editing")
    .option("-p, --port <number>", "Port to run server on", "4050")
    .action(function (filename, options) {
    if (filename === void 0) { filename = "log.js"; }
    console.log(filename, options);
});
