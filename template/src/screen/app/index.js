import React from 'react'
import dashboard from './dashboard'
import instagram from './instagram'
import chat from './chat'
import {createStackNavigator} from '@react-navigation/stack'
const {Screen, Navigator} = createStackNavigator()
import linking from './linking'
export default function Auth () {
  return (
    <Navigator screenOptions={{headerShown: false}} linking={linking}>
      {Object.keys(dashboard).map((name, index) => {
        return <Screen key={index} component={dashboard[name]} name={name} />
      })}
      {Object.keys(instagram).map(name => {
        return <Screen key={name} component={instagram[name]} name={name} />
      })}
      {Object.keys(chat).map(name => {
        return <Screen key={name} component={chat[name]} name={name} />
      })}
    </Navigator>
  )
}
