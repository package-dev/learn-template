import {
  StyleSheet,
  Button,
  View,
  StatusBar,
  Image,
  FlatList,
  Text,
  Linking,
  TouchableOpacity
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { navigate } from '@navigation'

export default function screen_dashboard() {
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
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
const IconApp = ({ name, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ height: 40, backgroundColor: 'gray', marginVertical: 2, alignItems: 'center', justifyContent: 'center' }}
    >
      <Text>{name}</Text>
    </TouchableOpacity>
  )
}
