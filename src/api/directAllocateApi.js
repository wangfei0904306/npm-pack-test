/**
 * File: /Users/fengchengpu/Project/XBProject/CBCenter/src/api/directAllocateApi.js
 * Project: /Users/fengchengpu/Project/XBProject/CBCenter
 * Created Date: Wednesday November 22nd 2017 7:23:59 pm
 * Author: chengpu
 * -----
 * Last Modified:Wednesday November 22nd 2017 7:23:59 pm
 * Modified By: chengpu
 * -----
 * Copyright (c) 2017 MagCloud
 */
// 直拨相关接口
import request from '../util/request';
import { urlAppendQuery } from '../util/tools';

/**
 * 直拨单列表
 * @param {*} params
 */
export async function directAllocateListRequest(params) {
  return request.POST(`${host}/inv-service/direct/findInvInstockDirect`, { body: { ...params } });
}
/**
 * 创建直拨单-正常直发
 * @param {*} params
 */
export async function createDirectAllocateOrderRequest(params) {
  return request.POST(`${host}/inv-service/direct/doDirect`, { body: { ...params } });
}
/**
 * 直拨单详细查询
 * @param {*} params
 */
export async function getDirectAllocateDetailRequest(params) {
  return request.POST(urlAppendQuery(`${host}/inv-service/direct/getDirect`, params));
}
/**
 * 直拨单合计
 * @param {*} params
 */
export async function getDirectAllocateTotalRequest(params) {
  return request.POST(urlAppendQuery(`${host}/inv-service/direct/getTotal`, params));
}
/**
 * 直拨单填制-根据商品返回转换因子
 * @param {*} params
 */
export async function getDirectAllocateDivisorRequest(params) {
  return request.POST(urlAppendQuery(`${host}/inv-service/direct/get`, params));
}
