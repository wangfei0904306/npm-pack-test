import request from '../util/request';
import { urlAppendQuery } from '../util/tools';
/**
 *验货单列表
 * @param {*} params

 */


//  * 验货单列表
export async function examineListRequest(params) {
  return request.POST(`${host}/order-service/order/retail/reqRec/examine/examineCargoList`, { body: { ...params } });
}


//  * 验货单详情列表（有档口）
export async function examineHaveRequest(params) {
  return request.POST(`${host}/order-service/order/retail/dept/require/detail/examineCargoHdDetail`, { body: { ...params } });
}

//  * 验货单详情列表（无档口）
export async function examineNullRequest(params) {
  return request.POST(`${host}/order-service/xml/ordRetailReceiptDetail/examineCargoNdDetail`, { body: { ...params } });
}


//  * 批量验货入库
export async function examineMoreRequest(params) {
  return request.POST(`${host}/order-service/order/retail/dept/require/batchInstock`, { body: params });
}

//  * 验货入库(有档口)
export async function examineSingleRequest(params) {
  return request.POST(urlAppendQuery(`${host}/order-service/order/retail/dept/require/instock`, params));
}

//  * 验货入库(无档口)
export async function examineWithoutRequest(params) {
  return request.POST(`${host}/order-service/xml/ordRetailReceiptDetail/instock`, { body: { ...params } });
}
