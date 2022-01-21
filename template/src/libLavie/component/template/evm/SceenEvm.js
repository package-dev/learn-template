import {IconCore, Layout, COLOR, ICON, ViewCore} from './index'
import React, {Children} from 'react'
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
} from 'react-native'
import Header from './Header'

const height_ = 50
export default function SceenEvm ({
  onLeft,
  title,
  onRight,
  nameLeftIcon = ICON.chevron_back_outline,
  nameRightIcon = ICON.notifications,
  backgroundColor = COLOR.green1,
  children,
  styleLeft,
  styleRight,
  badge,
  isBadge,
  typeLeft,
  typeRight,
  ...rest
}) {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLOR.green1}}>
      <Layout {...rest} backgroundColor='#fff' paddingTop={height_}>
        <ViewCore height={Platform.OS === 'ios' ? height_ : 0} />
        <StatusBar
          hidden={false}
          backgroundColor={COLOR.green1}
          barStyle='light-content'
        />
        <Header
          title={title}
          backgroundColor={backgroundColor}
          nameLeftIcon={nameLeftIcon}
          nameRightIcon={nameRightIcon}
          onLeft={onLeft}
          onRight={onRight}
          styleLeft={styleLeft}
          styleRight={styleRight}
          badge={badge}
          isBadge={isBadge}
          typeLeft={typeLeft}
          typeRight={typeRight}
          // top={10}
        />
        {children}
      </Layout>
    </SafeAreaView>
  )
}
