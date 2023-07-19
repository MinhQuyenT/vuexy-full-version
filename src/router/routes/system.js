export default [
    {
      path: '/system/account-list',
      name: 'account-list',
      component: () => import('@/views/system/account-list/AccountList.vue'),
      meta: {
        pageTitle: 'accountList',
        breadcrumb: [
          {
            text: 'system',
          },
          {
            text: 'accountList',
            active: true,
          },
        ],
      },
    },
    {
      path: '/system/account-permissions',
      name: 'account-permissions',
      component: () => import('@/views/system/account-permissions/AccountPermissions.vue'),
      meta: {
        pageTitle: 'accountPermissions',
        breadcrumb: [
          {
            text: 'system',
          },
          {
            text: 'accountPermissions',
            text: 'accountPermissions',
            active: true,
          },
        ],
      },
    },
    {
      path: '/system/config',
      name: 'config',
      component: () => import('@/views/system/config/Config.vue'),
      meta: {
        pageTitle: 'config',
        breadcrumb: [
          {
            text: 'system',
          },
          {
            text: 'config',
            active: true,
          },
        ],
      },
    },
    {
      path: '/system/server-info',
      name: 'server-info',
      component: () => import('@/views/system/server-info/ServerInfo.vue'),
      meta: {
        pageTitle: 'serverInfo',
        breadcrumb: [
          {
            text: 'system',
          },
          {
            text: 'serverInfo',
            active: true,
          },
        ],
      },
    },
  ]