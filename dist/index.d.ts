declare class Qlog {
    scopeStack: Array<string>;
    fields: object;
    constructor(scopeStack: Array<string>, fields: object);
    addFields(fields: object): this;
    subScope(scopeName: string): Qlog;
    info(message: String): void;
    error(message: String): void;
    debug(message: String): void;
    warn(message: String): void;
    log(category: string, message: String): void;
}
export { Qlog };
