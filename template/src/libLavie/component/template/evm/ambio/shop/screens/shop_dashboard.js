import React, { useRef } from 'react'
import { Layout } from '@uiCore'
import { Animated } from 'react-native'
import {
  FlatListHeaderList,
  HeaderHorizontal,
  HeaderSearch
} from '../components'
import { navigate } from '@lib/rootNavigation'
import { Categorys, heightBoxHeader, heightHeader } from '../utils/util'
import { setRef1, setPoint, getPoint, getRef2 } from '../utils/util'
import { useConfigData, ActionName,getData } from '@serviceConfig'
import { logDebug } from '@lib/debug'
const Shop_dashboard = () => {
  logDebug('Shop_dashboard')
  const scrollY = useRef(new Animated.Value(0)).current
  const y = scrollY.interpolate({
    inputRange: [0, heightBoxHeader - 1, heightBoxHeader],
    outputRange: [0, 0, 1],
    extrapolateRight: 'clamp'
  })
  //______________________________________________________________
  const [_ref1, set_ref1] = useConfigData(
    ActionName.SHOP_REF1,
    {name:"hahahah"}
  )
  //______________________________________________________________
  return (
    <Layout
      forceInsetContent={{ vertical: 'never' }}
      customHeader={() => (
        <HeaderSearch
          title={'Tên mặt hàng'}
          onPressSearch={() => navigate('shop_searchProduct')}
          onPressRight={() => navigate('shop_carts')}
        />
      )}
    > 
      <FlatListHeaderList scrollY={scrollY} />
      <HeaderHorizontal
        refH={ref => setRef1(ref)}
        onScroll={r => setPoint(r.nativeEvent.contentOffset.x)}
        height_={heightHeader}
        animated
        y={y}
        data={Categorys}
        onScrollEndDrag={() => {
          let ref = getRef2()
          let point = getPoint()
          ref.scrollToOffset({
            animated: true,
            offset: point
          })
        }}
      />
    </Layout>
  )
}

export default Shop_dashboard
