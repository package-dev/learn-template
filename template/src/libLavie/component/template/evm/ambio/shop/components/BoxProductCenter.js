import React from 'react'
import { Image, Dimensions } from 'react-native'
import { Block, Typography, Icon, BasicButton } from '@uiCore'
import { OptionQuantityAdd } from '../components'
import { LIGHT } from '@uiCore/Theme/colors'
export default function BoxProductCenter ({
  onAdd,
  onSub,
  onClose,
  img,
  name,
  quantity,
  price,
  priceSale
}) {
  return (
    <Block
      style={{ minHeight: 120, backgroundColor: '#fff' }}
      row
      margin={10}
      // justifyContentSB
      alignItems='center'
    >
      <Image
        source={img}
        style={{ width: 130, height: 130, resizeMode: 'contain', flex: 3 }}
      />
      <Block
        style={{
          justifyContent: 'space-between',
          paddingVertical: 10,
          paddingLeft: 15,
          flex: 5
        }}
      >
        <Typography style={{ maxWidth: 240 }} numberOfLines={2}>
          {name}
        </Typography>
        <Typography
          style={{
            marginTop: 5,
            textDecorationLine: 'line-through',
            color: '#FF880B'
          }}
        >
          {price}
        </Typography>
        <Typography style={{ color: LIGHT.danger }}>{priceSale}</Typography>
        <OptionQuantityAdd
          bacgroundValue='#F4F6FB'
          colorValue='#F70202'
          value={quantity}
          onPressLeft={onAdd}
          onPressRight={onSub}
          style={{ marginTop: 15 }}
        />
      </Block>
      <BasicButton style={{ minWidth: 30 }} onPress={onClose}>
        <Icon name={'close'} color={LIGHT.danger} family={'Ionicons'} size={34} />
      </BasicButton>
    </Block>
  )
}
BoxProductCenter.defaultProps = {
  item: {},
  onAdd: null,
  onSub: null,
  onClose: null
}
