import {StyleSheet, Text, View} from 'react-native'
import React, {useRef} from 'react'
import Load from './Load'
import {Button} from 'react-native-elements'

export default function Loading () {
  const refLoad = useRef()
  const l = useRef(0)
  return (
    <View style={{flex: 1}}>
      <Text></Text>
      <Button
        title='Add'
        onPress={() => {
          l.current = l.current + 0.1
          refLoad.current.setValue(l.current)
        }}
      />
      <Button
        title='Sub'
        onPress={() => {
          l.current = l.current - 0.1
          refLoad.current.setValue(l.current)
        }}
      />
      <Load
        ref={refLoad}
        styleContain={{borderWidth: 0, backgroundColor: '#fff'}}
        styleBox={{height: 30}}
      />
    </View>
  )
}

const styles = StyleSheet.create({})
