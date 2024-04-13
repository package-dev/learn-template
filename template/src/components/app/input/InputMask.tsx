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
  TouchableOpacity,
  StyleProp,
} from 'react-native'
import {
  TextInputMask,
  TextInputMaskProps,
  TextInputMaskTypeProp,
} from 'react-native-masked-text'
import { StyleSheet, Text, View } from 'react-native'
import { useRef } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
export type Handle = {
  getValue: () => void
  check?: () => void
  focus?: () => void
  clear?: () => void
}

interface Props extends TextInputMaskProps {
  placeholder?: string
  valueInit?: string
  look?: boolean
  styleBox?: StyleProp<ViewStyle>
  styleInput?: StyleProp<TextStyle>
}

const InputCore = React.forwardRef<Handle, Props>((props, ref) => {
  React.useImperativeHandle(ref, () => ({
    check() {
      alert(value)
    },
    getValue() {
      return value
    },
    focus() {
      refCore.current.focus()
    },
    clear() {
      setValue('')
    },
    setValue(value: any) {
      setValue(value)
    },
  }))
  const [value, setValue] = useState(props.valueInit || '')
  const [look, setLook] = useState(props.look ? true : false)
  const refCore: any = useRef()
  return (
    <View style={[styles.box, props.styleBox]}>
      <TextInputMask
        ref={refCore}
        //@ts-ignore
        type='datetime'
        value={value}
        onChangeText={setValue}
        placeholder={props.placeholder}
        style={[styles.input, props?.styleInput]}
        secureTextEntry={look}
        autoCapitalize={'none'}
        placeholderTextColor={'#bbb'}
        {...props}
      />
      {props.look && (
        <TouchableOpacity
          onPress={() => setLook(prev => !prev)}
          style={styles.hind}>
          <Ionicons
            name={look ? 'eye-off-outline' : 'eye-outline'}
            color='#696969'
            size={22}
          />
        </TouchableOpacity>
      )}
    </View>
  )
})
export default InputCore
InputCore.defaultProps = {
  placeholder: 'placeholder',
  look: false,
}

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
    borderRadius: 50,
    backgroundColor: '#fff',
    overflow: 'hidden',
    // marginBottom: 10,
  },
  hind: {
    position: 'absolute',
    right: 20,
  },
})
export const TextBox = (props: any) => {
  return (
    <View style={[styles.box, props.styleBox]}>
      <Text style={styles.input}>{props?.value}</Text>
    </View>
  )
}
