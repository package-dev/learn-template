import React, { useState, useImperativeHandle, forwardRef, useRef } from 'react'
import {
  Dimensions,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity
} from 'react-native'
import PropTypes from 'prop-types'
import { Typography, Block, Icon, BasicButton } from '@uiCore'
import { useNavigation } from '@react-navigation/native'
import { getNumberCart } from '../utils/util'
import { LIGHT } from '@uiCore/Theme/colors'
import { logInfo, logDebug } from '@lib/debug'
const HeaderSearchInput = forwardRef(
  (
    {
      onPressLeft,
      onPressSearch,
      onPressRight,
      defaultValue,
      numberProduct = 0,
      ...rest
    },
    ref
  ) => {
    logDebug('HeaderSearchInput')
    numberProduct = getNumberCart()
    const navigation = useNavigation()
    const [value, setValue] = useState(defaultValue)
    const [status, setStatus] = useState(false)
    useImperativeHandle(ref, () => ({
      getValue () {
        logInfo('getValue')
        return value
      },
      handleFocus () {
        logInfo('handleFocus')
        refS.current.focus()
        return true
      }
    }))
    const refS = useRef()
    return (
      <View style={styles.container}>
        <Icon
          family={'Ionicons'}
          color='white'
          name='arrow-back-outline'
          size={32}
          onPress={
            onPressLeft == null ? () => navigation.goBack() : onPressLeft
          }
        />
        <View
          style={[{ flexDirection: 'row', alignItems: 'center' }, styles.input]}
        >
          {!status && (
            <Icon
              family={'Ionicons'}
              onPress={onPressSearch}
              name='search'
              size={22}
              color={LIGHT.default}
            />
          )}
          <TextInput
            ref={refS}
            value={value}
            onChangeText={text => setValue(text)}
            style={{ fontSize: 14,maxWidth: 230 }}
            {...rest}
            onEndEditing={() => setStatus(false)}
            onFocus={() => setStatus(true)}
          />
          {status && (
            <Icon
              family={'MaterialCommunityIcons'}
              onPress={() => setValue('')}
              name='window-close'
              size={22}
              color={LIGHT.default}
              style={{ position: 'absolute', right: 8 }}
            />
          )}
        </View>
        <BasicButton
          onPress={onPressRight}
          style={{ marginLeft: 10 }}
          backgroundColor='null'
        >
          <Icon
            family={'MaterialCommunityIcons'}
            name='cart'
            size={32}
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
      </View>
    )
  }
)
export default HeaderSearchInput
HeaderSearchInput.propTypes = {
  onPressSearch: PropTypes.func,
  onPressRight: PropTypes.func,
  defaultValue: PropTypes.string
}
HeaderSearchInput.defaultProps = {
  onPressSearch: null,
  onPressRight: null,
  defaultValue: '',
  onPressLeft: null
}
const { width } = Dimensions.get('screen')
const styles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'space-between'
  },
  input: {
    height: 40,
    alignItems: 'center',
    width: 0.75 * width,
    borderRadius: 20,
    paddingLeft: 16,
    backgroundColor: '#fff'
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
