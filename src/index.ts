/* Qlog 2.0 created by Nemo at 18:15 */
import {getColorScheme, colorizeLog, boldify, whitefy, stripColors, grayfy} from './utils/';

import LogOperation, {MaxOperationStringLength, OperationColors} from "./LogOperation";
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
  info(...args: string[]);

  /*! Same as log(LogLevel.WARN, ...args) */
  warn(...args: string[]);

  /*! Same as log(LogLevel.DEBUG, ...args) */
  debug(...args: string[]);

  /*! Same as log(LogLevel.ERROR, ...args) */
  error(...args: string[]);

  /*! Same as setOperation(LogOperation.NOTE).info */
  note(...args: string[]);

  /*! Same as setOperation(LogOperation.AWAIT).info */
  await(...args: string[]);

  /*! Same as setOperation(LogOperation.DONE).info */
  done(...args: string[]);

  /*! Same as setOperation(LogOperation.DONE).info */
  success(...args: string[]);

  /*! Same as setOperation(LogOperation.IO).info */
  io(...args: string[]);

  /*! Prints a log line with the specified level and arguments */
  log(category: LogLevel, ...args: string[]);
}

function addPadding(text: string, length: number): string {
  let pad = '';
  for (let i = 0; i < length; i++) {
    pad += ' '
  }

  return `${pad}${text}`;
}

function padRight(text: string, length: number): string {
  let padded = text;
  for (let i = padded.length; i < length; i++) {
    padded += ' ';
  }

  return padded;
}

function addPadForLines(text: string, length: number): string {

  return text
    .split('\n')
    .map((line, idx) => idx > 0 ? addPadding(line, length) : line) // Skip first line
    .join('\n');
}

const pipeChar = boldify(whitefy('|'));

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
    return this.clone().setFields({...this.fields, ...fields});
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
    this.log(LogLevel.INFO, ...args);
  }

  public debug(...args: string[]) {
    this.log(LogLevel.DEBUG, ...args);
  }

  public warn(...args: string[]) {
    this.log(LogLevel.WARN, ...args);
  }

  public error(...args: string[]) {
    this.log(LogLevel.ERROR, ...args);
  }

  public io(...args: string[]) {
    this.setOperation(LogOperation.IO).log(LogLevel.INFO, ...args);
  }

  public note(...args: string[]) {
    this.setOperation(LogOperation.NOTE).log(LogLevel.INFO, ...args);
  }

  public await(...args: string[]) {
    this.setOperation(LogOperation.AWAIT).log(LogLevel.INFO, ...args);
  }

  public done(...args: string[]) {
    this.setOperation(LogOperation.DONE).log(LogLevel.INFO, ...args);
  }

  public success(...args: string[]) {
    this.setOperation(LogOperation.DONE).log(LogLevel.INFO, ...args);
  }

  public log(category: LogLevel, ...args: string[]) {
    const {scopeStack, fields} = this;

    const logDate = grayfy(new Date().toISOString());
    const colorScheme = getColorScheme(category);
    const scope = padRight(scopeStack.join(' > '), 24);
    const stringifiedFields = JSON.stringify(fields);
    const op = colorizeLog(whitefy(padRight(this.op, MaxOperationStringLength)), OperationColors[this.op]);
    const tag = grayfy(this._tag);

    const logHead = `${logDate} ${pipeChar} ${boldify(category)} ${pipeChar} ${op} ${pipeChar} ${tag} ${pipeChar} ${scope} ${pipeChar} `;
    const logTail = ` ${pipeChar} ${stringifiedFields}`;

    const argsStr = args.map((a) => addPadForLines(a, stripColors(logHead).length)).join(' ');

    console.log(colorizeLog(`${logHead}${argsStr}${logTail}`, colorScheme));
  }

  // endregion

  private clone(): QLogInstance {
    const fields = JSON.parse(JSON.stringify(this.fields)) as object; // Deep Clone
    return (new QLogInstance([...this.scopeStack], fields)).setTag(this._tag);
  }

  private setFields(fields: object) {
    this.fields = fields;
    return this;
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
export {
  LogLevel,
  LogOperation,
}
