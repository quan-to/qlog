import LogOperation from "./LogOperation";
import LogLevel from "./LogLevel";
export interface QLog {
    /*! Create a new instance of QLog with the specified fields plus the parent fields */
    addFields(fields: object): QLog;
    /*! Creates a new instance of QLog with the specified scope */
    scope(scopeName: string): QLog;
    /*! Creates a new instance of QLog with specified scope appended to the parent scope */
    subScope(scopeName: string): QLog;
    /*! Creates a new instance of QLog with the specified tag */
    tag(tag: string): QLog;
    /*! Creates a new instance of QLog with specified operation */
    operation(tag: LogOperation): QLog;
    /*! Same as log(LogLevel.INFO, ...args) */
    info(...args: string[]): any;
    /*! Same as log(LogLevel.WARN, ...args) */
    warn(...args: string[]): any;
    /*! Same as log(LogLevel.DEBUG, ...args) */
    debug(...args: string[]): any;
    /*! Same as log(LogLevel.ERROR, ...args) */
    error(...args: string[]): any;
    /*! Same as setOperation(LogOperation.NOTE).info */
    note(...args: string[]): any;
    /*! Same as setOperation(LogOperation.AWAIT).info */
    await(...args: string[]): any;
    /*! Same as setOperation(LogOperation.DONE).info */
    done(...args: string[]): any;
    /*! Same as setOperation(LogOperation.DONE).info */
    success(...args: string[]): any;
    /*! Same as setOperation(LogOperation.IO).info */
    io(...args: string[]): any;
    /*! Prints a log line with the specified level and arguments */
    log(category: LogLevel, ...args: string[]): any;
}
declare const _default: QLog;
export default _default;
export { LogLevel, LogOperation, };
