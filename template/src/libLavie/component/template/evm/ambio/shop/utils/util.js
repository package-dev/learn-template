import React from 'react'
import { each, findIndex, isNumber } from 'underscore'
import { ActionName, getData, useFetchData } from '@serviceFetch'
import { get, set, del } from '@lib/models/shopKeyword'
import {
  getProductDetail as getProductDetailAPI,
  getProduct,
  getDeliveryAddress
} from './API'
import { getHomeInfo, getHomeId } from '@serviceHome'
import { getUserInfo } from '@serviceUser'
import {
  getProductCart,
  getAllCart,
  updateQuantityProductCart,
  useAllCart,
  useProductCart
} from '@serviceShopCart'
import { logInfo, logDebug } from '@lib/debug'
const Categorys = [
  { key: 0, name: 'Tất cả' },
  {
    key: 'nutri',
    name: 'Dinh dưỡng'
  },
  { key: 'env', name: 'Môi trường' },
  { key: 'tech', name: 'Công nghệ' }
]
const searchPopular = ['Bổ gan', 'Vi sinh', 'Xử lý nước']
export { Categorys, searchPopular }

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const heightBoxHeader = 260
const heightHeader = 60
export { heightBoxHeader, heightHeader }
let ref1 = false
let ref2 = false
let refF = false

let refTop = false
let point = 0
const setRef1 = ref => {
  ref1 = ref
}
const setRef2 = ref => {
  ref2 = ref
}
const setRefF = ref => {
  refF = ref
}
const setRefTop = ref => {
  refTop = ref
}
const getRef1 = () => {
  return ref1
}
const getRef2 = () => {
  return ref2
}
const getRefF = () => {
  return refF
}
const setPoint = p => {
  point = p
}
const getPoint = () => {
  return point
}
const getRefTop = () => {
  return refTop
}
export {
  setRef1,
  getRef1,
  setRef2,
  getRef2,
  setPoint,
  getPoint,
  setRefF,
  getRefF,
  getRefTop,
  setRefTop
}

/**
 * useProductDetail
 * @param id
 */
export function useProductDetail (id) {
  return useFetchData(
    getProductDetailAPI.bind(null, id),
    ActionName.SHOP_PRODUCT_DETAIL_ + id,
    2 * 60 * 60,
    true
  )
}

/**
 * getProductDetail
 * @param id
 */
export function getProductDetail (id) {
  return getData(ActionName.SHOP_PRODUCT_DETAIL_ + id)
}

/**
 * useProduct
 * @param product_type // product_type : 1- thường/ 2- gợi ý
 * @param category // là danh sách Category ở trên
 */
export function useProduct (product_type = 1, category = '') {
  return useFetchData(
    getProduct.bind(null, product_type, category),
    ActionName.SHOP_PRODUCT_ + product_type + '_' + category,
    2 * 60 * 60,
    true
  )
  // logDebug(rs);
  // return rs;
}

export function useDeliveryAddress () {
  let rs = useFetchData(getDeliveryAddress, ActionName.SHOP_DELIVERY_ADDRESS)
  if (!rs.refreshing && rs.data !== false && !rs?.data?.address?.address) {
    let homeId = getHomeId()
    let homeInfo = getHomeInfo(homeId)
    let userInfo = getUserInfo()
    rs.data.address = {
      address: homeInfo?.address || '',
      phone: `${userInfo.dialing_code}${userInfo.phone}`,
      name: userInfo?.full_name || ''
    }
  }
  return rs
}

export function getNumberCart () {
  let number = useAllCart().length
  return number
}
export function formatDataSale (dataSale, unit) {
  if (
    dataSale.length === 0 ||
    !dataSale ||
    dataSale === null ||
    dataSale === undefined
  )
    return []
  const dataSale1 = []
  let _unit = unit
  const data = dataSale
  if (unit === null || unit === undefined || unit === false) _unit = ''
  data.forEach((item_, index) => {
    let item1 = ''
    let item2 = ''
    let item3 = ''
    let rowitem = []
    // if (item_.max !== undefined && item_.min !== undefined) {
    if (isNumber(item_.max) && isNumber(item_.min)) {
      if (item_.max == 0) {
        item1 = '>= ' + `${item_.min}` + ' ' + `${_unit}`
      } else {
        item1 = `${item_.min}` + '-' + `${item_.max}` + ' ' + `${_unit}`
      }

      item2 = Number(item_.discount) ? item_.discount : ''
      item3 = item_.gift ? item_.gift : ''
    }

    rowitem = [item1, item2, item3]
    logInfo('', rowitem)
    if (item1 && item2 && item3) dataSale1.push(rowitem)
  })
  logInfo('1.2', dataSale1)
  return dataSale1
}

