export default [
    {
      path: '/manage/shift-list',
      name: 'shift-list',
      component: () => import('@/views/manage/manage-shift-list/ManageShiftList.vue'),
      meta: {
        pageTitle: 'Danh Sách Ca Làm',
        breadcrumb: [
          {
            text: 'Quản Lý',
          },
          {
            text: 'Danh Sách Ca Làm',
            active: true,
          },
        ],
      },
    },
  ]