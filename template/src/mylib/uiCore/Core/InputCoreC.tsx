import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  Ref,
  LegacyRef,
} from 'react'
import {
  TextStyle,
  ViewStyle,
  TextProps,
  ColorValue,
  TextInput,
  TextInputProps,
} from 'react-native'
import {StyleSheet, Text, View} from 'react-native'
import {rnColor} from './res/color'
import {useRef} from 'react'
export type CountdownHandle = {
  getValue: () => void
  check?: () => void
  focus?: () => void
  clear?: () => void
}

interface Props extends TextInputProps {
  placeholder?: string
}

const InputCore = React.forwardRef<CountdownHandle, Props>((props, ref) => {
  React.useImperativeHandle(ref, () => ({
    // start() has type inferrence here

    check () {
      alert(value) //cannot find name alert, confirm, event =>>>"lib": ["es2020","dom"],
    },
    getValue () {
      return value //cannot find name alert, confirm, event =>>>"lib": ["es2020","dom"],
    },
    focus () {
      refCore.current.focus()
    },
    clear () {
      setValue('')
    },
  }))
  const [value, setValue] = useState('')
  const refCore: any = useRef()
  return (
    <TextInput
      ref={refCore}
      value={value}
      onChangeText={setValue}
      placeholder={props.placeholder}
      {...props}
    />
  )
})
export default InputCore
InputCore.defaultProps={
  placeholder:'placeholder'
}