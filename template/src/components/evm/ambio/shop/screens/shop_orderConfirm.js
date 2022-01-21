import React from 'react'
import { ScrollView, Linking } from 'react-native'
import {
  Layout,
  Header,
  ButtonFooter,
  AlertMessage,
  BasicButton,
  Icon
} from '@uiCore'
import { useAllCart, delAllCart } from '@serviceShopCart'
import {
  BoxProductBasic,
  BoxFooterDetails,
  ButtonInfoUser
} from '../components'
import { navigate, goBack } from '@lib/rootNavigation'
import { logInfo, logDebug } from '@lib/debug'
import { useDeliveryAddress, formatDataOrder } from '../utils/util'
import { orderProduct } from '../utils/API'
import { reset } from '@lib/service/shopCart/shopCartStore'
import { LIGHT } from '@uiCore/Theme/colors'
import { isEmpty } from 'underscore'

export default function index () {
  const Carts = useAllCart()
  const { data } = useDeliveryAddress()
  const endOfOrder = async () => {
    if (
      isEmpty(data) ||
      isEmpty(data.address) ||
      isEmpty(data.address.name) ||
      isEmpty(data.address.phone) ||
      isEmpty(data.address.address) ||
      (data.address.name && data.address.name.trim() === '') ||
      (data.address.phone && data.address.phone.trim() === '') ||
      (data.address.address && data.address.address.trim() === '')
    )
      return AlertMessage.show({
        title: 'Thông báo',
        message:
          'Chưa có thông tin mua hàng, bạn vui lòng nhập thông tin mua hàng!',
        buttons: [
          {
            name: 'Đóng',
            action: () => {} //navigate('home')
          },
          {
            name: 'Nhập thông tin',
            delay: 0,
            color: LIGHT.title,
            action: () => navigate('shop_userInfo')
          }
        ]
      })
    let dataFormat = formatDataOrder(data.address)

    let result = await orderProduct(dataFormat)
    logInfo('result', result)

    if (!result)
      return AlertMessage.show({
        title: 'Thông báo!',
        message: 'Quá trình xử lý xảy ra lỗi, vui lòng thử lại sau!',
        buttons: [
          {
            name: 'Quay về trang chủ',
            action: () => navigate('home')
          },
          {
            name: 'Đồng ý',
            delay: 0,
            color: LIGHT.danger,
            action: () => {}
          }
        ]
      })
    delAllCart()
    navigate('shop_orderNotice')
  }

  return (
    <Layout
      onLeft={goBack}
      screenName={'Đặt hàng'}
      right={() => (
        <BasicButton
          style={{ marginRight: 15 }}
          onPress={() => Linking.openURL('tel:0941777588')}
        >
          <Icon
            family='MaterialCommunityIcons'
            color='#fff'
            name='phone'
            size={25}
          />
        </BasicButton>
      )}
    >
      <ScrollView style={{ paddingHorizontal: 2 }}>
        <ButtonInfoUser onPress={() => navigate('shop_userInfo')} />
        {Carts.map((id, index) => (
          <BoxProductBasic key={index} id={id} />
        ))}
      </ScrollView>
      <ButtonFooter>
        <BoxFooterDetails
          title={'Tổng tiền : '}
          onPressButton={endOfOrder}
          titleButton={'Đặt hàng'}
        />
      </ButtonFooter>
    </Layout>
  )
}
