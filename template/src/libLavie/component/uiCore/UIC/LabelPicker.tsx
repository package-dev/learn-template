import React, {useState, forwardRef, useImperativeHandle} from 'react'
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native'
import {Picker} from '@react-native-picker/picker'
// import {isEmpty} from 'underscore'
import ViewCoreC from './ViewCoreC'
interface Props extends ViewStyle{
  data: Array<any>
  label: string
  style: StyleProp<ViewStyle>
  valueInit: string | undefined
  styleLabel: StyleProp<ViewStyle>
  stylePicker: StyleProp<ViewStyle>
}
const LabelPicker: React.FC<Props> = (
  {data, label, style, valueInit, styleLabel, stylePicker, ...rest},
  ref,
) => {
  // if (isEmpty(data)) return null
  if (!data) return null
  const [value, setValue] = useState(valueInit ? valueInit : data[0])
  useImperativeHandle(ref, () => ({
    getValue: () => {
      return value
    },
  }))
  return (
    <ViewCoreC
      height={50}
      row
      centerHorizontal
      backgroundColor='#fff'
      borderRadius={5}
      paddingHorizontal={10}
      marginBottom={5}
      style={style}
      {...rest}>
      <Text style={[{width: 100}, styleLabel]}>{label}</Text>
      <Picker
        style={[{width: 200}, stylePicker]}
        selectedValue={value}
        onValueChange={setValue}>
        {data.map((item, index) => (
          <Picker.Item
            key={index}
            label={item ? item : ''}
            value={item ? item : ''}
          />
        ))}
      </Picker>
    </ViewCoreC>
  )
}
export default forwardRef(LabelPicker)
const styles = StyleSheet.create({})
