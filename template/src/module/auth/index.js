import login from './login'
import register from './register'
import forgot from './forgot'
import {createStackNavigator} from '@react-navigation/stack'
const {Screen, Navigator} = createStackNavigator()
import React from 'react'
export default function Auth () {
  return (
    <Navigator screenOptions={{headerShown: false}}>
      {Object.keys(login).map(name => {
        return <Screen key={name} component={login[name]} name={name} />
      })}
      {Object.keys(register).map((name, index) => {
        return <Screen key={index} component={register[name]} name={name} />
      })}
      {Object.keys(forgot).map((name, index) => {
        return <Screen key={index} component={forgot[name]} name={name} />
      })}
    </Navigator>
  )
}
///module.react = [ work this
