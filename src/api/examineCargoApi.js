/**
 * File: /Users/fengchengpu/Project/XBProject/CBCenter/src/api/check.js
 * Project: /Users/fengchengpu/Project/XBProject/CBCenter
 * Created Date: Thursday November 23rd 2017 7:04:55 pm
 * Author: chengpu
 * -----
 * Last Modified:Friday December 8th 2017 8:12:35 pm
 * Modified By: chengpu
 * -----
 * Copyright (c) 2017 MagCloud
 */
// 验货管理相关接口
import request from '../util/request';
/**
 * 直拨单列表
 * @param {*} params
 */
export async function examineCargoListRequest(params) {
  return request.POST(`${host}/inv-service/direct/findInvInstockDirect`, { body: { ...params } });
}
