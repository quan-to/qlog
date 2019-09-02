"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LogLevel;
(function (LogLevel) {
    LogLevel["INFO"] = "I";
    LogLevel["WARN"] = "W";
    LogLevel["ERROR"] = "E";
    LogLevel["DEBUG"] = "D";
})(LogLevel || (LogLevel = {}));
exports.LogLevel = LogLevel;
var LevelColors = {};
exports.LevelColors = LevelColors;
LevelColors[LogLevel.INFO] = 'green';
LevelColors[LogLevel.DEBUG] = 'magenta';
LevelColors[LogLevel.WARN] = 'yellow';
LevelColors[LogLevel.ERROR] = 'red';
exports.default = LogLevel;
