export default [
  {
    path: '/keeping/timekeeping-day',
    name: 'timekeeping-day',
    component: () => import('@/views/timekeeping/timekeeping-day/TimekeepingDay.vue'),
    meta: {
      pageTitle: 'timekeepingDay',
      breadcrumb: [
        {
          text: 'keeping',
        },
        {
          text: 'timekeepingDay',
          active: true,
        },
      ],
    },
  },
  {
    path: '/keeping/timekeeping-month',
    name: 'timekeeping-month',
    component: () => import('@/views/timekeeping/timekeeping-month/TimekeepingMonth.vue'),
    meta: {
      pageTitle: 'timekeepingMonth',
      breadcrumb: [
        {
          text: 'keeping',
        },
        {
          text: 'timekeepingMonth',
          active: true,
        },
      ],
    },
  },
  {
    path: '/keeping/data-synchronization',
    name: 'data-synchronization',
    component: () => import('@/views/timekeeping/data-synchronization/DataSynchronization.vue'),
    meta: {
      pageTitle: 'dataSynchronization',
      breadcrumb: [
        {
          text: 'keeping',
        },
        {
          text: 'dataSynchronization',
          active: true,
        },
      ],
    },
  },
  {
    path: '/keeping/data-search',
    name: 'data-search',
    component: () => import('@/views/timekeeping/data-search/DataSearch.vue'),
    meta: {
      pageTitle: 'timekeepingDataSearch',
      breadcrumb: [
        {
          text: 'keeping',
        },
        {
          text: 'timekeepingDataSearch',
          active: true,
        },
      ],
    },
  },
  {
    path: '/keeping/modify-card-number',
    name: 'modify-card-number',
    component: () => import('@/views/timekeeping/modify-card-number/ModifyCardNumber.vue'),
    meta: {
      pageTitle: 'modifyCard',
      breadcrumb: [
        {
          text: 'keeping',
        },
        {
          text: 'modifyCard',
          active: true,
        },
      ],
    },
  },
  {
    path: '/keeping/data-synchronization-it',
    name: 'data-synchronization-it',
    component: () => import('@/views/timekeeping/data-synchronization-it/DataSynchronizationIt.vue'),
    meta: {
      pageTitle: 'dataSynchronizationIt',
      breadcrumb: [
        {
          text: 'keeping',
        },
        {
          text: 'dataSynchronizationIt',
          active: true,
        },
      ],
    },
  },
]
