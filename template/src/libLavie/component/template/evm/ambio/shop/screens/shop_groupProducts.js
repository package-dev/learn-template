import React, { useState, useEffect } from 'react'
import { Block, Layout, FlatList, Typography, LoadingScreen } from '@uiCore'
import { ItemProduct, HeaderSearch } from '../components'
import { Dimensions } from 'react-native'
import { searchProduct } from '../utils/API'
import { useProduct } from '../utils/util'
import { navigate, replace, goBack } from '@lib/rootNavigation'
import { logInfo } from '@lib/debug'
export default function shop_groupProducts ({ route }) {
  const { key } = route.params
  logInfo('key', key)
  logInfo('shop_groupProducts')

  const [data, setData] = useState(null)
  useEffect(() => {
    logInfo('useEffect')
    if (key) searchProduct(key).then(r => setData(r.products))
  }, [])

  return (
    <Layout
      customHeader={() => (
        <HeaderSearch
          back={true}
          title={key ? key : 'Mặt hàng phổ biến'}
          onPressSearch={() =>
            replace('shop_searchProduct', { keyOld: key ? key : '' })
          }
          onPressRight={() => navigate('shop_carts')}
          onBack={() => navigate('home')}
        />
      )}
    >
      {key && (
        <Block flex={1}>
          {data !== null && (
            <FlatList
              data={data}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <ItemProduct
                  item={item}
                  onPress={() =>
                    navigate('shop_productDetails', { idProduct: item.id })
                  }
                />
              )}
              numColumns={2}
              ListEmptyComponent={() => (
                <Block middle height={Dimensions.get('window').width}>
                  <Typography color='gray'>Không có dữ liệu</Typography>
                </Block>
              )}
            />
          )}
          {data === null && (
            <Block height={500}>
              <LoadingScreen />
            </Block>
          )}
        </Block>
      )}
      {!key && <PopularProduct />}
    </Layout>
  )
}
const PopularProduct = () => {
  const { data, refreshing, onRefresh } = useProduct(2)
  return (
    <Block>
      {data !== null && (
        <FlatList
          data={data}
          refreshing={refreshing}
          onRefresh={onRefresh}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <ItemProduct
              item={item}
              onPress={() =>
                navigate('shop_productDetails', { idProduct: item.id })
              }
            />
          )}
          numColumns={2}
          ListEmptyComponent={() => (
            <Block middle height={Dimensions.get('window').width}>
              <Typography color='gray'>Không có dữ liệu</Typography>
            </Block>
          )}
        />
      )}
      {data === null && (
        <Block height={500}>
          <LoadingScreen />
        </Block>
      )}
    </Block>
  )
}
