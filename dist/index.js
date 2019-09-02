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
var LogOperation_1 = require("./LogOperation");
exports.LogOperation = LogOperation_1.default;
var LogLevel_1 = require("./LogLevel");
exports.LogLevel = LogLevel_1.default;
function addPadding(text, length) {
    var pad = '';
    for (var i = 0; i < length; i++) {
        pad += ' ';
    }
    return "" + pad + text;
}
function padRight(text, length) {
    var padded = text;
    for (var i = padded.length; i < length; i++) {
        padded += ' ';
    }
    return padded;
}
function addPadForLines(text, length) {
    return text
        .split('\n')
        .map(function (line, idx) { return idx > 0 ? addPadding(line, length) : line; }) // Skip first line
        .join('\n');
}
var pipeChar = utils_1.boldify(utils_1.whitefy('|'));
var QLogInstance = /** @class */ (function () {
    function QLogInstance(scopeStack, fields) {
        this.scopeStack = (typeof scopeStack === 'string') ? [scopeStack] : scopeStack;
        this.fields = fields || {};
        this._tag = 'NONE';
        this.op = LogOperation_1.default.MSG;
    }
    // region Interface QLog Methods
    QLogInstance.prototype.addFields = function (fields) {
        return this.clone().setFields(__assign(__assign({}, this.fields), fields));
    };
    QLogInstance.prototype.subScope = function (scopeName) {
        return this.clone().pushScope(scopeName);
    };
    QLogInstance.prototype.scope = function (scopeName) {
        return this.clone().setScope(scopeName);
    };
    QLogInstance.prototype.tag = function (tag) {
        return this.clone().setTag(tag);
    };
    QLogInstance.prototype.operation = function (op) {
        return this.clone().setOperation(op);
    };
    QLogInstance.prototype.info = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.log.apply(this, __spreadArrays([LogLevel_1.default.INFO], args));
    };
    QLogInstance.prototype.debug = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.log.apply(this, __spreadArrays([LogLevel_1.default.DEBUG], args));
    };
    QLogInstance.prototype.warn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.log.apply(this, __spreadArrays([LogLevel_1.default.WARN], args));
    };
    QLogInstance.prototype.error = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.log.apply(this, __spreadArrays([LogLevel_1.default.ERROR], args));
    };
    QLogInstance.prototype.note = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        (_a = this.setOperation(LogOperation_1.default.NOTE)).log.apply(_a, __spreadArrays([LogLevel_1.default.INFO], args));
    };
    QLogInstance.prototype.await = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        (_a = this.setOperation(LogOperation_1.default.AWAIT)).log.apply(_a, __spreadArrays([LogLevel_1.default.INFO], args));
    };
    QLogInstance.prototype.done = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        (_a = this.setOperation(LogOperation_1.default.DONE)).log.apply(_a, __spreadArrays([LogLevel_1.default.INFO], args));
    };
    QLogInstance.prototype.success = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        (_a = this.setOperation(LogOperation_1.default.DONE)).log.apply(_a, __spreadArrays([LogLevel_1.default.INFO], args));
    };
    QLogInstance.prototype.log = function (category) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var _a = this, scopeStack = _a.scopeStack, fields = _a.fields;
        var logDate = utils_1.grayfy(new Date().toISOString());
        var colorScheme = utils_1.getColorScheme(category);
        var scope = padRight(scopeStack.join(' > '), 24);
        var stringifiedFields = JSON.stringify(fields);
        var logHead = logDate + " " + pipeChar + " " + utils_1.boldify(category) + " " + pipeChar + " " + utils_1.boldify(padRight(this.op, LogOperation_1.MaxOperationStringLength)) + " " + pipeChar + " " + this._tag + " " + pipeChar + " " + scope + " " + pipeChar + " ";
        var logTail = " " + pipeChar + " " + stringifiedFields;
        var argsStr = args.map(function (a) { return addPadForLines(a, utils_1.stripColors(logHead).length); }).join(' ');
        console.log(utils_1.colorizeLog("" + logHead + argsStr + logTail, colorScheme));
    };
    // endregion
    QLogInstance.prototype.clone = function () {
        var fields = JSON.parse(JSON.stringify(this.fields)); // Deep Clone
        return (new QLogInstance(__spreadArrays(this.scopeStack), fields)).setTag(this._tag);
    };
    QLogInstance.prototype.setFields = function (fields) {
        this.fields = fields;
        return this;
    };
    QLogInstance.prototype.setTag = function (tag) {
        this._tag = tag;
        return this;
    };
    QLogInstance.prototype.setOperation = function (op) {
        this.op = op;
        return this;
    };
    QLogInstance.prototype.setScope = function (scope) {
        this.scopeStack = [scope]; // Set Scope resets entire stack
        return this;
    };
    QLogInstance.prototype.pushScope = function (scope) {
        this.scopeStack.push(scope);
        return this;
    };
    return QLogInstance;
}());
exports.default = new QLogInstance('Global');
