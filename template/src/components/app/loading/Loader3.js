import React, { Component } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';

const random = () => (parseInt(Math.random() * 255));
const randomColor = () => 'rgb(' + random() + ',' + random() + ',' + random() + ')'
const Dim = 60;

export default class Loader3 extends Component {
    constructor(props) {
        super(props);
        this.dim = this.props.dim || 60
        this.dot = this.props.dot || 10

        this.state = {
        };
        this.color1 = randomColor();
        this.color2 = randomColor();
        this.color3 = randomColor();
        this.color4 = randomColor();
        this.color5 = randomColor();
        this.animation = new Animated.Value(0)
    }

    componentDidMount = () => {
        Animated.loop(Animated.timing(this.animation, {
            toValue: 1,
            duration: 3000,
            easing: Easing.linear,
            useNativeDriver: true
        })).start();
    }
    render() {
        const angle = this.animation.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: ['0deg', '72deg', '360deg']
        })
        const angle0 = this.animation.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: ['0deg', '144deg', '360deg']
        })
        const angle1 = this.animation.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: ['0deg', '216deg', '360deg']
        })
        const angle2 = this.animation.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: ['0deg', '288deg', '360deg']
        })
        const angle3 = this.animation.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: ['0deg', '360deg', '360deg']
        })
        const outerAngle = this.animation.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '720deg']
        })
        return (
            <View style={styles.container}>
                <Animated.View style={{ width: this.dim, height: this.dim, transform: [{ rotate: outerAngle }] }}>
                    <Animated.View style={{ ...styles.item(this.dim), transform: [{ rotate: angle3 }] }}>
                        <View style={{ ...styles.innerItem(this.dot), backgroundColor: this.color1 }}></View>
                    </Animated.View>
                    <Animated.View style={{ ...styles.item(this.dim), transform: [{ rotate: angle2 }] }}>
                        <View style={{ ...styles.innerItem(this.dot), backgroundColor: this.color2 }}></View>
                    </Animated.View>
                    <Animated.View style={{ ...styles.item(this.dim), transform: [{ rotate: angle1 }] }}>
                        <View style={{ ...styles.innerItem(this.dot), backgroundColor: this.color3 }}></View>
                    </Animated.View>
                    <Animated.View style={{ ...styles.item(this.dim), transform: [{ rotate: angle0 }] }}>
                        <View style={{ ...styles.innerItem(this.dot), backgroundColor: this.color4 }}></View>
                    </Animated.View>
                    <Animated.View style={{ ...styles.item(this.dim), transform: [{ rotate: angle }] }}>
                        <View style={{ ...styles.innerItem(this.dot), backgroundColor: this.color5 }}></View>
                    </Animated.View>
                </Animated.View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    item: (Dim) => ({
        width: Dim,
        height: Dim,
        borderWidth: 0,
        backgroundColor: 'transparent',
        position: 'absolute',
        justifyContent: 'center'
    }),
    innerItem: (Dot) => ({
        height: Dot,
        width: Dot,
        borderRadius: Dot
    })
})

