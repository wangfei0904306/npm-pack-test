/**
 * File: /Users/fengchengpu/Project/XBProject/CBCenter/src/api/system.js
 * Project: /Users/fengchengpu/Project/XBProject/CBCenter
 * Created Date: Wednesday November 15th 2017 4:09:42 pm
 * Author: chengpu
 * -----
 * Last Modified:Wednesday November 15th 2017 4:09:42 pm
 * Modified By: chengpu
 * -----
 * Copyright (c) 2017 MagCloud
 */
import request from '../util/request';
import { urlAppendQuery } from '../util/tools';
/**
 * 用户登录
 * @param {object} params
 */
export async function loginRequest(params) {
  return request.POST(`${host}/gate/login/pc?${params}`, true);
}
/**
 * 测试访问权限
 * @param {object} params
 */
export async function testRequest() {
  return request.GET('http://localhost:3001/mock/auth');
}
/**
 * 获取验证码
 * @param {object} params
 */
export async function getValidateCodeImageRequest() {
  return request.GET(`${host}/gate/captcha/image`);
}
// --------------------角色权限管理------------------------------------------------

/**
 * 角色列表
 * @param {object} params
 */
export async function roleListRequest(params) {
  return request.POST(urlAppendQuery(`${host}/auth-service/roleMgr/roleList`, params));
}
/**
 * 权限列表
 * @param {object} params
 */
export async function jurListRequest(params) {
  return request.POST(urlAppendQuery(`${host}/auth-service/roleMgr/getPermsByRoleId`, params));
}
/**
 * 创建角色并分配权限
 * @param {object} params
 */
export async function createRoleRequest(params) {
  return request.POST(`${host}/auth-service/roleMgr/addRole`, { body: { ...params } }, true);
}
/**
 * 获取角色详情
 * @param {object} params
 */
export async function getRoleDetailRequest(params) {
  return request.POST(urlAppendQuery(`${host}/auth-service/roleMgr/roleDetail`, params));
}
/**
 * 角色编辑
 * @param {object} params
 */
export async function editRoleRequest(params) {
  return request.POST(`${host}/auth-service/roleMgr/editRole`, { body: { ...params } }, true);
}
/**
 * 批量添加角色权限
 * @param {object} params
 */
export async function batchDispatchJurRequest(params) {
  return request.POST(`${host}/auth-service/roleMgr/setPerms`, { body: { ...params } }, true);
}
/**
 * 角色禁用
 * @param {object} params
 */
export async function disableRoleRequest(params) {
  return request.POST(urlAppendQuery(`${host}/auth-service/roleMgr/setStatus`, params), true);
}
// --------------------组织部门管理------------------------------------------------
/**
 * 组织列表
 * @param {object} params
 */
export async function getOrgRequest(params) {
  return request.GET(urlAppendQuery(`${host}/data-service/org/queryTree`, params));
}
/**
 * 组织详情
 * @param {object} params
 */
export async function getOrgDetailRequest(params) {
  return request.GET(urlAppendQuery(`${host}/data-service/org/queryByCode`, params));
}
/**
 * 组织编辑
 * @param {object} params
 */
export async function orgCURequest(params) {
  return request.POST(`${host}/data-service/org/insertOrUpdate`, { body: params });
}

/**
 * 根据组织ID查询部门(不分页)下拉列表用
 * @param {object} params
 */
export async function getDeptListRequest(params) {
  return request.GET(urlAppendQuery(`${host}/data-service/dept/queryByOrgId`, params));
}
/**
 * 获取所有部门分页信息(可根据orgId查询)
 * @param {*} params
 */
export async function getDeptListAllRequest(params) {
  return request.POST(`${host}/data-service/dept/queryPageAll`, { body: { ...params } });
}
/**
 * 部门禁用
 * @param {*} params
 */
export async function disabledeptRequest(params) {
  return request.GET(urlAppendQuery(`${host}/data-service/dept/noEnable`, params));
}
/**
 * 部门启用
 * @param {*} params
 */
export async function enabledeptRequest(params) {
  return request.GET(urlAppendQuery(`${host}/data-service/dept/enable`, params));
}
/**
 * 部门新增
 * @param {*} params
 */
export async function createDeptRequest(params) {
  return request.POST(`${host}/data-service/dept/saveOrUpdate`, { body: { ...params } }, true);
}
/**
 * 部门编辑
 * @param {*} params
 */
export async function editDeptRequest(params) {
  return request.POST(`${host}/data-service/dept/saveOrUpdate`, { body: { ...params } }, true);
}
/**
 * 部门详情
 * @param {*} params
 */
export async function deptDetailRequest(params) {
  return request.GET(urlAppendQuery(`${host}/data-service/dept/queryById`, params));
}
// --------------------用户管理------------------------------------------------
/**
 * 用户列表
 * @param {*} params
 */
export async function userListRequest(params) {
  return request.POST(urlAppendQuery(`${host}/auth-service/userMgr/userList`, params));
}

/**
 * 用户新增
 * @param {*} params
 */
export async function createUserRequest(params) {
  return request.POST(`${host}/auth-service/userMgr/addUser`, { body: { ...params } }, true);
}
/**
 * 用户编辑
 * @param {*} params
 */
export async function editUserRequest(params) {
  return request.POST(`${host}/auth-service/userMgr/editUser`, { body: { ...params } }, true);
}
/**
 * 用户详情
 * @param {*} params
 */
export async function userDetailRequest(params) {
  return request.POST(urlAppendQuery(`${host}/auth-service/userMgr/userDetail`, params));
}
/**
 * 修改用户状态
 * @param {*} params
 */
export async function disableUserRequest(params) {
  return request.POST(urlAppendQuery(`${host}/auth-service/userMgr/changeStatus`, params), true);
}
/**
 * 重置用户密码
 * @param {*} params
 */
export async function resetPwdRequest(params) {
  return request.POST(urlAppendQuery(`${host}/auth-service/userMgr/resetPwd`, params), true);
}
