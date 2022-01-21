import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {Block, BasicButton, Typography} from '@uiCore'
import { LIGHT } from '@uiCore/Theme/colors'
export default function ItemTypeProduct ({
  item,
  onPress,
  backgroundColor,
  ...rest
}) {
  return (
    <BasicButton
      style={[styles.container, {backgroundColor: backgroundColor}]}
      onPress={onPress}>
      <Typography color='#fff'>{item.name}</Typography>
    </BasicButton>
  )
}
ItemTypeProduct.defaultProps = {
  backgroundColor: LIGHT.primary,
}
const styles = StyleSheet.create({
  container: {
    minWidth: 100,
    height: 40,

    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    borderRadius: 5,
    paddingHorizontal: 5,
  },
})
