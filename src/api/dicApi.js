/**
 * File: /Users/fengchengpu/Project/XBProject/CBCenter/src/api/dic.js
 * Project: /Users/fengchengpu/Project/XBProject/CBCenter
 * Created Date: Thursday November 23rd 2017 1:34:53 pm
 * Author: chengpu
 * -----
 * Last Modified:Saturday December 9th 2017 7:06:53 pm
 * Modified By: chengpu
 * -----
 * Copyright (c) 2017 MagCloud
 */
// 字典相关接口
import request from '../util/request';
import { urlAppendQuery } from '../util/tools';
import citysUrl from '../../assets/json/citysSource.json';

export default {
  /**
   * 报货单状态
   */
  TYPE_CODE_BHDZT: 100001,
  /**
   * 部门类型
   */
  TYPE_CODE_BMLX: 100002,
  /**
   * 组织分类
   */
  TYPE_CODE_ZZFL: 100003,
  /**
   * 人员类型
   */
  TYPE_CODE_RYLX: 100004,
  /**
   * 启用状态
   */
  TYPE_CODE_QYZT: 100005,
  /**
   * 直拨单类型
   */
  TYPE_CODE_ZBDLX: 100006,
  /**
   * 调拨类型
   */
  TYPE_CODE_DBLX: 100007,
  /**
   * 盘点类型
   */
  TYPE_CODE_PDLX: 100008,
  /**
   * 组织类型
   */
  TYPE_CODE_ZZLX: 100009,
  /**
   * 门店类型
   */
  TYPE_CODE_MDLX: 100010,
  /**
   * 出库类型
   */
  TYPE_CODE_CKLX: 100011,
  /**
   * 入库类型
   */
  TYPE_CODE_RKLX: 100012,
};
/**
 * 根据Code获取字典参数信息(简单)
 */
export async function getCodeMapByTypeCodeRequest(code) {
  return request.GET(urlAppendQuery(`${host}/data-service/comDataParameter/querySimpleByCode`, { code }));
}

/**
 * 获取中国城市列表
 */
export async function getCitiesRequest() {
  return request.GET(citysUrl);
}
