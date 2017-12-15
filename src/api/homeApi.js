/**
 * File: /Users/fengchengpu/Project/XBProject/CBCenter/src/api/homeApi.js
 * Project: /Users/fengchengpu/Project/XBProject/CBCenter
 * Created Date: Tuesday November 28th 2017 10:55:59 am
 * Author: chengpu
 * -----
 * Last Modified:Tuesday November 28th 2017 10:55:59 am
 * Modified By: chengpu
 * -----
 * Copyright (c) 2017 MagCloud
 */
import request from '../util/request';
// import { urlAppendQuery } from '../util/tools';

/**
 * 报货单列表
 * @param {object} params
 */
export async function getShortcutEntersRequest() {
  return request.GET(`${host}/gate/index`);
}
