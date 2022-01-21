import React, { useState } from 'react'
import { Dimensions, StyleSheet, View, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { getNumberCart } from '../utils/util'
import { Typography, Block, Icon, BasicButton } from '@uiCore'
const HeaderSearch = ({
  onPressSearch,
  onPressRight,
  title,
  numberProduct,
  colorTitle,
  colorIcon,
  back,
  colorBack,
  onBack,
  ...rest
}) => {
  numberProduct = getNumberCart()
  return (
    <Block style={[styles.container, { ...rest }]}>
      {back && (
        <Icon
          onPress={onBack}
          family={'Ionicons'}
          name='arrow-back-outline'
          size={30}
          color={colorBack}
        />
      )}
      <BasicButton
        activeOpacity={1}
        style={[
          styles.inputView,
          { width: !back ? 0.85 * width : 0.75 * width }
        ]}
        onPress={onPressSearch}
      >
        <Typography color={colorTitle}>{title}</Typography>
        <Icon
          family={'Ionicons'}
          name='search'
          size={22}
          color={colorIcon}
          style={{ position: 'absolute', left: 10 }}
        />
      </BasicButton>
      <BasicButton onPress={onPressRight}>
        <Icon
          family={'MaterialCommunityIcons'}
          name='cart'
          size={30}
          color='white'
        />
        {numberProduct !== 0 && (
          <Block style={styles.badge}>
            <Typography color='white' style={{ fontWeight: 'bold' }}>
              {numberProduct}
            </Typography>
          </Block>
        )}
      </BasicButton>
    </Block>
  )
}

export default HeaderSearch
import { LIGHT } from '@uiCore/Theme/colors'
HeaderSearch.defaultProps = {
  numberProduct: 1,
  colorTitle: LIGHT.default,
  colorIcon: LIGHT.default,
  back: false,
  colorBack: '#fff',
  onBack: null
}
const { width } = Dimensions.get('screen')
const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'space-between'
  },
  inputView: {
    height: 40,
    borderRadius: 20,
    paddingLeft: 35,
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  badge: {
    position: 'absolute',
    top: -3,
    right: -5,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: LIGHT.danger,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
