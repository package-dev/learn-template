import React, { useRef } from 'react'
import { View, Animated, Linking, RefreshControl } from 'react-native'
import { updateQuantityProductCart, getProductCart } from '@serviceShopCart'
import {
  BottomSheetOrder,
  BottomSheetSale,
  FlatListImage,
  ProductsDescription,
  ButtonBuy,
  HeaderBottomSheet,
  LayoutCustom
} from '../components'
import BottomSheet from 'reanimated-bottom-sheet'
import { navigate } from '@lib/rootNavigation'
import { Block, ButtonFooter, BehindBackground } from '@uiCore'
import { useProductDetail } from '../utils/util'
import { usePreventBack } from '@lib/funcUtil'
import { getProductDetail } from '../utils/API'
const heightTop = 100
import { logInfo, logDebug } from '@lib/debug'
export default function index ({ route }) {
  const { idProduct } = route.params
  logInfo('id', idProduct)
  const { data, refreshing, onRefresh } = useProductDetail(idProduct)
  const refBehind = useRef()
  const scrollY = useRef(new Animated.Value(0)).current
  const y = scrollY.interpolate({
    inputRange: [0, heightTop],
    outputRange: [0, 1],
    extrapolateRight: 'clamp'
  })
  const sheetOrder = useRef(null)
  const bottomSaleRef = useRef()
  const sheetSale = useRef(null)
  const handleSaleOpen = async id => {
    let data = await getProductDetail(id)
    let tempPromotion = data ? JSON.parse(data.promotion) : []
    bottomSaleRef.current.setValue({
      promotion: tempPromotion,
      unit: data.unit
    })
    sheetSale.current.snapTo(0)
    refBehind.current.openBehind()
  }
  const handleSaleClose = () => {
    refBehind.current.closeBehind()
    sheetSale.current.snapTo(1)
  }
  const handleOrderClose = () => {
    refBehind.current.closeBehind()
    sheetOrder.current.snapTo(1)
  }

  //******************************************** */
  // usePreventBack(() => {
  //   let state = refBehind.current.getState()
  //   if (state) {
  //     handleSaleClose()
  //     handleOrderClose()
  //     return false
  //   }
  //   return true
  // })
  return (
    <LayoutCustom
      onPressRight={() => {
        navigate('shop_carts')
        handleSaleClose()
        handleOrderClose()
      }}
      y={y}
      title={data.name}
    >
      <>
        <Animated.ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          style={{
            flex: 1,
            backgroundColor: '#F4F6FB'
          }}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            {
              useNativeDriver: true
            }
          )}
        >
          <FlatListImage
            data={data ? JSON.parse(data.media) : []}
            marginTop={20}
          />
          <ProductsDescription
            item={data}
            onPressSale={() => handleSaleOpen(idProduct)}
          />

          <View style={{ height: 200 }}></View>
        </Animated.ScrollView>
        <ButtonFooter backgroundColor='#fff'>
          <ButtonBuy
            titleRight={'Chọn mua'}
            onPressLeft={() => Linking.openURL('tel:0941777588')}
            onPressRight={() => {
              sheetOrder.current.snapTo(0)
              refBehind.current.openBehind()
              let getById = getProductCart(idProduct)
              if (!getById) updateQuantityProductCart(idProduct, 1)
              else {
                updateQuantityProductCart(idProduct, getById.quantity + 1)
              }
            }}
          />
        </ButtonFooter>
        <BottomSheet
          ref={sheetOrder}
          onCloseEnd={handleOrderClose}
          snapPoints={[250, 0]}
          borderRadius={10}
          renderContent={() => (
            <BottomSheetOrder
              onPressClose={handleOrderClose}
              onPressGo={() => {
                navigate('shop_carts')
                handleOrderClose()
              }}
              item={data}
            />
          )}
          initialSnap={1}
          borderRadius={15}
        />
        <BehindBackground
          ref={refBehind}
          onClose={() => {
            handleSaleClose()
            handleOrderClose()
          }}
        />
        <BottomSheet
          ref={sheetSale}
          onCloseEnd={handleSaleClose}
          snapPoints={[500, 0]}
          renderContent={() => <BottomSheetSale ref={bottomSaleRef} />}
          initialSnap={1}
          renderHeader={() => (
            <HeaderBottomSheet
              backgroundColor='#15ca72'
              onPress={handleSaleClose}
              title={'Khuyến mãi'}
            />
          )}
        />
      </>
    </LayoutCustom>
  )
}
