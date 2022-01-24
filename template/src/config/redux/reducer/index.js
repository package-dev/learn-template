import {GlobalNotify} from './GlobalNotify'
import {GlobalAuth} from './GlobalAuth'
import {GlobalAccount} from './GlobalAccount'
const reducers = {
  GlobalNotify,
  GlobalAuth,
  GlobalAccount
}



import {combineReducers} from 'redux'
export const reducer = combineReducers(reducers)
