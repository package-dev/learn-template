import login from './login'
import { createStackNavigator } from '@react-navigation/stack'
const { Screen, Navigator } = createStackNavigator()
import React from 'react'
export default function Auth() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      {Object.keys(login).map(name => {
        return <Screen key={name} component={login[name]} name={name} />
      })}
    </Navigator>
  )
}
///module.react = [ work this
