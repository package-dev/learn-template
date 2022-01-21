import React from 'react';
import AppNavigation from '@/navigations';
import { Provider } from 'react-redux';
import { persistor, store } from '@/store';
import { PersistGate } from 'redux-persist/integration/react';
import '@/configs';
import BaseModal from '@/modal/modal';
import { appModal } from '@/modal';



const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AppNavigation />
        <BaseModal ref={appModal} />
      </PersistGate>
    </Provider>
  );
};

export default App;
