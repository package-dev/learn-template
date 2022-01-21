import React, { useState, forwardRef, useImperativeHandle } from 'react'
import { Dimensions } from 'react-native'
import {
  Block,
  ButtonSimple,
  Typography,
  Icon,
  Table,
  TableWrapper,
  Row,
  Rows
} from '@uiCore'
import { formatDataSale } from '../utils/util'
import { log, logDebug, logInfo } from '@lib/debug'
import { LIGHT } from 'src/uiCore/Theme/colors'
const BottomSheetSale = forwardRef(({ props }, ref) => {
  const [dataSale, setDataSale] = useState([])
  const [unit, setUnit] = useState('')
  useImperativeHandle(ref, () => ({
    setValue (item) {
      setDataSale(item.promotion.quantity)
      setUnit(item.unit)
    }
  })) 
  return (
    <Block
      style={{
        backgroundColor: LIGHT.background,
        minHeight: 500
      }}
    >
      <Block
        style={{
          backgroundColor: LIGHT.background,
          borderBottomWidth: 1,
          borderColor: LIGHT.card
        }}
      >
        <TableWrapper
          borderStyle={{
            borderWidth: 1,
            borderColor: 'rgba(200,200,200,0.5)'
          }}
        >
          <Row
            widthArr={[0.3 * width, 0.3 * width, 0.4 * width]}
            textStyle={{
              fontSize: 16,
              textAlign: 'center',
              fontWeight: 'bold'
            }}
            style={{ height: 45, backgroundColor: 'white' }}
            data={['Số lượng', 'Chiết khấu', 'Tặng']}
          />
          {formatDataSale(dataSale, unit).map((item, index) => (
            <Row
              key={index}
              data={item}
              widthArr={[0.3 * width, 0.3 * width, 0.4 * width]}
              height={45}
              style={[index % 2 === 1 && { backgroundColor: 'white' }]}
              textStyle={{ fontSize: 16, textAlign: 'center' }}
            />
          ))}
        </TableWrapper>
      </Block>
    </Block>
  )
})
export default BottomSheetSale
const { width } = Dimensions.get('window')
