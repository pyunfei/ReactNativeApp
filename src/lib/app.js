/* eslint-disable prettier/prettier */
import * as Sentry from '@sentry/react-native';
import ErrorMap from './error.json';

export function beforeFetch(options) {
  const auth = global.Token;
  if (!auth) {
    return options;
  }
  if (!options.headers) {options.headers = {};}
  options.headers.Authorization = 'Bearer ' + auth.token;
  return options;
}
export function errorFetch(error) {
  const { showError } = error.config;
  let message = '网络请求错误';
  if (error.response && error.response.data && error.response.data.message) {
    const { message: resMsg, code: resCode } = error.response.data;
    message = ErrorMap[resCode] || resMsg;
  } else if (error.message) {
    message = ErrorMap[error.message] || error.message;
  }
  if (message && showError) {
    console.log(message);
  }
  Sentry.configureScope(scope => {
    if (error.config && error.config.data) {
      scope.setExtra('data', error.config.data);
    }
    scope.setExtra('message', message);
    Sentry.captureException(error);
  });
  return Promise.reject(error);
}
export function afterFetch(res) {
  return res.data;
}
