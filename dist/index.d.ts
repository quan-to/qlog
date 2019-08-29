import LogOperation from "./LogOperation";
import LogLevel from "./LogLevel";
export interface QLog {
    addFields(fields: object): QLog;
    scope(scopeName: string): QLog;
    subScope(scopeName: string): QLog;
    tag(tag: string): QLog;
    operation(tag: LogOperation): QLog;
    info(...args: string[]): any;
    warn(...args: string[]): any;
    debug(...args: string[]): any;
    error(...args: string[]): any;
    log(category: LogLevel, ...args: string[]): any;
}
declare const _default: QLog;
export default _default;
