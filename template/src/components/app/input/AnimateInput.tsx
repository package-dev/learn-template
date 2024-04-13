import React, {forwardRef, useEffect, useRef, useState} from 'react'
import {
  Animated,
  ScrollView,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native'
interface Props extends TextInputProps {
  placeholder?: string
  valueInit?: string
  notChange?: boolean
  styleBox?: StyleProp<ViewStyle>
  styleInput?: StyleProp<TextStyle>
}
const AnimatedInput = (props: Props, ref: any) => {
  const [inputHeight, setHeight] = useState<any>(null)
  const [placeholderWidth, setWidth] = useState<any>(null)
  const animation = useRef(new Animated.Value(0)).current
  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -inputHeight / 2],
  })
  const translateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -placeholderWidth / 6],
  })
  const scale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.7],
  })
  const onFocus = () => animate(1)
  const onBlur = () => !value && animate(0)
  const animate = (val: any) => {
    Animated.spring(animation, {
      toValue: val,
      bounciness: 0,
      useNativeDriver: true,
    }).start()
  }
  const [value, setValue] = useState(props.valueInit)
  const refCore: any = useRef()
  React.useImperativeHandle(ref, () => ({
    getValue () {
      return value
    },
    focus () {
      refCore.current.focus()
    },
    clear () {
      setValue('')
    },
  }))
  useEffect(() => {
    if (props.valueInit) animate(1)
  }, [])
  return (
    <View
      style={[styles.inputContainer, props.styleBox]}
      onLayout={e => !inputHeight && setHeight(e.nativeEvent.layout.height)}>
      <View style={{height: inputHeight, ...styles.placeholderContainer}}>
        <Animated.Text
          style={[
            styles.placeholder,
            {transform: [{translateY}, {translateX}, {scale}]},
          ]}
          onTextLayout={e =>
            !placeholderWidth && setWidth(e.nativeEvent.lines[0]?.width || 0)
          }>
          {props.placeholder}
        </Animated.Text>
      </View>
      <TextInput
        ref={refCore}
        style={[
          styles.input,
          props.multiline && {height: 100, textAlignVertical: 'top'},
          props?.styleInput,
        ]}
        onFocus={onFocus}
        onBlur={onBlur}
        value={value}
        onChangeText={props?.notChange ? () => {} : setValue}
        multiline={props.multiline}
        placeholderTextColor={'#bbb'}
      />
    </View>
  )
}
export default forwardRef(AnimatedInput)
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ddd',
    marginTop: 5,
  },
  input: {
    paddingHorizontal: 10,
  },
  placeholderContainer: {
    position: 'absolute',
    backgroundColor: 'red',
    justifyContent: 'center',
  },
  placeholder: {
    fontSize: 14,
    position: 'absolute',
    marginHorizontal: 10,
    paddingHorizontal: 5,
    backgroundColor: '#fff',
    color: '#999',
  },
})
