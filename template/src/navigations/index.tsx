import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';


import { navigationRef } from './Navigator';
import { NavigatorParamList } from '@/models/navigation';
import { ScreenName } from './model';
import Home from '@/containers/home';
import Signin from '@/containers/signin';
import { View } from 'react-native';
import RootScreen from '@/containers';

const Stack = createNativeStackNavigator<NavigatorParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name={ScreenName.Root} component={RootScreen} />
        <Stack.Screen name={ScreenName.Signin} component={Signin} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
