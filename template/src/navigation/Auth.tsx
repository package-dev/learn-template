import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import * as  AuthScreen from '../screens/auth/index'
const { Screen, Navigator } = createStackNavigator();
export type AuthScreenName = keyof typeof AuthScreen;
export default function Auth() {
    return (
        <Navigator screenOptions={{ headerShown: false }} initialRouteName='ScreenLogin'>
            {Object.entries(AuthScreen).map(([name, component]) => (
                <Screen key={name} component={component} name={name} />
            ))}
        </Navigator>
    );
}
