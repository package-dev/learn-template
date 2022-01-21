import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
  useEffect
} from 'react'
import { StyleSheet, FlatList, Animated } from 'react-native'
import { Block, BasicButton, Icon, Typography } from '@uiCore'
import { useConfigData, ActionName, getData } from '@serviceConfig'
import { ItemTypeProduct } from '../components'
import { LIGHT } from '@uiCore/Theme/colors'
import { logInfo, logDebug } from '@lib/debug'
import { getRefF, heightHeader, heightBoxHeader ,setRefTop} from '../utils/util'
const HeaderHorizontal = ({
  y,
  data,
  animated,
  type,
  onPressBox,
  title,
  nameIcon,
  colorText,
  colorIcon,
  backgroundBox,
  heightBox,
  onScroll,
  onScrollEndDrag,
  refH
}) => {
  if (animated) {
    logInfo('2.6', 'HeaderHorizontal-animated')
    return (
      <Animated.View
        style={[
          styles.container,
          {
            height: heightHeader,
            opacity: y,
            transform: [{ scaleY: y }]
          }
        ]}
      >
        <FlatListHeader
          data={data}
          onScroll={onScroll}
          refH={refH}
          onScrollEndDrag={onScrollEndDrag}
        />
      </Animated.View>
    )
  }
  if (type === 'basic') {
    return (
      <BasicButton
        style={[
          {
            height: heightBox,
            backgroundColor: backgroundBox
          },
          styles.boxBasicHeader
        ]}
        onPress={onPressBox}
      >
        <Typography size={16} style={{ marginHorizontal: 5 }} color={colorText}>
          {title}
        </Typography>
        <Icon family={'Ionicons'} name={nameIcon} size={22} color={colorIcon} />
      </BasicButton>
    )
  }
  return (
    <Block
      style={{ height: heightHeader, marginHorizontal: 0 }}
      backgroundColor='#fff'
    >
      <FlatListHeader
        refH={refH}
        data={data}
        onScroll={onScroll}
        onScrollEndDrag={onScrollEndDrag}
      />
    </Block>
  )
}
const FlatListHeader = React.memo(
  ({ data, onScroll, onScrollEndDrag, refH }) => {
    logInfo('2.3', 'FlatListHeader-Horizontal')
    const [type_category, setTypeCategory] = useConfigData(
      ActionName.SHOP_TYPE_CATEGORY,
      { key: 0, state: true }
    )

    const clickTypeProduct = (index, key) => {
      logDebug('2.7', 'setTypeCategory')
      setRefTop(true)
      setTypeCategory({ key: key, state: false })
    }
    const formatBackgroundColor = key => {
      if (type_category.state) {
        return key === 0 ? LIGHT.primary : LIGHT.border
      }
      return key === type_category.key ? LIGHT.primary : LIGHT.border
    }
    return (
      <FlatList
        ref={refH}
        onScroll={onScroll}
        onScrollEndDrag={onScrollEndDrag}
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <ItemTypeProduct
            onPress={() => clickTypeProduct(index, item.key)}
            item={item}
            backgroundColor={formatBackgroundColor(item.key)}
          />
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.boxFlatList}
      />
    )
  }
)

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
HeaderHorizontal.defaultProps = {
  listTypeProduct: [],
  y: null,
  title: 'title',
  onPressBox: null,
  nameIcon: 'home',
  colorText: LIGHT.primary,
  colorIcon: LIGHT.primary,
  backgroundBox: '#fff',
  heightBox: 30,
  animated: false
}
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 0,
    backgroundColor: '#fff',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0
  },
  boxFlatList: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    alignItems: 'center'
  },
  boxBasicHeader: {
    paddingHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'row'
  }
})
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export default HeaderHorizontal
