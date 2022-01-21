import React, { useState, useEffect } from 'react'
import { Block, Typography, ButtonSimple } from '@uiCore'
import { useAllCart } from '@serviceShopCart'
import { formatMoneyCarts, FormatMoney } from '../utils/util'
import { useConfigData, ActionName } from '@serviceConfig'
import { LIGHT } from '@uiCore/Theme/colors'
import { logDebug } from '@lib/debug'
export default function BoxFooterDetails ({
  title,
  tileColor,
  titleButton,
  onPressButton,
  backgroundColor
}) {
  console.log('Bottom FooterDetails')
  const Carts = useAllCart()
  const [stateMoneyCart, setStateMoneyCart] = useConfigData(
    ActionName.SHOP_MONEY_STATE,
    true
  )
  logDebug('#1.15', Carts)
  const [dola, setDola] = useState(0)
  useEffect(() => {
    setTimeout(() => {
      setDola(2)
    }, 100)
  }, [])
  return (
    <Block
      flexDirection='row'
      alignItems='center'
      justifyContent='space-between'
      paddingHorizontal={16}
      //paddingLeft={30}
      backgroundColor={backgroundColor}
      height={'100%'}
    >
      <Typography>
        <Typography style={{ fontSize: 16 }} color={tileColor}>
          {title}
        </Typography>
        <Typography
          style={{ fontWeight: 'bold', fontSize: 17 }}
          color='#FF2E00'
        >
          {'  '}
          {FormatMoney(formatMoneyCarts(Carts))}
        </Typography>
      </Typography>
      <ButtonSimple
        onPress={onPressButton}
        size={16}
        title={titleButton}
        width={120}
      />
    </Block>
  )
}

BoxFooterDetails.defaultProps = {
  title: 'Tổng tiền',
  price: 0,
  titleButton: 'Tiếp tục',
  onPressButton: null,
  backgroundColor: '#fff',
  tileColor: LIGHT.text
}
