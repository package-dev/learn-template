import {ACTION_NOTIFY} from '../action'
const state_noify = {
  quantity: 0,
  token: null,
}
export const GlobalNotify = (state = state_noify, action) => {
  switch (action.type) {
    case ACTION_NOTIFY.SET_ADD_NOTI:
      console.log('quantity SET_ADD_NOTI')
      return {
        ...state,
        quantity:state.quantity+1
      }
      case ACTION_NOTIFY.SET_REM_NOTI:
      console.log('quantity SET_REM_NOTI')
      return {
        ...state,
        quantity:0
      }
    case ACTION_NOTIFY.SET_TOKEN:
      console.log('SET_TOKEN')
      return {
        ...state,
        token: action.payload.token,
      }
    default:
      return state
  }
}
