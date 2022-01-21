import { loginFailed, loginSuccess } from '@/store/authenticated/slices';
import { ILoginPayloadAction, LOGIN_REQUEST } from '@/store/authenticated/types';
import { call, put, takeLeading } from 'redux-saga/effects';

function* login(action: ILoginPayloadAction)
{
  try
  {
    console.log('payload: ', action.payload);
    yield put(loginSuccess());
  } catch (error) {
    yield put(loginFailed());
  }
}

const authenticatedSaga = [
  takeLeading(LOGIN_REQUEST, login),
];

export default authenticatedSaga;