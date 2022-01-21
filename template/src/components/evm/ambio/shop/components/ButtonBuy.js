import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Block, Typography, Icon, ButtonSimple, BasicButton } from '@uiCore'
import { LIGHT } from '@uiCore/Theme/colors'
export default function ButtonBuy ({
  titleLeft,
  titleRight,
  onPressLeft,
  onPressRight
}) {
  return (
    <Block
      justifyContentSB
      row
      height={50}
      style={{ paddingHorizontal: 20, alignItems: 'center' }}
    >
      <BasicButton
        style={{ alignItems: 'center', flexDirection: 'row' }}
        onPress={onPressLeft}
      >
        <Icon
          family={'MaterialCommunityIcons'}
          name='phone'
          size={30}
          color={LIGHT.primary}
        />
        <Typography color={LIGHT.primary} size={18} style={{ marginLeft: 10 }}>
          {titleLeft}
        </Typography>
      </BasicButton>
      <ButtonSimple
        onPress={onPressRight}
        title={titleRight}
        size={20}
        width={220}
        colorTitle='#fff'
        styleTitle={{ fontWeight: 'bold' }}
      />
    </Block>
  )
}
ButtonBuy.defaultProps = {
  titleLeft: 'Hỗ trợ',
  titleRight: 'Mua ngay',
  onPressLeft: null,
  onPressRight: null
}
const styles = StyleSheet.create({})
