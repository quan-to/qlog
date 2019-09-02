"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LogOperation;
(function (LogOperation) {
    LogOperation["MSG"] = "MSG";
    LogOperation["IO"] = "IOCTL";
    LogOperation["AWAIT"] = "AWAIT";
    LogOperation["DONE"] = "DONE";
    LogOperation["NOTE"] = "NOTE";
})(LogOperation || (LogOperation = {}));
exports.LogOperation = LogOperation;
var MaxOperationStringLength = [LogOperation.MSG, LogOperation.IO, LogOperation.AWAIT, LogOperation.DONE, LogOperation.NOTE]
    .reduce(function (l, c) { return c.length > l ? c.length : l; }, 0);
exports.MaxOperationStringLength = MaxOperationStringLength;
exports.default = LogOperation;
