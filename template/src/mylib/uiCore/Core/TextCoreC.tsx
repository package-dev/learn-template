import React from 'react'
import {TextStyle, ViewStyle, TextProps, ColorValue} from 'react-native'
import {StyleSheet, Text, View} from 'react-native'
import {rnColor} from './res/color'
interface Props extends TextProps, ViewStyle  {
  children?: React.ReactNode
  style?: TextStyle
  colorReference?: rnColor
  backgroundColor?: rnColor | string
  color?: string | rnColor | ColorValue
  UPPER?: boolean
  lower?: boolean
  bold?: boolean | number
  center?: boolean
  italic?: boolean
  underline?: boolean
  size?: number
}
const TextCoreC: React.FC<Props> = props => {
  const styleProps: Array<any> = [
    {
      color: props.color ? props.color : props.colorReference,
      backgroundColor: props.backgroundColor,
      fontSize: props.size,
    },
    props.center && {textAlign: 'center'},
    props.italic && {fontStyle: 'italic'},
    props.bold && {fontWeight: 'bold'},
    props.underline && {textDecorationLine: 'underline'},
  ]
  const Children = () => {
    if (props.UPPER) return `${props.children}`.toUpperCase()
    if (props.lower) return `${props.children}`.toLowerCase()
    return props.children
  }
  return (
    <Text {...props} style={[styleProps, props.style]}>
      {Children()}
    </Text>
  )
}
export default TextCoreC
const styles = StyleSheet.create({
  font: {
    fontWeight: 'bold',
  },
})
