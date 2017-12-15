/**
 * File: /Users/fengchengpu/Project/XBProject/CBCenter/src/models/opModel.js
 * Project: /Users/fengchengpu/Project/XBProject/CBCenter
 * Created Date: Monday December 4th 2017 11:32:30 am
 * Author: chengpu
 * -----
 * Last Modified:Saturday December 9th 2017 7:06:53 pm
 * Modified By: caoyang
 * -----
 * Copyright (c) 2017 MagCloud
 */

// 通用模型
import { getDeptByUserStallRequest, getSuppliersByStoreIdRequest, getStoragesByUserRequest, getcomDataBrandRequest, getAllSuppliersRequest, getAllStorageRequest, getProCategoryTreeRequest, getAllProductRequest } from '../api/api';

// 获取档口类型
export async function getDeptByUserStall(params, put) {
  const response = await getDeptByUserStallRequest(params);
  put({
    type: 'uvsModel/depts',
    data: response,
  });
  return response;
}
// 获取供应商列表
export async function getSuppliersByStoreId(params, put) {
  const response = await getSuppliersByStoreIdRequest(params);
  put({
    type: 'uvsModel/suppliers',
    data: response,
  });
  return response;
}
// 获取全部供应商列表
export async function getAllSuppliers(params, put) {
  const response = await getAllSuppliersRequest(params);
  put({
    type: 'uvsModel/allSuppliers',
    data: response,
  });
  return response;
}
// 获取品牌列表
export async function getcomDataBrand(params, put) {
  const response = await getcomDataBrandRequest(params);
  put({
    type: 'uvsModel/brands',
    data: response,
  });
  return response;
}
// 查询当前登录用户下的仓库
export async function getStoragesByUser(params, put) {
  const response = await getStoragesByUserRequest(params);
  put({
    type: 'uvsModel/storages',
    data: response,
  });
  return response;
}
// 获取全部仓库列表
export async function getAllStorages(params, put) {
  const response = await getAllStorageRequest(params);
  put({
    type: 'uvsModel/allStorages',
    data: response,
  });
  return response;
}
// 获取全部仓库列表
export async function getProCategoryTree(params, put) {
  const response = await getProCategoryTreeRequest(params);
  put({
    type: 'uvsModel/proCategoryTree',
    data: response,
  });
  return response;
}

// 获取全部商品列表
export async function getAllProduct(params, put) {
  const response = await getAllProductRequest(params);
  put({
    type: 'uvsModel/allProduct',
    data: response,
  });
  return response;
}

export default {
  namespace: 'uvsModel', // 必须唯一  建议与文件名相同
  state: {
    depts: [], // 档口类型
    storages: [], // 仓库
    suppliers: [], // 供应商类型
    brands: [], // 品牌
  },
  cache: true,
  autowrite: {
    depts: getDeptByUserStall,
    suppliers: getSuppliersByStoreId,
    storages: getStoragesByUser,
    brands: getcomDataBrand,
  },
  reducers: {
    brands(state, action) {
      return {
        ...state,
        brands: action.data.obj || [],
      };
    },
    depts(state, action) {
      return {
        ...state,
        depts: action.data.obj || [],
      };
    },
    storages(state, action) {
      return {
        ...state,
        storages: action.data.obj || [],
      };
    },
    suppliers(state, action) {
      return {
        ...state,
        suppliers: action.data.obj || [],
      };
    },
    allSuppliers(state, action) {
      return {
        ...state,
        total: action.data.total,
        allSuppliers: action.data.records || [],
      };
    },
    allStorages(state, action) {
      return {
        ...state,
        total: action.data.total,
        allStorages: action.data.records || [],
      };
    },
    proCategoryTree(state, action) {
      return {
        proCategoryTree: action.data.obj,
      };
    },
    allProduct(state, action) {
      return {
        total: action.data.total,
        allProduct: action.data.records || [],
      };
    },
  },
};
