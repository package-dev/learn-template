import {
  StyleSheet,
  Text,
  View,
  Animated,
  Easing,
  StyleProp,
  TextStyle,
} from 'react-native'
import React, {useImperativeHandle, useRef, forwardRef} from 'react'

type Handle = {
  setValue?: (x: number) => void | undefined
  focus?: () => void
}
interface Props {
  styleBox?: StyleProp<TextStyle>
  styleContain?: StyleProp<TextStyle>
  title?: string
  styleTitle?: StyleProp<TextStyle>
  renderTitle?: React.ReactNode
}
const Load = forwardRef<Handle, Props>((props, ref) => {
  const {
    styleBox,
    styleContain,
    title = 'Loading...',
    styleTitle,
    renderTitle,
  } = props

  const _width = useRef(new Animated.Value(0)).current
  const add = (x: number) => {
    Animated.timing(_width, {
      toValue: x,
      duration: 100,
      useNativeDriver: true,
      easing: Easing.bezier(0.55, 0, 1, 0.45),
    }).start()
  }
  useImperativeHandle(ref, () => ({
    setValue (value) {
      console.log(value)
      if (value > 0 && value <= 1) add(value * 100 * r)
    },
    focus () {
      add(0)
    },
  }))
  let r = 2
  return (
    <View style={styles.container}>
      {renderTitle ? renderTitle : <Text style={styleTitle}>{title}</Text>}
      <View style={[styles.box, styleContain, {width: 100 * r}]}>
        <Animated.View
          style={[
            {transform: [{scaleX: _width}]},
            {
              backgroundColor: 'blue',
              height: 25,

              position: 'absolute',
              left: -r,
            },
            styleBox,
            {width: r},
          ]}></Animated.View>
      </View>
    </View>
  )
})
export default Load
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    height: 30,
    backgroundColor: 'pink',
    borderWidth: 3,
    borderColor: 'red',
    overflow: 'hidden',
  },
})
