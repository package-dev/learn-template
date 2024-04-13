import * as React from 'react'
import { StackActions } from '@react-navigation/native'
import { AppScreenName } from './App'
import { AuthScreenName } from './Auth'

export type SCREEN_NAME = AppScreenName | AuthScreenName


export const isReadyRef = React.createRef()
export const navigationRef: any = React.createRef()
export function navigate<T>(name: SCREEN_NAME, params: T = {} as T) {
  navigationRef.current.navigate(name, params)
}
export function goBack() {
  navigationRef.current.goBack()
}
export function replace(name: any, params = {}) {
  navigationRef.current.dispatch(StackActions.replace(name, params))
}
export function popToTop() {
  navigationRef.current.dispatch(StackActions.popToTop())
}
export function getCurrentRoute() {
  return navigationRef.current?.getCurrentRoute()
}
export const drawerRef = React.createRef<any>()
export function openDrawer() { drawerRef.current?.openDrawer() }
export function closeDrawer() { drawerRef.current?.closeDrawer() }

export const navigation = navigationRef.current

