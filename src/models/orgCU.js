/**
 * File: /Users/fengchengpu/Project/XBProject/CBCenter/src/models/orgCU.js
 * Project: /Users/fengchengpu/Project/XBProject/CBCenter
 * Created Date: Tuesday November 21st 2017 6:40:21 pm
 * Author: chengpu
 * -----
 * Last Modified:Tuesday November 21st 2017 6:40:21 pm
 * Modified By: chengpu
 * -----
 * Copyright (c) 2017 MagCloud
 */
import { createUserRequest, orgCURequest, getOrgDetailRequest } from '../api/systemApi';
// 创建组织
export async function createOrg(params, put) {
  put({
    type: 'orgCU/changeLoading',
    loading: true,
  });
  const response = await createUserRequest(params);
  put({
    type: 'orgCU/changeLoading',
    loading: false,
  });
  return response;
}
// 编辑组织
export async function orgCU(params, put) {
  put({
    type: 'orgCU/changeLoading',
    loading: true,
  });
  const response = await orgCURequest(params);
  put({
    type: 'orgCU/changeLoading',
    loading: false,
  });
  return response;
}

// 组织详情
export async function orgDetail(params, put) {
  const response = await getOrgDetailRequest(params);
  put({
    type: 'orgCU/orgDetail',
    data: response,
  });
  return response;
}

export default {
  namespace: 'orgCU', // 必须唯一  建议与文件名相同
  state: {
    detail: {
      retailAttrVo: {},
    },
    total: 0,
    loading: false,
  },
  reducers: {
    orgDetail(state, action) {
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
