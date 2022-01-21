import React from 'react'
import {
  StatusBar,
  SafeAreaView,
  StyleProp,
  ViewStyle,
} from 'react-native'
// import SafeAreaView from 'react-native-safe-area-view'
interface Props extends ViewStyle{
  children?: React.ReactNode
  style?: StyleProp<ViewStyle>
}
const Layout: React.FC<Props> = ({children, style, ...rest}) => {
  // console.log(StatusBar.currentHeight)
  return (
    <SafeAreaView
      style={[{flex: 1, backgroundColor: '#fff'}, style, {...rest}]}>
      {children}
    </SafeAreaView>
  )
}
export default Layout
