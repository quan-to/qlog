"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// package main
// import "github.com/quan-to/slog"
var index_1 = require("./index");
var LogOperation_1 = require("./LogOperation");
var log = index_1.default
    .scope("MAIN")
    .addFields({
    hue: "br",
    a: 1,
    stack: "trace",
});
log.info('a', 'b', 'c');
log.info("Estou no main");
escopo2(log, "doing huebr");
escopo3(log, "doing huebr");
log.debug("HUEBR");
function escopo2(log, argumento0) {
    log = log
        .tag('REQUEST1234')
        .subScope("Escopo2")
        .addFields({
        "argumento0": argumento0,
    });
    log.info("OLOQUINHO MEU");
    log.operation(LogOperation_1.default.AWAIT).info("Indo para escopo 3");
    escopo3(log, "do escopo 2");
    log.operation(LogOperation_1.default.DONE).info("Escopo 3 chamado");
}
function escopo3(log, argumento2) {
    log = index_1.default.subScope("Escopo3").addFields({
        "argumento2": argumento2,
    });
    log.warn("OLOQUINHO MEU DO ESCOPO 3\nHUEBR\nBRBRBRBR");
    log.error('ERROR MESSAGE');
}
