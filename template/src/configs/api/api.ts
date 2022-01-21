import axios, { AxiosRequestHeaders } from 'axios';
import { API_ROOT, TIME_OUT } from '@/configs/constants/api';

const instance = axios.create({
  baseURL: API_ROOT,
  timeout: TIME_OUT,
});

export function setDefaultHeaders(headers: AxiosRequestHeaders) {
  Object.keys(headers).forEach(key => {
    instance.defaults.headers.common[key] = headers[key];
  });
}

instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error?.response?.status === 401) {
      setDefaultHeaders({ Authorization: '' });
    }
    return error;
  },
);

export default instance;
