import { examineListRequest, examineHaveRequest, examineMoreRequest, examineSingleRequest, examineNullRequest, examineWithoutRequest } from '../api/examineApi';
import {
  //  getStoreBoothRequest,
  getDeptByUserStallRequest,getStoragesByUserStoreRequest } from '../api/api';

export async function examineList(params, put) {
  const response = await examineListRequest(params);
  put({
    type: 'examine/query',
    data: response,
  });

  return response;
}

export async function examineHaveList(params, put) {
  const response = await examineHaveRequest(params);
  // console.log(response);
  put({
    type: 'examine/Have',
    data: response,
  });
  return response;
}

export async function examineMoreCargo(params, put) {
  const response = await examineMoreRequest(params);
  // console.log(response);
  put({
    type: 'examine/More',
    data: response,
  });
  return response;
}
export async function examineSingle(params, put) {
  const response = await examineSingleRequest(params);

  put({
    type: 'examine/Single',
    data: response,
  });
  return response;
}

export async function examineNullList(params, put) {
  const response = await examineNullRequest(params);
  put({
    type: 'examine/Null',
    data: response,
  });
  return response;
}

export async function examineUserStore(params, put) {
  const response = await getStoragesByUserStoreRequest(params);
  put({
    type: 'examine/store',
    data: response,
  });
  return response;
    console.log(response);
}


export async function getDeptByUserStall(params, put) {
  const response = await getDeptByUserStallRequest(params);
  put({
    type: 'examine/depts',
    data: response,
  });
  return response;

  
}

export async function examineWithout(params, put) {
  const response = await examineWithoutRequest(params);
  put({
    type: 'examine/without',
    data: response,
  });
  return response;
}


export default {
  namespace: 'examine',
  state: {
    store:[],
    list: [],
    total: 0,
    loading: false,
    dep: [],
    HaveList: {
      proList: [{ proId: 0, proName: '无' }],
    },
    name: [],
    NullList: {

    },
    depts:[
      {deptCode:"1010114",
      deptId:19,
      itemId:3,
      qty:0},
      {deptCode:"1010114",
      deptId:19,
      itemId:3,
      qty:0},
      {deptCode:"1010114",
      deptId:19,
      itemId:3,
      qty:0}
    ]

  },
  reducers: {
    without(state, action) {
      return {
        ...state,
      };
    },

    depts(state, action) {
      return {
        ...state,
        depts: action.data.obj,
      };
    },

    query(state, action) {
      return {
        ...state,
        list: action.data,
        total: action.data.totalRows,

      };
    },

    store(state, action) {
      return {
        ...state,
        store:action.data.obj,
      };
    },

    Have(state, action) {
      return {
        ...state,
        HaveList: action.data.obj,
      };
    },

    Null(state, action) {
      return {
        ...state,
        NullList: action.data.obj,
      };
    },

    // store(state, action) {
    //   return {
    //     ...state,
    //     storeList: action.data.obj,
    //   };
    // },


    More(state, action) {
      return {
        ...state,
      };
    },

    Single(state, action) {
      return {
        ...state,
      };
    },

  },
};
