import React from 'react'
import {
  TextStyle,
  ViewStyle,
  TextProps,
  ColorValue,
  ImageProps,
  ImageStyle,
  ImageSourcePropType,
  ImageResizeMode,
  StyleProp,
} from 'react-native'
import {StyleSheet, Text, View, Image} from 'react-native'
import {rnColor} from './res/color'
interface Props {
  source?: ImageSourcePropType|any
  width?: string | number | undefined
  height?: string | number
  resizeMode?: ImageResizeMode | undefined
  style?:  StyleProp<ImageStyle>
}
const ImageCoreC: React.FC<Props|ImageProps> = props => {
  const styleProps: Array<any> = [
    {
      width: props.width ? props.width : 100,
      height: props.height ? props.height : 100,
    },
  ]
  return (
    <Image
      source={
        props.source
          ? props.source
          : {
              uri: defaultLink,
            }
      }
      style={[styleProps, {...props}, props.style]}
      resizeMode={props.resizeMode}
    />
  )
}

export default ImageCoreC
const defaultLink =
  'https://vcdn-dulich.vnecdn.net/2020/09/04/1-Meo-chup-anh-dep-khi-di-bien-9310-1599219010.jpg'
