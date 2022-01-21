import {log} from "../../debug";
import {Map} from "immutable";
import {each, has, isEmpty} from "underscore";
import {handleData} from "@lib/funcUtil";

/**
 * ### class for action
 */
class actionPrototype {

    data = false;
    emit = {};

    constructor(emit, idCustom) {
        this.emit[idCustom] = emit;
    }

    /**
     * ### gen id
     */
    _genId() {
        const text_random = Math.random()
            .toString(36)
            .substr(2, 4);
        return new Date().getTime() + text_random; //gen id
    }

    /**
     * ### get data
     */
    getData() {
        return this.data;
    }

    /**
     * ### get emit
     */
    getEmit() {
        return this.emit;
    }

    /**
     * ### set data
     */
    setData(data) {
        return this.data = data;
    }

    /**
     * ### add emit
     */
    addEmit(emit) {
        let id = this._genId();
        this.emit[id] = emit;
        return this.clearEmit.bind(this, id);
    }

    /**
     * ### clear emit
     */
    clearEmit(id) {
        if (has(this.emit,id)) {
            delete this.emit[id];
            return true;
        }
        return false;
    }
}


class ConfigStore {
    // _Store
    _Store = Map({
        // "ACTION_NAME" : "class actionPrototype",
    });

    add(actionName, emit) {
        if (!this._Store.has(actionName)) { // not exist action
            let idCustom = "init"
            let newAction = new actionPrototype(emit, idCustom);
            this._Store = this._Store.set(
                actionName,
                newAction
            );
            return newAction.clearEmit.bind(newAction, idCustom);
        } else { // exist action
            let Action = this._Store.get(actionName);
            return Action.addEmit(emit);
        }
    }

    del(actionName) {
        if (!this._Store.has(actionName)) return false;
        return this._Store = this._Store.delete(actionName);
    }

    getData(actionName, keys = []) {
        if (!this._Store.has(actionName)) return false;
        let Action = this._Store.get(actionName);
        return handleData(Action.getData(),keys,'configStore-' + actionName, false);
    }

    getApi(actionName) {
        if (!this._Store.has(actionName)) return false;
        let Action = this._Store.get(actionName);
        return Action.getApi();
    }

    getEmit(actionName) {
        if (!this._Store.has(actionName)) return false;
        let Action = this._Store.get(actionName);
        return Action.getEmit();
    }

    setData(actionName, data) {
        if (!this._Store.has(actionName)) return false;
        let Action = this._Store.get(actionName);
        return Action.setData(data);
    }

    /*emitAll(actionName) {
        let all = this.getEmit(actionName);
        if (all === false) return false;
        if (isEmpty(all)) {
            this.del(actionName);
            return false;
        }
        let data = this.getData(actionName);
        each(all, (item, id) => {
            item(data);
        });
        return true;
    }*/

    getAll() {
        return this._Store.toJS();
    }
}

let configStore = new ConfigStore();

module.exports = {
    /**
     * ### add Fetch Store
     * @return {Function} clear
     * @param {String} actionName
     * @param {Function} emit
     */
    add(actionName = "",  emit = () => {}) {
        return configStore.add(actionName, emit);
    },
    /**
     * ### del
     * @param {string} actionName
     */
    del(actionName) {
        return configStore.del(actionName);
    },
    /**
     * ### get data
     * @param {string} actionName
     * @param {array} keys
     */
    getData(actionName,keys = []) {
        return configStore.getData(actionName, keys);
    },
    /**
     * ### get Emit for force update
     * @param {string} actionName
     */
    getEmit(actionName) {
        return configStore.getEmit(actionName);
    },
    /**
     * ### get Data
     * @param {string} actionName
     * @param data
     */
    setData(actionName, data) {
        return configStore.setData(actionName, data);
    },
    getAll() {
        return configStore.getAll();
    },
};