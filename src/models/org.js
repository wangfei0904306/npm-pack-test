/**
 * File: /Users/fengchengpu/Project/XBProject/CBCenter/src/models/org.js
 * Project: /Users/fengchengpu/Project/XBProject/CBCenter
 * Created Date: Tuesday November 21st 2017 2:28:56 pm
 * Author: chengpu
 * -----
 * Last Modified:Tuesday November 21st 2017 2:28:56 pm
 * Modified By: chengpu
 * -----
 * Copyright (c) 2017 MagCloud
 */
import { getOrgRequest, getOrgDetailRequest } from '../api/systemApi';
import { changeData } from '../util/tools';

// 获取组织树
export async function getOrgTree(params, put) {
  const response = await getOrgRequest(params);
  put({
    type: 'org/orgTree',
    data: response,
  });
  return response;
}
// 获取组织详情
export async function getOrgDetail(params, put) {
  const response = await getOrgDetailRequest(params);
  put({
    type: 'org/orgDetail',
    data: response,
  });
  return response;
}

export default {
  namespace: 'org', // 必须唯一  建议与文件名相同
  state: {
    orgTree: [],
    orgDetail: {},
    loading: false,
    detail: {
      retailAttrVo: {},
    },
  },
  reducers: {
    orgTree(state, action) {
      return {
        ...state,
        orgTree: changeData(action.data.obj, 'code', 'name'),
      };
    },
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
