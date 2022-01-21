import React from 'react'
import { Block, Typography, Icon, BasicButton, LoadingScreen } from '@uiCore'
import { useDeliveryAddress } from '../utils/util'
import { log, logDebug, logInfo } from '@lib/debug'
import { isEmpty } from 'underscore'
import { LIGHT } from '@uiCore/Theme/colors'
export default function ButtonInfoUser ({ onPress }) {
  const { data } = useDeliveryAddress()
  logInfo('#1.10', data)
  let tmp = null
  //logInfo('1..20', null)
  if (isEmpty(data)) return null
  return (
    <BasicButton
      style={{
        marginBottom: 2,
        paddingVertical: 10,
        backgroundColor: '#fff',
        paddingHorizontal: 10
      }}
      onPress={onPress}
    >
      <Block
        marginHorizontal={30}
        middle
        height={40}
        backgroundColor='#fff'
        borderBottomColor={LIGHT.default}
        borderBottomWidth={0.8}
      >
        <Typography>ĐỊA CHỈ GIAO HÀNG</Typography>
      </Block>
      <Block
        backgroundColor='#fff'
        paddingTop={15}
        paddingBottom={5}
        row
        justifyContentSB
        style={{ alignItems: 'center' }}
      >
        {data.address && (
          <Block flex paddingLeft={5}>
            <Typography size={16}>
              {data.address.name ? data.address.name : 'Chưa có thông tin'}
              {'   |   '}
              {data.address.phone ? data.address.phone : 'Chưa có thông tin'}
            </Typography>
            <Typography size={16} style={{ marginTop: 5 }}>
              {data.address.address
                ? data.address.address
                : 'Chưa có thông tin'}
            </Typography>
          </Block>
        )}
        {!data.address && (
          <Block flex paddingLeft={5}>
            <Typography size={16}>Chưa có thông tin</Typography>
          </Block>
        )}
        <BasicButton style={{ backgroundColor: '#fff' }} onPress={onPress}>
          <Icon
            family='Ionicons'
            name='chevron-forward-outline'
            color={LIGHT.default}
          />
        </BasicButton>
      </Block>
      {!data && <LoadingScreen />}
    </BasicButton>
  )
}
