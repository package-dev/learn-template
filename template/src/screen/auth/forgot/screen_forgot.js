import {StyleSheet, Text, View} from 'react-native'
import React from 'react'
import {ButtonAnimated} from '@mylib'
export default function screen_forgot () {
  return (
    <View>
      <Text>screen_forgot</Text>
      <ButtonAnimated onPress={() => console.log(123)} />
    </View>
  )
}

const styles = StyleSheet.create({})
