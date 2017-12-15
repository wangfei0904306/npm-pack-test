/**
 * File: /Users/fengchengpu/Project/XBProject/CBCenter/src/models/userCU.js
 * Project: /Users/fengchengpu/Project/XBProject/CBCenter
 * Created Date: Monday November 20th 2017 2:23:11 pm
 * Author: chengpu
 * -----
 * Last Modified:Monday November 20th 2017 2:23:11 pm
 * Modified By: chengpu
 * -----
 * Copyright (c) 2017 MagCloud
 */
import { createUserRequest, roleListRequest, getDeptListRequest, userDetailRequest, editUserRequest } from '../api/systemApi';
import { changeData } from '../util/tools';
// 角色list
export async function roleList(params, put) {
  put({
    type: 'userCU/changeLoading',
    loading: true,
  });
  const response = await roleListRequest(params);
  put({
    type: 'userCU/roleList',
    data: response,
  });
  put({
    type: 'userCU/changeLoading',
    loading: false,
  });
  return response;
}
// 创建用户
export async function createUser(params, put) {
  put({
    type: 'userCU/changeLoading',
    loading: true,
  });
  const response = await createUserRequest(params);
  put({
    type: 'userCU/changeLoading',
    loading: false,
  });
  return response;
}
// 编辑用户
export async function editUser(params, put) {
  put({
    type: 'userCU/changeLoading',
    loading: true,
  });
  const response = await editUserRequest(params);
  put({
    type: 'userCU/changeLoading',
    loading: false,
  });
  return response;
}
// 部门list
export async function getDeptList(params, put) {
  const response = await getDeptListRequest(params);
  put({
    type: 'userCU/deptList',
    data: response,
  });
  return response;
}
// 用户详情
export async function userDetail(params, put) {
  const response = await userDetailRequest(params);
  put({
    type: 'userCU/userDetail',
    data: response,
  });
  return response;
}

export default {
  namespace: 'userCU', // 必须唯一
  state: {
    userTypes: [{
      code: 'SYS_ADMIN',
      codeName: '系统管理员',
    }, {
      code: 'STAFF',
      codeName: '普通员工',
    }, {
      code: 'SHOP_MGR',
      codeName: '店长',
    }, {
      code: 'HEAD_COOK',
      codeName: '厨师长',
    }, { code: 'STOCK_MGR',
      codeName: '库管',
    }],
    deptList: [],
    detail: {
      user: {
        isActive: 'Y',
      },
    },
    roleList: [],
    orgTree: [],
    total: 0,
    loading: false,
  },
  reducers: {
    userDetail(state, action) {
      return {
        ...state,
        detail: action.data.obj,
      };
    },
    deptList(state, action) {
      return {
        ...state,
        deptList: action.data.obj,
      };
    },
    roleList(state, action) {
      return {
        ...state,
        roleList: action.data.obj.rows,
      };
    },
    orgTree(state, action) {
      return {
        ...state,
        orgTree: changeData(action.data.obj, 'id', 'name'),
      };
    },
    changeLoading(state, action) {
      return {
        ...state,
        loading: action.loading,
      };
    },
  },
};
