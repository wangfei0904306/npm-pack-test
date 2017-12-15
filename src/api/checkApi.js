

import request from '../util/request';
import { urlAppendQuery } from '../util/tools';
//  * 盘点
export async function checkAnyRequest(params) {
  return request.GET(`${host}/inv-service/check/show`, { body: { ...params } });
}
//  * 开始盘点
export async function startCheckRequest(params) {
  return request.POST(urlAppendQuery(`${host}/inv-service/check/start`, params));
}
//  * 保存盘点
export async function saveAnyRequest(params) {
  return request.POST(`${host}/inv-service/check/save`, { body: { ...params } });
}
//  * 结束盘点
export async function stopAnyRequest(params) {
  return request.POST(`${host}/inv-service/check/end`, { body: { ...params } });
}
//  * 显示盘点列表
export async function listAnyRequest(params) {
  return request.GET(`${host}/inv-service/check/storage/list`, { body: { ...params } });
}
//  * 搜索盘点列表
export async function searchAnyRequest(params) {
  return request.GET(urlAppendQuery(`${host}/inv-service/check/search`, params));
}
