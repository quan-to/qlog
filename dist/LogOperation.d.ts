declare enum LogOperation {
    MSG = "MSG",
    IO = "IO",
    AWAIT = "AWAIT",
    DONE = "DONE",
    NOTE = "NOTE"
}
declare const OperationColors: {};
declare const MaxOperationStringLength: number;
export default LogOperation;
export { LogOperation, MaxOperationStringLength, OperationColors, };
