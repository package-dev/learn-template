import {log, logDebug} from "../../debug";
import GratiotService from "../gratiotService";
import {Map} from "immutable";
import {del, get, set} from "../../models/shopCart";
import {isEqual, keys} from "underscore";

const prefix = "handleShopCart_";

class ShopCartStore extends GratiotService {
    // _Store is store shopCart
    _Store = Map({
        // "1" : {
        //  quantity: 1
        // },
        // productId : { quantity: 1 } // format
    });

    _timerSetDisk = false;

    on(productId, callback, retain) {
        this._Listeners.count++;
        const eventId = prefix + productId + "_" + this._Listeners.count;
        this._Listeners.refs[eventId] = {
            callback
        };
        // retain
        if (retain) {
            callback(this.getData(productId));
        }
        return this.off.bind(this, eventId);
    }

    emit(productId) {
        if (productId !== "0" && !this._Store.has(productId)) return false;
        // emit all subscribe
        this.getEventId(prefix + productId + "_").forEach(_id => {
            try {
                this._Listeners.refs[_id].callback(this.getData(productId));
            }catch (e) {
                log("not exits event id: ", _id);
            }
        });
    }

    getData(productId) {
        if(productId === "0") return this.getAllCart();
        else return this.getProductCart(productId);
    }

    getProductCart(productId) {
        try{
            productId = productId.toString(); // convert to string
        }catch (e) {
            return false;
        }
        return this._Store.has(productId) ? this._Store.get(productId) : false;
    }

    delProductCart(productId) {
        try{
            productId = productId.toString(); // convert to string
        }catch (e) {
            return false;
        }
        let rs = this._Store.has(productId) ? this._Store = this._Store.delete(productId) : false;
        this.emit("0");
        // this.emit(productId);
        this.setDisk();
        return rs;
    }

    delAllCart() {
        let rs = this.reset();
        this.emit("0");
        return rs;
    }

    getAllCart() {
        return keys(this._Store.toJS());
    }

    updateProductCart(productId, data = {}) {
        try{
            productId = productId.toString(); // convert to string
        }catch (e) {
            return false;
        }
        let dataOld = this.getProductCart(productId);
        let dataUpdate = dataOld ? {...dataOld, ...data} : data; // merge data old
        if (isEqual(dataOld, dataUpdate)) {
            // log("updateStore", " don't update");
            return false;
        }
        // log("updateStore", " updating", homeId, deviceId, dataUpdate);
        this._Store = this._Store.set(
            productId,
            dataUpdate
        );
        this.emit(productId);
        this.emit("0");
        this.setDisk();
        return true;
    }

    reset() {
        this._Store = Map({});
        del();
        return true;
    }

    setDisk() {
        if (this._timerSetDisk) {
            clearTimeout(this._timerSetDisk);
        }
        this._timerSetDisk = setTimeout(() => {
            set(this._Store.toJS());
            // log("setDisk ----------->");
        }, 1000);
        return true;
    }

    async getDisk() {
        let rs = await get();
        if (!rs) return false;
        this._Store = Map(rs);
        return true;
    }
}

let shopCartStore = new ShopCartStore();

module.exports = {
    /**
     * ### update Product cart
     * @param {string} productId
     * @param {{quantity: *}} data
     * @return {Boolean} status update
     */
    updateProductCart(productId, data = {}) {
        return shopCartStore.updateProductCart(productId, data);
    },
    /**
     * ### get cart by product id
     * @param {string} productId
     * @return {object}
     */
    getProductCart(productId) {
        return shopCartStore.getProductCart(productId);
    },
    /**
     * ### del cart by product id
     * @param {string} productId
     * @return {object}
     */
    delProductCart(productId) {
        return shopCartStore.delProductCart(productId);
    },
    /**
     * ### del all cart
     * @return {boolean}
     */
    delAllCart() {
        return shopCartStore.delAllCart();
    },
    /**
     * ### get all cart
     * @return {object}
     */
    getAllCart() {
        return shopCartStore.getAllCart();
    },
    /**
     * ### subscribe cart product
     * @param {String} productId:
     * @param {Function} callback:
     * @param {Boolean} retain:
     */
    on(productId, callback = () => {}, retain = false) {
        return shopCartStore.on(productId, callback, retain);
    },
    /**
     * ### off all subscribe User
     * @return {Boolean} :
     */
    offAll() {
        return shopCartStore.offAll();
    },
    /**
     * ### sync from disk
     * @return {Boolean} status
     */
    syncDisk: async () => {
        return await shopCartStore.getDisk();
    },
    /**
     * ### reset store, disk
     * @return {Boolean} status
     */
    reset() {
        return shopCartStore.reset();
    },
};