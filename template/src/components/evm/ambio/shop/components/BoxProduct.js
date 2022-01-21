import React, { useRef } from 'react'
import { StyleSheet } from 'react-native'
import { Block, Typography, BasicButton, AlertMessage } from '@uiCore'
import { Dimensions } from 'react-native'
import {
  getProductCart,
  getAllCart,
  updateQuantityProductCart,
  useAllCart,
  useProductCart
} from '@serviceShopCart'
import { useProductDetail, formatPromotion } from '../utils/util'
import { BoxProductCenter } from '../components'
import { useConfigData, ActionName } from '@serviceConfig'
import { renderImage } from '../utils/util'
import { LIGHT } from '@uiCore/Theme/colors'

export default function BoxProduct ({ id, onSale }) {
  console.log('BoxProduct')
  let { quantity } = getProductCart(id)
  let product = useProductCart(id)
  const { data, refreshing, onRefresh } = useProductDetail(id)
  let tempMedia = data ? JSON.parse(data.media) : []
  let tempPromotion = data ? JSON.parse(data.promotion) : []
  let item = {
    promotion: tempPromotion.quantity,
    price: data.price,
    quantity: quantity
  }
  //______________________________________________________________
  const [stateMoneyCart, setStateMoneyCart] = useConfigData(
    ActionName.SHOP_MONEY_STATE,
    true
  )

  return (
    <Block backgroundColor='#FFFFFF' marginHorizontal={2} marginBottom={10}>
      {formatPromotion(item, 2) && (
        <BasicButton
          onPress={onSale}
          style={{
            paddingLeft: 120,
            height: 30,
            justifyContent: 'center',
            //backgroundColor:'red',
            paddingTop: 8
          }}
        >
          <SvgTest
            item={item}
            style={
              {
                // position: 'absolute',
                // right: 10,
                // top: 5,
                //justifyContent: 'center'
              }
            }
          />
        </BasicButton>
      )}
      <BoxProductCenter
        onAdd={() => {
          updateQuantityProductCart(id, quantity + 1)
          setStateMoneyCart(!stateMoneyCart)
        }}
        onClose={() => handleRemoveProduct(id)}
        onSub={() => {
          handleSubProduct(id, quantity)
          setStateMoneyCart(!stateMoneyCart)
        }}
        name={data.name}
        price={formatPromotion(item, 4)}
        priceSale={formatPromotion(item, 3)}
        img={renderImage(tempMedia)}
        quantity={quantity}
        id={id}
      />
      {/* {formatPromotion(item, 1) && ( */}
      <Block
        style={{ minHeight: 30 }}
        justifyContent={'center'}
        backgroundColor='#fff'
        paddingLeft={6}
        paddingRight={10}
        marginHorizontal={0}
      >
        <Typography style={styles.textSale} numberOfLines={1}>
          {formatPromotion(item, 1)}
        </Typography>
      </Block>
      {/* )} */}
    </Block>
  )
}
BoxProduct.defaultProps = {
  item: {},
  onAdd: null,
  onSub: null,
  onClose: null,
  onSale: null
}
const { width } = Dimensions.get('window')
const styles = StyleSheet.create({
  textSale: { textAlign: 'left', color: LIGHT.primary }
})

const handleSubProduct = (id, quantity) => {
  if (quantity == 1) {
    return handleRemoveProduct(id)
  }
  updateQuantityProductCart(id, quantity - 1)
}
const handleRemoveProduct = id => {
  return AlertMessage.show({
    title: 'Cảnh báo!',
    message: 'Bạn muốn loại bỏ khỏi giỏ hàng',
    buttons: [
      { name: 'Hủy' },
      {
        name: 'Đồng ý',
        delay: 0,
        color: LIGHT.danger,
        action: () => updateQuantityProductCart(id, 0)
      }
    ]
  })
}
import Svg, { Polygon } from 'react-native-svg'
function SvgTest ({ item, style }) {
  return (
    <Svg width='250px' height='20px' viewBox='0 0 250 20' style={style}>
      <Polygon
        points=' 0,0 250,0 230,10  250,20  0,20 15,10 0,0 '
        stroke='#f5da27'
        strokeWidth={2}
        fill='#f5da27'
      />
      <Typography
        numberOfLines={1}
        style={{
          textAlign: 'left',
          color: '#fd721d',
          fontSize: 13,
          maxWidth: 230,
          fontWeight: 'bold',
          paddingLeft: 18
        }}
      >
        {formatPromotion(item, 2)}
      </Typography>
    </Svg>
  )
}
