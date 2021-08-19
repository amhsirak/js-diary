"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.openCommand = void 0;
var commander_1 = require("commander");
exports.openCommand = new commander_1.Command()
    .command("open")
    .description("Open a file for editing")
    .action(function () {
    console.log("Getting ready to open a file");
});
