var pjson = require('../../package.json')
export const checkPackageName = name => {
  if (
    pjson[name] === undefined ||
    pjson[name] === null ||
    pjson[name] === false
  )
    return false
  else return true
}
