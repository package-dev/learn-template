import ViewCoreC from './ViewCoreC'
import React, {useState, useRef, useEffect} from 'react'
import {
  ActivityIndicator,
  Image,
  ImageProps,
  ImageResizeMode,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  ViewStyle,
} from 'react-native'

interface Props extends ViewStyle{
  source?: ImageSourcePropType | any
  width?: string | number | undefined
  height?: string | number
  resizeMode?: ImageResizeMode | undefined
  style?: StyleProp<ImageStyle>
}
const ImageCustom: React.FC<Props | ImageProps> = props => {
  const {source, width, height, resizeMode = 'contain', style, ...rest} = props
  if (!source || source === null || source === undefined) return null
  const [load, setLoad] = useState(true)
  const [isErr, setIsErr] = useState(false)
  const refImg:any = useRef()
  const _onLoadStart = () => {
    setLoad(true)
    refImg.current = setTimeout(() => {
      setLoad(false)
    }, 3000)
  }
  const _onError = () => {
    console.log('error')
    setIsErr(true)
  }
  useEffect(() => {
    return () => {
      clearTimeout(refImg.current)
    }
  }, [])
  return (
    <ViewCoreC midle >
      <Image
        source={isErr ? require('./noimage.jpg') : source}
        style={[{width: width, height: height, resizeMode: resizeMode}, style]}
        {...rest}
        onLoadStart={_onLoadStart}
        onLoadEnd={() => setLoad(false)}
        onError={_onError}
      />
      {load && (
        <ActivityIndicator
          color={'#1868ae'}
          size={20}
          style={{position: 'absolute'}}
        />
      )}
    </ViewCoreC>
  )
}

ImageCustom.defaultProps = {
  source: null,
  width: 100,
  height: 100,
  resizeMode: 'contain',
}
