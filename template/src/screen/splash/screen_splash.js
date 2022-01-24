import React from 'react'
import {StatusBar, StyleSheet, Text, View} from 'react-native'

export default function index () {
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Text style={styles.text}>Loadding...</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
})
