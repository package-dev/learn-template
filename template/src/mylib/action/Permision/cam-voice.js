import {AlertMessage} from '@component'
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
  console.log(response)
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

          color: 'red',
          action: () =>
            openSettings().catch(() =>
              console.console.log('cannot open settings'),
            ),
          color: 'red',
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
  console.log(response)
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

          color: 'green',
          action: () =>
            openSettings().catch(() =>
              console.console.log('cannot open settings'),
            ),
          color: 'green',
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
