import LogLevel from "../LogLevel";
export declare const getColorScheme: (category: LogLevel) => any;
export declare const boldify: (content: string) => string;
export declare const whitefy: (content: string) => string;
export declare const grayfy: (content: string) => string;
export declare const stripColors: (str: string) => string;
export declare const colorizeLog: (content: string, colorScheme: string) => any;
