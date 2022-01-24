import ScreenSplash from './screen_splash'
import {createStackNavigator} from '@react-navigation/stack'
const {Screen, Navigator} = createStackNavigator()
import React from 'react'
export default function Auth () {
  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name={'ScreenSplash'} component={ScreenSplash} />
    </Navigator>
  )
}
