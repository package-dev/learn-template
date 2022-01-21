import React from 'react'
import { Layout, Block, Typography, Icon } from '@uiCore'
import { navigate } from '@lib/rootNavigation'
export default function index () {
  return (
    <Layout
      screenName={'Đặt hàng thành công'}
      onLeft={() => navigate('home')}
      style={{ paddingTop: 100 }}
    >
      <Block marginHorizontal={20} middle>
        <Icon
          family={'MaterialIcons'}
          name='check-circle'
          color='#15ca72'
          size={80}
        />

        <Typography style={{ marginTop: 40 }} size={17} center>
          Chúc mừng bạn đã đặt hàng thành công
        </Typography>
        <Typography center style={{ marginTop: 30 }}>Chúng tôi sẽ liên lạc với bạn để xác nhận đơn hàng trong thời gian gần nhất</Typography>
      </Block>
    </Layout>
  )
}
