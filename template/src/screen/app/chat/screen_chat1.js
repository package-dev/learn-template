import {StyleSheet, Text, View, Image} from 'react-native'
import React, {useEffect} from 'react'
import {IMAGE} from '@assets/image'
import {navigate, replace} from '@navigation'

export default function screen_chat1 () {
  useEffect(() => {
    let clear = setTimeout(() => {
      replace('screen_chat2')
    }, 100)
    return () => {
      clearTimeout(clear)
    }
  }, [])
  return (
    <View style={styles.constainer}>
      <Image
        style={{width: 60, height: 60, resizeMode: 'contain', marginBottom: 40}}
        source={IMAGE.messeger}
      />
      <View style={{alignItems: 'center', position: 'absolute', bottom: 20}}>
        <Text
          style={{position: 'absolute', color: '#AFADAD', fontWeight: '300'}}>
          from
        </Text>
        <Image
          style={{width: 60, height: 60, resizeMode: 'contain'}}
          source={IMAGE.meta_logo}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
})
