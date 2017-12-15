/**
 * File: /Users/fengchengpu/Project/XBProject/CBCenter/src/models/directAllocateDetail.js
 * Project: /Users/fengchengpu/Project/XBProject/CBCenter
 * Created Date: Tuesday December 12th 2017 6:09:19 pm
 * Author: chengpu
 * -----
 * Last Modified:Tuesday December 12th 2017 6:09:19 pm
 * Modified By: chengpu
 * -----
 * Copyright (c) 2017 MagCloud
 */
import { getDirectAllocateDetailRequest } from '../api/directAllocateApi';
// 查询明细
export async function getDetail(params, put) {
  put({
    type: 'directAllocateDetail/changeLoading',
    loading: true,
  });
  const response = await getDirectAllocateDetailRequest(params);
  put({
    type: 'directAllocateDetail/detail',
    data: response,
  });
  put({
    type: 'directAllocateDetail/changeLoading',
    loading: false,
  });
  return response;
}
// 创建调拨单
export default {
  namespace: 'directAllocateDetail', // 必须唯一  建议与文件名相同
  state: {
    detail: {},
  },
  reducers: {
    detail(state, action) {
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
