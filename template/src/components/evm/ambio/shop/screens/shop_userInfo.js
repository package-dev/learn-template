import React, { useRef } from 'react'
import { ScrollView } from 'react-native'
import { Layout, Block, Input, AlertMessage } from '@uiCore'
import { goBack } from '@lib/rootNavigation'
import { getNameError, getPhoneError, getEmptyError } from '@lib/until'
import { useDeliveryAddress } from '../utils/util'
import { saveDeliveryAddress } from '../utils/API'
import { LIGHT } from 'src/uiCore/Theme/colors'
import { isEmpty } from 'underscore'
export default function shop_userInfo () {
  const _inputName = useRef(undefined)
  const _inputPhone = useRef(undefined)
  const _inputAddress = useRef(undefined)
  const { data } = useDeliveryAddress()
  if (isEmpty(data)) return null
  const handleOnBack = async () => {
    let name = _inputName.current.getValue().value
    let phone = _inputPhone.current.getValue().value
    let address = _inputAddress.current.getValue().value
    if (
      isEmpty(name) ||
      isEmpty(phone) ||
      isEmpty(address) ||
      name.trim() === '' ||
      phone.trim() === '' ||
      address.trim() === ''
    )
      await AlertMessage.show({
        title: 'Thông báo',
        message: 'Bạn cần nhập đầy đủ thông tin!',
        buttons: [
          {
            name: 'Hủy',
            color: LIGHT.danger,
            action: () => goBack()
          },
          {
            name: 'Đồng ý',
            delay: 0,
            action: () => {}
          }
        ]
      })
    else {
      await saveDeliveryAddress(name, phone, address)
      await goBack()
    }
  }

  return (
    <Layout
      screenName={'THÔNG TIN'}
      onLeft={handleOnBack}
      style={{ paddingTop: 20 }}
    >
      <ScrollView>
        <Input
          // labelStyle={{ marginBottom: 2, textAlign: 'left', marginLeft: 10 }}
          // label='Họ và tên'
          placeholder={'Họ và tên'}
          ref={_inputName}
          defaultValue={
            data
              ? data.address
                ? data.address.name
                  ? data.address.name
                  : ''
                : ''
              : ''
          }
          condition={getNameError}
        />
        <Input
          // labelStyle={{ marginBottom: 2, textAlign: 'left', marginLeft: 10 }}
          // label='Số điện thoại'
          placeholder={'Số điện thoại'}
          ref={_inputPhone}
          defaultValue={
            data
              ? data.address
                ? data.address.phone
                  ? data.address.phone
                  : ''
                : ''
              : ''
          }
          condition={getPhoneError}
          keyboardType='numeric'
        />
        <Input
          // labelStyle={{ marginBottom: 2, textAlign: 'left', marginLeft: 10 }}
          // label='Địa chỉ'
          placeholder={'Địa chỉ'}
          ref={_inputAddress}
          defaultValue={
            data
              ? data.address
                ? data.address.address
                  ? data.address.address
                  : ''
                : ''
              : ''
          }
          condition={r => getEmptyError(r, 'Địa chỉ')}
          numberOfLines={6}
          multiline={true}
          style={{height: 100}}
        />
      </ScrollView>
    </Layout>
  )
}
