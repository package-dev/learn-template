const { isObject } = require("lodash");

// globalFunctions.js
window.log = function (...a) {
    if (__DEV__) console.log(...a);
};
window.logRed = function (...a) {
    if (__DEV__) console.log('\x1b[31m', ...a);
};
window.logGreen = function (...a) {
    if (__DEV__) console.log('\x1b[32m', ...a);
};
window.logYellow = function (...a) {
    if (__DEV__) console.log('\x1b[33m', ...a);
};
window.logFormat = function (...a) {
    if (__DEV__) {
        if (a.length == 1) {
            console.log(JSON.stringify(a[0], null, ' '));
        }
        else if (a.length >= 2) {
            const end = a.slice(2)
            if (isObject(a[0])) console.log(JSON.stringify(a[0], null, ' '), JSON.stringify(a[1], null, ' '), ...end);
            else console.log(a[0], JSON.stringify(a[1], null, ' '), ...end);
        }

    }
};
if (typeof BigInt === 'undefined') {
    global.BigInt = require('big-integer');
}