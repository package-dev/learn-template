import React, {Component} from 'react'
import {Animated, Easing, StyleSheet, View} from 'react-native'

const random = () => parseInt(Math.random() * 255)
const randomColor = () =>
  'rgb(' + random() + ',' + random() + ',' + random() + ')'
const size = 60
const innerSize = 25

export default class Loader1 extends Component {
  animation = new Animated.Value(0)
  color1 = this.props.color1 ? this.props.color1 : '#F70000' //randomColor()
  color2 = this.props.color2 ? this.props.color2 : '#F78A00' // randomColor()
  color3 = this.props.color3 ? this.props.color3 : '#F7F700' // randomColor()
  color4 = this.props.color4 ? this.props.color4 : '#008A00' // randomColor()
  color5 = this.props.color5 ? this.props.color5 : '#00BABA' // randomColor()
  componentDidMount = () => {
    Animated.loop(
      Animated.timing(this.animation, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start()
  }

  render () {
    const Dim = size
    const inputRange = [0, 0.5, 1]
    const angle = this.animation.interpolate({
      inputRange,
      outputRange: ['0deg', '72deg', '360deg'],
    })
    const angle0 = this.animation.interpolate({
      inputRange,
      outputRange: ['0deg', '144deg', '360deg'],
    })
    const angle1 = this.animation.interpolate({
      inputRange,
      outputRange: ['0deg', '216deg', '360deg'],
    })
    const angle2 = this.animation.interpolate({
      inputRange,
      outputRange: ['0deg', '288deg', '360deg'],
    })
    const angle3 = this.animation.interpolate({
      inputRange,
      outputRange: ['0deg', '360deg', '360deg'],
    })
    const outerAngle = this.animation.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '720deg'],
    })
    return (
      <View style={styles.container}>
        <Animated.View
          style={{width: Dim, height: Dim, transform: [{rotate: outerAngle}]}}>
          <Animated.View
            style={{...styles.item, transform: [{rotate: angle3}], zIndex: 5}}>
            <View style={styles.inneritem}>
              <View
                style={{
                  height: innerSize,
                  width: innerSize,
                  borderRadius: innerSize,
                  backgroundColor: this.color1,
                }}></View>
            </View>
          </Animated.View>
          <Animated.View
            style={{...styles.item, transform: [{rotate: angle2}], zIndex: 4}}>
            <View style={styles.inneritem}>
              <View
                style={{
                  height: innerSize - innerSize / 10,
                  width: innerSize - innerSize / 10,
                  borderRadius: innerSize,
                  backgroundColor: this.color2,
                }}></View>
            </View>
          </Animated.View>
          <Animated.View
            style={{...styles.item, transform: [{rotate: angle1}], zIndex: 3}}>
            <View style={styles.inneritem}>
              <View
                style={{
                  height: innerSize - 2 * (innerSize / 10),
                  width: innerSize - 2 * (innerSize / 10),
                  borderRadius: innerSize,
                  backgroundColor: this.color3,
                }}></View>
            </View>
          </Animated.View>

          <Animated.View
            style={{...styles.item, transform: [{rotate: angle0}], zIndex: 2}}>
            <View style={styles.inneritem}>
              <View
                style={{
                  height: innerSize - 3 * (innerSize / 10),
                  width: innerSize - 3 * (innerSize / 10),
                  borderRadius: innerSize,
                  backgroundColor: this.color4,
                }}></View>
            </View>
          </Animated.View>
          <Animated.View
            style={{...styles.item, transform: [{rotate: angle}], zIndex: 1}}>
            <View style={styles.inneritem}>
              <View
                style={{
                  height: innerSize - 3 * (innerSize / 10),
                  width: innerSize - 3 * (innerSize / 10),
                  borderRadius: innerSize,
                  backgroundColor: this.color5,
                }}></View>
            </View>
          </Animated.View>
        </Animated.View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    width: size,
    height: size,
    borderWidth: 0,
    backgroundColor: 'transparent',
    position: 'absolute',
  },
  innerHeight: {
    height: innerSize,
    width: innerSize,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
