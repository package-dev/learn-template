import {ImageCore, ViewCore} from './index'
import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {isEmpty} from 'underscore'
const SIZEA = {
  d1: 80,
}
export default function Avatart ({
  source,
  size = 80,
  gender = 0,
  style,
  ...rest
}) {
  const avatar = {
    width: size,
    height: size,
    borderRadius: size / 2,
    overflow: 'hidden',
  }
  return (
    <ViewCore style={[avatar, style]} {...rest} midle>
      <ImageCore style={avatar} source={source} />
    </ViewCore>
  )
}

const styles = StyleSheet.create({
  avatar: {
    width: SIZEA.d1,
    height: SIZEA.d1,
    borderRadius: SIZEA.d1 / 2,
    overflow: 'hidden',
  },
  s: {
    overflow: 'hidden',
  },
})
