import {Platform} from "react-native";

const colours = {
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    dim: "\x1b[2m",
    underscore: "\x1b[4m",
    blink: "\x1b[5m",
    reverse: "\x1b[7m",
    hidden: "\x1b[8m",
    fg: {
        black: "\x1b[30m",
        red: "\x1b[31m",
        green: "\x1b[32m",
        yellow: "\x1b[33m",
        blue: "\x1b[34m",
        magenta: "\x1b[35m",
        cyan: "\x1b[36m",
        white: "\x1b[37m",
        crimson: "\x1b[38m" // Scarlet
    },
    bg: {
        black: "\x1b[40m",
        red: "\x1b[41m",
        green: "\x1b[42m",
        yellow: "\x1b[43m",
        blue: "\x1b[44m",
        magenta: "\x1b[45m",
        cyan: "\x1b[46m",
        white: "\x1b[47m",
        crimson: "\x1b[48m"
    }
};

export function logDebug(title = "", ...param) {
    if (!__DEV__) return;
    console.debug(colours.bg.magenta, colours.fg.black, title, colours.reset, ...param);
}

export function logInfo(title = "", ...param) {
    if (!__DEV__) return;
    console.info(colours.bg.cyan, colours.fg.black, title, colours.reset, ...param);
}

export function logWarn(title = "", ...param) {
    if (!__DEV__) return;
    console.log(colours.bg.yellow, colours.fg.black, "Warn: " + title, colours.reset, ...param);
}

export function logError(title = "", ...param) {
    if (!__DEV__) return;
    // console.log(colours.bg.red, colours.fg.black, "Info: " + title, colours.reset, ...param);
    console.error(title,...param);
}

export function log(...param) {
    // return false;
    if (__DEV__) {
        let date = new Date(Date.now());

        // console.log(colours.bg.yellow, colours.fg.red, "I am a white message with a blue background", colours.reset) ;

        if (Platform.OS === "ios") {
            console.log(
                "ambio_tool_log",
                ...param,
                date.getHours() +
                ":" +
                date.getMinutes() +
                ":" +
                date.getSeconds() +
                " " +
                date.getMilliseconds() /* +
        " " +
        date.getFullYear() +
        ":" +
        (date.getMonth() + 1) +
        ":" +
        date.getDate()*/
            );
        } else {
            console.log(
                "ambio_tool_log",
                ...param,
                date.getHours() +
                ":" +
                date.getMinutes() +
                ":" +
                date.getSeconds() +
                " " +
                date.getMilliseconds() /* +
        " " +
        date.getFullYear() +
        ":" +
        (date.getMonth() + 1) +
        ":" +
        date.getDate()*/
            );
        }
        return true;
    }

    return false;
}
