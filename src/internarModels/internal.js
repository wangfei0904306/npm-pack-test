/**
 * File: /Users/youngcao/Desktop/xbsp/CBCenter/src/intenarModels/internal.js
 * Project: /Users/youngcao/Desktop/xbsp/CBCenter
 * Created Date: Wednesday November 15th 2017 11:55:47 am
 * Author: youngcao
 * -----
 * Last Modified:Wednesday November 15th 2017 1:20:40 pm
 * Modified By: chengpu
 * -----
 * Copyright (c) 2017 MagCloud
 */
export async function toggle(params, put) {
  put({
    type: 'internal/toggle',
    data: params,
  });
  return params;
}

export default {
  namespace: 'internal', // 必须唯一
  state: {
    collapsed: true,
  },
  reducers: {
    toggle(state, action) {
      return {
        ...state,
        collapsed: action.data.collapsed,
      };
    },
  },
};

