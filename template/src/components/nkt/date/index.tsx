import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { WrappedFieldInputProps } from 'redux-form';
import { Button, Text } from '..';
import {
  FONT_14,

  FONT_18
} from '../../../themes/fontSize';
interface DatePickerProps {
  input: WrappedFieldInputProps;
  onPress: (value: number) => void;
  label: string;
  placeholder: string;
  format: string;
  selected: boolean;
  tx: string;
  valueSelected: String;
  styleContainer: ViewPropTypes
}
const styles = StyleSheet.create({
  viewBottom: {
    // flexDirection: 'row',
    width: '100%',
    // alignItems: 'center',
    justifyContent: 'center',
    // paddingHorizontal: 10,
    marginVertical: 10,
  },
  viewLeft: {
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'center',
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    height: 50,
    elevation: 5,
    overflow: 'visible',
    width: '100%',
    // paddingVertical: 10,
    // marginHorizontal: 3,
    flex: 1,
    flexDirection: 'row',
  },
  textDate: {
    color: '#333333',
    fontSize: FONT_14,
    fontStyle: 'normal',
    flex: 0.5,
    flexDirection: 'row'
  },

  textStartDate: {
    flex: 0.5,
    color: '#000000',
    fontSize: FONT_14,
    opacity: 0.8,
    fontStyle: 'normal',
    flexDirection: 'row'

  },

})
export const DatePicker: React.FC<DatePickerProps> = (props) => {
  const {
    onConfirm,
    label,
    placeholder,
    format
  } = props;
  const { tx, onPress, selected, valueSelected, styleContainer, input: { onChange, value }, defaultValue  } = props;
  const [dateSelected, setDate] = useState(null);
  const [isShowPicker, setIsShowPicker] = useState(false)

  useEffect(() => {
    onChange(valueSelected);
  }, [valueSelected]);

  useEffect(() => {
    onChange(value);
    setDate(value == '' ? null : value)
  }, [value]);

  const togglePicker = (flag) => {
    flag = flag == null ? !isShowPicker : flag;
    setIsShowPicker(flag);
  }

  const _onConfirm = (date) => {
    setIsShowPicker(false);
    setDate(date);
    onChange(date);
  
  };
  const _onCancel = () => {
    setIsShowPicker(false);
  }

  return (
    <>
      <DateTimePickerModal
        isVisible={isShowPicker}
        mode="date"
        locale="vi_VN"
        onConfirm={_onConfirm}
        onCancel={_onCancel}
      />
      <View style={styles.viewBottom}>
        {
          (label || '') != '' &&

          <Text style={styles.textStartDate}>{}</Text>
        }
        <Button style={[
          styles.viewLeft,
          (label || '') != '' ? {
            marginTop: 5,
          } : {}
        ]} onPress={togglePicker}
        >
          {
            dateSelected === null ?
              <Text style={{
                color: '#828282'
              }}>
                {defaultValue ? moment(defaultValue).format(format || 'DD/MM/YYYY') : placeholder || 'Chọn'}
              </Text>
              :
              <Text style={styles.textDate}>
                {moment(dateSelected).format(format || 'DD/MM/YYYY')}
              </Text>
          }
        </Button>
      </View>
    </>
  )
}
