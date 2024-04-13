import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import * as  AppScreen from '../screens/app/index'
import { View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
const { Screen, Navigator } = createBottomTabNavigator();



export type BottomHomeProp = Partial<{
    component: any
    name: string
    title: string
    icon: string
    color: string
}>
const DATA_BOTTOM: BottomHomeProp[] = [
    {
        component: AppScreen.ScreenFacebook,
        name: 'Facebook',
        title: 'Facebook',
        icon: 'logo-facebook',
        color: "#0866ff"
    },
    {
        component: AppScreen.ScreenInstagram,
        name: 'Tiktok',
        title: 'Tiktok',
        icon: 'logo-instagram',
        color: "#e64537"

    },
    {
        component: AppScreen.ScreenYoutube,
        name: 'Youtube',
        title: 'Youtube',
        icon: 'logo-youtube',
        color: "red"
    },

]
export default function BottomTab() {


    return (
        <Navigator
            initialRouteName={'Bottom1'}
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: 'red',
                tabBarInactiveTintColor: 'gray',
                tabBarShowLabel: false,
            }}
        >
            {DATA_BOTTOM.map(({ component, icon, name, color: active }, key) => (
                <Screen
                    key={key}
                    component={component}
                    name={name as any}

                    options={{
                        tabBarItemStyle: {},
                        tabBarIcon: ({ color, size, focused }) =>
                            <View style={{
                                borderColor: focused ? '#32beff' : 'white'
                            }}>
                                <Ionicons name={icon as string} size={23} color={focused ? active : 'gray'} />
                            </View>
                    }}
                />
            ))}
        </Navigator>
    )
}
