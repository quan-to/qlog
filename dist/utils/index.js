"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = require("chalk");
exports.getColorScheme = function (category) {
    var colors = {
        I: 'green',
        D: 'magenta',
        W: 'yellow',
        E: 'red'
    };
    return colors[category];
};
exports.colorizeLog = function (content, colorScheme) {
    return chalk_1.default[colorScheme](content);
};
