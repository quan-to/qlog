declare enum LogOperation {
    MSG = "MSG",
    IO = "IOCTL",
    AWAIT = "AWAIT",
    DONE = "DONE",
    NOTE = "NOTE"
}
declare const MaxOperationStringLength: number;
export default LogOperation;
export { LogOperation, MaxOperationStringLength, };
