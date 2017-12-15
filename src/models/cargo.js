/**
 * File: /Users/youngcao/Desktop/xbsp/CBCenter/src/models/cargo.js
 * Project: /Users/youngcao/Desktop/xbsp/CBCenter
 * Created Date: Tuesday November 21st 2017 3:30:11 pm
 * Author: youngcao
 * -----
 * Last Modified:Thursday December 7th 2017 11:42:51 am
 * Modified By: chengpu
 * -----
 * Copyright (c) 2017 MagCloud
 */
import { cargoListRequest, createCargoListRequest, cargoDetailRequest, createShopOrderRequest,
  rectionCargoRequest, auditCargoListRequest, upDateCargoListRequest, auditCargoItemsRequest,
  auditCargoDetailRequest, creatCargoDetailListRequest } from '../api/cargoApi';
import { getStoragesByUserStallRequest } from '../api/api';

// 获取报货单列表
export async function queryList(params, put) {
  put({
    type: 'cargo/changeLoading',
    loading: true,
  });
  const response = await cargoListRequest(params);
  put({
    type: 'cargo/query',
    data: response,
  });
  put({
    type: 'cargo/changeLoading',
    loading: false,
  });
  return response;
}
// 获取报货单详情
export async function getCargoDetail(params, put) {
  put({
    type: 'cargo/changeLoading',
    loading: true,
  });
  const response = await cargoDetailRequest(params);
  put({
    type: 'cargo/getCargoDetail',
    data: response,
  });
  put({
    type: 'cargo/changeLoading',
    loading: false,
  });
  return response;
}
// 新增报货单
export async function createCargo(params, put) {
  put({
    type: 'cargo/changeLoading',
    loading: true,
  });
  const response = await createCargoListRequest(params);
  put({
    type: 'cargo/changeLoading',
    loading: false,
  });
  return response;
}
// 修改报货单
export async function upDateCargo(params, put) {
  put({
    type: 'cargo/changeLoading',
    loading: true,
  });
  const response = await upDateCargoListRequest(params);
  put({
    type: 'cargo/changeLoading',
    loading: false,
  });
  return response;
}

// 获取档口列表
export async function getDeptListByUser(params, put) {
  const response = await getStoragesByUserStallRequest(params);
  put({
    type: 'cargo/getDeptList',
    data: response,
  });
  return response;
}
// 获取报货审核列表
export async function auditCargoList(params, put) {
  put({
    type: 'cargo/changeLoading',
    loading: true,
  });
  const response = await auditCargoListRequest(params);
  put({
    type: 'cargo/queryAudit',
    data: response,
  });
  put({
    type: 'cargo/changeLoading',
    loading: false,
  });
  return response;
}
// 审核报货单
export async function auditCargoItems(params, put) {
  put({
    type: 'cargo/changeLoading',
    loading: true,
  });
  const response = await auditCargoItemsRequest(params);
  put({
    type: 'cargo/changeLoading',
    loading: false,
  });
  return response;
}
// 审核单个报货单
export async function auditCargoDetail(params, put) {
  put({
    type: 'cargo/changeLoading',
    loading: true,
  });
  const response = await auditCargoDetailRequest(params);
  put({
    type: 'cargo/changeLoading',
    loading: false,
  });
  return response;
}
// 收银生成报货单
export async function createShopOrder(params, put) {
  put({
    type: 'cargo/changeLoading',
    loading: true,
  });
  const response = await createShopOrderRequest(params);
  put({
    type: 'cargo/changeLoading',
    loading: false,
  });
  return response;
}
// 收银生成报货单详情列表
export async function creatCargoDetailList(params, put) {
  put({
    type: 'cargo/changeLoading',
    loading: true,
  });
  const response = await creatCargoDetailListRequest(params);
  put({
    type: 'cargo/creatQueryDetail',
    data: response,
  });
  put({
    type: 'cargo/changeLoading',
    loading: false,
  });
  return response;
}
// 直配报货
export async function rectionCargo(params, put) {
  put({
    type: 'cargo/changeLoading',
    loading: true,
  });
  const response = await rectionCargoRequest(params);
  put({
    type: 'cargo/changeLoading',
    loading: false,
  });
  return response;
}

export default {
  namespace: 'cargo', // 必须唯一  建议与文件名相同
  state: {
    list: [],
    creatList: [],
    total: 0,
    loading: false,
  },
  reducers: {
    query(state, action) {
      return {
        ...state,
        list: action.data.rows,
        total: action.data.totalRows,
        totalPrice: action.data.totalPrice,
        totalQty: action.data.totalQty,
      };
    },
    queryAudit(state, action) {
      return {
        ...state,
        list: action.data.rows,
        total: action.data.totalRows,
        totalPrice: action.data.totalPrice,
        totalQty: action.data.totalQty,
      };
    },
    getCargoDetail(state, action) {
      return {
        ...state,
        detailObj: action.data.obj || {},
      };
    },
    getDeptList(state, action) {
      return {
        ...state,
        list: action.data.obj || [],
      };
    },
    changeLoading(state, action) {
      return {
        ...state,
        loading: action.loading,
      };
    },
    creatQueryDetail(state, action) {
      return {
        ...state,
        creatList: action.data.obj.modelList,
        requireAmountNum: action.data.obj.requireAmountNum,
        requireQtyNum: action.data.obj.requireQtyNum,
      };
    },
  },
};
