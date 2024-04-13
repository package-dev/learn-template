import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { navigationRef } from './rootNavigation'
import SplashScreen from 'react-native-splash-screen'
import App from './App'
import Auth from './Auth'
import { useStoreApp } from '@stores'
import { __APP__ } from '@api/stateApp'
export default function Navigation() {
  useEffect(() => {
    SplashScreen.hide()
  }, [])
  const state = useStoreApp(state => state.appstate.state)
  logRed('state', JSON.stringify(state))
  return (
    <NavigationContainer
      ref={navigationRef}
      independent={true}
    // linking={linking}
    >
      {state == "app" && <App />}
      {state == "auth" && <Auth />}
    </NavigationContainer>
  )
}
