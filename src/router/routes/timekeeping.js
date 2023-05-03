export default [
  {
    path: '/timekeeping/timekeeping-day',
    name: 'timekeeping-day',
    component: () => import('@/views/timekeeping/timekeeping-day/TimekeepingDay.vue'),
    meta: {
      pageTitle: 'TimeKeeping',
      breadcrumb: [
        {
          text: 'Dashboard',
        },
        {
          text: 'Timekeeping Day',
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
      pageTitle: 'TimeKeeping',
      breadcrumb: [
        {
          text: 'Dashboard',
        },
        {
          text: 'Data Search',
          active: true,
        },
      ],
    },
  },
]
