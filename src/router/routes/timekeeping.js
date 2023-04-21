export default [
  {
    path: '/timekeeping/timekeeping-day',
    name: 'timekeeping-day',
    component: () => import('@/views/timekeeping/timekeeping-day/TimekeepingDay.vue'),
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
]
