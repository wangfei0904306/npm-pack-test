/**
 * File: /Users/fengchengpu/Project/XBProject/XBCenter/src/util/request.js
 * Project: /Users/fengchengpu/Project/XBProject/XBCenter
 * Created Date: Wednesday November 8th 2017 12:03:17 pm
 * Author: chengpu
 * -----
 * Last Modified:Monday November 27th 2017 10:24:02 am
 * Modified By: chengpu
 * -----
 * Copyright (c) 2017 ZhiBei
 */

import fetch from 'isomorphic-fetch';
import { notification } from 'antd';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  if (response.status === 401) {
    window.location = '/login';
  }
  notification.error({
    message: `请求错误 ${response.status}: ${response.url}`,
    description: response.statusText,
  });
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */

function send(url, options, autoTips) {
  const defaultOptions = {
    credentials: 'include',
    headers: {
      'X-Auth-Token': localStorage.token,
    },
  };
  const newOptions = { ...defaultOptions, ...options };
  if (newOptions.method === 'POST' || newOptions.method === 'PUT') {
    newOptions.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      ...newOptions.headers,
    };
    newOptions.body = JSON.stringify(newOptions.body);
  }
  const checkBiz = (response) => {
    return response.json().then((res) => {
      if (autoTips) {
        if (!res.success) {
          notification.error({
            message: res.msg,
          });
        } else if (res.msg) {
          notification.success({
            message: res.msg,
          });
        }
      }
      return res;
    });
  };
  return fetch(url, newOptions)
    .then(checkStatus)
    .then(checkBiz)
    .catch((error) => {
      if (error.code) {
        notification.error({
          message: error.name,
          description: error.message,
        });
      }
      if ('stack' in error && 'message' in error) {
        notification.error({
          message: `请求错误: ${url}`,
          description: error.message,
        });
      }
      return error;
    });
}
const request = {
  GET(url, options, autoTips) {
    if (typeof options !== 'object') {
      return send(url, { method: 'GET' }, options);
    }
    return send(url, { ...options, method: 'GET' }, autoTips);
  },
  POST(url, options, autoTips) {
    if (typeof options !== 'object') {
      return send(url, { method: 'POST' }, options);
    }
    return send(url, { ...options, method: 'POST' }, autoTips);
  },
  PUT(url, options, autoTips) {
    if (typeof options !== 'object') {
      return send(url, { method: 'PUT' }, options);
    }
    return send(url, { ...options, method: 'PUT' }, autoTips);
  },
  DELETE(url, options, autoTips) {
    if (typeof options !== 'object') {
      return send(url, { method: 'DELETE' }, options);
    }
    return send(url, { ...options, method: 'DELETE' }, autoTips);
  },
};
module.exports = request;
