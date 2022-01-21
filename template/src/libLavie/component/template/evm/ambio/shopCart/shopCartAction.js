import {logDebug} from "../../debug";
import {useEffect, useRef, useState} from "react";
import {
    on,
    delProductCart as delProductCartStore,
    delAllCart,
    updateProductCart as updateProductCartStore,
    getProductCart as getProductCartStore,
    getAllCart as getAllCartStore
} from "./shopCartStore";
import {isEqual} from "underscore";

/**
 * ### getProductCart
 * @param {string} productId
 * @return {Object}
 */
function getProductCart(productId) {
    return getProductCartStore(productId);
}

/**
 * ### getAllCart
 * @return {Array}
 */
function getAllCart() {
    return getAllCartStore();
}

/**
 * ### updateQuantityProductCart
 * @param {string} productId
 * @param {number} quantity
 * @return {Boolean}
 */
function updateQuantityProductCart(productId, quantity) {
    if (quantity <= 0) return delProductCartStore(productId); // delete
    return updateProductCartStore(productId, {quantity: quantity});
}

/**
 * ### delProductCart
 * @param {string} productId
 * @return {Boolean}
 */
function delProductCart(productId) {
    return delProductCartStore(productId);
}

/**
 * ### useAllCart
 * @return {Array}
 */
function useAllCart() {
    const forceUpdate = useState(true)[1];
    const data = useRef(null); // init status
    if (data.current === null) {
        data.current = getAllCartStore();
    }
    useEffect(
        () => {
            function handle(statusNew) {
                if (!isEqual(statusNew, data.current)) {
                    data.current = statusNew;
                    forceUpdate(prev => !prev);
                }
            }

            const off = on("0", handle);
            return () => {
                if (off !== false) off();
            };
        },
        []
    );
    return data.current;
}

/**
 * ### useProductCart
 * @param {string} productId
 * @return {Object}
 */
function useProductCart(productId) {
    const forceUpdate = useState(true)[1];
    const data = useRef(null); // init status
    if (data.current === null) {
        data.current = getProductCartStore(productId);
    }
    useEffect(
        () => {
            function handle(statusNew) {
                if (!isEqual(statusNew, data.current)) {
                    data.current = statusNew;
                    forceUpdate(prev => !prev);
                }
            }

            const off = on(productId, handle);
            return () => {
                if (off !== false) off();
            };
        },
        [productId]
    );
    return data.current;
}

export {getProductCart, getAllCart, updateQuantityProductCart, delProductCart, useAllCart, useProductCart, delAllCart};