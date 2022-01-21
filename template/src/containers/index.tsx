import Home from '@/containers/home';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Tab = createBottomTabNavigator();

const RootScreen = () => {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={{
        tabBarActiveTintColor: '#333',
        headerShown: false
      }}
    >
      <Tab.Screen
        name="Feed"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: () => <View/>
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Home}
        options={{
          tabBarLabel: 'Updates',
          tabBarBadge: 3,
          tabBarIcon: () => <View/>
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Home}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: () => <View/>
        }}
      />
    </Tab.Navigator>
  );
};

export default RootScreen;

const styles = StyleSheet.create({});
