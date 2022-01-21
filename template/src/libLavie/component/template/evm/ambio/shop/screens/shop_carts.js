import React, { useRef } from 'react'
import { ScrollView, View, StatusBar } from 'react-native'
import {
  Layout,
  Typography,
  ButtonFooter,
  Icon,
  ButtonSimple,
  BehindBackground
} from '@uiCore'
import BottomSheet from 'reanimated-bottom-sheet'
import {
  BoxFooterDetails,
  BoxProduct,
  BottomSheetSale,
  HeaderBottomSheet
} from '../components'
import { navigate, goBack } from '@lib/rootNavigation'
import { useAllCart } from '@serviceShopCart'
import { getProductDetail } from '../utils/API'
import { getNumberCart } from '../utils/util'
import { log, logDebug, logInfo } from '@lib/debug'
import { useConfigData, ActionName } from '@serviceConfig'
import { LIGHT } from '@uiCore/Theme/colors'
export default function shop_carts () {
  logInfo('Carts')
  const Carts = useAllCart()
  const bottomSaleRef = useRef()
  const refBehind = useRef()
  const sheetSale = useRef(null)
  const handleOpenSale = async id => {
    logInfo('handle show list Sale')
    let data = await getProductDetail(id)
    let tempPromotion = data ? JSON.parse(data.promotion) : []
    bottomSaleRef.current.setValue({
      promotion: tempPromotion,
      unit: data.unit
    })
    sheetSale.current.snapTo(0)
    refBehind.current.openBehind()
  }
  const handleCloseSale = () => {
    refBehind.current.closeBehind()
    sheetSale.current.snapTo(1)
  }
  const [moneyCart, setMoneyCart] = useConfigData(ActionName.SHOP_MONEY_CART, 0)
  return (
    <Layout screenName={'GIỎ HÀNG'} onLeft={goBack}>
      <StatusBar barStyle='dark-content'></StatusBar>
      {Carts.length !== 0 && (
        <ScrollView style={{ backgroundColor: LIGHT.background }}>
          {Carts.map((id, index) => (
            <BoxProduct key={index} id={id} onSale={() => handleOpenSale(id)} />
          ))}
        </ScrollView>
      )}
      <BehindBackground ref={refBehind} onClose={handleCloseSale} />
      <BottomSheet
        ref={sheetSale}
        onCloseEnd={handleCloseSale}
        snapPoints={[400, 0]}
        borderRadius={10}
        renderContent={() => <BottomSheetSale ref={bottomSaleRef} />}
        initialSnap={1}
        // enabledGestureInteraction
        renderHeader={() => (
          <HeaderBottomSheet onPress={handleCloseSale} title={'Khuyến mãi'} />
        )}
      />
      {getNumberCart() === 0 && <ViewNumberCartNull />}
      {getNumberCart() !== 0 && (
        <ButtonFooter>
          <BoxFooterDetails
            backgroundColor='#fff'
            title={'Tổng tiền : '}
            titleButton='Tiếp tục'
            onPressButton={() => navigate('shop_orderConfirm')}
          />
        </ButtonFooter>
      )}
    </Layout>
  )
}
const ViewNumberCartNull = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Icon
        family='MaterialCommunityIcons'
        name='cart-remove'
        size={80}
        color='gray'
      />
      <Typography color='gray' style={{ marginVertical: 10 }}>
        Giỏ hàng của bạn trống!!
      </Typography>
      <ButtonSimple
        title='Đi đến khu mua sắm'
        onPress={() => navigate('home')}
      />
    </View>
  )
}
