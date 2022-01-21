import React from 'react'
const height_ = 50
import {IconCore, FSIZE, TextCore, ViewCore,COLOR, ICON} from './index'
import {StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native'

const sizeIcon = 25
const sizeIcon2 = 25
const dBadge = 20
const sizeTextBagde = 10
export default function Header ({
  title,
  backgroundColor,
  nameLeftIcon,
  typeLeft,
  typeRight,
  nameRightIcon,
  onLeft,
  onRight,
  styleLeft,
  styleRight,
  badge,
  isBadge = true,
  top = 0,
  ...rest
}) {
  return (
    <ViewCore
      height={height_}
      backgroundColor={backgroundColor}
      // backgroundColor={'red'}
      midle
      row
      style={[styles.contain, styles.header, {top: top}]}
      {...rest}>
      <TextCore bold size={FSIZE.fsTitleHeader} color={'#fff'}>
        {title}
      </TextCore>
      {nameLeftIcon && (
        <TouchableOpacity onPress={onLeft} style={[styles.left, styleLeft]}>
          <IconCore
            type={typeLeft}
            name={nameLeftIcon}
            style={{color: '#fff'}}
            size={sizeIcon2}
          />
        </TouchableOpacity>
      )}
      {nameRightIcon && (
        <TouchableOpacity style={[styles.right, styleRight]} onPress={onRight}>
          <IconCore
            type={typeRight}
            name={nameRightIcon}
            style={{color: '#fff'}}
            size={sizeIcon}
          />
          {isBadge && <RederBadge badge={badge} />}
        </TouchableOpacity>
      )}
    </ViewCore>
  )
}
const RederBadge = ({badge}) => {
  if (badge === 0) return null
  return (
    <ViewCore
      width={dBadge}
      height={dBadge}
      borderRadius={dBadge / 2}
      backgroundColor={COLOR.bgBadge}
      midle
      style={styles.rightBadge}>
      <TextCore size={sizeTextBagde} color={COLOR.textBadge} bold>
        {badge > 99 ? '99+' : badge}
      </TextCore>
    </ViewCore>
  )
}
const styles = StyleSheet.create({
  left: {
    position: 'absolute',
    left: 13,
    color: '#fff',
  },
  right: {
    position: 'absolute',
    right: 15,
  },
  rightBadge: {
    position: 'absolute',
    right: -5,
  },
  contain: {position: 'absolute', top: 0, left: 0, right: 0},
  header: {
    // borderBottomLeftRadius: 15,
    // borderBottomRightRadius: 15,
  },
})
