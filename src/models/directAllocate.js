/**
 * File: /Users/fengchengpu/Project/XBProject/CBCenter/src/models/directAllocate.js
 * Project: /Users/fengchengpu/Project/XBProject/CBCenter
 * Created Date: Thursday November 23rd 2017 1:30:34 pm
 * Author: chengpu
 * -----
 * Last Modified:Thursday November 23rd 2017 1:30:34 pm
 * Modified By: chengpu
 * -----
 * Copyright (c) 2017 MagCloud
 */
// 直拨单列表
import { directAllocateListRequest, getDirectAllocateTotalRequest } from '../api/directAllocateApi';
// 查询列表
export async function queryList(params, put) {
  put({
    type: 'directAllocate/changeLoading',
    loading: true,
  });
  const response = await directAllocateListRequest(params);
  put({
    type: 'directAllocate/query',
    data: response,
  });
  put({
    type: 'directAllocate/changeLoading',
    loading: false,
  });
  return response;
}
// 获取总计
export async function getDirectAllocateTotal(params, put) {
  put({
    type: 'directAllocate/changeLoading',
    loading: true,
  });
  const response = await getDirectAllocateTotalRequest(params);
  put({
    type: 'directAllocate/total',
    data: response,
  });
  put({
    type: 'directAllocate/changeLoading',
    loading: false,
  });
  return response;
}

export default {
  namespace: 'directAllocate', // 必须唯一  建议与文件名相同
  state: {
    list: [],
    total: 0,
    loading: false,
    typeItem: '',
    totalAmount: '',
    totalQty: '',
  },
  reducers: {
    total(state, action) {
      return {
        ...state,
        totalAmount: action.data.obj.totalAmount,
        totalQty: action.data.obj.totalQty,
      };
    },
    query(state, action) {
      return {
        ...state,
        list: action.data.rows,
        total: action.data.total,
        typeItem: action.data.obj.typeItem,
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
