/**
 * File: /Users/youngcao/Desktop/xbsp/CBCenter/src/api/cargoApi.js
 * Project: /Users/youngcao/Desktop/xbsp/CBCenter
 * Created Date: Tuesday November 21st 2017 2:53:48 pm
 * Author: youngcao
 * -----
 * Last Modified:Tuesday November 21st 2017 2:53:48 pm
 * Modified By: chengpu
 * -----
 * Copyright (c) 2017 MagCloud
 */
import request from '../util/request';
import { urlAppendQuery } from '../util/tools';

/**
 * 报货单列表
 * @param {object} params
 */
export async function cargoListRequest(params) {
  return request.POST(`${host}/order-service/order/retail/dept/require/orderList`, { body: params });
}
/**
 * 新增报货单
 * @param {*} params
 */
export async function createCargoListRequest(params) {
  return request.POST(`${host}/order-service/order/retail/dept/require/add`, { body: { ...params } });
}
/**
 * 修改报货单
 * @param {*} params
 */
export async function upDateCargoListRequest(params) {
  return request.POST(`${host}/order-service/order/retail/dept/require/detail/orderRetailUpdate`, { body: { ...params } });
}
/**
 *
 * 报货单详情
 */
export async function cargoDetailRequest(params) {
  return request.GET(urlAppendQuery(`${host}/order-service/order/retail/dept/require/detail/selectDetailListById`, params));
}
/**
 * 报货审核列表
 */
export async function auditCargoListRequest(params) {
  return request.POST(`${host}/order-service/order/retail/dept/require/ordCheckList`, { body: params });
}

/**
 * 审核多个报货单
 */
export async function auditCargoItemsRequest(params) {
  return request.POST(`${host}/order-service/order/retail/dept/require/shopVerify`, { body: params });
}
/**
 * 审核单个报货单
 */
export async function auditCargoDetailRequest(params) {
  return request.POST(urlAppendQuery(`${host}/order-service/order/retail/dept/require/shopVerifyOrNot`, params));
}
/**
 * 收银生成报货单
 */
export async function createShopOrderRequest(params) {
  return request.POST(`${host}/order-service/order/retail/purchase/require/createShopOrder`, { body: params });
}
/**
 * 生成报货单详情列表
 */
export async function creatCargoDetailListRequest(params) {
  return request.POST(`${host}/order-service/order/retail/dept/require/detail/orderCheckDetail`, { body: params });
}
/**
 * 直配报货
 */
export async function rectionCargoRequest(params) {
  return request.POST(urlAppendQuery(`${host}//order-service/order/retail/dept/require/readExcel/excelAdd`, params));
}
