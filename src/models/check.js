import { checkAnyRequest, startCheckRequest, saveAnyRequest, stopAnyRequest, listAnyRequest, searchAnyRequest } from '../api/checkApi';

export async function checkAny(params, put) {
  const response = await checkAnyRequest(params);
  put({
    type: 'checkCK/query',
    data: response,
  });
  return response;
}
export async function startAny(params, put) {
  const response = await startCheckRequest(params);
  put({
    type: 'checkCK/start',
    data: response,
  });
  return response;
}
export async function saveAny(params, put) {
  const response = await saveAnyRequest(params);
  put({
    type: 'checkCK/save',
    data: response,
  });
  return response;
}
export async function stopAny(params, put) {
  const response = await stopAnyRequest(params);
  put({
    type: 'checkCK/stop',
    data: response,
  });
  return response;
}
export async function listAny(params, put) {
  const response = await listAnyRequest(params);
  put({
    type: 'checkCK/list',
    data: response,
  });
  return response;
}
export async function searchAny(params, put) {
  const response = await searchAnyRequest(params);
  put({
    type: 'checkCK/search',
    data: response,
  });
  return response;
}
export default {
  namespace: 'checkCK', // 必须唯一
  state: {
    checkDate: null,
    storages: [],
    checkCode: null,
    details: [],
    saves: null,
    storageNames: [],
    storageCode: null,
    row: [],
  },
  reducers: {
    query(state, action) {
      // console.log(action.data.obj);
      return {
        ...state,
        checkDate: action.data.obj.checkDate,
        storages: action.data.obj.storages,
      };
    },
    start(state, action) {
      console.log(action.data);
      return {
        ...state,
        checkCode: action.data.obj.checkCode,
        details: action.data.obj.details,
        saves: action.data.obj,
      };
    },
    save(state, action) {
      console.log(action);
      return {
        ...state,
      };
    },
    stop(state, action) {
      console.log(action);
      return {
        ...state,
      };
    },
    list(state, action) {
      console.log(action);
      return {
        ...state,
        storageNames: action.data.obj,
        storageCode: action.data.obj[0].storageCode,
      };
    },
    search(state, action) {
      console.log(action);
      return {
        ...state,
        rows: action.data.rows,
      };
    },
  },
};
