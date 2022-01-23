import React, {useRef} from 'react'
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Animated,
  Easing,
  GestureResponderEvent,
  PressableProps,
} from 'react-native'
interface ButtonAProps extends PressableProps {
  inactiveBackground?: string
  activeBackground?: string
  onPressIn?: null | ((event: GestureResponderEvent) => void) | undefined
  title?: string
}
const ButtonA: React.FC<ButtonAProps> = props => {
  const {onPressIn, title = 'ButtonTitle'} = props
  const scaleRadius = useRef(new Animated.Value(0.01)).current
  const xTouch = useRef(new Animated.Value(0)).current
  const yTouch = useRef(new Animated.Value(0)).current

  const onTouchAnimated = (x: number, y: number) => {
    Animated.parallel([
      Animated.timing(xTouch, {
        toValue: x,
        duration: 100,
        easing: Easing.bezier(0.34, 1.56, 0.64, 1),
        useNativeDriver: true,
      }),
      Animated.timing(yTouch, {
        toValue: y,
        duration: 100,
        easing: Easing.bezier(0.34, 1.56, 0.64, 1),
        useNativeDriver: true,
      }),
      Animated.sequence([
        Animated.timing(scaleRadius, {
          toValue: 1,
          duration: 100,
          easing: Easing.bezier(0.32, 0, 0.67, 0),
          // speed: 20,
          // bounciness: 10,
          useNativeDriver: true,
        }),
        Animated.timing(scaleRadius, {
          toValue: 0.01,
          duration: 300,
          easing: Easing.bezier(0.32, 0, 0.67, 0),
          useNativeDriver: true,
        }),
      ]),
    ]).start()
  }
  return (
    <Pressable
      {...props}
      cancelable
      delayLongPress={1000}
      onPressIn={e => {
        // console.log(e.nativeEvent)
        onTouchAnimated(e.nativeEvent.locationX, e.nativeEvent.locationY)
        onPressIn
      }}
      style={e => {
        // console.log(e)
        return [
          {
            backgroundColor: e?.pressed ? '#02AFFF' : '#02AFFF',
          },
          styles.button,
        ]
      }}>
      <Text style={styles.buttonText}>{title}</Text>
      <Animated.View
        style={{
          width: 30,
          height: 30,
          borderRadius: 40,
          backgroundColor: '#B5E1F57A',
          position: 'absolute',
          left: -15,
          top: -15,
          transform: [
            {translateX: xTouch},
            {translateY: yTouch},
            {scale: scaleRadius},
          ],
          zIndex: 5,
        }}></Animated.View>
    </Pressable>
  )
}
export default ButtonA
const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    padding: 6,
    height: 50,
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    zIndex: 1,
    // textAlign: 'center',
  },
})
