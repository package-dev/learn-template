import React from 'react'
import {
  GestureResponderEvent,
  Insets,
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  TargetedEvent,
  Text,
  View,
  ViewStyle,
} from 'react-native'
import {TouchableOpacity} from 'react-native'
import {rnColor} from '../res/color'
interface Props extends ViewStyle {
  title?: string
  styleBg?: StyleProp<ViewStyle>
  styleTitle?: StyleProp<ViewStyle>
  colorTitle?: string | rnColor
  UPPER?: boolean
  lower?: boolean
  bold?: boolean | number
  center?: boolean
  italic?: boolean
  size?: number
  colorRf?: rnColor
  backgroundColor?: string | rnColor
  backgroundColorRf?: string | rnColor
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
  hitSlop?:  Insets | undefined;
  numberOfLines?: number | undefined;

}
const ButtonBasic: React.FC<Props> = props => {
  const Children = () => {
    if (props.UPPER) return `${props.title}`.toUpperCase()
    if (props.lower) return `${props.title}`.toLowerCase()
    return props.title
  }
  const styleProps: Array<any> = [
    {
      backgroundColor: props.backgroundColor
        ? props.backgroundColor
        : '#2196F3',
    },
    props.size && {fontSize: props.size},
    props.center && {textAlign: 'center'},
    props.bold && {fontWeight: 'bold'},
  ]
  return (
    <TouchableOpacity
      onPress={props.onPress}
      onPressIn={props.onPressIn}
      onPressOut={props.onPressOut}
      delayLongPress={props.delayLongPress}
      delayPressIn={props.delayPressIn}
      delayPressOut={props.delayPressOut}
      activeOpacity={props.activeOpacity}
      hitSlop={props.hitSlop}
      style={[styles.defaultBg, styleProps, props.styleBg, {...props}]}>
      <Text
        style={[
          styles.defaultText,
          {color: props.colorTitle},
          props.styleTitle,
        ]}
        numberOfLines={props.numberOfLines}>
        {Children()}
      </Text>
    </TouchableOpacity>
  )
}
export default ButtonBasic
const styles = StyleSheet.create({
  defaultBg: {
    minWidth: 70,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    borderRadius: 1,
  },
  defaultText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
})
ButtonBasic.defaultProps = {
  title: 'title',
  backgroundColorRf: '#2196F3',
  colorTitle: '#fff',
  //   backgroundColor: '#2196F3',
}
