/**
 * File: /Users/fengchengpu/Project/XBProject/CBCenter/src/api/api.js
 * Project: /Users/fengchengpu/Project/XBProject/CBCenter
 * Created Date: Friday November 10th 2017 2:39:53 pm
 * Author: chengpu
 * -----
 * Last Modified:Monday December 11th 2017 7:19:36 pm
 * Modified By: caoyang
 * -----
 * Copyright (c) 2017 MagCloud
 */


// 公共接口
import request from '../util/request';
import { urlAppendQuery } from '../util/tools';

/**
 * 根据单个门店获取供应商列表
 */
export async function getSuppliersByStoreIdRequest() {
  return request.GET(`${host}/data-service/provider/queryByOrgCode`);
}
/**
 * 获取所有供应商列表
 */
export async function getAllSuppliersRequest(params) {
  return request.POST(`${host}/data-service/provider/queryPageAll`, { body: params });
}
/**
 * 根据当前用户展示的档口
 */
export async function getDeptByUserStallRequest(params) {
  return request.GET(`${host}/data-service/dept/queryVisual`, params);
}
/**
 * 获取品牌
 */
export async function getcomDataBrandRequest() {
  return request.GET(`${host}/data-service/comDataBrand/queryAll`);
}
/**
 * 根据当前用户展示的门店
 */
export async function getStoragesByUserStoreRequest(params) {
  return request.GET(`${host}/data-service/org/queryVisual`, params);
}

/**
 * 根据物资简拼、物资全拼或者物资名称搜索物资
 */
export async function getProductByKeywordRequest(params) {
  return request.GET(urlAppendQuery(`${host}/data-service/product/querySimpleByName`, params));
}

/**
 * 根据物资简拼、物资全拼或者物资名称搜索物资(调拨专用)
 */
export async function getCargoByKeywordRequest(params) {
  return request.GET(urlAppendQuery(`${host}/inv-service/inventory/product/search`, params));
}

/**
 * 根据用户简拼查询用户
 */
export async function getUserByKeywordRequest(params) {
  return request.GET(urlAppendQuery(`${host}/inv-service/direct/findUserList`, params));
}

/**
 *
 * 根据商品编码获取其他商品相关数据
 */
export async function getProductMsgByCodeRequest(params) {
  return request.GET(urlAppendQuery(`${host}/data-service/product/queryByCode`, params));
}

/**
 *
 * 查询当前登录用户下的仓库
 */
export async function getStoragesByUserRequest(params) {
  return request.GET(urlAppendQuery(`${host}/inv-service/inv/common/storage/list`, params));
}
/**
 * 获取所有仓库列表
 */
export async function getAllStorageRequest(params) {
  return request.POST(`${host}/data-service/storage/queryPageAll`, { body: params });
}
/**
 * 获取商品分类信息树
 */
export async function getProCategoryTreeRequest() {
  return request.GET(`${host}/data-service/productCategory/queryTree`);
}
/**
 * 获取所有商品列表
 */
export async function getAllProductRequest(params) {
  return request.POST(`${host}/data-service/product/queryPageAll`, { body: params });
}

