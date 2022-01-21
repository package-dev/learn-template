import codePush from 'react-native-code-push';
import {log, logDebug, logError} from './debug';
import {
    ToastAndroid,
    Platform,
    NativeModules, AppState,
} from "react-native";
import {createSelectorCreator} from "reselect";
import _, {filter, keys, isEqual, isEmpty, isFunction, isString} from "underscore";
import {createCachedSelector, LruObjectCache} from "re-reselect";
import {useEffect, useRef, useState} from "react";
import {getParamDefault} from "@lib/deviceInfo";

let zlib = require("./zlib/index");
let buffer = require("./zlib/buffer");

/**
 * useAutoSave
 * @param {Function} handleSave
 */
export function  useAutoSave(handleSave = () => {}) {
    const appState = useRef("active");
    useEffect(() => {
        const _handleAppStateChange = (nextAppState) => {
            if (
                nextAppState.match(/inactive|background/) &&
                appState.current === "active"
            ) {
                handleSave();
            }
            appState.current = nextAppState;
        };
        AppState.addEventListener("change", _handleAppStateChange);
        return () => {
            AppState.removeEventListener("change", _handleAppStateChange);
            handleSave();
        }
    }, []);
}

export function toast(mess, duration_set = "short", gravity_set = "center") {
    let Toast = ToastAndroid;
    if (Platform.OS === "ios") {
        Toast = NativeModules.Toast;
    }

    let duration = Toast.SHORT;
    let gravity = Toast.CENTER;

    if (duration_set === "long") {
        duration = Toast.LONG;
    }
    if (gravity_set === "top") {
        gravity = Toast.TOP;
    }
    if (gravity_set === "bottom") {
        gravity = Toast.BOTTOM;
    }

    Toast.showWithGravity(mess, duration, gravity);

    return true;
}

export function sleep(time) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
}

export function convertDate(date = new Date()) {
    let h = date.getHours();
    let i = date.getMinutes();

    return {
        day: date.getDay(),
        s: date.getSeconds(),
        i: i.toString().length == 1 ? "0" + i : i,
        h: h.toString().length == 1 ? "0" + h : h,
        d: date.getDate(),
        m: date.getMonth() + 1,
        y: date.getFullYear()
    };
}

export function _checkHpirChild(device_model) {
    switch (device_model) {
        case "IR_TV_BOX":
        case "IR_MANUAL":
        case "IR_TIVI":
        case "IR_AC_UNIT":
        case "IR_DVD":
        case "IR_PROJECTOR":
        case "IR_NET_BOX":
        case "IR_FAN":
        case "IR_LIGHT":
        case "IR_SOUND":
        case "IR_SWEEPER":
        case "IR_PURIFIER": {
            return true;
            break;
        }
        default: {
            break;
        }
    }
    return false;
}

function customMemoize(func, resultCheck = isEqual, argsCheck = isEqual) {
    let lastArgs = null;
    let lastResult = null;
    return (...args) => {
        if (
            lastArgs !== null &&
            lastArgs.length === args.length &&
            args.every((value, index) => {
                return argsCheck(value, lastArgs[index]);
            })
        ) {
            return lastResult;
        }
        lastArgs = args;
        const result = func(...args);
        return resultCheck(lastResult, result) ? lastResult : (lastResult = result);
    };
}

export const createDeepEqualSelector = createSelectorCreator(
    customMemoize,
);

export const filterKeys = createCachedSelector(
    (data) => {
        return data;
    },
    (_, keys) => {
        return keys;
    },
    (data, keys) => {
        // logDebug("filterKeys handelll =====>")
        if (_.isArray(data)) {
            return _.map(data, function (item) {
                return _.pick(item, function (value, key, object) {
                    return _.indexOf(keys, key) !== -1;
                });
            });
        } else {
            return _.pick(data, function (value, key, object) {
                return _.indexOf(keys, key) !== -1;
            });
        }
    }
)({
        keySelector: (data, keys = [], keyCache) => {
            // logDebug("filterKeys => keySelector : ", keyCache + "-" + keys.join(":") + (listKeyCacheUseHashcode.includes(keyCache) ? "-" + genHashCode(JSON.stringify(data)) : ""));
            return keyCache + "-" + keys.join(":") + (listKeyCacheUseHashcode.includes(keyCache) ? "-" + genHashCode(JSON.stringify(data)) : "");
        },
        cacheObject: new LruObjectCache({cacheSize: 20}),
        selectorCreator: createDeepEqualSelector
    }
);

