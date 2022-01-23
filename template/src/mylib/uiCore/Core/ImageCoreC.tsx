import React from 'react'
import {
  ImageProps,
  ImageStyle,
  ImageSourcePropType,
  ImageResizeMode,
  StyleProp,
} from 'react-native'
import {Image} from 'react-native'
import {URL_NOIMAGE} from './res/uriNoImage'
interface Props {
  source?: ImageSourcePropType | any
  width?: string | number | undefined
  height?: string | number
  resizeMode?: ImageResizeMode | undefined
  style?: StyleProp<ImageStyle>
}
const ImageCoreC: React.FC<Props | ImageProps> = props => {
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
              uri: URL_NOIMAGE,
            }
      }
      style={[styleProps, {...props}, props.style]}
      resizeMode={props.resizeMode}
    />
  )
}

export default ImageCoreC
