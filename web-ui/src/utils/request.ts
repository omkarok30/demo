import axios, { AxiosPromise, AxiosRequestConfig, AxiosResponse } from 'axios';
import { notification } from 'antd';
import _ from 'lodash';
import settings from '@/config/settings';
import { getToken } from '@/utils/localToken';
import { isEmptyValue } from '@/utils/object';
import { useGlobalState } from '@/store/global';

const apiVersion = import.meta.env.VITE_APP_API_VERSION || '';

export interface RestRequestConfig extends AxiosRequestConfig {
  usingMain?: boolean;
  useMock?: boolean;
}

export interface ResponseData<T = unknown> {
  code: number;
  data?: T;
  msg?: string;
}

const customCodeMessage: { [key: number]: string } = {
  10002: 'The current user login information is invalid, please log in again and try again', // not logged in
  100005: 'Database Error',
};

const serverCodeMessage: { [key: number]: string } = {
  200: 'The server successfully returned the requested data',
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  500: 'Server error, please check server(Internal Server Error)',
  502: 'Gateway error(Bad Gateway)',
  503: 'The service is unavailable, the server is temporarily overloaded or maintained(Service Unavailable)',
  504: 'Gateway timed out(Gateway Timeout)',
};

// axios exception handler
const errorHandler = (error: any) => {
  const { response, message } = error;
  debugger;
  if (message === 'CustomError') {
    // custom error
    const { config, data } = response;
    const { url, baseURL } = config;
    const { code, msg } = data;
    const reqUrl = url.split('?')[0].replace(baseURL, '');
    const noVerifyBool = settings.ajaxResponseNoVerifyUrl.includes(reqUrl);
    if (!noVerifyBool) {
      notification.error({
        message: customCodeMessage[code] || 'Error',
        description: msg || 'No error description',
      });

      if (code === 10002) {
        setTimeout(() => {
          window.location.href = '/user/login';
        }, 500);
      }
    }
  } else if (message === 'CancelToken') {
    // cancel the request Token
    // eslint-disable-next-line no-console
    console.log(message);
  } else if (response && response.status) {
    const errorText = serverCodeMessage[response.status] || response.statusText;
    const { status, request } = response;
    notification.error({
      message: `request error ${status}: ${request.responseURL}`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description: 'Your network is abnormal and cannot connect to the server',
      message: 'network anomaly',
    });
  }

  return Promise.reject(error);
};

// Default parameters when configuring the request request
const request = axios.create({
  baseURL: import.meta.env.VITE_APP_APIHOST || '', // url = api url + request url
  withCredentials: false, // Send cookies when making cross-origin requests
  timeout: 0, // Request timeout, 5000 (in milliseconds) /0 is not limited
  headers: {
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
  },
});

// Global settings -post request header
// request.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// Before request request-interceptor
request.interceptors.request.use(
  (config: AxiosRequestConfig & { cType?: boolean }) => {
    // If cType is set, it means that it is custom to add Content-Type type to pave the way for custom post
    if (config.cType) {
      if (!config.headers) {
        _.set(config, 'headers', {});
        // config.headers = {};
      }
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
    }

    // Add custom token header

    const accessToken = getToken();
    if (accessToken) {
      if (!config.headers) {
        _.set(config, 'headers', {});
        // config.headers = {};
      }

      config.headers[settings.authHeaderTokenKey] = `Bearer ${accessToken}`;
    }

    return config;
  },
  /* ,error=> {} */ // already at export default catch
);

// After request response-interceptor
request.interceptors.response.use(
  (response: AxiosResponse<ResponseData>) => {
    const res = response.data;
    const { code } = res;

    // Custom status code verification
    if (code !== 200) {
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject({
        response,
        message: 'CustomError',
      });
    }

    return response;
    // eslint-disable-next-line prefer-promise-reject-errors
  }, error => Promise.reject({
    response: error.response,
    message: 'CustomError',
  }),
  /* , error => {} */ // already at export default catch
);

/**
 * ajax export
 *
 * Method: get
 *     Request Headers
 *         none - Content-Type
 *     Query String Parameters
 *         name: name
 *         age: age
 *
 * Method: post
 *     Request Headers
 *         Content-Type:application/json;charset=UTF-8
 *     Request Payload
 *         { name: name, age: age }
 *         Custom config parameters
 *             { cType: true }  Mandatory Settings Content-Type:application/json;charset=UTF-8
 *
 */
export default function ajax<T = any, R = AxiosResponse<T>>(
  config: RestRequestConfig & { cType?: boolean },
): AxiosPromise<R> {
  const updated: RestRequestConfig = { ...config };

  updated.baseURL = request.defaults.baseURL;
  if (config.useMock === true) {
    updated.baseURL = import.meta.env.VITE_MOCK_APP_APIHOST || import.meta.env.VITE_APP_APIHOST || '';
  }
  const main = _.get(useGlobalState.getState(), ['discovery', 'main'], null);
  if (config.usingMain === true && !isEmptyValue(main)) {
    updated.baseURL = `${updated.baseURL}/${main}`;
  }
  const tenant = _.get(useGlobalState.getState(), ['discovery', 'tenant'], null);
  if (config.usingMain !== true && !isEmptyValue(tenant)) {
    updated.baseURL = `${updated.baseURL}/${tenant}`;
  }
  if (!isEmptyValue(apiVersion)) {
    updated.baseURL = `${updated.baseURL}/${apiVersion}`;
  }

  return request(updated)
    .then((response: AxiosResponse) => response.data)
    .catch(error => errorHandler(error));
}

export const doDiscovery = async () => {
  const baseURL = import.meta.env.VITE_APP_APIHOST || '';
  if (!_.startsWith(baseURL, 'http')) {
    return '';
  }
  try {
    const response: AxiosResponse = await request({
      method: 'GET',
      baseURL: `${baseURL}/discovery?time=${new Date().getTime()}`,
    });
    const data = _.get(response, ['data'], null);
    return data;
  } catch (error) {
    errorHandler(error);
    return null;
  }
};
