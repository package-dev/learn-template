import React from 'react'
import {StyleSheet, Text, View, ViewProps, ViewStyle} from 'react-native'
import {rnColor} from './res/color'
import Ionicons from 'react-native-vector-icons/Ionicons'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Feather from 'react-native-vector-icons/Feather'
import Octicons from 'react-native-vector-icons/Octicons'
import {
  TextStyle,
  TextProps,
  TouchableHighlightProps,
  TouchableNativeFeedbackProps,
  TabBarIOSItemProps,
  ColorValue,
} from 'react-native'
import {
  AntDesignFont,
  FontAwesomeFont,
  FontAwesome5Font,
  IoniconsFont,
  MaterialCommunityIconsFont,
  MaterialIconsFont,
} from './res/font'
import {thisExpression} from '@babel/types'

interface AntDesignProps extends IconProps {
  name: AntDesignFont
  type: 'AntDesign'
}
interface FontAwesomeProps extends IconProps {
  name: FontAwesomeFont
  type: 'FontAwesome'
}
interface FontAwesome5Props extends IconProps {
  name: FontAwesome5Font
  type: 'FontAwesome5'
}
interface IoniconsProps extends IconProps {
  name: IoniconsFont
  type: 'Ionicons'
}
interface MaterialCommunityIconsProps extends IconProps {
  name: MaterialCommunityIconsFont
  type: 'MaterialCommunityIcons'
}
interface MaterialIconsProps extends IconProps {
  name: MaterialIconsFont
  type: 'MaterialIcons'
}
interface IconProps extends ViewStyle {
  name: string
  size?: number | string
  color?: ColorValue | rnColor | string
  // type: string
  onPress?: Function | undefined
  style?: ViewStyle | TextStyle | undefined
  colorReference?: rnColor
  // positionsAbsolute?: boolean
  // top?: number
  // left?: number
  // bottom?: number
  // right?: number
}
/************************** */
export default class IconCoreC extends React.PureComponent<
  // | IconProps
  | AntDesignProps
  | FontAwesomeProps
  | FontAwesome5Props
  | MaterialCommunityIconsProps
  | IoniconsProps
  | MaterialIconsProps,
  {}
> {
  static Type: any = {
    Ionicons: Ionicons,
    AntDesign: AntDesign,
    Entypo: Entypo,
    EvilIcons: EvilIcons,
    MaterialIcons: MaterialIcons,
    MaterialCommunityIcons: MaterialCommunityIcons,
    FontAwesome: FontAwesome,
    FontAwesome5: FontAwesome5,
  }

  render () {
    const styleProps: Array<any> = [
      // this.props.positionsAbsolute && {
      //   positions: 'absolute',
      // },
      // this.props.top && {top: this.props.top},
      // this.props.left && {left: this.props.left,},
      // this.props.right && {right: this.props.right, },
      // this.props.bottom && {bottom: this.props.bottom, },
    ]
    // const {...rest}: any = this.props
    const IconView = IconCoreC.Type[this.props.type]
    return (
      <IconView
        size={this.props.size}
        color={this.props.color ? this.props.color : this.props.colorReference}
        name={this.props.name}
        onPress={this.props.onPress}
        style={[styleProps, this.props.style]}
      />
    )
  }
}
