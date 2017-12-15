/**
 * File: /Users/fengchengpu/Project/XBProject/CBCenter/src/models/allocateDetail.js
 * Project: /Users/fengchengpu/Project/XBProject/CBCenter
 * Created Date: Tuesday December 12th 2017 11:01:39 am
 * Author: chengpu
 * -----
 * Last Modified:Tuesday December 12th 2017 11:01:39 am
 * Modified By: chengpu
 * -----
 * Copyright (c) 2017 MagCloud
 */
import { getTransDetailRequest } from '../api/allcateApi';
// 查询明细
export async function getDetail(params, put) {
  put({
    type: 'allocateDetail/changeLoading',
    loading: true,
  });
  const response = await getTransDetailRequest(params);
  put({
    type: 'allocateDetail/detail',
    data: response,
  });
  put({
    type: 'allocateDetail/changeLoading',
    loading: false,
  });
  return response;
}
// 创建调拨单
export default {
  namespace: 'allocateDetail', // 必须唯一  建议与文件名相同
  state: {
    details: [],
  },
  reducers: {
    detail(state, action) {
      return {
        ...state,
        details: action.data.obj.details,
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
