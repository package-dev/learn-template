import React, {useState, useImperativeHandle, forwardRef, useRef} from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native'
const InputBasic = (
  {
    hideEye,
    rightTouch,
    checkTestValidate,
    rightTouchButon,
    textTouch,
    valueInit,
    backgroundColor = '#fff',
    color = '#000',
    style,
    nameLeftIcon,
    colorLeft = COLOR.green1,
    placeholder,
    returnKeyType,
    onSubmitEditing,
    blurOnSubmit,
    ...res
  },
  ref,
) => {
  const [value, setValue] = useState(valueInit)
  const [showPass, setShowPass] = useState(hideEye)
  const refInput = useRef()
  useImperativeHandle(ref, () => ({
    getValue () {
      if (isEmpty(value)) return ''
      return value
    },
    clear () {
      setValue('')
    },
    focus(){
      refInput.current.focus()
    }
  }))
  const handleHidePass = () => {
    return setShowPass(!showPass)
  }
  const [message, setMessage] = useState('')
  const checkValue = async e => {
    if (!checkTestValidate) return null //(typeof value === 'bool')
    return setMessage(checkTestValidate(e))
  }
  const handleChangeText = e => {
    checkValue(e)
    setValue(e)
  }
  return (
    <ViewCore
      row
      alignItems
      height={50}
      justifyContent
      backgroundColor={backgroundColor}
      paddingHorizontal={10}
      style={{
        borderRadius: 5,
        marginBottom: 2,
      }}
      {...res}>
      <IconCore name={nameLeftIcon} size={23} color={colorLeft} />
      <TextInput
        ref={refInput}
        placeholderTextColor='gray'
        // value={isString(value) ? value : value.toString()}
        value={value}
        style={[
          {
            borderBottomColor: message === '' ? '#DBDADA9D' : 'red',
            backgroundColor: backgroundColor,
            color: color,
            width: '95%',
            paddingLeft: 10,
          },
          style,
        ]}
        secureTextEntry={showPass}
        onChangeText={e => handleChangeText(e)}
        placeholder={placeholder}
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
        blurOnSubmit={blurOnSubmit}
      />
      {hideEye && (
        <IconCore
          onPress={handleHidePass}
          name={showPass ? 'eye' : 'eye-off'}
          size={20}
          color='gray'
          position='absolute'
          right={15}
        />
      )}
      {/* {rightTouch && (
        <TouchableOpacity onPress={rightTouchButon} style={styles.viewEye1}>
          <Text style={{color: '#0091bb'}}>{textTouch}</Text>
        </TouchableOpacity>
      )}
      {checkTestValidate !== null && (
        <View style={styles.viewTooltips}>
          <Text style={styles.textCheck}>{message}</Text>
        </View>
      )} */}
    </ViewCore>
  )
}

export default forwardRef(InputBasic)
import PropTypes from 'prop-types'
import {isEmpty, isString} from 'underscore'
import {ViewCore, TouchableCore, IconCore} from '../index'
import {COLOR} from 'src/res'

InputBasic.defaultProps = {
  rightTouch: false,
  hideEye: false,
  checkTestValidate: null,
  rightTouchButon: null,
  textTouch: 'text',
}
InputBasic.propTypes = {
  rightTouch: PropTypes.bool,
}
const styles = StyleSheet.create({
  rowInput: {
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    height: 50,
    justifyContent: 'center',
    borderRadius: 5,
    marginBottom: 2,
  },
  viewTooltips: {
    minWidth: 100,
    minHeight: 10,
    borderRadius: 5,
    position: 'absolute',
    bottom: 2,
    right: 2,
    paddingHorizontal: 5,
  },
  imageEye: {
    width: 30,
    height: 20,
    resizeMode: 'contain',
  },
  viewEye: {
    width: 30,
    height: 20,
    resizeMode: 'contain',
    position: 'absolute',
    right: 15,
    top: 15,
  },
  viewEye1: {
    minHeight: 15,
    resizeMode: 'contain',
    position: 'absolute',
    right: 25,
    top: 15,
  },
  textCheck: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 12,
  },
})
