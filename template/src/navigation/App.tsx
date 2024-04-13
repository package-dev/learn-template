import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import * as  AppScreen from '../screens/app/index'
import BottomTab from './BottomTab';
import { useStatusBar } from '@utils/statusBar';
const { Screen, Navigator } = createStackNavigator();
export type AppScreenName = keyof typeof AppScreen;
export default function App() {
    useStatusBar({ barStyle: 'dark-content' })
    return (
        <Navigator screenOptions={{ headerShown: false }} initialRouteName='BottomTab'>
            <Screen component={BottomTab} name={'BottomTab'} />
        </Navigator>
    );
}
