import { __APP__, AppName } from '@api/stateApp';
import { createSlice } from '@reduxjs/toolkit';
type State = {
  state: AppName
}
const initialState: State = { state: __APP__.AUTH };

const appstate = createSlice({
  name: 'appstate',
  initialState,
  reducers: {
    switchRoute(state, action: { payload: AppName }) {
      state.state = action.payload;
      return state;
    },
  },
});
export const { switchRoute } = appstate.actions;
export default appstate.reducer;
