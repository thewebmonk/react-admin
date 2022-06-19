import axios, { AxiosRequestConfig, Method, ResponseType } from 'axios';
import { trackPromise } from 'react-promise-tracker';
import { apiUrl } from './config';

type BaseAPICallType = {
  url: string;
  method: Method;
  authToken?: string;
  payload?: unknown;
  doNotShowloader?: boolean;
  responseType?: ResponseType;
};

const post = (url: string, payload?: unknown, authToken?: string, doNotShowloader?: boolean) => {
  return baseAPICall({ url, payload, authToken, method: 'POST', doNotShowloader });
};
const put = (url: string, payload?: unknown, authToken?: string, doNotShowloader?: boolean) => {
  return baseAPICall({ url, payload, authToken, method: 'PUT', doNotShowloader });
};
const deleteRe = (url: string, payload?: unknown, authToken?: string, doNotShowloader?: boolean) => {
  return baseAPICall({ url, payload, authToken, method: 'DELETE', doNotShowloader });
};
const get = (url: string, authToken?: string, doNotShowloader?: boolean) => {
  return baseAPICall({ url, authToken, method: 'GET', doNotShowloader });
};
const baseAPICall = (data: BaseAPICallType) => {
  const { url, method, authToken, payload, doNotShowloader, responseType } = data;
  const option: AxiosRequestConfig = {
    method: method as string,
    url,
    responseType: responseType || 'json',
    baseURL: apiUrl,
    data: payload ? payload : undefined,
    headers: {
      'Content-type': 'application/json',
      ...(authToken && { Authorization: `Bearer ${authToken}` })
    }
  };
  return doNotShowloader ? axios(option) : trackPromise(axios(option as AxiosRequestConfig));
};

export { post, get, put, deleteRe };
