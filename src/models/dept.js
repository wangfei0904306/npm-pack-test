/**
 * File: /users/fengchengpu/Project/XBProject/CBCenter/src/models/user.js
 * Project: /users/fengchengpu/Project/XBProject/CBCenter
 * Created Date: Tuesday November 21st 2017 3:39:04 pm
 * Author: chengpu
 * -----
 * Last Modified:Tuesday November 21st 2017 3:39:04 pm
 * Modified By: chengpu
 * -----
 * Copyright (c) 2017 MagCloud
 */
import { getOrgRequest, getDeptListAllRequest, disabledeptRequest, enabledeptRequest } from '../api/systemApi';
import { changeData } from '../util/tools';

// 查询列表
export async function queryList(params, put) {
  put({
    type: 'dept/changeLoading',
    loading: true,
  });
  const response = await getDeptListAllRequest(params);
  put({
    type: 'dept/query',
    data: response,
  });
  put({
    type: 'dept/changeLoading',
    loading: false,
  });
  return response;
}
// 获取组织树
export async function getOrgTree(params, put) {
  put({
    type: 'dept/changeLoading',
    loading: true,
  });
  const response = await getOrgRequest(params);
  put({
    type: 'dept/orgTree',
    data: response,
  });
  put({
    type: 'dept/changeLoading',
    loading: false,
  });
  return response;
}
// 部门禁用
export async function disabledept(params) {
  const response = await disabledeptRequest(params);
  return response;
}
// 部门启用
export async function enabledept(params) {
  const response = await enabledeptRequest(params);
  return response;
}
export default {
  namespace: 'dept', // 必须唯一
  state: {
    list: [],
    orgTree: [],
    total: 0,
    loading: false,
  },
  reducers: {
    query(state, action) {
      return {
        ...state,
        list: action.data.records,
        total: action.data.total,
      };
    },
    orgTree(state, action) {
      return {
        ...state,
        orgTree: changeData(action.data.obj, 'id', 'name'),
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
