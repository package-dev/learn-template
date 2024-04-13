import Reactotron, { asyncStorage, openInEditor, overlay, trackGlobalErrors } from 'reactotron-react-native'
import { reactotronRedux } from 'reactotron-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
const reactotron = Reactotron
  .setAsyncStorageHandler(AsyncStorage) // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from
  .configure({
    name: "Building Care Admin"// "React Native Demo"
  })
  .use(openInEditor())
  .use(overlay())
  .use(asyncStorage({}))
  .use(reactotronRedux())
  .use(trackGlobalErrors({
    offline: true
  }))
  .useReactNative({
    asyncStorage: true, // there are more options to the async storage.
    networking: { // optionally, you can turn it off with false.
      // ignoreUrls: /symbolicate/
      ignoreContentTypes: /^(image)\/.*$/i,
      ignoreUrls: /\/(logs|symbolicate)$/,
    },
    editor: true, // there are more options to editor
    errors: { veto: frame => frame.fileName.indexOf('/node_modules/react-native/') >= 0 }, // or turn it off with false
    overlay: true, // just turning off overlay
  })

  .connect();
export default reactotron