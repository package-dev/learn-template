import * as React from 'react';
import { StackActions } from '@react-navigation/native';
export const isReadyRef = React.createRef();

export const navigationRef = React.createRef();
export function navigate(name, params = {}) {
  navigationRef.current.navigate(name, params);

}
export function goBack() {
  navigationRef.current.goBack();
}
export function replace(name, params = {}) {
  navigationRef.current.dispatch(
    StackActions.replace(name, params))

}
export function popToTop() {
  navigationRef.current.dispatch(
    StackActions.popToTop())

}
export const navigation =navigationRef.current;
//NavigationContainer
// ref={navigationRef}
// onReady={() => (isReadyRef.current = true)}