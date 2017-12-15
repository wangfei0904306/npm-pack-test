/**
 * File: /Users/fengchengpu/Project/XBProject/CBCenter/src/models/login.js
 * Project: /Users/fengchengpu/Project/XBProject/CBCenter
 * Created Date: Wednesday November 15th 2017 3:59:01 pm
 * Author: chengpu
 * -----
 * Last Modified:Wednesday November 15th 2017 3:59:01 pm
 * Modified By: chengpu
 * -----
 * Copyright (c) 2017 MagCloud
 */
import { loginRequest, getValidateCodeImageRequest } from '../api/systemApi';

export async function login(params, put) {
  const response = await loginRequest(params);
  put({
    type: 'userModel/info',
    data: response,
  });
  put({
    type: 'login/login',
  });
  return response;
}
export async function getValidateCodeImage(params, put) {
  const response = await getValidateCodeImageRequest(params);
  put({
    type: 'login/getValidateCodeImage',
    data: response,
  });
  return response;
}
export default {
  namespace: 'login', // 必须唯一 与文件名相同
  state: {
    loginStatus: false,
  },
  reducers: {
    login(state) {
      return {
        ...state,
        loginStatus: true,
      };
    },
    getValidateCodeImage(state, action) {
      return {
        ...state,
        image: action.data.obj.encode,
        ticket: action.data.obj.ticket,
      };
    },
  },
};
