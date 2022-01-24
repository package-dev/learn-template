import {store} from '@config/redux/store'

export const ACTION_NOTIFY = {
  SET_ADD_NOTI: 'SET_ADD_NOTI',
  SET_REM_NOTI: 'SET_REM_NOTI',
  SET_TOKEN: 'SET_TOKEN',
}
export const ACTION_AUTH = {
  SET_IS_AUTH: 'SET_IS_AUTH',
}
export const ACTION_ACCOUNT = {
  SET_USER: 'SET_USER',
}
export const loginSuccess = () => {
  return store.dispatch({
    type: ACTION_AUTH.SET_IS_AUTH,
    payload: {isSigned: '2'},
  })
}
export const logout = () => {
  return store.dispatch({
    type: ACTION_AUTH.SET_IS_AUTH,
    payload: {isSigned: '0'},
  })
}
