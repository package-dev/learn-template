import {ImageCoreC, ViewCoreC} from '../index'
import React from 'react'
import {
  ImageSourcePropType,
  ImageStyle,
  StyleSheet,
  Image,
  ViewStyle,
  StyleProp,
} from 'react-native'
interface Props extends ViewStyle {
  source?: ImageSourcePropType
  radius?: number
  style?: StyleProp<ImageStyle>
  styleImage?: StyleProp<ImageStyle>
}
const R=100
const AvatarCoreC: React.FC<Props> = ({
  source,
  radius,
  style,
  styleImage,
  ...rest
}) => {
  // if (!source || source === null || source === undefined) return null
  return (
    <ViewCoreC backgroundColor='#fff' style={[{}, style, {...rest}]}>
      <Image
        source={source ? source : require('./noimage.jpg')}
        style={[
          {
            width: radius ? radius * 2 : R,
            height: radius ? radius * 2 : R,
            borderRadius: radius ? radius : R,
            overflow: 'hidden',
          },
          styleImage,
        ]}
        resizeMode={'stretch'}
      />
    </ViewCoreC>
  )
}
export default AvatarCoreC
AvatarCoreC.defaultProps = {
  // radius: 100,
}
