/**
 * File: /Users/fengchengpu/Project/XBProject/CBCenter/src/models/deptCU.js
 * Project: /Users/fengchengpu/Project/XBProject/CBCenter
 * Created Date: Tuesday November 21st 2017 4:36:47 pm
 * Author: chengpu
 * -----
 * Last Modified:Tuesday November 21st 2017 4:36:47 pm
 * Modified By: chengpu
 * -----
 * Copyright (c) 2017 MagCloud
 */
import { createDeptRequest, deptDetailRequest, editDeptRequest } from '../api/systemApi';

// 创建部门
export async function createDept(params, put) {
  put({
    type: 'deptCU/changeLoading',
    loading: true,
  });
  const response = await createDeptRequest(params);
  put({
    type: 'deptCU/changeLoading',
    loading: false,
  });
  return response;
}
// 编辑部门
export async function editDept(params, put) {
  put({
    type: 'deptCU/changeLoading',
    loading: true,
  });
  const response = await editDeptRequest(params);
  put({
    type: 'deptCU/changeLoading',
    loading: false,
  });
  return response;
}

// 部门详情
export async function deptDetail(params, put) {
  const response = await deptDetailRequest(params);
  put({
    type: 'deptCU/deptDetail',
    data: response,
  });
  return response;
}

export default {
  namespace: 'deptCU', // 必须唯一  建议与文件名相同
  state: {
    detail: {
      isActive: 'Y',
      createStorage: 'Y',
      virtualStorage: 'N',
      noInventory: 'N',
    },
    roleList: [],
    orgTree: [],
    total: 0,
    loading: false,
  },
  reducers: {
    deptDetail(state, action) {
      return {
        ...state,
        detail: action.data.obj,
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
