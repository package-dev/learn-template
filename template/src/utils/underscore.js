function isEmpty (obj) {
  if (obj == null) return true
  // Skip the more expensive `toString`-based type checks if `obj` has no
  // `.length`.
  var length = getLength(obj)
  if (
    typeof length == 'number' &&
    (isArray(obj) || isString(obj) || isArguments$1(obj))
  )
    return length === 0
  return getLength(keys(obj)) === 0
}
