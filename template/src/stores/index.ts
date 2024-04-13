import { configureStore, combineReducers } from '@reduxjs/toolkit'
import appstate from './appstate'
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage'
// Redux Persist configuration
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // blacklist: ['appstate']
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    appstate,
  })
);
const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,

    }),
})
const storeData = store.getState()
const persistor = persistStore(store);

export { persistor };
export { storeData }
export default store
export type StoreType = ReturnType<typeof store.getState>
export { useStoreApp } from '@utils/useStoreApp'