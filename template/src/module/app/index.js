import dashboard from './dashboard'
import {createStackNavigator} from '@react-navigation/stack'
const {Screen, Navigator} = createStackNavigator()
import React from 'react'
export default function Auth () {
  return (
    <Navigator screenOptions={{headerShown: false}}>
      {Object.keys(dashboard).map((name,index) => {
        return <Screen key={index} component={dashboard[name]} name={name} />
      })}
      {/* {Object.keys(register).map(name => {
        return <Screen key={name} component={register[name]} name={name} />
      })} */}
     
    </Navigator>
  )
}
