import angry from './src/angry.svg'
import icon_play from './src/icon_play.svg'
import icon_quit from './src/icon_quit.svg'
import icon_sound from './src/icon_sound.svg'
import ic_help from './src/ic_help.svg'
import ic_top123 from './src/ic_top123.svg'

const Name = {
  angry, icon_play, icon_quit, icon_sound, ic_help, ic_top123

}
export type T_NameIconApp = keyof typeof Name

/**
 *
 */
import React from 'react'
import { ViewStyle } from 'react-native'
import { TextStyle, } from 'react-native'
interface IconProps extends ViewStyle {
  name: T_NameIconApp
  size?: number | string
  color?: string
  onPress?: Function | undefined
  style?: ViewStyle | TextStyle | undefined
  height?: number
  width?: number
}

/************************** */
export default class IconSvg extends React.PureComponent<IconProps> {
  render() {
    if (!Name[this.props.name]) return <></>
    const IconView = Name[this.props.name || 'angry']

    return (
      <IconView
        width={this.props.size ? this.props.size : 23}
        height={this.props.size ? this.props.size : 23}
        fill={this.props.color ? this.props.color : '#000'}
        onPress={this.props.onPress}
        style={[this.props.style]}
      />
    )
  }
}
