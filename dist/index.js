"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/* Qlog 2.0 created by Nemo at 18:15 */
var utils_1 = require("./utils/");
function setup() {
    // TODO get env variables
}
var Qlog = /** @class */ (function () {
    function Qlog(scopeStack, fields) {
        this.scopeStack = scopeStack;
        this.fields = fields;
    }
    Qlog.prototype.addFields = function (fields) {
        this.fields = __assign(__assign({}, this.fields), fields);
        return this;
    };
    Qlog.prototype.subScope = function (scopeName) {
        return new Qlog(__spreadArrays(this.scopeStack, [scopeName]), this.fields);
    };
    Qlog.prototype.info = function (message) {
        this.log('I', message);
    };
    Qlog.prototype.error = function (message) {
        this.log('E', message);
    };
    Qlog.prototype.debug = function (message) {
        this.log('D', message);
    };
    Qlog.prototype.warn = function (message) {
        this.log('W', message);
    };
    Qlog.prototype.log = function (category, message) {
        var _a = this, scopeStack = _a.scopeStack, fields = _a.fields;
        var logDate = new Date().toISOString();
        var colorScheme = utils_1.getColorScheme(category);
        var scope = scopeStack + " >";
        var stringifiedFields = JSON.stringify(fields);
        var content = "[[" + logDate + "] | " + category + " | " + scope + " | " + message + " | " + stringifiedFields + "]";
        // [timestamp,scopeStack,message,fields]
        console.log(utils_1.colorizeLog(content, colorScheme));
    };
    return Qlog;
}());
exports.Qlog = Qlog;
