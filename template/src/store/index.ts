import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { rootSaga } from "@/store/rootSaga";
import rootReducers from "@/store/rootReducers";

const version = 21120201;

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["authenticated"],
  version
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });

    middlewares.push(sagaMiddleware);

    if (__DEV__ && !process.env.JEST_WORKER_ID) {
      // const createDebugger = require('redux-flipper').default
      // middlewares.push(createDebugger())
    }

    return middlewares;
  },
});
sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export { store, persistor };
