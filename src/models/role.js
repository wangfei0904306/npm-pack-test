/**
 * File: /Users/fengchengpu/Project/XBProject/CBCenter/src/models/role.js
 * Project: /Users/fengchengpu/Project/XBProject/CBCenter
 * Created Date: Thursday November 16th 2017 9:38:18 am
 * Author: chengpu
 * -----
 * Last Modified:Tuesday November 21st 2017 2:44:42 pm
 * Modified By: chengpu
 * -----
 * Copyright (c) 2017 MagCloud
 */
import { roleListRequest, disableRoleRequest } from '../api/systemApi';

export async function queryList(params, put) {
  put({
    type: 'role/changeLoading',
    loading: true,
  });
  const response = await roleListRequest(params);
  put({
    type: 'role/query',
    data: response,
  });
  put({
    type: 'role/changeLoading',
    loading: false,
  });
  return response;
}
export async function disableRole(params) {
  const response = await disableRoleRequest(params);
  // 返回结果
  return response;
}
export default {
  namespace: 'role', // 必须唯一  建议与文件名相同
  state: {
    list: [],
    total: 0,
    loading: false,
  },
  reducers: {
    query(state, action) {
      return {
        ...state,
        list: action.data.obj.rows,
        total: action.data.obj.totalRows,
      };
    },
    changeLoading(state, action) {
      return {
        ...state,
        loading: action.loading,
      };
    },
  },
};
