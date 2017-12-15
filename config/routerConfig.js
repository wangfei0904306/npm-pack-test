/**
 * 配置规则
 * routes: [] 路由
 * initializationTabs: [] 初始tabbar
 * path: 匹配路径
 * component: 匹配组件
 * indexRoute: 重定向 MatchCell
 * rediret: 重定向匹配路径
 * state: Location状态   注: 按需要内部可以添加任意多个值对
 * mark:  是否写入到浏览历史中 注: 此浏览记录只服务于业务并非bowserHistory
 * childRoutes: 子路由
 *checkAuthority: 需不需要做用户认证  默认为  true
 *
 export const routerConfig = {
  routes: [
    {
      path: '/',
      component: 'App',
      indexRoute: { redirect: '/worker-manager' },
      childRoutes: [
        {
          path: '/worker-manager',
          component: 'workerManager',
          state: {
            mark: '首页',
          },
        }, {
          path: '/role-manager',
          component: 'roleManager',
          state: {
            mark: '角色',
          },
          childRoutes: [
            {
              path: '/jurs-dispatch',
              component: 'roleManager/jurs',
              state: {
                mark: '权限分配',
              },
            },
          ],
        }, {
          path: '/allot-manager',
          component: 'allotManager',
          state: {
            mark: '调拨管理',
          },
        },
      ],
    }, {
      path: '/login',
      component: 'login',
      state: {
        checkAuthority: false,
      },
    },
  ],
  initializationTabs: [
    {
      path: '/worker-manager',
      state: {
        mark: '首页',
      },
    },
  ],
};
 */
// 其他
const otherRoute = [
  {
    path: '/temp',
    component: 'temp',
  }, {
    path: '/first',
    component: 'first',
    state: {
      mark: 'first',
    },
  }, {
    path: '/home',
    component: 'home',
    state: {
      mark: '首页',
    },
  },
];
// 用户管理模块
const userRoute = [
  {
    path: '/role-manager',
    component: 'roleManager',
    state: {
      mark: '角色管理',
    },
    childRoutes: [
      {
        path: '/jurs-dispatch',
        component: 'roleManager/jurs',
      },
    ],
  }, {
    path: '/user-manager',
    component: 'userManager',
    state: {
      mark: '用户管理',
    },
    childRoutes: [
      {
        path: '/user-cu',
        component: 'userManager/userCU',
      },
    ],
  }, {
    path: '/org-manager',
    component: 'orgManager',
    state: {
      mark: '组织管理',
    },
    childRoutes: [
      {
        path: '/org-cu',
        component: 'orgManager/orgCU',
      },
    ],
  }, {
    path: '/dept-manager',
    component: 'deptManager',
    state: {
      mark: '部门管理',
    },
    childRoutes: [
      {
        path: '/dept-cu',
        component: 'deptManager/deptCU',
      },
    ],
  },
];
// 验货
const examineRoute = [
  {
    path: '/examine-cargo',
    component: 'examineCargo',
    state: {
      mark: '验货单列表',
    },
    childRoutes: [
      {
        path: '/examine-have',
        component: 'examineCargo/examineHave',
      },
      {
        path: '/examine-null',
        component: 'examineCargo/examineNull',
      },
    ],
  },
];
// 直拨管理模块
const directAllocateRoute = [
  {
    path: '/direct-allocate-create',
    component: 'directAllocateCreate',
    state: {
      mark: '直拨单填制',
    },
  }, {
    path: '/direct-allocate-manager',
    component: 'directAllocateManager',
    state: {
      mark: '直拨单查询',
    },
    childRoutes: [
      {
        path: '/direct-allocate-detail',
        component: 'directAllocateManager/directAllocateDetail',
        state: {
          mark: '直拨单详情',
        },
      },
    ],
  },
];
// 调拨管理
const allocateRoute = [
  {
    path: '/allocate-manager',
    component: 'allocateManager',
    state: {
      mark: '调拨管理',
    },
    childRoutes: [
      {
        path: '/allocate-detail',
        component: 'allocateManager/allocateDetail',
      },
    ],
  }, {
    path: '/allo-cation',
    component: 'allocate',
    state: {
      mark: '调拨',
    },
  },
];
// 盘点管理
const checkRoute = [
  {
    path: '/check-manager',
    component: 'check',
    state: {
      mark: '盘点',
    },
  }, {
    path: '/checkList-manager',
    component: 'check/checkList',
    state: {
      mark: '盘点列表',
    },
    childRoutes: [
      {
        path: '/checkOdd-manager',
        component: 'check/checkOdd',
        state: {
          mark: '盘点单号',
        },
      },
    ],
  },
];
// 报货
const storesCargoRoute = [
  {
    path: '/storesCargo',
    component: 'storesCargo',
    state: {
      mark: '报货',
    },
    childRoutes: [
      {
        path: '/storesCargo/detail',
        component: 'storesCargo/storesCargoDetail',
        state: {
          mark: '档口报货详情',
        },
      }, {
        path: '/storesCargo/detailModify',
        component: 'storesCargo/storesCargoU',
        state: {
          mark: '档口报货编辑',
        },
      },
    ],
  }, {
    path: '/storesCargo/add',
    component: 'storesCargo/storesCargoC',
    state: {
      mark: '新增档口报货',
    },
  }, {
    path: '/auditCargo',
    component: 'auditCargo',
    state: {
      mark: '档口报货审核',
    },
    childRoutes: [
      {
        path: '/auditCargo/detail',
        component: 'auditCargo/auditDetail',
        state: {
          mark: '审核详情',
        },
      }, {
        path: '/auditCargo/creatCargo',
        component: 'auditCargo/creatCargo',
        state: {
          mark: '生成报货单',
        },
      },
    ],
  }, {
    path: '/rectionCargo',
    component: 'rectionCargo',
    state: {
      mark: '直配报货',
    },
  },
];
const statement = [
  {
    path: '/statement-manager',
    component: 'reportMgt/storageDetail',
    state: {
      mark: '入库明细查询',
    },
  },
  {
    path: '/storageTotal-manager',
    component: 'reportMgt/storageTotal',
    state: {
      mark: '入库汇总查询',
    },
  },
  {
    path: '/outboundTotal-manager',
    component: 'reportMgt/outboundTotal',
    state: {
      mark: '出库汇总查询',
    },
  },
  {
    path: '/outbounddetail-manager',
    component: 'reportMgt/outbounddetail',
    state: {
      mark: '出库明细查询',
    },
  },
];
export const routerConfig = {
  routes: [
    {
      path: '/',
      component: 'App',
      indexRoute: { redirect: '/home' },
      childRoutes: [
        ...otherRoute,
        ...directAllocateRoute,
        ...userRoute,
        ...allocateRoute,
        ...checkRoute,
        ...storesCargoRoute,
        ...examineRoute,
        ...statement,
      ],
    }, {
      path: '/login',
      component: 'login',
      state: {
        checkAuthority: false,
      },
    },
    {
      path: '/temp',
      component: 'temp',
      state: {
        checkAuthority: false,
      },
    },
    {
      path: '*',
      component: 'exception/404',
      state: {
        checkAuthority: false,
      },
    },
  ],
  initializationTabs: [
    {
      pathname: '/home',
      state: {
        mark: '首页',
      },
    },
  ],
};
