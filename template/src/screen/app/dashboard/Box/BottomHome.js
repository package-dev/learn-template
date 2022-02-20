import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {IconCoreC} from '@mylib'
const Tab = createBottomTabNavigator()
import screen_dashboard from '../screen_dashboard'
import screen_dashboard2 from '../screen_dashboard2'
const COLOR = {
  icon_open: '#525151',
  icon_close: 'gray',
}
export default function BottomHome () {
  return (
    <Tab.Navigator
      initialRouteName='screen_dashboard'
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused}) => {
          if (focused)
            return (
              <IconCoreC
                name={route.params.icon}
                size={25}
                color={focused ? COLOR.icon_open : COLOR.icon_close}
              />
            )
          return (
            <IconCoreC
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
      <Tab.Screen
        name='Home'
        component={screen_dashboard}
        initialParams={{icon: 'home-outline', name: 'Home'}}
        // options={{
        //   tabBarLabel: 'Nhật ký',
        //   tabBarIcon: ({color, size}) => (
        //     <IconCoreC
        //       type='Octicons'
        //       name='calendar'
        //       color={color}
        //       size={25}
        //     />
        //   ),
        // }}
      />
      <Tab.Screen
        name='Facebook'
        component={screen_dashboard2}
        initialParams={{icon: 'logo-facebook', name: 'Facebook'}}
        // options={{
        //   tabBarLabel: 'Báo cáo',
        //   tabBarIcon: ({color, size}) => (
        //     <IconCoreC
        //       type='FontAwesome5'
        //       name='receipt'
        //       color={color}
        //       size={25}
        //     />
        //   ),
        // }}
      />
    </Tab.Navigator>
  )
}
