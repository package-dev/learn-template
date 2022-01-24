import { all } from 'redux-saga/effects';
import {authSaga} from './authSaga'
const rootSaga = function * rootSaga () {
  yield all([authSaga()])
}
export default rootSaga
