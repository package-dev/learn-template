import React from 'react'
import { View, Animated, Dimensions ,StyleSheet} from 'react-native'
import { getNumberCart } from '../utils/util'
import { Block, Header } from '@uiCore'
import SafeAreaView from 'react-native-safe-area-view'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
const display = Dimensions.get('window')

export default function LayoutCustom ({ children, title, onPressRight,y }) {
  const insets = useSafeAreaInsets()

  return (
    <SafeAreaView
      forceInset={{ top: 'never' }}
      style={{ flex: 1, backgroundColor: '#fff' }}
    >
      <Animated.View
        style={{
          backgroundColor: '#15ca72',
          opacity: y,
          paddingTop: Math.max(insets.top, 16)
        }}
      />
      <Block style={{ flex: 1, backgroundColor: '#fff' }}>
        <View
          style={{
            position: 'absolute',
            right: 0,
            left: 0,
            zIndex: 5
          }}
        >
          <Header
            colorLeft='#15ca72'
            colorRight='#15ca72'
            center={false}
            badgeRight={true}
            familyR='MaterialCommunityIcons'
            numberBadge={getNumberCart()}
          />
          <Animated.View
            style={{
              opacity: y,
              position: 'absolute',
              right: 0,
              left: 0
            }}
          >
            <ViewSvg
              x={parseFloat(display.width).toFixed(0)}
              y={80}
              r={30}
              position='absolute'
              zIndex={-1}
              backgroundColor='#15ca72'
            />
            <Header
              familyR='MaterialCommunityIcons'
              nameCenter={title.toUpperCase()}
              badgeRight={true}
              numberBadge={getNumberCart()}
              onPressRight={onPressRight}
            />
          </Animated.View>
        </View>
        {children}
      </Block>
    </SafeAreaView>
  )
}
LayoutCustom.defaultProps={
    children:<></>,
    y:1,
    onPressRight:null,
    title:"",

    
}
import PropTypes from 'prop-types';

 
const styles = StyleSheet.create({})
const ViewSvg = ({ x, y, r, o, backgroundColor, ...rest }) => {
    return (
      <Svg
        style={{
          width: x,
          height: y,
          ...rest,
          //backgroundColor: 'red',
          opacity: o
        }}
      >
        <Path
          d={
            'M' +
            x +
            ',' +
            y +
            ' L' +
            x +
            ' 0  L0,0 L0,' +
            y +
            'a ' +
            r +
            ',' +
            r +
            ' 1 0 1 ' +
            r +
            ',-' +
            r +
            ' L' +
            (x - r) +
            ',' +
            (y - r) +
            ' a ' +
            r +
            ',' +
            r +
            ' 1 0 1 ' +
            r +
            ',' +
            r +
            ''
          }
          fill={backgroundColor}
        />
      </Svg>
    )
  }
  import Svg, { Path } from 'react-native-svg'