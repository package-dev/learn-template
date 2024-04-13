import { SRC_COMMON } from './src_require'
export type ImageName = keyof typeof SRC_COMMON
import React from 'react'
import { Image, StyleSheet, TouchableOpacity, ViewStyle, TouchableWithoutFeedbackProps } from 'react-native'
import { TextStyle, ImageProps } from 'react-native'
interface IconProps extends TouchableWithoutFeedbackProps {
  name: ImageName
  size?: number | string
  color?: string
  style?: ImageProps['style']
  containerStyle?: ViewStyle
  height?: number
  width?: number
  margin?: number
  margin5?: boolean
}
/************************** */
export default class IconImg extends React.PureComponent<IconProps> {
  render() {

    if (!SRC_COMMON[this.props.name]) return <></>
    const source = SRC_COMMON[this.props.name]
    if (!source) return null
    if (typeof this.props.onPress == 'function') {
      return (
        <TouchableOpacity
          onPress={this.props.onPress}
          style={[
            { margin: this.props.margin5 ? 5 : undefined },
            { ...this.props.margin && { margin: this.props.margin } },

            styles.shadow,
            this.props.containerStyle,
          ]}>
          <Image
            source={source}
            style={[{
              width: this.props.size,
              height: this.props.size,
              resizeMode: 'contain'
            },
            this.props.style
            ]}
          />
        </TouchableOpacity >
      )
    }
    return (
      <Image
        source={source}
        style={[{
          width: this.props.size,
          height: this.props.size,
          resizeMode: 'contain'
        },
        this.props.style
        ]}
      />
    )
  }
}
const styles = StyleSheet.create({
  shadow: {
    elevation: 5,
    shadowOffset: {
      width: 3,
      height: 5,
    },
    shadowOpacity: 0.5,
  },
})