import React from 'react'
import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import { Block, BasicButton, Typography } from '@uiCore'
import { FormatMoney } from '../utils/util'
import { WebView } from 'react-native-webview'
import { LabelSale } from '../components'
import { LIGHT } from '@uiCore/Theme/colors'
import { logInfo, logDebug } from '@lib/debug'
export default function ProductsDescription ({ item, onPressSale }) {
  let tempPromotion = item ? JSON.parse(item.promotion) : null
  logInfo('1.12', tempPromotion)
  logInfo('1.13',"item");
  if (!item) return null
  return (
    <Block marginTop={0}>
      <Block
        marginVertical={5}
        backgroundColor='#fff'
        paddingHorizontal={20}
        paddingTop={10}
        paddingBottom={5}
        justifyContent='space-between'
      >
        <Typography size={20}>{item.name}</Typography>
        <Block
          row
          justifyContentSB
          marginTop={10}
          style={{ alignItems: 'center' }}
        >
          <Typography
            style={{ fontWeight: 'bold' }}
            size={18}
            color={LIGHT.danger}
          >
            {FormatMoney(item.price)}
          </Typography>
          <LabelSale
            onPress={onPressSale}
            width={130}
            height={30}
            titleTop={titleTop(tempPromotion)}
            titleBottom={titleBottom(tempPromotion)}
          />
        </Block>
      </Block>
      <Block
        marginTop={10}
        backgroundColor='#fff'
        padding={10}
        paddingLeft={20}
      >
        <Typography style={{ fontSize: 16, color: LIGHT.primary }}>
          Chi tiết sản phẩm
        </Typography>
      </Block>
      <Block
        marginVertical={5}
        backgroundColor='#fff'
        padding={10}
        paddingHorizontal={20}
      >
        <Typography style={{ marginVertical: 5, fontSize: 14 }}>
          {item.description}
        </Typography>
        {/* <WebView
          style={{height: 20, }}
          originWhitelist={['*']}
          source={{html: item.description}}
        /> */}
      </Block>
    </Block>
  )
}
const titleTop = data => {
  logInfo('1.11', data)
  if (data === null) return null
  if (data.quantity === null || data.quantity.length === 0) return null
  if (!Number(data.quantity[0].discount) || !Number(data.quantity[0].min))
    return null
  let number = data.quantity[0].min ? data.quantity[0].min : ''
  if (data.quantity[0].discount > 1) return null
  let sale =
    data.quantity[0].discount * 100 ? data.quantity[0].discount * 100 : ''
  return 'Mua ' + number + ' giảm ' + sale + '%'
}

const titleBottom = data => {
  if (data === null) return null
  if (isEmpty(data) && isEmpty(data.quantity)) return null
  if (data.quantity.length > 0) {
    if (isEmpty(data.quantity[0].gift) || Number(data.quantity[0].gift))
      return null
    let gift = data.quantity[0].gift ? data.quantity[0].gift : ''
    return 'tặng ' + gift
  }
  return null
}
import { isNumber, isString, isEmpty } from 'underscore'
