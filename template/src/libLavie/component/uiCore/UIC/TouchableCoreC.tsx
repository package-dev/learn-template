import React from 'react'
import {
  GestureResponderEvent,
  Insets,
  NativeSyntheticEvent,
  StyleSheet,
  TargetedEvent,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'
import {rnColor} from './res/color'
interface PropsViewCore extends ViewStyle {
  children?: React.ReactNode
  width?: number | string
  height?: number | string
  square?: number
  midle?: boolean
  row?: boolean
  style?: ViewStyle
  flex1?: boolean
  centerHorizontal?: boolean
  backgroundColorReference?: rnColor
  backgroundColor?: rnColor | string
  flex?: number
  activeOpacity?: number
  onBlur?: ((e: NativeSyntheticEvent<TargetedEvent>) => void) | undefined
  onFocus?: ((e: NativeSyntheticEvent<TargetedEvent>) => void) | undefined
  onPress?: ((event: GestureResponderEvent) => void) | undefined
  onPressIn?: ((event: GestureResponderEvent) => void) | undefined
  onPressOut?: ((event: GestureResponderEvent) => void) | undefined
  onLongPress?: ((event: GestureResponderEvent) => void) | undefined
  delayLongPress?: number | undefined
  delayPressIn?: number | undefined
  delayPressOut?: number | undefined
  /** hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}*/
  hitSlop?: Insets | undefined
  numberOfLines?: number | undefined
}
const TouchableCoreC: React.FC<PropsViewCore> = props => {
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
    <TouchableOpacity
      onPress={props.onPress}
      onPressIn={props.onPressIn}
      onPressOut={props.onPressOut}
      delayLongPress={props.delayLongPress}
      delayPressIn={props.delayPressIn}
      delayPressOut={props.delayPressOut}
      hitSlop={props.hitSlop}
      activeOpacity={props.activeOpacity}
      style={[styleProps, {...props}, props.style]}>
      {props.children}
    </TouchableOpacity>
  )
}

export default TouchableCoreC