export function formatMoneyCarts (Carts) {
  //carts:[id1,id2,...]
  ///error fix update????????????????
  logInfo('1.4', Carts)
  if (!Carts || Carts === null || Carts === undefined || Carts.length === 0)
    return 0
  let total = 0
  logInfo('1.5', Carts)
  Carts.forEach(id => {
    const { quantity } = getProductCart(id)
    logInfo('1.7', quantity)
    const data = getProductDetail(id)
    logInfo('1.8', data)
    if (data === null || !data) return 0
    logInfo('1.8.1', data)
    const tempPromotion = data ? JSON.parse(data.promotion) : []
    const transPromotion = tempPromotion.quantity
      ? tempPromotion.quantity
      : null
    const price = data.price

    let than = getDiscount(transPromotion, quantity)
    logInfo('1.6', than)
    total = total + quantity * price * (1 - than[0])
  })
  return total
}

export const getDiscount = (data, quantity) => {
  logInfo('1.3', data)
  if (!data || data === null || data === undefined || data.length === 0)
    return [0, '']
  let discount = 0
  let gift = ''
  data.forEach((item, index) => {
    if (item.max !== 0) {
      if (
        (quantity > item.min || quantity == item.min) &&
        (quantity < item.max || quantity == item.max)
      ) {
        discount = item.discount
        gift = item.gift
      }
    } else {
      if (quantity > item.min || quantity == item.min) {
        discount = item.discount
        gift = item.gift
      }
    }
  })
  return [discount, gift]
}

export const formatPromotion = (item, type) => {
  if (item === null) return null
  if (
    item.promotion === undefined ||
    item.price === undefined ||
    item.quantity === undefined
  )
    return null
  let { promotion, price, quantity } = item
  let listPromotion = promotion
  let number = quantity
  let discount = 0
  let gift = ''
  let key = -1

  listPromotion.forEach((item, index) => {
    if (item.max !== 0) {
      if (
        (number > item.min || number == item.min) &&
        (number < item.max || number == item.max)
      ) {
        discount = item.discount
        gift = item.gift
        key = index
      }
    } else {
      if (number > item.min || number == item.min) {
        discount = item.discount
        gift = item.gift
        key = index
      }
    }
  })
  if (type == 1) {
    if (key == -1) return null
    return ' Khuyến mãi: giảm ' + discount * 100 + '% và tặng ' + gift
  }

  if (type == 2) {
    if (key + 1 == listPromotion.length) return false
    else {
      return (
        'Mua ' +
        listPromotion[key + 1].min +
        ' giảm ' +
        listPromotion[key + 1].discount * 100 +
        '% và tặng ' +
        listPromotion[key + 1].gift
      )
    }
  }
  if (type == 3) {
    return FormatMoney(price * (1 - discount) * quantity)
  }
  if (type == 4) {
    if (discount == 0) return null
    return FormatMoney(price * quantity)
  }
}
//______________________________________________________________
export const renderImage = media => {
  if (media.length === 0 || media === null)
    return require('@assets/images/shop/noimage.png')
  const dataImage = media.filter((item, index) => item.type === 'image')
  if (dataImage.length === 0) return require('@assets/images/shop/noimage.png')
  if (dataImage[0].url === '') return require('@assets/images/shop/noimage.png')
  return { uri: dataImage[0].url }
}
//______________________________________________________________
export const formatDataOrder = account => {
  logInfo('dathang')
  const Carts = getAllCart()
  const amount = formatMoneyCarts(Carts)
  let products = []
  Carts.forEach(id => {
    const { quantity } = getProductCart(id)
    let data = getProductDetail(id)
    const tempPromotion = data ? JSON.parse(data.promotion) : []
    const tempMedia = data ? JSON.parse(data.media) : []
    // let { discount, gift } = getDiscount(tempPromotion.quantity, quantity)
    const transPromotion = tempPromotion.quantity
      ? tempPromotion.quantity
      : null
    let than = getDiscount(transPromotion, quantity)
    let temp = {
      quantity: quantity,
      name: data.name,
      image: tempMedia,
      discount: than[0],
      gift: than[1],
      unit: data.unit,
      amount: data.price
    }
    products.push(temp)
  })
  let result = {
    name: account.name,
    phone: account.phone,
    address: account.address,
    amount: amount,
    products: products
  }
  return result
}
export function getTimestamp (date) {
  var tp = Math.round(Date.parse(date) / 1000)
  return tp
}
export const pushQueueSearch = (data, item) => {
  //data=[{time:"timeup",name:""}]
  if (data === null) return []
  if (item === null) return data
  let array = data
  let n = data.length
  for (let i = n; i > 0; i--) {
    array[i] = array[i - 1]
  }
  array[0] = item
  return array
}
export const minSearch = data => {
  //data=[{time:"timeup",name:""}]
  if (data === null || data.length === 0) return null

  let array = data
  let sort = array.sort(function (a, b) {
    return a.time - b.time
  })
  return sort[0]
}
export const FormatMoney = (price, sign = 'đ') => {
  const pieces = parseFloat(price)
    .toFixed(0)
    .split('')
  let ii = pieces.length - 3
  while (ii > 0) {
    pieces.splice(ii, 0, '.')
    ii -= 3 //1,234,567
  }
  return pieces.join('') + ' ' + sign
}
