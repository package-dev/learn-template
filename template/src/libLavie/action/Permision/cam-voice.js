import {AlertMessage} from '@component'
import {COLOR} from '@res'
import { log } from '@utils'
import Permissions, {
  requestNotifications,
  check,
  PERMISSIONS,
  request,
  RESULTS,
  openSettings,
} from 'react-native-permissions'

export async function checkPermissionsCamera () {
  let response = await check(PERMISSIONS.ANDROID.CAMERA) // <-- always blocked
  log(response)
  if (response === RESULTS.BLOCKED) {
    AlertMessage.show({
      title: 'Thông báo',
      message: 'Bạn cần cho phép ứng dụng sử dụng camera',
      buttons: [
        {
          name: 'Hủy',
          action: () => {},
          color: '#000',
        },
        {
          name: 'Đồng ý',

          color: COLOR.green1,
          action: () =>
            openSettings().catch(() => console.log('cannot open settings')),
          color: COLOR.yesAlert,
        },
      ],
    })
  }
  //get by
  let isPermissionsGranted = false
  if (response === RESULTS.GRANTED) {
    isPermissionsGranted = true
  } else if (response === RESULTS.DENIED) {
    response = request(PERMISSIONS.ANDROID.CAMERA, {
      title: 'EVN requires permission,...',
      message:
        'EVN needs access to your location so you can see your position,...',
      buttonPositive: 'Ok',
      buttonNegative: "Don't show my position,....",
    })

    if (response === RESULTS.GRANTED) {
      isPermissionsGranted = true
    } else if (response === RESULTS.DENIED) {
      await openSettings()
    }
  }

  return isPermissionsGranted
}
export async function checkPermissionsVoice () {
  let response = await check(PERMISSIONS.ANDROID.RECORD_AUDIO) // <-- always blocked
  log(response)
  if (response === RESULTS.BLOCKED) {
    AlertMessage.show({
      title: 'Thông báo',
      message: 'Bạn cần cho phép ứng dụng sử dụng micro',
      buttons: [
        {
          name: 'Hủy',
          action: () => {},
          color: '#000',
        },
        {
          name: 'Đồng ý',

          color: COLOR.green1,
          action: () =>
            openSettings().catch(() => console.log('cannot open settings')),
          color: COLOR.yesAlert,
        },
      ],
    })
  }
  //get by
  let isPermissionsGranted = false
  if (response === RESULTS.GRANTED) {
    isPermissionsGranted = true
  } else if (response === RESULTS.DENIED) {
    response = request(PERMISSIONS.ANDROID.RECORD_AUDIO, {
      title: 'EVN requires permission,...',
      message:
        'EVN needs access to your location so you can see your position,...',
      buttonPositive: 'Ok',
      buttonNegative: "Don't show my position,....",
    })

    if (response === RESULTS.GRANTED) {
      isPermissionsGranted = true
    } else if (response === RESULTS.DENIED) {
      await openSettings()
    }
  }

  return isPermissionsGranted
}
