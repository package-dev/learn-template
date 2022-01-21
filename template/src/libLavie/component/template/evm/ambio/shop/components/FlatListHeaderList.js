import React, { useState, useEffect, useMemo, useRef } from 'react'
import { FlatList, Animated, Dimensions } from 'react-native'
import { Block, ButtonSimple } from '@uiCore'
import { isEmpty, isArray } from 'underscore'
import HeaderHorizontal from './HeaderHorizontal'
import { Categorys, useProduct } from '../utils/util'
import { useConfigData, ActionName, getData, setData } from '@serviceConfig'
// import { getData } from '@service/config/configStore'
import {
  setRef2,
  getRef1,
  setPoint,
  getPoint,
  setRefF,
  getRefF,
  getRefTop,
  setRefTop
} from '../utils/util'
import { isEqual } from 'underscore'
import { heightHeader, heightBoxHeader } from '../utils/util'
import { ItemProduct } from '../components'
import { navigate } from '@lib/rootNavigation'
import { logInfo, logDebug } from '@lib/debug'
import { LIGHT } from '@uiCore/Theme/colors'
const { width, height } = Dimensions.get('window')
const FlatListHeaderList = ({ scrollY }) => {
  logInfo('2.8', 'FlatListHeaderList')
  const [render, setRender] = useState(true)
  const [type_category, setTypeCategory] = useConfigData(
    ActionName.SHOP_TYPE_CATEGORY,
    { key: 0, state: true }
  )
  const mapPre = useRef(true)
  
  const { data, refreshing, onRefresh } = useProduct(1, type_category.key)
  useEffect(() => {
    logInfo('#2.12', 'useEffect0',{type_category:type_category.state})
    if (!type_category.state) {
      logInfo('#2.12', 'useEffect')
      //let test = getRefTop()
      logInfo('1.14',"isEqual",isEqual(data, mapPre.current));
      if (data && data.length !== 0 && !isEqual(data, mapPre.current)) {
        //logInfo('#2.11', data)
        logInfo('2.1', 'scrollToOffset')
        //getRefF().scrollToIndex({ animated: true, index: 0 })
        setTimeout(() => {
          logInfo('2.9', 'setTimeout')
          let ref = getRefF()
          ref.scrollToOffset({
            animated: true,
            offset: heightBoxHeader - 2
          })
          //setRefTop(false)
          return
        }, 100)
      }
      //}
    }
  }, [type_category, data])
  const [map, setMap] = useState(false)
  useEffect(() => {
    mapPre.current = data
    setMap(data)
  }, [data])
  //logInfo('#2.10', data)
  const ListHeader = useMemo(() => {
    return <BoxHeader />
  }, [render])
  return (
    <Block flex={1} backgroundColor={LIGHT.background}>
      <Animated.FlatList
        ref={ref => setRefF(ref)}
        refreshing={refreshing}
        onRefresh={() => onRefresh()}
        data={map ? map : []} //{data ? data : []}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          return (
            <ItemProduct
              item={item}
              onPress={() =>
                navigate('shop_productDetails', { idProduct: item.id })
              }
            />
          )
        }}
        numColumns={2}
        ListHeaderComponent={ListHeader}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          {
            useNativeDriver: true
          }
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: height + heightBoxHeader
        }}
      />
    </Block>
  )
}

export default FlatListHeaderList
//______________________________________________________________
const BoxHeader = React.memo(() => {
  logDebug('2.2', 'Header FLHL')
  const { data, refreshing, onRefresh } = useProduct(2)
  return (
    <Block height={heightBoxHeader + heightHeader}>
      <HeaderHorizontal
        type='basic'
        title='PHỔ BIẾN'
        onPressBox={() =>
          navigate('shop_groupProducts', {
            key: false
          })
        }
        nameIcon='arrow-forward-circle-outline'
      />
      <FlatList
        // refreshing={refreshing}
        // onScroll={onRefresh}
        data={data ? data : []}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <ItemProduct
            onPress={() =>
              navigate('shop_productDetails', { idProduct: item.id })
            }
            item={item}
            size={'medium'}
          />
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
      <HeaderHorizontal
        refH={ref => setRef2(ref)}
        data={Categorys}
        onScroll={r => setPoint(r.nativeEvent.contentOffset.x)}
        onScrollEndDrag={() => {
          logDebug('onScrollEndDrag')

          let ref = getRef1()
          let point = getPoint()
          ref.scrollToOffset({
            animated: true,
            offset: point
          })
        }}
      />
    </Block>
  )
})
