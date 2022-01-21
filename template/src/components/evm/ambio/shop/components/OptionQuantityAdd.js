import React from 'react'
import {StyleSheet, Text, View, Image} from 'react-native'
import {
  Block,
  Typography,
  Icon,
  ButtonSimple,
  BasicButton,
} from '@uiCore'
import { FormatMoney,} from '../utils/util'
import { LIGHT } from '@uiCore/Theme/colors'
export default function OptionQuantityAdd ({
  onPressLeft,
  onPressRight,
  value,
  bacgroundValue,
  colorValue,
  ...rest
}) {
  return (
    <Block row {...rest}>
      <BasicButton style={[styles.viewButton]} middle onPress={onPressRight}>
        <Icon family='Ionicons' name='remove' color='#fff' />
      </BasicButton>
      <Block middle style={styles.viewValue} backgroundColor={bacgroundValue}>
        <Typography size={20} color={colorValue}>
          {value}
        </Typography>
      </Block>
      <BasicButton style={styles.viewButton} middle onPress={onPressLeft}>
        <Icon family='Ionicons' name='add' color='#fff' />
      </BasicButton>
    </Block>
  )
}

const styles = StyleSheet.create({
  viewButton: {
    width: 30,
    height: 30,
    borderRadius: 5,
    backgroundColor: LIGHT.primary,
    justifyContent:'center',
    alignItems:'center'
  },
  viewValue: {
    width: 60,
    height: 30,
    borderRadius: 5,
  },
})
import PropTypes from 'prop-types'
OptionQuantityAdd.defaultProps = {
  onPressLeft: null,
  onPressRight: null,
  value: 1,
  bacgroundValue: '#fff',
  colorValue: '#000',
}
OptionQuantityAdd.propsTypes = {
  onPressLeft: PropTypes.func,
  onPressRight: PropTypes.func,
  value: PropTypes.number,
}
