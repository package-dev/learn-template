import { ILoginBody } from '@/models/authenticated';
import { LOGIN_REQUEST } from '@/store/authenticated/types';

// saga dispatch actions
export const loginRequest = (payload: ILoginBody) => ({
  type: LOGIN_REQUEST,
  payload
});