const listKeyCacheUseHashcode = [
    "fetchStore-AlarmMethod"
]

function genHashCode(string) {
    let hash = 0;
    if (string.length === 0) return hash;
    for (i = 0; i < string.length; i++) {
        let ch = string.charCodeAt(i);
        hash = ((hash << 5) - hash) + ch;
        hash = hash & hash;
    }
    return hash;
}

export function handleData(data, keys, keyCache, convertValueObjectToArray = true) {
    if (data && !_.isEmpty(data)) {
        if (convertValueObjectToArray && !(data instanceof Array) && _.isObject(data[Object.keys(data)[0]])) {
            data = _.values(data);
        }
        if (!_.isEmpty(keys)) return filterKeys(data, keys, keyCache);
    } else if (data && _.isEmpty(data)) {
        return [];
    }
    return data;
}

export const filterEvent = createCachedSelector(
    (prefixEventId) => {
        // log("filterEvent get prefixEventId");
        return prefixEventId;
    }, // get getPrefixEventId
    (_, refs) => {
        // log("filterEvent get refs");
        return refs;
    }, // getRefs
    (prefixEventId, refs) => {
        // log("filterEvent handle", prefixEventId, refs);
        if (_.isArray(refs)) {
            return filter(refs, (eventId) => {
                return eventId.search(prefixEventId) === 0;
            });
        } else {
            return filter(keys(JSON.parse(refs)), (eventId) => {
                return eventId.search(prefixEventId) === 0;
            });
        }

    }
)({
        keySelector: (prefixEventId, refs) => {
            // log("filterEvent => keySelector : ", "filterEvent-" + prefixEventId);
            return "filterEvent-" + prefixEventId;
        },
        cacheObject: new LruObjectCache({cacheSize: 10}),
        selectorCreator: createDeepEqualSelector
    }
);

export async function upgradeApp() {
    let rs = await codePush.sync(
        {
            updateDialog: {
                appendReleaseDescription: false,
                descriptionPrefix: '\n\nNhững thay đổi:\n',
                mandatoryContinueButtonLabel: 'Tiếp tục',
                mandatoryUpdateMessage:
                    'Có bản cập nhật ứng dụng mới, bạn phải cài ngay!',
                optionalIgnoreButtonLabel: 'Bỏ qua',
                optionalInstallButtonLabel: 'Cài ngay',
                optionalUpdateMessage:
                    'Có bản cập nhật ứng dụng, bạn có muốn cài đặt ngay?',
                title: 'Cập nhật ứng dụng',
            },
            installMode: codePush.InstallMode.IMMEDIATE,
        },
        status => {
            switch (status) {
                case codePush.SyncStatus.DOWNLOADING_PACKAGE:
                    // Show "downloading" modal
                    log('downloading.... ');
                    break;
                case codePush.SyncStatus.INSTALLING_UPDATE:
                    // Hide "downloading" modal
                    log('downloading success ');
                    break;
            }
        },
        ({receivedBytes, totalBytes}) => {
            /* Update download modal progress */
            log('downloading status ', receivedBytes, totalBytes);
        },
    );
    log('rs update: ', rs);
    return rs;
}

export function toObject(string) {
    try {
        return JSON.parse(string);
    } catch (e) {
        return false;
    }
}

export function unzip(data) {
    return zlib.inflateSync(new buffer(data, "base64")).toString();
}

export function zip(data) {
    return zlib.deflateSync(JSON.stringify(data)).toString('base64');
}

export function createFormatObject(formatInIt, data, target = undefined, valueDefaulf = "Không xác định") {
    let temp_data = data ? data : {};
    let rs = JSON.stringify(
        {...formatInIt, ...temp_data},
        function (k, v) {
            return v === target ? valueDefaulf : v;
        }
    )
    return JSON.parse(rs);
}

export function getDate(time_sub = 0) {
    let d = new Date(Date.now() - time_sub * 1000);
    return {
        day: d.getDay(),
        s: d.getSeconds(),
        i: d.getMinutes(),
        h: d.getHours(),
        d: d.getDate(),
        m: d.getMonth() + 1,
        y: d.getFullYear()
    };
}

