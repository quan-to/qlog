"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = require("chalk");
var LogLevel_1 = require("../LogLevel");
exports.getColorScheme = function (category) {
    var colors = {};
    colors[LogLevel_1.default.INFO] = 'green';
    colors[LogLevel_1.default.DEBUG] = 'magenta';
    colors[LogLevel_1.default.WARN] = 'yellow';
    colors[LogLevel_1.default.ERROR] = 'red';
    return colors[category];
};
exports.boldify = function (content) { return chalk_1.default.bold(content); };
exports.whitefy = function (content) { return chalk_1.default.whiteBright(content); };
exports.stripColors = function (str) { return str.replace(/\x1B\[\d+m/g, ''); };
exports.colorizeLog = function (content, colorScheme) {
    return chalk_1.default[colorScheme](content);
};
