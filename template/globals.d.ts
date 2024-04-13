declare module '*.svg' {
    const content: string;
    export default content;
}
var log: (...message: any[]) => void;
var logRed: (...message: any[]) => void;
var logGreen: (...message: any[]) => void;
var logYellow: (...message: any[]) => void;
var logFormat: (...message: any[]) => void;