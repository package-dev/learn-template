import React from 'react'
import {Provider} from 'react-redux'
import {Navigation} from '@config/navigation'
// import {store} from '@config-redux/store'
// import {AlertMessage, LoadingEVN} from '@component'
// import {DropdownAlertCustom} from '@utils'
export default function App () {
  // return (
  //    <Provider store={store}>
  //     <Navigation />
  //      <AlertMessage ref={ref => AlertMessage.setRef(ref)} />
  //     <LoadingEVN ref={ref => LoadingEVN.setRef(ref)} />
  //     <DropdownAlertCustom /> 
  //   </Provider>
  // )
  return(
    <Navigation />
  )
}
