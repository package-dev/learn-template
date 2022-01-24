import {ACTION_AUTH} from '../action'
const state_auth = {
  isSigned: "0",
}
export const GlobalAuth = (state = state_auth, action) => {
  switch (action.type) {
    case ACTION_AUTH.SET_IS_AUTH:
      return {
        ...state,
        isSigned: action.payload.isSigned,
      }
    default:
      return state
  }
}
