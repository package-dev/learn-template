import { useFocusEffect } from '@react-navigation/native'
import { StatusBar, StatusBarStyle, Platform } from 'react-native'
type useStatusBarProps = {
  barStyle: StatusBarStyle
  color?: string
  backgroundColor?: any
  translucent?: any
  network?: any
  hidden?: any
  animated?: boolean
}
export const useStatusBar = ({
  barStyle,
  animated,
  backgroundColor,
  translucent,
  network,
  hidden,
}: useStatusBarProps) => {
  useFocusEffect(() => {
    barStyle && StatusBar.setBarStyle(barStyle, animated)
    hidden && StatusBar.setHidden(hidden)
    backgroundColor && Platform.OS == "android" && StatusBar.setBackgroundColor(backgroundColor)
    translucent && StatusBar.setTranslucent(translucent)
    network && StatusBar.setNetworkActivityIndicatorVisible(network)
  })
}
