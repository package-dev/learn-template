import {StyleSheet, Text, View, Button} from 'react-native'
import React from 'react'
import {navigate} from '@navigation'

export default function screen_dashboard () {
  return (
    <View>
      <Text></Text>
      <Button title='sa' onPress={() => navigate('insta_home')} />
    </View>
  )
}

const styles = StyleSheet.create({})
