import React, { useState, useRef } from 'react'
import {
  TextStyle,
  ViewStyle,
  TextInput,
  TextInputProps,
  StyleProp, StyleSheet, Text, View, ViewProps
} from 'react-native'
export type InputType = {
  get: () => void
  check?: () => void
  focus?: () => void
  clear?: () => void
}
interface Props extends TextInputProps {
  valueInit?: string
  containerStyle?: ViewProps['style']
  inputStyle?: TextInputProps['style'],
  border?: number
}

const InputApp = React.forwardRef<InputType, Props>(({ placeholder = "Aa", ...props }, ref) => {
  React.useImperativeHandle(ref, () => ({
    ...refCore.current,
    get() {
      return value
    },
    clear() {
      setValue('')
    },
    setValue(value: any) {
      setValue(value)
    },
  }))
  const [value, setValue] = useState(props.valueInit)
  const refCore = useRef<any>(null)
  return (
    <View style={[styles.box, props.containerStyle]}>
      <TextInput
        ref={refCore}
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        style={[styles.input, props?.inputStyle]}
        autoCapitalize={'none'}
        placeholderTextColor={'#bbb'}
        {...props}
      />
    </View>
  )
})
export default InputApp

const styles = StyleSheet.create({
  input: {
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    color: '#696969',
    fontSize: 15,
    fontWeight: '500',
    width: '90%',
  },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 45,
    borderRadius: 16,
    backgroundColor: '#fff',
    overflow: 'hidden',
    // marginBottom: 10,
  },
  hind: {
    position: 'absolute',
    right: 20,
  },
}) 