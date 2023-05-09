export default [
    {
      path: '/system/account-list',
      name: 'account-list',
      component: () => import('@/views/system/account-list/AccountList.vue'),
      meta: {
        pageTitle: 'Danh Sách Tài Khoản',
        breadcrumb: [
          {
            text: 'Hệ Thống',
          },
          {
            text: 'Danh Sách Tài Khoản',
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
        pageTitle: 'Quyền Hạn Tài Khoản',
        breadcrumb: [
          {
            text: 'Hệ Thống',
          },
          {
            text: 'Quyền Hạn Tài Khoản',
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
        pageTitle: 'Cấu Hình',
        breadcrumb: [
          {
            text: 'Hệ Thống',
          },
          {
            text: 'Cấu Hình',
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
        pageTitle: 'Thông Tin Server',
        breadcrumb: [
          {
            text: 'Hệ Thống',
          },
          {
            text: 'Thông Tin Server',
            active: true,
          },
        ],
      },
    },
  ]