import React from 'react'
import { StyleSheet, Image } from 'react-native'
import { Block, Typography, Icon } from '@uiCore'
import { getProductCart } from '@serviceShopCart'
import { useProductDetail, formatPromotion } from '../utils/util'
import { renderImage } from '../utils/util'
import { LIGHT } from '@uiCore/Theme/colors'

export default function BoxProductBasic ({ id }) {
  const { quantity } = getProductCart(id)
  const { data, refreshing, onRefresh } = useProductDetail(id)
  let tempMedia = data ? JSON.parse(data.media) : []
  let tempPromotion = data ? JSON.parse(data.promotion) : []

  let item = {
    promotion: tempPromotion.quantity,
    price: data.price,
    quantity: quantity
  }
  return (
    <Block backgroundColor='#fff' marginTop={10}>
      <Block height={110} row margin={10} justifyContentSB alignItems='center'>
        <Block row>
          <Image
            source={renderImage(tempMedia)}
            style={{ width: 100, height: 100, resizeMode: 'contain' }}
          />
          <Block
            height={100}
            marginLeft={15}
            style={{justifyContent:'center'}}
          >
            <Typography size={17} style={{ maxWidth: 220 }}>
              {data.name}
            </Typography>
            <Typography size={17} style={{ color: LIGHT.danger,marginTop:16 }}>
              {formatPromotion(item, 3)}
            </Typography>
          </Block>
        </Block>
        <Block style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon
            name={'close'}
            onPress={null}
            color={LIGHT.default}
            family={'Ionicons'}
            size={20}
          />
          <Typography size={20} color={LIGHT.default}>
            {quantity}
          </Typography>
        </Block>
      </Block>
      {formatPromotion(item, 1) && (
        <Block
          style={{ minHeight: 30 }}
          //justifyContent={'center'}
          //backgroundColor='red'
          paddingLeft={6}
          paddingRight={20}
          marginHorizontal={0}
        >
          <Typography style={styles.textSale} numberOfLines={1}>
            {formatPromotion(item, 1)}
          </Typography>
        </Block>
      )}
    </Block>
  )
}
BoxProductBasic.defaultProps = {
  item: {}
}

const styles = StyleSheet.create({
  textSale: { textAlign: 'left', color: LIGHT.primary }
})
