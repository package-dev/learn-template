import {requestProc} from "@lib/mqttUtil";
import {ActionName, sync} from "@serviceFetch";

//product_type : 1- thường/ 2- gợi ý
export async function getProduct(product_type = 1, category = "") {
    let rs = (await requestProc("ambio_products", {product_type, category})).handle();
    if (!rs) return false;
    return rs.products;
}
//lay san pham//nono
export async function getProductDetail(id) {
    let rs = (await requestProc("ambio_product", {id})).handle();
    if (!rs) return false;
    return rs.product;
}
//chi tiet san pham
export async function searchProduct(keyword) {
    let rs = (await requestProc("ambio_search_products", {keyword})).handle();
    if (!rs) return false;
    return rs;
}
//search san pham
export async function saveDeliveryAddress(name, phone, address) {
    let rs = (await requestProc("ambio_save_delivery_address", {name, phone, address})).handle();
    if (rs) { // sync
        sync(ActionName.SHOP_DELIVERY_ADDRESS);
    }
    return rs;
}
//
export async function getDeliveryAddress() {
    let rs = (await requestProc("ambio_delivery_address", {})).handle();
    if (!rs) return false;
    return rs;
}

export async function orderProduct(param) {
    let rs = (await requestProc("ambio_order", param)).handle();
    if (!rs) return false;
    return rs;
}
//
/*
{
name
phone
address
amount : tổng giá tiền
products : mảng của các object
    [{ name
    image
    quantity : số lượng
    unit : đơn vị
    discount : chiết khấu
    gift : quà tặng
    amount : giá tiền
    }]
}
*/