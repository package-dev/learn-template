export function jsonParse(str: any, init = {}) {
  try {
    return JSON.parse(str);
  } catch (e) {
    // console.error('Error parsing JSON:', e);
    return init;
  }
}
export function jsonStringify(obj: any, init = {}) {
  try {
    return JSON.stringify(obj);
  } catch (e) {
    // console.error('Error stringifying JSON:', e);
    return init;
  }
}
export function paramsToUrl(params: any) {
  const urlParams = [];

  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      urlParams.push(`${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
    }
  }

  return urlParams.join("&");
}