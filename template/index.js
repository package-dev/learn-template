/**
 * @format
 */

import { AppRegistry, Text } from 'react-native'
import App from './src/App'
// import App from './src/Demo3'
import { name as appName } from './app.json'
import 'react-native-gesture-handler'
import { LogBox } from 'react-native'
LogBox.ignoreLogs(['Reanimated 2'])
LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
])
LogBox.ignoreLogs(['new NativeEventEmitter'])
LogBox.ignoreLogs(['Require cycle:'])
LogBox.ignoreAllLogs()
console.disableYellowBox = true

//
// import messaging from '@react-native-firebase/messaging'
// messaging().setBackgroundMessageHandler(async remoteMessage => {
//   console.log('Message handled in the background!', remoteMessage)
// })
//
Text.defaultProps = Text.defaultProps || {}
Text.defaultProps.allowFontScaling = false
// console.log = () => null
AppRegistry.registerComponent(appName, () => App)
import './globals.config';