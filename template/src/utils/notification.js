import messaging from '@react-native-firebase/messaging'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {store} from 'src/redux/store'
import {ACTION_NOTIFY} from 'src/redux/action'
// import {DropDownHolder} from '@utils'

export async function requestUserPermission () {
  const authStatus = await messaging().requestPermission()
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL

  if (enabled) {
    console.log('Authorization status:', authStatus)
    getFcmToken()
  }
}
/**
 * getFcmToken: getToken
 */
const getFcmToken = async () => {
  let _fcmToken = await AsyncStorage.getItem('fcmToken')
  console.log(_fcmToken, 'the old token')
  if (!_fcmToken) {
    try {
      const fcmToken = await messaging().getToken()
      if (fcmToken) {
        console.log('the new genrated token', fcmToken)
        await AsyncStorage.setItem('fcmToken', fcmToken)
        await setTokenNotify(fcmToken)
      }
    } catch (error) {
      console.log(error, 'error')
    }
  } else {
    setTokenNotify(_fcmToken)
  }
}
/**
 *
 * @param {String} token
 * Add notify
 */
const setTokenNotify = token => {
  //   store.dispatch({type: ACTION_NOTIFY.SET_TOKEN, payload: {token: token}})
}
/**
 * onListener Notify
 */
export const notificationListener = async () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log('Nofionbackground', remoteMessage.notification)
  })
  messaging().onMessage(async remoteMessage => {
    console.log('recived in fo', remoteMessage)
    // DropDownHolder.alert(
    //   'info',
    //   remoteMessage.notification.title,
    //   remoteMessage.notification.body,
    // )
    // store.dispatch({type: ACTION_NOTIFY.SET_ADD_NOTI})
  })
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log('Notifi2', remoteMessage.notification)
      }
    })
}
