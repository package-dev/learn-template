import {
  StyleSheet,
  Button,
  View,
  StatusBar,
  Image,
  FlatList,
  Dimensions,
} from 'react-native'
import React, {useEffect, useState} from 'react'
import {navigate} from '@navigation'
import {useNavigation} from '@react-navigation/native'
import {ImageCoreC, ViewCoreC, TouchableCoreC, TextCoreC} from '@mylib'
import {IMAGE} from '@assets/image'
import OpenIntent from 'react-native-open-intent'
import {maybeOpenURL} from '@utils/openLinkApp'
//com.android.providers.telephony
export default function screen_dashboard () {
  // const [apps, setApps] = useState([])
  // useEffect(() => {
  //   hello()
  // }, [])
  // const hello = async () => {
  //   let apps = await OpenIntent.getApps()
  //   // console.log('apps: ', apps)
  //   await setApps(apps)
  // }
  // const paymentHandler = async (UpiUrl = 'com.phonepe.app') => {
  //   console.log(UpiUrl)
  //   let response = null
  //   try {
  //     response = parseResponse(await OpenIntent.openLink(UpiUrl))
  //   } catch (err) {
  //     response = parseResponse(null)
  //   }
  // }
  // const openApp = com => {
  //   maybeOpenURL(com)
  // }
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <StatusBar backgroundColor='#fff' barStyle='dark-content' />
      <FlatList
        data={data}
        keyExtractor={(i, j) => `${j}`}
        renderItem={({item}) => (
          <IconApp
            onPress={() => navigate(item.navigation)}
            item={item}
            widthI={(Dimensions.get('window').width - 20) / 4 - 20}
          />
        )}
        numColumns={4}
        contentContainerStyle={{paddingHorizontal: 10}}
      />
    </View>
  )
}

const IconApp = ({item, onPress, widthI}) => {
  return (
    <TouchableCoreC
      onPress={() => navigate(item.navigation)}
      style={{margin: 10, width: widthI}}
      midle>
      <Image source={IMAGE[item.image]} style={{width: 50, height: 50}} />
      <TextCoreC>{item.name}</TextCoreC>
    </TouchableCoreC>
  )
}
const IconAppItent = ({item, onPress, widthI}) => {
  return (
    <TouchableCoreC
      onPress={onPress}
      style={{
        margin: 10,
        backgroundColor: '#fff',
        width: widthI,
        minHeight: 80,
        justifyContent: 'space-between',
      }}
      midle>
      <Image
        source={{uri: 'data:image/jpg;base64,' + item.icon}}
        style={{width: 50, height: 50}}
      />
      <TextCoreC style={{textAlign: 'center', flex: 1}} numberOfLines={2}>
        {item.appName}
      </TextCoreC>
    </TouchableCoreC>
  )
}
const data = [
  {
    name: 'Instagram',
    navigation: 'insta_home',
    image: 'instagram_logo',
  },
  {
    name: 'Voice',
    navigation: 'insta_home',
    image: 'microphone',
  },
  {
    name: 'Messeger',
    navigation: 'screen_chat1',
    image: 'messeger',
  },
]
export const parseResponse = response => {
  let responseData = null
  if (response) {
    let array = response.split('&')
    if (array && array.length > 0) {
      responseData = {}
      array.forEach(item => {
        let element = item.split('=')
        if (element[0] === 'Status') {
          responseData['status'] =
            element[1] === 'Failed' || element[1] === 'FAILURE'
              ? 'FAILURE'
              : element[1]
        } else {
          responseData[element[0]] = element[1]
        }
      })
    }
  } else {
    responseData = {
      status: 'FAILURE',
      message: 'No action taken',
    }
  }
  return responseData
}
