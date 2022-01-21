import {Alert} from 'react-native'
import {AlertMessage} from '../../component'
/**
 *
 * @param {String} value
 * @returns
 */
export const checkValidatePhone = (value: string) => {
  const checkPhone = /((09|03|07|08|05)+([0-9]{8})\b)/g
  if (!checkPhone.test(value)) return false
  return true
}
/**
 *
 * @param {String} value
 * @returns
 */
export const checkValidatePassword = (value: string) => {
  const checkPass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}/
  if (!checkPass.test(value)) return false
  return true
}
/**
 *
 * @param {String} value
 * @returns
 */
export const checkValidateEmail = (email: string) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}
export const ToastNull = (title: string) => {
  return AlertMessage.show({
    title: 'Cảnh báo',
    message: title + ' không được để trống !',
    buttons: [
      {
        name: 'Đóng',
        action: () => {},
        color: '#000',
      },
      {
        name: 'Nhập thông tin',
        delay: 0,
        color: 'blue',
        action: () => {},
      },
    ],
  })
}

export const ToastInvalid = (title: string) => {
  Alert.alert('Cảnh báo', title, [
    {
      text: 'Hủy',
      style: 'cancel',
    },
    {text: 'Đồng ý', onPress: () => console.log('OK Pressed')},
  ])
}
