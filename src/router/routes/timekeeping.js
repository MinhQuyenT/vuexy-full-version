export default [
  {
    path: '/timekeeping/timekeeping-day',
    name: 'timekeeping-day',
    component: () => import('@/views/timekeeping/timekeeping-day/TimekeepingDay.vue'),
    meta: {
      pageTitle: 'Chấm Công Ngày',
      breadcrumb: [
        {
          text: 'Chấm Công',
        },
        {
          text: 'Chấm Công Ngày',
          active: true,
        },
      ],
    },
  },
  {
    path: '/timekeeping/timekeeping-month',
    name: 'timekeeping-month',
    component: () => import('@/views/timekeeping/timekeeping-month/TimekeepingMonth.vue'),
  },
  {
    path: '/timekeeping/data-synchronization',
    name: 'data-synchronization',
    component: () => import('@/views/timekeeping/data-synchronization/DataSynchronization.vue'),
  },
  {
    path: '/timekeeping/data-search',
    name: 'data-search',
    component: () => import('@/views/timekeeping/data-search/DataSearch.vue'),
    meta: {
      pageTitle: 'Tra Cứu Dữ Liệu',
      breadcrumb: [
        {
          text: 'Chấm Công',
        },
        {
          text: 'Tra Cứu Dữ Liệu',
          active: true,
        },
      ],
    },
  },
]
