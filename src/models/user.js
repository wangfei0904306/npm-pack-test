/**
 * File: /Users/fengchengpu/Project/XBProject/CBCenter/src/models/user.js
 * Project: /Users/fengchengpu/Project/XBProject/CBCenter
 * Created Date: Monday November 20th 2017 11:25:40 am
 * Author: chengpu
 * -----
 * Last Modified:Monday November 20th 2017 11:25:40 am
 * Modified By: chengpu
 * -----
 * Copyright (c) 2017 MagCloud
 */
import { getOrgRequest, userListRequest, disableUserRequest, resetPwdRequest } from '../api/systemApi';
import { changeData } from '../util/tools';

// 查询列表
export async function queryList(params, put) {
  put({
    type: 'user/changeLoading',
    loading: true,
  });
  const response = await userListRequest(params);
  put({
    type: 'user/query',
    data: response,
  });
  put({
    type: 'user/changeLoading',
    loading: false,
  });
  return response;
}
// 获取组织树
export async function getOrgTree(params, put) {
  put({
    type: 'user/changeLoading',
    loading: true,
  });
  const response = await getOrgRequest(params);
  put({
    type: 'user/orgTree',
    data: response,
  });
  put({
    type: 'user/changeLoading',
    loading: false,
  });
  return response;
}
// 用户禁用
export async function disableUser(params) {
  const response = await disableUserRequest(params);
  return response;
}
// 重置用户密码
export async function resetPwd(params) {
  const response = await resetPwdRequest(params);
  return response;
}

export default {
  namespace: 'user', // 必须唯一  建议与文件名相同
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
        list: action.data.obj.rows,
        total: action.data.obj.totalRows,
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
