import React from 'react'
import CodePush from 'react-native-code-push'
import UpgradeApp from './UpgradeApp'
let CodePushOptions = {
  checkFrequency: CodePush.CheckFrequency.MANUAL,
}
function MyCodePush ({children}) {
  return (
    <>
      <>{children}</>
      <UpgradeApp />
    </>
  )
}
export default CodePush(CodePushOptions)(MyCodePush)
