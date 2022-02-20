import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  Dimensions,
} from 'react-native'
import React, {useEffect, useRef, useState} from 'react'
import io from 'socket.io-client'
import {InputCoreC, TextCoreC, ViewCoreC} from '@mylib'
export const domain = 'http://192.168.0.102:3000/'
export default function screen_chat2 () {
  const textValue = useRef()
  const [data, setData] = useState(['hello'])
  const socket = io(domain)
  useEffect(() => {
    console.log('useEffect')
    socket.on('connection', e => {
      console.log('**Ket noi thanh cong', e)
    })
    socket.on('chat message', msg => {
      setData(state => [...state, msg])
    })
    return () => {
      socket.off('connection')
      socket.off('chat message')
      // socket.off('message');
    }
  }, [])
  const send = () => {
    let value = textValue.current.getValue()
    console.log(value)
    socket.emit('chat message', value)
    textValue.current.clear()
  }
  return (
    <View style={styles.a}>
      <Text>Chat</Text>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={data}
        renderItem={({item}) => (
          <ViewCoreC paddingLeft={10} width={Dimensions.get('screen').width}>
            <ViewCoreC style={styles.itemChat}>
              <TextCoreC bold style={{color: '#fff'}}>
                {item}
              </TextCoreC>
            </ViewCoreC>
          </ViewCoreC>
        )}
        contentContainerStyle={{flex: 1, width: Dimensions.get('screen').width}}
      />
      <ViewCoreC row style={styles.boxChat}>
        <InputCoreC
          ref={textValue}
          style={styles.input}
          placeholder='Nhập tại đây'
          onSubmitEditing={send}
        />
        <Button title={'Send'} onPress={send} />
      </ViewCoreC>
    </View>
  )
}

const styles = StyleSheet.create({
  a: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#fff'
  },
  input: {
    height: 50,
    width: '80%',
    backgroundColor: 'pink',
    borderRadius: 5,
    padding: 10,
    fontSize: 18,
  },
  boxChat: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    justifyContent: 'space-between',
  },
  itemChat: {
    width: 80,
    height: 40,
    backgroundColor: 'darkturquoise',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
