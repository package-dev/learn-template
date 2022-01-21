import React, {useEffect, useState} from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {navigationRef, isReadyRef} from './rootNavigation'
import SplashScreen from 'react-native-splash-screen'
// import {useSelector} from 'react-redux'
import Auth from '@module/auth'
import App from '@module/app'
// import {log} from '@utils'
export default function Navigation () {
  //   const {isSigned} = useSelector(state => state.GlobalAuth)
  //   log('isSigned', isSigned)
  const [isSigned, setIsSigned] = useState(false)
  useEffect(() => {
    SplashScreen.hide()
  }, [])
  return (
    <NavigationContainer ref={navigationRef} independent={true}>
      {isSigned ? (
        <App  />
      ) : (
        <Auth  />
      )}
      {/* <Auth/>
      <App /> */}
    </NavigationContainer>
  )
}
