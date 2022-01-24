import {formatTotalCart, log} from '@utils'
import {all, call, put, select, takeEvery, takeLatest} from 'redux-saga/effects'

import AsyncStorage from '@react-native-async-storage/async-storage'
export function * setIsSignedCache ({payload}) {
  try {
    console.log('payload', payload.isSigned)
    AsyncStorage.setItem('@isSigned', payload.isSigned.toString())
  } catch (e) {
    log(e)
  }
}
export function * getIsSignedCache () {
  try {
    log('getTokenStorage')
    const account = yield AsyncStorage.getItem('account')
    if (account !== null) {
      const data = JSON.parse(account)
      yield put({
        type: 'SET_TOKEN',
        payload: {token: data.token},
      })
      yield put({
        type: 'SET_USER_DATA',
        payload: {user_data: data.user_data},
      })
    }
  } catch (e) {
    log(e)
  }
}

export function * authSaga () {
  yield takeEvery('SET_IS_AUTH', setIsSignedCache)
  yield takeEvery('CHECK_JOINT_APP', getIsSignedCache)
}
