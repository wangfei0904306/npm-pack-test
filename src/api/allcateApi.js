/**
 * File: /Users/fengchengpu/Project/XBProject/CBCenter/src/api/allcateApi.js
 * Project: /Users/fengchengpu/Project/XBProject/CBCenter
 * Created Date: Friday November 24th 2017 11:50:02 am
 * Author: chengpu
 * -----
 * Last Modified:Friday November 24th 2017 11:50:02 am
 * Modified By: chengpu
 * -----
 * Copyright (c) 2017 MagCloud
 */
// 调拨管理相关接口
import request from '../util/request';
import { urlAppendQuery } from '../util/tools';
/**
 * 查询调拨单
 */
export async function getTransListRequest(params) {
  return request.GET(urlAppendQuery(`${host}/inv-service/trans/search`, params));
}
/**
 * 调拨单填制
 */
export async function transSaveRequest(params) {
  return request.POST(`${host}/inv-service/trans/save`, { body: params });
}

/**
 * 调拨明细
 */
export async function getTransDetailRequest(transCode) {
  return request.GET(`${host}/inv-service/trans/view/${transCode}`);
}
