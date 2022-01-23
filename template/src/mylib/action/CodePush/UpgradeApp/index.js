import React from 'react'
import {has, isObject} from 'underscore'
import BarProgress from './BarProgress'
import {useUpgradeApp, useCheckingUpgradeApp} from './upgarde'
import RenderHook from './RenderHook'
import {Modal, PixelRatio, Text, View} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

const UpgradeApp = () => {
  const render = data => {
    return (
      <Modal visible={true} transparent>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#6361619C',
          }}>
          <LinearGradient
            colors={['#24E9A2', '#1EDCB5', '#15CBC9']}
            start={{x: 1, y: 0}}
            end={{x: 0, y: 0}}
            style={{width: '90%', height: 100, borderRadius: 10, padding: 10}}>
            <Text
              style={{
                textAlign: 'center',
                color: '#fff',
                fontSize: 18,
                fontWeight: 'bold',
              }}>
              Đồng bộ dữ liệu
            </Text>
            <Content />
          </LinearGradient>
        </View>
      </Modal>
    )
  }

  return (
    <RenderHook
      api={useCheckingUpgradeApp}
      render={render}
      condition={data => data}
    />
  )
}

export default UpgradeApp

/*** */
const Content = () => {
  const upgradeContent = ({rawProgress, syncMessage, progress}) => {
    const caculateProgress = rawProgress => {
      if (has(rawProgress, 'receivedBytes') && has(rawProgress, 'totalBytes')) {
        return parseInt(
          rawProgress['receivedBytes'] / rawProgress['totalBytes'],
        )
      }
      return 0.4
    }
    const createMessage = progress => {
      if (has(rawProgress, 'receivedBytes') && has(rawProgress, 'totalBytes')) {
        return `${progress['receivedBytes']} của ${progress['totalBytes']}`
      }
    }
    return (
      <View>
        <View
          style={{flexDirection: 'row'}}
          // row paddingVertical borderBottom={false}
        >
          <Text
            style={{
              color: '#fff',
              fontSize: 15,
              marginVertical: 10,
              marginLeft: 10,
            }}>
            {'Đang tải...'}
          </Text>
          <Text style={{color: '#fff'}}> {createMessage(progress)}</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <BarProgress
            color={'white'}
            height={3}
            width={widthPercentageToDP(80)}
            progress={caculateProgress(rawProgress)}
          />
        </View>
      </View>
    )
  }

  return (
    <RenderHook api={useUpgradeApp} params={[true]} render={upgradeContent} />
  )
}
/**
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */

export const heightPercentageToDP = heightPercent => {
  // Parse string percentage input and convert it to number.
  const elemHeight =
    typeof heightPercent === 'number'
      ? heightPercent
      : parseFloat(heightPercent)

  // Use PixelRatio.roundToNearestPixel method in order to round the layout
  // size (dp) to the nearest one that correspons to an integer number of pixels.
  return PixelRatio.roundToNearestPixel((screenHeight * elemHeight) / 100)
}
import {Dimensions} from 'react-native'

export let screenWidth = Dimensions.get('window').width
export let screenHeight = Dimensions.get('window').height
export const widthPercentageToDP = widthPercent => {
  // Parse string percentage input and convert it to number.
  const elemWidth =
    typeof widthPercent === 'number' ? widthPercent : parseFloat(widthPercent)

  // Use PixelRatio.roundToNearestPixel method in order to round the layout
  // size (dp) to the nearest one that correspons to an integer number of pixels.
  return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100)
}
