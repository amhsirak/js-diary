"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serve = void 0;
var express_1 = __importDefault(require("express"));
var serve = function (port, filename, dir) {
    var app = express_1.default();
    return new Promise(function (resolve, reject) {
        app.listen(port, resolve).on("error", reject);
    });
};
exports.serve = serve;
