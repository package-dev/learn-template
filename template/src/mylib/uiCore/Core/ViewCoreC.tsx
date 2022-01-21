import React from 'react'
import {
  TextStyle,
  ViewStyle,
  TextProps,
  TouchableHighlightProps,
  TouchableNativeFeedbackProps,
  TabBarIOSItemProps,
  ColorValue,
  StyleProp
} from 'react-native';
import {StyleSheet, Text, View,} from 'react-native'
import {rnColor} from './res/color'
interface PropsViewCore extends ViewStyle {
  children?: React.ReactNode
  width?: number | string
  height?: number | string
  square?: number
  midle?: boolean
  row?: boolean
  style?: StyleProp<ViewStyle>
  flex1?: boolean
  centerHorizontal?: boolean
  backgroundColorReference?: rnColor
  backgroundColor?: rnColor | string
  flex?: number
}
const ViewCoreC: React.FC<PropsViewCore> = props => {
  const styleProps: Array<any> = [
    props.midle && {alignItems: 'center', justifyContent: 'center'},
    props.flex1 && {flex: 1},
    props.row && {flexDirection: 'row'},
    props.square && {width: props.square, height: props.square},
    props.midle && {alignItems: 'center', justifyContent: 'center'},
    props.centerHorizontal && {
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    {
      backgroundColor: props.backgroundColor
        ? props.backgroundColor
        : props.backgroundColorReference,
    },
  ]
  return (
    <View style={[styleProps, {...props}, props.style]}>{props.children}</View>
  )
}

export default ViewCoreC
/***
 * 
 * 
 * 
 * PropsWithChildren<Props>
 * PropsWithChildren<Props>)
 */