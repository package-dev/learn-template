import React, {useEffect,useState} from 'react'
import PropTypes from 'prop-types'
import {isFunction, isNumber} from 'underscore'
import {TextCore, TouchableCore, ViewCore,FSIZE} from './index'
import {Modal, Text} from 'react-native'
export const ALERTCONTENTWIDTH = 80
export const ALERTBUTTONWIDTH = 70
export const ALERTCOLOR = '#C2C1C1'

export const Alert = ({onRef, visible = false, children, ...rest}) => {
  return (
    <Modal
      ref={onRef}
      visible={visible}
      {...rest}
      transparent={true}
      statusBarTranslucent={true}
      animationType='fade'>
      <ViewCore flex1 midle backgroundColor='#55555586'>
        {children}
      </ViewCore>
    </Modal>
  )
}

Alert.propTypes = {
  onRef: PropTypes.object,
  visible: PropTypes.bool,
}

export const AlertIOS = ({
  title,
  children,
  buttons,
  message,
  width = 280,
  actionForAll,
  style,
}) => {
  const createButtonStyle = index => [
    {width: `${100 / buttons.length}%`, height: 45},
    Styles.border('Top', 1, ALERTCOLOR),
    index > 0 && Styles.border('Left', 1, ALERTCOLOR),
    Styles.center(),
  ]
  const Button = ({name, action, index, delay = 0, color = '#383838'}) => {
    const data =
      isNumber(delay) && delay > 0
        ? useCountDown(Date.now() + delay * 1000)
        : false

    useEffect(() => {
      if (round(data / 1000, 0) == 1) return action()
    }, [data])

    return (
      <TouchableCore
        disabled={data}
        onPress={action}
        style={createButtonStyle(index)}>
        {data ? (
          <TextCore center>
            {name} ({round(data / 1000, 1)})
          </TextCore>
        ) : (
          <TextCore center color={color} bold>
            {name}
          </TextCore>
        )}
      </TouchableCore>
    )
  }
  return (
    <BasicContentAlert
      width={width}
      style={[{opacity: 0.95, backgroundColor:"#fff"}, style]}>
      {title ? (
        <TextCore
          size={FSIZE.fs16}
          bold
          color={'#000'}
          style={{paddingTop: 10}}
          center>
          {title}
        </TextCore>
      ) : null}
      <TouchableCore middle style={[{padding: 20}]} >
        {children ? children : <TextCore center color={'#000'}>{message}</TextCore>}
      </TouchableCore>
      <TouchableCore row>
        {buttons.map(({action, name, delay, color}, index) => (
          <Button
            delay={delay}
            name={name}
            action={() => {
              isFunction(actionForAll) && actionForAll()
              isFunction(action) && action()
            }}
            color={color}
            key={`${index}`}
            index={index}
          />
        ))}
      </TouchableCore>
    </BasicContentAlert>
  )
}

AlertIOS.propTypes = {
  title: PropTypes.string,
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      action: PropTypes.func,
    }),
  ),
  message: PropTypes.string,
}

AlertIOS.defaultProps = {
  title: 'Title',
  buttons: [
    {
      name: 'Cancel',
      action: () => alert('Cancel'),
    },
    {
      name: 'Ok',
      action: () => alert('Ok'),
    },
  ],
  message: 'This is content',
}

export function round (value, num) {
  return Math.round(value * Math.pow(10, num)) / Math.pow(10, num)
}
const BasicContentAlert = ({children, width, style}) => (
  <TouchableCore
    // backgroundColor={'white'}
    width={width ? width : 80}
    style={[Styles.radius(10, 10, 10, 10), style]}>
    {children}
  </TouchableCore>
)
export function useCountDown (timestamp, options = {}) {
  const {intervalTime = 1000, now = () => Date.now()} = options
  const [timeLeft, setTimeLeft] = useState(
    () => new Date(timestamp) - new Date(now()),
  )
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(current => {
        if (current <= 0) {
          clearInterval(interval)

          return 0
        }

        return current - intervalTime
      })
    }, intervalTime)

    return () => clearInterval(interval)
  }, [intervalTime, timestamp])

  return timeLeft
}
export const Styles = {
  layout: (alignItems = 'flex-start', justifyContent = 'flex-start') => ({
    alignItems,
    justifyContent,
  }),
  center: () => ({
    alignItems: 'center',
    justifyContent: 'center',
  }),
  alignCenter: () => ({
    alignItems: 'center',
  }),
  contentCenter: () => ({
    justifyContent: 'center',
  }),
  size: (width, height) => {
    const tempStyle = {}
    if (typeof width === 'number') {
      tempStyle.width = width
    }
    if (typeof height === 'number') {
      tempStyle.height = height
    }
    return tempStyle
  },
  margin: (top = 0, right = 0, bottom = 0, left = 0) => {
    return {
      marginTop: top,
      marginRight: right,
      marginBottom: bottom,
      marginLeft: left,
    }
  },
  padding: (top = 0, right = 0, bottom = 0, left = 0) => {
    return {
      paddingTop: top,
      paddingRight: right,
      paddingBottom: bottom,
      paddingLeft: left,
    }
  },
  radius: (topLeft = 0, topRight = 0, bottomLeft = 0, bottomRight = 0) => {
    return {
      borderTopLeftRadius: topLeft,
      borderTopRightRadius: topRight,
      borderBottomLeftRadius: bottomLeft,
      borderBottomRightRadius: bottomRight,
    }
  },
  borderColor: (
    topLeft = '#fffff',
    topRight = '#fffff',
    bottomLeft = '#fffff',
    bottomRight = '#fffff',
  ) => {
    return {
      borderTopLeftColor: topLeft,
      borderTopRightColor: topRight,
      borderBottomLeftColor: bottomLeft,
      borderBottomRightColor: bottomRight,
    }
  },
  border: (direction = 'all', width = 1, color = 'black', style = 'solid') => {
    const tempStyle = {}
    if (direction === 'all') {
      tempStyle.borderWidth = width
      tempStyle.borderColor = color
      tempStyle.borderStyle = style
    } else {
      const directions = direction.split(' ')
      for (const d of directions) {
        if (/Top|Right|Bottom|Left/.test(d)) {
          tempStyle[`border${d}Width`] = width
          tempStyle[`border${d}Color`] = color
          tempStyle.borderStyle = style
        }
      }
    }
    return tempStyle
  },
  flex: (value = 1) => ({
    flex: value,
  }),
  bgColor: (color = 'white') => ({
    backgroundColor: color,
  }),
  color: (color = 'white') => ({
    color,
  }),
  /**
   * alignSelf: String
   * one of [auto, baseline, center, flex-start, flex-end, stretch], default is stretch
   */
  alignSelf: (alignSelf = 'stretch') => ({
    alignSelf,
  }),
  textAlign: (textAlign = 'center') => ({
    textAlign,
  }),
  font: (size = 14, height, weight = 'normal') => ({
    fontSize: size,
    lineHeight: height || size,
    fontWeight: weight,
  }),
  position: (mode = 'absolute', top, right, bottom, left) => {
    const tempStyle = {position: mode}
    if (typeof top === 'number') {
      tempStyle.top = top
    }
    if (typeof right === 'number') {
      tempStyle.right = right
    }
    if (typeof bottom === 'number') {
      tempStyle.bottom = bottom
    }
    if (typeof left === 'number') {
      tempStyle.left = left
    }
    return tempStyle
  },
  direction: (direction = 'row') => ({
    flexDirection: direction,
  }),
}
