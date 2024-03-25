import React from 'react'
import dashboard from './dashboard'
import { createStackNavigator } from '@react-navigation/stack'
const { Screen, Navigator } = createStackNavigator()
export default function Auth() {
  return (
    <Navigator screenOptions={{ headerShown: false }}  >
      {Object.keys(dashboard).map((name, index) => {
        return <Screen key={index} component={dashboard[name]} name={name} />
      })}
    </Navigator>
  )
}
