import { IAuthenticatedState } from '@/store/authenticated/types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: IAuthenticatedState = { isAuthenticated: false };

const authenticatedSlice = createSlice({
  name: 'authenticated',
  initialState,
  reducers: {
    loginSuccess: state => ({ ...state, isAuthenticated: true }),
    loginFailed: state => ({ ...state, isAuthenticated: false }),
  }
});

export const { loginSuccess, loginFailed } = authenticatedSlice.actions;
const authenticated = authenticatedSlice.reducer;
export default authenticated;