export function getTimeFilter(filter) {
    let time = getDate();
    let time_from, time_end;
    switch (filter) {
        case "today": {
            time_from = time.y + "/" + time.m + "/" + time.d; //23/03/2018
            time_end = time.y + "/" + time.m + "/" + time.d; //23/03/2018
            break;
        }
        case "yesterday": {
            let time2 = getDate(24 * 60 * 60);
            time_from = time2.y + "/" + time2.m + "/" + time2.d; //23/03/2018
            time_end = time2.y + "/" + time2.m + "/" + time2.d; //23/03/2018
            break;
        }
        case "this_week": {
            let day = time.day;
            // 0 chủ nhật
            // 1 thứ 2
            // 2 thứ 3
            // 3 thứ 4
            // 4 thứ 5
            // 5 thứ 6
            // 6 thứ 7

            if (day == 0) {
                day = 7;
            }

            let time2 = getDate((day - 1) * 24 * 60 * 60);
            time_from = time2.y + "/" + time2.m + "/" + time2.d; //23/03/2018
            time_end = time.y + "/" + time.m + "/" + time.d; //23/03/2018

            break;
        }
        case "weeks_ago": {
            let time2 = getDate(7 * 24 * 60 * 60);
            time_from = time2.y + "/" + time2.m + "/" + time2.d; //23/03/2018
            time_end = time.y + "/" + time.m + "/" + time.d; //23/03/2018
            break;
        }
        case "month": {
            time_from = time.y + "/" + time.m + "/01"; //23/03/2018
            time_end = time.y + "/" + time.m + "/" + time.d; //23/03/2018
            break;
        }
        case "month_ago": {
            let time2 = getDate(30 * 24 * 60 * 60);
            time_from = time2.y + "/" + time2.m + "/" + time2.d; //23/03/2018
            time_end = time.y + "/" + time.m + "/" + time.d; //23/03/2018
            break;
        }
        case "last_month": {
            let month = parseInt(time.m) - 1;
            let newDate = time.m + "/01/" + time.y + " " + time.h + ":" + time.i;
            let timeend = new Date(newDate).getTime() / 1000 - 24 * 60 * 60;
            let timeset_new = new Date(timeend * 1000);
            if (month == 0) {
                time_from = time.y - 1 + "/12/01";
            } else {
                time_from = time.y + "/" + month + "/01";
            }
            time_end =
                timeset_new.getFullYear() +
                "/" +
                (timeset_new.getMonth() + 1) +
                "/" +
                timeset_new.getDate();

            break;
        }
        case "this_year": {
            time_from = time.y + "/01/01"; //23/03/2018
            time_end = time.y + "/" + time.m + "/" + time.d; //23/03/2018
            break;
        }
        default: {
            log("not exist filter", filter);
            return false;
        }
    }

    return {
        time_from,
        time_end
    };
}

export function convertStringToObject(data) {
    let rs = false
    if(data) {
        try {
            rs = isString(data) ? JSON.parse(data) : data;
        }catch (e) {
            logError("convertStringToObject error", typeof data, data, e.message())
        }
    }
    return rs;
}

export function convertTimeToSecond(time) {
    let lengthTime = time.toString().length;
    if (lengthTime === 13) {
        return Math.round(time / 1000);
    } else if(lengthTime != 10) {
        // console.warn(data.time.toString().length, data);
    }
    return time;
}

/** compareObject : so sánh 2 object theo key của objectFrom
 * @param {Object} objectFrom
 * @param {Object} objectTo
 * @return {Boolean}
 */
export function compareObject(objectFrom, objectTo) {
    const arrKey = _.keys(objectFrom);
    return  _.isEqual(objectFrom, _.pick(objectTo, ...arrKey));
}

/** isBeta
 * @return {Boolean}
 */
export function isBeta() {
    let paramDefault = getParamDefault();
    return  parseInt(paramDefault.build) === 9999;
}
import { useNavigation } from '@react-navigation/native'
export function usePreventBack (handler=true) {
  const navigation = useNavigation()
  useEffect(
    () =>
      navigation.addListener('beforeRemove', e => {
        e.preventDefault()
        let pause = handler()
        if (pause) navigation.dispatch(e.data.action)
      }),
    [navigation]
  )
  return
}