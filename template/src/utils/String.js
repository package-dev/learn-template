import {isEmpty, isString} from 'underscore'
export const fUpperCase = str => {
  if (isEmpty(str) || !isString(str)) return null
  return str.toUpperCase()
}
