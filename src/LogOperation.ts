enum LogOperation {
  MSG = "MSG",
  IO = "IOCTL",
  AWAIT = "AWAIT",
  DONE = "DONE",
  NOTE = "NOTE",
}

const MaxOperationStringLength = [LogOperation.MSG, LogOperation.IO, LogOperation.AWAIT, LogOperation.DONE, LogOperation.NOTE]
  .reduce((l, c) => c.length > l ? c.length : l, 0);

export default LogOperation;
export {
  LogOperation,
  MaxOperationStringLength,
}
