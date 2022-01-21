import React, {useRef, forwardRef, useImperativeHandle, useState} from 'react'
import {StyleSheet, ScrollView} from 'react-native'
import RBSheet from 'react-native-raw-bottom-sheet'
import {ViewCore, ButtonIcon, screen_height,COLOR} from '../../uiCore'
import {isEmpty} from 'underscore'
const myModule = require('react-native-image-picker');
import * as ImagePicker from 'react-native-image-picker'
import {Alert} from 'react-native'
const RNSheetImage = (
  {height = 170, openDuration = 300, callBackImage},
  ref,
) => {
  const refC = useRef()
  const refInput = useRef()
  const [image, setImage] = useState()
  useImperativeHandle(ref, () => ({
    open: () => {
      refC.current.open()
    },
    close: () => {
      refC.current.close()
    },
    getInput () {
      return refInput.current.getValue()
    },
    getImage () {
      if (isEmpty(image)) return false
      else return image
    },
  }))
  const gotoCamera = async () => {
    ImagePicker.launchCamera(
      {
        title: 'Select QR Code',
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
        mediaType: 'photo',
      },
      response => {
        console.log('Response = ', response)
        if (response.didCancel) {
          console.log('User cancelled image picker') //khong chon anh
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error)
          Alert.alert('Error', response.error)
        } else {
          // process image here
          setImage(response.assets[0])
          callBackImage(response)
        }
      },
    )
  }
  const gotoLibary = () => {
    ImagePicker.launchImageLibrary(
      {
        title: 'Select QR Code',
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
        mediaType: 'photo',
      },
      response => {
        console.log('Response = ', response)
        if (response.didCancel) {
          console.log('User cancelled image picker') //khong chon anh
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error)
          Alert.alert('Error', response.error)
        } else {
          setImage(response.assets[0])
          callBackImage(response)
        }
      },
    )
  }

  return (
    <RBSheet
      ref={refC}
      closeOnDragDown={true}
      closeOnPressMask={false}
      height={height}
      openDuration={openDuration}
      customStyles={{
        container: {
          // justifyContent: 'center',
          // alignItems: 'center',
          borderTopLeftRadius: 5,
          borderTopRightRadius: 45,
          backgroundColor: '#DCDCDC',
        },
      }}>
      <ViewCore alignItems minHeight={screen_height}>
        <ButtonIcon
          icon='camera-outline'
          width='85%'
          title='Đi đến máy ảnh'
          onPress={gotoCamera}
          // marginTop={10}
          paddingHorizontal={40}
          backgroundColor={COLOR.blue_faint}
          style={styles.shadow}
        />
        <ButtonIcon
          icon='images-outline'
          width='85%'
          title='Đi đến Thư viện'
          onPress={gotoLibary}
          marginTop={20}
          paddingHorizontal={40}
          backgroundColor={COLOR.blue_faint}
          marginBottom={10}
          style={styles.shadow}
        />
      </ViewCore>
    </RBSheet>
  )
}
export default forwardRef(RNSheetImage)

const styles = StyleSheet.create({
  shadow: {
    elevation: 5,
    shadowColor: '#000',
  },
})
