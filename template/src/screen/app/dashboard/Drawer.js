import React from 'react'
import {createDrawerNavigator} from '@react-navigation/drawer'
const {Navigator, Screen} = createDrawerNavigator()

// import BottomHome from './BottomHome'
// import DrawerContent from './DrawerContent'
import {Dimensions, View} from 'react-native'

export default function Drawer () {
  return null
  return (
    <Navigator
      screenOptions={{
        initialRouteName: 'BottomHome',
        drawerStyle: {width: Dimensions.get('window').width * 0.8},
        backBehavior: 'initialRoute',
        headerShown: false,
      }}
      drawerContent={() => <DrawerContent />}>
      <Screen name='BottomHome' component={() => <View />} />
      {/* <Screen name='ScreenAccount' component={ScreenAccount} /> */}
    </Navigator>
  )
}
