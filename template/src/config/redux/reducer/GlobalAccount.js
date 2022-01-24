import {ACTION_ACCOUNT} from '../action'
const init_state = {
  dataUser: null,
}
export const GlobalAccount = (state = init_state, action) => {
  switch (action.type) {
    case ACTION_ACCOUNT.SET_USER:
      return {
        ...state,
        dataUser: action.payload.dataUser,
      }
    default:
      return state
  }
}
