import React from 'react'
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native'
type typeBg = 'red' | '#fff' | 'green' | string

type OpaqueColorValue = symbol & {__TYPE__: 'Color'}
export type ColorValue = string | OpaqueColorValue
export type Props = {
  title: string
  backgroundColor?: 'red' | '#fff' | 'green' | 'blue' | string
  onPress?: Function
  baseEnthusiasmLevel?: number
  activeOpacity?: number
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | undefined
  children?: React.ReactNode
  colorText?: '#ffffff' | '#B31616' | '#16B316' | '#1626B3' | undefined
}

const Button: React.FC<Props> = ({
  title,
  baseEnthusiasmLevel = 0,
  activeOpacity,
  justifyContent,
  backgroundColor,
  onPress,
  colorText = '#16B316',
  ...rest
}) => {
  return (
    <TouchableOpacity
      activeOpacity={activeOpacity}
      style={{
        width: 200,
        height: 50,
        backgroundColor: backgroundColor,
        ...rest,
      }}>
      <Text style={{color: colorText}}>{title}</Text>
    </TouchableOpacity>
  )
}
export default Button
const styles = StyleSheet.create({
  sad: {justifyContent: 'center'},
  co: {
    color: 'red',
  },
})
type Falsy = undefined | null | false
interface RecursiveArray<T>
  extends Array<T | ReadonlyArray<T> | RecursiveArray<T>> {}
/** Keep a brand of 'T' so that calls to `StyleSheet.flatten` can take `RegisteredStyle<T>` and return `T`. */
type RegisteredStyle<T> = number & {__registeredStyleBrand: T}
export type StyleProp<T> =
  | T
  | RegisteredStyle<T>
  | RecursiveArray<T | RegisteredStyle<T> | Falsy>
  | Falsy

export function fs (props: Props) {
  return <></>
}
