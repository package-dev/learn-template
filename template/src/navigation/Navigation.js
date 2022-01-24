import React, {useEffect} from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {navigationRef} from './rootNavigation'
import SplashScreen from 'react-native-splash-screen'
import {notificationListener, requestUserPermission} from '@utils/notification'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {ACTION_AUTH} from '@config/redux/action'
/** */
import Auth from '@screen/auth'
import App from '@screen/app'
import Splash from '@screen/splash'
import {useSelector} from 'react-redux'
import {store} from '@config/redux/store'
/** */
export default function Navigation () {
  const {isSigned} = useSelector(state => state.GlobalAuth)
  console.log('isSigned', isSigned)

  useEffect(() => {
    SplashScreen.hide()
    requestUserPermission()
    notificationListener()
    AsyncStorage.getItem('@isSigned').then(e => {
      console.log('@isSigned ds', e)
      let _isSigned = '1'
      if (e && e === '2') _isSigned = '2'
      store.dispatch({
        type: ACTION_AUTH.SET_IS_AUTH,
        payload: {isSigned: _isSigned},
      })
    })
  }, [])
  return (
    <NavigationContainer ref={navigationRef} independent={true}>
      {isSigned === '0' && <Splash />}
      {isSigned === '1' && <Auth />}
      {isSigned === '2' && <App />}
    </NavigationContainer>
  )
}
