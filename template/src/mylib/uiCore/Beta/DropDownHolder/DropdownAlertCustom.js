import {DropDownHolder} from './index'
import React from 'react'
import DropdownAlert from 'react-native-dropdownalert'
const time_drop = 1000
export default function DropdownAlertCustom ({...rest}) {
  return (
    <DropdownAlert
      ref={ref => DropDownHolder.setDropDown(ref)}
      inactiveStatusBarBackgroundColor={'green'}
      // updateStatusBar={false}

      infoColor={'#719AE6'}
      infoImageSrc={require('@image/logo.jpg')}
      imageStyle={{
        padding: 8,
        width: 36,
        height: 36,
        alignSelf: 'center',
        borderRadius: 23,
      }}
      elevation={40}
      containerStyle={{backgroundColor: 'pink'}}
      closeInterval={time_drop}
      // showCancel={true}
    />
  )
}
