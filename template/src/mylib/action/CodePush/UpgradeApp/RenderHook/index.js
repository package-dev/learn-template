import React, {forwardRef, memo, useImperativeHandle} from 'react'
import {isArray, isFunction} from 'underscore'

const RenderHook = (
  {render, api, renderLoading, params, condition, convert},
  ref,
) => {
  // return null
  let useParams = isArray(params) ? params : []
  let info = isFunction(api) && api(...useParams)
  info = isFunction(convert) && shouldRender ? convert(info) : info
  let shouldRender = isFunction(condition)
    ? condition(info)
    : info != undefined && info != null

  useImperativeHandle(ref, () => ({
    api: () => {},
  }))
   
  if (shouldRender) return isFunction(render) ? render(info) : <></>
  return isFunction(renderLoading) ? renderLoading() : <></>
}

export default memo(forwardRef(RenderHook))
