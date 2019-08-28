/* Qlog 2.0 created by Nemo at 18:15 */

import LogOperation from "./LogOperation";
import LogLevel from "./LogLevel";

export interface QLog {
  addFields(fields: object): QLog;

  scope(scopeName: string): QLog;

  subScope(scopeName: string): QLog;

  tag(tag: string): QLog;

  operation(tag: LogOperation): QLog;

  info(...args: string[]);

  warn(...args: string[]);

  debug(...args: string[]);

  error(...args: string[]);

  log(category: LogLevel, ...args: string[]);
}

function addPadding(text: string, length: number): string {
  let pad = '';
  for (let i = 0; i < length; i++) {
    pad += ' '
  }

  return `${pad}${text}`;
}

function addPadForLines(text: string, length: number): string {

  return text
    .split('\n')
    .map((line, idx) => idx > 0 ? addPadding(line, length) : line) // Skip first line
    .join('\n');
}

class QLogInstance {
  scopeStack: Array<string>;
  fields: object;
  _tag: string;
  op: LogOperation;

  constructor(scopeStack: Array<string> | String, fields?: any) {
    this.scopeStack = (typeof scopeStack === 'string') ? [scopeStack as string] : scopeStack as Array<string>;
    this.fields = fields || {};
    this._tag = 'NONE';
    this.op = LogOperation.MSG;
  }

  // region Interface QLog Methods
  public addFields(fields: object) {
    this.fields = {...this.fields, ...fields};
    return this;
  }

  public subScope(scopeName: string) {
    return this.clone().pushScope(scopeName);
  }

  public scope(scopeName: string) {
    return this.clone().setScope(scopeName);
  }

  public tag(tag: string): QLog {
    return this.clone().setTag(tag);
  }

  public operation(op: LogOperation): QLog {
    return this.clone().setOperation(op);
  }

  public info(...args: string[]) {
    this.log(LogLevel.INFO, ...args)
  }

  public debug(...args: string[]) {
    this.log(LogLevel.DEBUG, ...args)
  }

  public warn(...args: string[]) {
    this.log(LogLevel.WARN, ...args)
  }

  public error(...args: string[]) {
    this.log(LogLevel.ERROR, ...args)
  }

  public log(category: LogLevel, ...args: string[]) {
    const logHead = `${(new Date()).toISOString()}|${category}|${this.op}|${this._tag}|${this.scopeStack.join(' > ')}|`;
    const logTail = `|${JSON.stringify(this.fields)}`;

    const argsStr = args.map((a) => addPadForLines(a, logHead.length)).join(' ');

    console.log(`${logHead}${argsStr}${logTail}`);
  }

  // endregion

  private clone(): QLogInstance {
    const fields = JSON.parse(JSON.stringify(this.fields)) as object; // Deep Clone
    return (new QLogInstance([...this.scopeStack], fields)).setTag(this._tag);
  }

  private setTag(tag: string): QLogInstance {
    this._tag = tag;
    return this;
  }

  private setOperation(op: LogOperation): QLogInstance {
    this.op = op;
    return this;
  }

  private setScope(scope: string): QLogInstance {
    this.scopeStack = [scope]; // Set Scope resets entire stack
    return this;
  }

  private pushScope(scope: string): QLogInstance {
    this.scopeStack.push(scope);
    return this;
  }
}

export default new QLogInstance('Global') as QLog;
