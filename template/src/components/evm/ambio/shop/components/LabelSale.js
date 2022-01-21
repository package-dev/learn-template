import React from 'react'
import { StyleSheet, ImageBackground } from 'react-native'
import { Typography, BasicButton } from '@uiCore'
import { LIGHT } from '@uiCore/Theme/colors'
import { logInfo, logDebug } from '@lib/debug'
export default function LabelSale ({
  titleTop,
  titleBottom,
  colorTitle,
  size,
  width,
  height,
  onPress,
  line
}) {
  if (!titleBottom || !titleTop) return null
  return (
    <ImageBackground
      source={require('@assets/images/shop/sale_view.png')}
      style={{
        width: width,
        height: height,
        resizeMode: 'contain',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {line === 2 && (
        <BasicButton onPress={onPress}>
          <Typography
            numberOfLines={1}
            color={colorTitle}
            style={styles.textLabel}
          >
            {titleTop}
          </Typography>
          <Typography
            numberOfLines={1}
            color={colorTitle}
            style={styles.textLabel}
          >
            {titleBottom}
          </Typography>
        </BasicButton>
      )}
      {line === 1 && (
        <BasicButton onPress={onPress}>
          <Typography color={colorTitle} style={styles.textLabel}>
            {titleTop}
            {titleBottom}
          </Typography>
        </BasicButton>
      )}
    </ImageBackground>
  )
}
LabelSale.defaultProps = {
  width: 130,
  height: 30,
  titleTop: 'titleTop',
  titleBottom: 'titleBottom',
  onPress: null,
  colorTitle: LIGHT.danger,
  size: 12,
  line: 2
}

const styles = StyleSheet.create({
  textLabel: { fontWeight: 'bold', fontSize: 12,maxWidth:110 }
})
