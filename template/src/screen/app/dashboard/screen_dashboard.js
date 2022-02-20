import {
  StyleSheet,
  Button,
  View,
  StatusBar,
  Image,
  FlatList,
  Dimensions,
  Linking,
} from 'react-native'
import React, {useEffect, useState} from 'react'
import {navigate} from '@navigation'
import {useNavigation} from '@react-navigation/native'
import {ImageCoreC, ViewCoreC, TouchableCoreC, TextCoreC} from '@mylib'
import {IMAGE} from '@assets/image'
import OpenIntent from 'react-native-open-intent'
import {maybeOpenURL} from '@utils/openLinkApp'

export default function screen_dashboard () {
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <IconApp onPress={() => navigate('screen_chat1')} name={'Messeger'} />
      <IconApp onPress={() => navigate('Loading')} name={'Loading'} />
      <IconApp
        onPress={() =>
          Linking.openURL(
            'https://play.google.com/store/apps/details?id=com.manoj.dlt',
          )
        }
        name={'open play store'}
      />
    </View>
  )
}
const IconApp = ({name, onPress}) => {
  return (
    <TouchableCoreC
      onPress={onPress}
      style={{height: 40, backgroundColor: 'gray', marginVertical: 2}}
      midle>
      <TextCoreC>{name}</TextCoreC>
    </TouchableCoreC>
  )
}
