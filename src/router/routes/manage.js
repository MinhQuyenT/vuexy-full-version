export default [
    {
      path: '/manage/shift-list',
      name: 'shift-list',
      component: () => import('@/views/manage/manage-shift-list/ManageShiftList.vue'),
      meta: {
        pageTitle: 'shiftList',
        breadcrumb: [
          {
            text: 'manage',
          },
          {
            text: 'shiftList',
            active: true,
          },
        ],
      },
    },
  ]