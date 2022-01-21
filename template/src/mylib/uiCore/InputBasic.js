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
    focus () {
      setValue('')
    },
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
    <View>
      <TextInput
        ref={refInput}
        // value={isString(value) ? value : value.toString()}
        value={value}
        style={[
          styles.rowInput,
          {
            borderBottomColor: message === '' ? '#DBDADA9D' : 'red',
            backgroundColor: backgroundColor,
            color: color,
          },
          style,
        ]}
        secureTextEntry={showPass}
        onChangeText={e => handleChangeText(e)}
        {...res}></TextInput>
      {hideEye && (
        <TouchableOpacity onPress={handleHidePass} style={styles.viewEye}>
          <Image source={require('@image/eye.png')} style={styles.imageEye} />
        </TouchableOpacity>
      )}
      {rightTouch && (
        <TouchableOpacity onPress={rightTouchButon} style={styles.viewEye1}>
          <Text style={{color: '#0091bb'}}>{textTouch}</Text>
        </TouchableOpacity>
      )}
      {checkTestValidate !== null && (
        <View style={styles.viewTooltips}>
          <Text style={styles.textCheck}>{message}</Text>
        </View>
      )}
    </View>
  )
}

export default forwardRef(InputBasic)
import PropTypes from 'prop-types'
import {isEmpty, isString} from 'underscore'

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
    marginBottom:2
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
