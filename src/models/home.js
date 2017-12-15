/**
 * File: /Users/fengchengpu/Project/XBProject/CBCenter/src/models/home.js
 * Project: /Users/fengchengpu/Project/XBProject/CBCenter
 * Created Date: Tuesday November 28th 2017 10:56:38 am
 * Author: chengpu
 * -----
 * Last Modified:Tuesday November 28th 2017 10:56:38 am
 * Modified By: chengpu
 * -----
 * Copyright (c) 2017 MagCloud
 */
import { getShortcutEntersRequest } from '../api/homeApi';

export async function getShortcutEnters(params, put) {
  const response = await getShortcutEntersRequest(params);
  put({
    type: 'home/enters',
    data: response,
  });
  return response;
}

export default {
  namespace: 'home', // 必须唯一 建议与文件名相同
  state: {
    enters: [],
  },
  reducers: {
    enters(state, action) {
      return {
        ...state,
        enters: action.data.obj.menus,
      };
    },
  },
};
