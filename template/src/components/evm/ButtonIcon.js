import React from 'react'
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import {IconCore} from './index'
export default function ButtonIcon ({
  title,
  width,
  height,
  onPress,
  backgroundColor,
  styleTitle,
  style,
  alignItems,
  icon = 'home',
  sizeIcon = 25,
  colorIcon = '#fff',
  ...rest
}) {
  const styleAdd = [alignItems && {alignItems: 'center'}]
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          width: width,
          height: height,
          backgroundColor: backgroundColor,
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
          ...rest,
        },
        style,
        styleAdd,
      ]}
      onPress={onPress}>
      <Text style={[styleTitle, styles.title]}>{title}</Text>
      <IconCore  name={icon} size={sizeIcon} color={colorIcon} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 18,
  },
})
ButtonIcon.defaultProps = {
  width: 100,
  height: 50,
  title: '',
  backgroundColor: '#11ca71',
  onPress: null,
  styleTitle: {},
}
