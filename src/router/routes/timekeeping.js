export default [
  {
    path: '/keeping/timekeeping-day',
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
    path: '/keeping/timekeeping-month',
    name: 'timekeeping-month',
    component: () => import('@/views/timekeeping/timekeeping-month/TimekeepingMonth.vue'),
    meta: {
      pageTitle: 'Chấm Công Theo Tháng',
      breadcrumb: [
        {
          text: 'Chấm Công',
        },
        {
          text: 'Chấm Công Theo Tháng',
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
      pageTitle: 'Đồng Bộ Dữ Liệu',
      breadcrumb: [
        {
          text: 'Chấm Công',
        },
        {
          text: 'Đồng Bộ Dữ Liệu',
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
  {
    path: '/keeping/modify-card-number',
    name: 'modify-card-number',
    component: () => import('@/views/timekeeping/modify-card-number/ModifyCardNumber.vue'),
    meta: {
      pageTitle: 'Sửa Đổi Mã Thẻ',
      breadcrumb: [
        {
          text: 'Chấm Công',
        },
        {
          text: 'Sửa Đổi Mã Thẻ',
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
      pageTitle: 'Đồng Bộ Dữ Liệu IT',
      breadcrumb: [
        {
          text: 'Chấm Công',
        },
        {
          text: 'Đồng Bộ Dữ Liệu IT',
          active: true,
        },
      ],
    },
  },
]
