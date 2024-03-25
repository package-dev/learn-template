import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
const Tab = createBottomTabNavigator()
import Ionicons from 'react-native-vector-icons/Ionicons'
const COLOR = {
  icon_open: '#525151',
  icon_close: 'gray',
}
export default function BottomHome() {
  return (
    <Tab.Navigator
      initialRouteName='screen_dashboard'
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => {
          if (focused)
            return (
              <Ionicons
                name={route.params.icon}
                size={25}
                color={focused ? COLOR.icon_open : COLOR.icon_close}
              />
            )
          return (
            <Ionicons
              name={route.params.icon}
              size={25}
              color={focused ? COLOR.icon_open : COLOR.icon_close}
            />
          )
        },
        tabBarActiveTintColor: COLOR.icon_open,
        tabBarInactiveTintColor: COLOR.icon_close,
        keyboardHidesTabBar: true,
        tabBarStyle: {
          padding: 5,
          backgroundColor: 'white',
          elevation: 0, // remove shadow on Android
          shadowOpacity: 0, // remove shadow on iOS
        },
        tabBarLabelStyle: {
          // fontFamily: 'Roboto-Medium',
          fontSize: 12,
        },
        tabBarBadgeStyle: {},
      })}>

    </Tab.Navigator>
  )
}
