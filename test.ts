// package main
// import "github.com/quan-to/slog"
import { Qlog } from "./index";

let qlog = new Qlog(
    ["MAIN"],
    {
        "hue": "br",
        "a": 1,
        "stack":"trace",
    })

qlog.info("Estou no main")
escopo2(qlog, "doing huebr")
escopo3(qlog, "doing huebr")
qlog.debug("HUEBR")


function escopo2(qlog:Qlog, argumento0:string) {
    qlog = qlog.subScope("Escopo2").addFields({
            "argumento0": argumento0,
        })

    qlog.info("OLOQUINHO MEU")

    escopo3(qlog, "do escopo 2")
}

function escopo3(qlog:Qlog, argumento2:string) {
    qlog = qlog.subScope("Escopo3").addFields({
            "argumento2": argumento2,
        })

    qlog.warn("OLOQUINHO MEU DO ESCOPO 3")
}