export default [
    {
      path: '/manager/shift-list',
      name: 'shift-list',
      component: () => import('@/views/timekeeping/timekeeping-day/TimekeepingDay.vue'),
    },
  ]