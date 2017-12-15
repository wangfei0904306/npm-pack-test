/**
 * File: /Users/fengchengpu/Project/XBProject/CBCenter/src/models/allocate.js
 * Project: /Users/fengchengpu/Project/XBProject/CBCenter
 * Created Date: Friday November 24th 2017 1:59:38 pm
 * Author: chengpu
 * -----
 * Last Modified:Friday November 24th 2017 1:59:38 pm
 * Modified By: chengpu
 * -----
 * Copyright (c) 2017 MagCloud
 */
import { getTransListRequest, transSaveRequest } from '../api/allcateApi';
// 查询列表
export async function queryList(params, put) {
  put({
    type: 'allocate/changeLoading',
    loading: true,
  });
  const response = await getTransListRequest(params);
  put({
    type: 'allocate/query',
    data: response,
  });
  put({
    type: 'allocate/changeLoading',
    loading: false,
  });
  return response;
}
// 创建调拨单
export async function createOrder(params, put) {
  put({
    type: 'allocate/changeLoading',
    loading: true,
  });
  const response = await transSaveRequest(params);
  put({
    type: 'allocate/changeLoading',
    loading: false,
  });
  return response;
}
export default {
  namespace: 'allocate', // 必须唯一  建议与文件名相同
  state: {
    list: [],
    total: 0,
    loading: false,
    transAmount: '',
    transAmountWithtax: '',
    transQty: '',
  },
  reducers: {
    query(state, action) {
      return {
        ...state,
        list: action.data.rows,
        total: action.data.totalRows,
        transAmount: action.data.obj ? action.data.obj.transAmount : '',
        transAmountWithtax: action.data.obj ? action.data.obj.transAmountWithtax : '',
        transQty: action.data.obj ? action.data.obj.transQty : '',
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
