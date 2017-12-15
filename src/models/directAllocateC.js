/**
 * File: /Users/fengchengpu/Project/XBProject/CBCenter/src/models/directAllocateC.js
 * Project: /Users/fengchengpu/Project/XBProject/CBCenter
 * Created Date: Thursday November 23rd 2017 1:32:43 pm
 * Author: chengpu
 * -----
 * Last Modified:Thursday November 23rd 2017 1:32:43 pm
 * Modified By: chengpu
 * -----
 * Copyright (c) 2017 MagCloud
 */
import { createDirectAllocateOrderRequest, delDirectAllocateOrderRequest, getDirectAllocateDivisorRequest } from '../api/directAllocateApi';

// 创建直拨单-正常直拨
export async function createOrder(params, put) {
  put({
    type: 'directAllocateC/changeLoading',
    loading: true,
  });
  const response = await createDirectAllocateOrderRequest(params);
  put({
    type: 'directAllocateC/changeLoading',
    loading: false,
  });
  return response;
}
// 创建直拨单-直拨冲销
export async function deleteOrder(params, put) {
  put({
    type: 'directAllocateC/changeLoading',
    loading: true,
  });
  const response = await delDirectAllocateOrderRequest(params);
  put({
    type: 'directAllocateC/changeLoading',
    loading: false,
  });
  return response;
}
// 直拨单填制-根据商品返回转换因子
export async function getDirectAllocateDivisor(params, put) {
  const response = await getDirectAllocateDivisorRequest(params);
  put({
    type: 'directAllocateC/divisor',
    data: response,
  });
  return response;
}
export default {
  namespace: 'directAllocateC', // 必须唯一  建议与文件名相同
  state: {
    loading: false,
  },
  reducers: {
    changeLoading(state, action) {
      return {
        ...state,
        loading: action.loading,
      };
    },
  },
};
