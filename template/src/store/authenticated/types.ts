import { ILoginBody } from '@/models/authenticated';
import { PayloadAction } from '@reduxjs/toolkit';

// saga action defined
export const LOGIN_REQUEST = 'LOGIN_REQUEST';

// store interface
export interface IAuthenticatedState
{
  isAuthenticated: boolean
}

type PayloadActionA = Pick<PayloadAction, Exclude<keyof PayloadAction, 'payload'>>;

export interface ILoginPayloadAction extends PayloadActionA
{
  payload: ILoginBody
}