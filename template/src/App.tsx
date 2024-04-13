import React from 'react'
import { Provider } from 'react-redux'
import CodePush from 'react-native-code-push'
import { PersistGate } from 'redux-persist/integration/react';
/******** react-native-exception-handle ************************ */
import {
  setJSExceptionHandler,
  setNativeExceptionHandler,
} from 'react-native-exception-handler'
import { Alert } from 'react-native'
import store, { persistor } from '@stores'
import { Navigation } from './navigation';

const errorHandler = (e: Error, isFatal: boolean) => {
  if (isFatal) {
    Alert.alert('Error', `${isFatal ? 'Fatal:' : ''} ${e.name} ${e.message}`, [
      {
        text: 'Close',
      },
    ])
  } else {
  }
}
setJSExceptionHandler(errorHandler, true)

setNativeExceptionHandler(errorString => {
  console.log('setNativeExceptionHandler')
})
/******************************************** */
if (__DEV__) {
  import('./utils/ReactotronConfig').then(() =>

    console.log(':::Reactotron Configured:::'),
  )
}
let CodePushOptions = {
  checkFrequency: CodePush.CheckFrequency.MANUAL,
}
function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* <SafeAreaProvider>
          <SafeAreaView style={{ flex: 1 }} forceInset={{ bottom: 'never' }}> */}
        <Navigation />
        {/* </SafeAreaView>
        </SafeAreaProvider> */}
      </PersistGate>
    </Provider>
  )
}
export default CodePush(CodePushOptions)(App)
// export default App
