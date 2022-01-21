import {log} from "../../debug";
import {isEqual, isEmpty, each} from "underscore";
import {useEffect, useRef, useState, useCallback} from "react";
import {add, getData, getEmit, setData as setDataStore, del, getAll} from "./configStore";
import {AppState} from "react-native";
import ActionName from "./config";
import {handleData} from "@lib/funcUtil";

/**
 * useConfigData
 * @param {String} actionName
 * @param {any} init
 * @param {any} handleDone
 * @param {array} keys
 */
function useConfigData(actionName, init, handleDone = false, keys = []) {
    const _forceUpdate = useState(false)[1];
    const appState = useRef("active");
    const data = useRef(undefined);
    const dataInit = useRef(undefined);
    const refKeys = useRef(keys);
    if (data.current === undefined || !isEqual(refKeys.current, keys)) {
        !isEqual(refKeys.current, keys) && (refKeys.current = keys)
        let dataStore = getData(actionName, keys);
        if (dataStore) data.current = dataStore; else data.current = handleData(init, keys, 'configStore-' + actionName, false);
        dataInit.current = data.current;
    }

    useEffect(() => {
        const onEmit = async (dataNew) => {
            dataNew = handleData(dataNew, keys, 'configStore-' + actionName, false);
            if (!isEqual(dataNew, data.current)) {
                data.current = dataNew;
                _forceUpdate(prev => !prev);
            }
        };
        const config = add(actionName, onEmit);
        const _handleAppStateChange = async (nextAppState) => {
            if (
                nextAppState.match(/inactive|background/) &&
                appState.current === "active"
            ) {
                if (await handleDone(data.current, dataInit.current)) dataInit.current = data.current;
            }
            appState.current = nextAppState;
        };
        if (handleDone) AppState.addEventListener("change", _handleAppStateChange);
        return () => {
            config();
            let check = getEmit(actionName);
            if (isEmpty(check)) {
                del(actionName);
            }
            if (handleDone) {
                AppState.removeEventListener("change", _handleAppStateChange);
                handleDone(data.current, dataInit.current);
            }
        }
    }, []);

    return [data.current, setData.bind(null, actionName)];
}


/**
 * setData
 * @param {String} actionName
 * @param {Object} data
 * @param {Boolean} emit
 */
function setData(actionName, data, emit = true) {
    setDataStore(actionName, data);
    if (!emit) return true;
    return emitAll(actionName);
}

const emitAll = (actionName) => {
    let all = getEmit(actionName);
    if (all === false) return false;
    if (isEmpty(all)) {
        del(actionName);
        return false;
    }
    let data = getData(actionName);
    each(all, (item, id) => {
        item(data);
    });
    return true;
}

export {
    getData,
    setData,
    useConfigData,
    getAll,
    ActionName
};
