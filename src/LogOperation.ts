enum LogOperation {
  MSG = "MSG",
  IO = "IO",
  AWAIT = "AWAIT",
  DONE = "DONE",
  NOTE = "NOTE",
}

const OperationColors = {};

OperationColors[LogOperation.MSG] = 'bgBlack';
OperationColors[LogOperation.IO] = 'bgMagenta';
OperationColors[LogOperation.AWAIT] = 'bgCyan';
OperationColors[LogOperation.DONE] = 'bgGreen';
OperationColors[LogOperation.NOTE] = 'bgBlack';


const MaxOperationStringLength = [LogOperation.MSG, LogOperation.IO, LogOperation.AWAIT, LogOperation.DONE, LogOperation.NOTE]
  .reduce((l, c) => c.length > l ? c.length : l, 0);

export default LogOperation;
export {
  LogOperation,
  MaxOperationStringLength,
  OperationColors,
}
