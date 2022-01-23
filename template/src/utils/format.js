export function formatSizeUnits (bytes) {
  if (bytes >= 1073741824) {
    bytes = (bytes / 1073741824).toFixed(2) + ' GB'
  } else if (bytes >= 1048576) {
    bytes = (bytes / 1048576).toFixed(2) + ' MB'
  } else if (bytes >= 1024) {
    bytes = (bytes / 1024).toFixed(2) + ' KB'
  } else if (bytes > 1) {
    bytes = bytes + ' bytes'
  } else if (bytes == 1) {
    bytes = bytes + ' byte'
  } else {
    bytes = '0 bytes'
  }
  return bytes
}
/**depen */
import moment from 'moment'
export const fmCreateDate = (str, type = 'MM/DD/YYYY HH:mm:ss') => {
  if (isEmpty(str)) return null
  let tmp = str.replace(/[^0-9]/g, '')
  return moment(new Date(Number(tmp))).format(type)
}
