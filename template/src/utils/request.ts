import {stringify} from 'query-string';

export function buildURL(url: string, params?: string) {
  let _url = url;
  if (params) {
    _url += /\?/.test(url) ? '&' : '?';
    if (typeof params === 'object') {
      _url += stringify(params);
    } else {
      _url += params;
    }
  }
  return _url;
}
