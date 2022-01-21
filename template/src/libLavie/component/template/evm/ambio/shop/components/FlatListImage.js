import React from 'react'

import { FlatList, Typography, SwiperMedia } from '@uiCore'
import { Block } from '@uiCore'
import { LIGHT } from '@uiCore/Theme/colors'
import { logInfo, logDebug } from '@lib/debug'

export default function FlatListImage ({ data, ...rest }) {
  logInfo('1.14', data)
  if (data.length === 0) return null
  return (
    <Block backgroundColor={LIGHT.background}>
      <SwiperMedia data={data} />
    </Block>
  )
}
// const media = [
//   {
//     type: 'video',
//     url: 'https://cvf.shopee.vn/file/KK4CvEWqs0h8yyuw'
//   },
//   {
//     type: 'image',
//     url:
//       'https://product.hstatic.net/1000345738/product/mvfish_7bcfd2dc5c38461994df8931f4846489_compact.jpg'
//   },
//   {
//     type: 'video',
//     url: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'
//   },
//   {
//     type: 'video',
//     url: 'https://cvf.shopee.vn/file/84bf2eb2e8019264ad685f098ef87a34'
//   },
//   {
//     type: 'video',
//     url: 'https://cvf.shopee.vn/file/77bec8ef2f82b3c0fd87b028cdb90701'
//   },
//   {
//     type: 'video',
//     url: 'https://www.youtube.com/watch?v=LX4xl3nrB8E'
//   }
// ]
