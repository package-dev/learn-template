import {Linking, Button, View, StatusBar} from 'react-native'
import React from 'react'
import OpenApplication from 'react-native-open-application'
// com.android.providers.telephony
export default function screen_dashboard () {
  const openApp = () => {
    // OpenApplication.openApplication('com.android.providers.telephony')
    Linking.openURL(
      'https://play.google.com/store/apps/details?id=com.manoj.dlt',
    )
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        padding: 20,
      }}>
      <StatusBar backgroundColor='#fff' barStyle='dark-content' />
      <Button title='open' onPress={openApp} />
    </View>
  )
}
