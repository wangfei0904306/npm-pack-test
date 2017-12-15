/**
 * File: /Users/fengchengpu/Project/XBProject/CBCenter/src/models/dicModel.js
 * Project: /Users/fengchengpu/Project/XBProject/CBCenter
 * Created Date: Tuesday November 28th 2017 8:02:56 pm
 * Author: chengpu
 * -----
 * Last Modified:Tuesday November 28th 2017 8:02:56 pm
 * Modified By: chengpu
 * -----
 * Copyright (c) 2017 MagCloud
 */
// 字典模型
import typeCode, { getCodeMapByTypeCodeRequest, getCitiesRequest } from '../api/dicApi';
import cityOptions from '../util/citys';

export async function getCodeMapByTypeCode(param, put) {
  const response = await getCodeMapByTypeCodeRequest(param);
  put({
    type: `codeModel/typecode${param}`,
    data: response,
  });
  return response;
}

const codeReducers = {};
const initState = {};
const initAutowrite = {};
for (const k in typeCode) {
  if (typeCode.hasOwnProperty(k)) {
    const type = typeCode[k];
    initState[k] = [];
    initAutowrite[k] = (param, put) => {
      return getCodeMapByTypeCode(type, put);
    };
    codeReducers[`typecode${type}`] = (state, action) => {
      const ownerState = {
        ...state,
      };
      if (action.data.obj) {
        ownerState[k] = action.data.obj.parameterValues || [];
      } else {
        ownerState[k] = [];
      }
      return ownerState;
    };
  }
}
export async function getCities(params, put) {
  const response = await getCitiesRequest(params);
  put({
    type: 'codeModel/cities',
    data: response,
  });
  return response;
}
export default {
  namespace: 'codeModel', // 必须唯一  建议与文件名相同
  state: {
    ...initState,
    cities: [],
  },
  cache: true,
  autowrite: {
    ...initAutowrite,
    cities: getCities,
  },
  reducers: {
    ...codeReducers,
    cities(state, action) {
      return {
        ...state,
        cities: cityOptions(action.data),
      };
    },
  },
};
