/**
 * File: /Users/fengchengpu/Project/XBProject/CBCenter/src/models/jur.js
 * Project: /Users/fengchengpu/Project/XBProject/CBCenter
 * Created Date: Thursday November 16th 2017 5:50:10 pm
 * Author: chengpu
 * -----
 * Last Modified:Thursday November 16th 2017 5:50:10 pm
 * Modified By: chengpu
 * -----
 * Copyright (c) 2017 MagCloud
 */
import { jurListRequest,
  createRoleRequest,
  editRoleRequest,
  getRoleDetailRequest,
  batchDispatchJurRequest,
} from '../api/systemApi';
import { getJurTree } from '../util/jurTree';

export async function queryList(params, put) {
  put({
    type: 'jur/changeLoading',
    loading: true,
  });
  const response = await jurListRequest(params);
  const jurTree = getJurTree(response.obj);
  put({
    type: 'jur/query',
    data: jurTree,
  });
  put({
    type: 'jur/changeLoading',
    loading: false,
  });
  return response;
}

export async function createRole(params, put) {
  put({
    type: 'jur/changeBtnLoading',
    loading: true,
  });
  const response = await createRoleRequest(params);
  put({
    type: 'jur/changeBtnLoading',
    loading: false,
  });
  return response;
}
export async function detailRole(params, put) {
  // 获取角色详情
  const response = await getRoleDetailRequest(params);
  put({
    type: 'jur/detailRole',
    data: response,
  });
  // 返回详情
  return response;
}
export async function editRole(params, put) {
  put({
    type: 'jur/changeBtnLoading',
    loading: true,
  });
  const response = await editRoleRequest(params);
  put({
    type: 'jur/changeBtnLoading',
    loading: false,
  });
  return response;
}

export async function batchDispatchJur(params, put) {
  put({
    type: 'jur/changeBtnLoading',
    loading: true,
  });
  const response = await batchDispatchJurRequest(params);
  put({
    type: 'jur/changeBtnLoading',
    loading: false,
  });
  return response;
}

export default {
  namespace: 'jur', // 必须唯一  建议与文件名相同
  state: {
    list: [],
    detail: {
      isActive: 'Y',
    },
    total: 0,
    loading: false,
  },
  reducers: {
    query(state, action) {
      return {
        ...state,
        list: action.data,
      };
    },
    detailRole(state, action) {
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
    changeBtnLoading(state, action) {
      return {
        ...state,
        btnLoading: action.loading,
      };
    },
  },
};
