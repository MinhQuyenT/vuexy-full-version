import { $themeColors } from '@themeConfig'

export const statisticsItems = [
  {
    color: 'light-primary',
    customClass: 'mb-2 mb-xl-0',
    icon: 'UserIcon',
    subtitle: 'Nhân viên',
    title: '45',
  },
  {
    color: 'light-info',
    customClass: 'mb-2 mb-xl-0',
    icon: 'TrendingUpIcon',
    subtitle: 'Quẹt gương mặt',
    title: '',
  },
  {
    color: 'light-warning',
    customClass: 'mb-2 mb-xl-0',
    icon: 'BoxIcon',
    subtitle: 'Bù thẻ',
    title: '',
  },
  {
    color: 'light-success',
    customClass: 'mb-2 mb-xl-0',
    icon: 'BoxIcon',
    subtitle: 'Nghỉ phép',
    title: '',
  },
]

export const offsetDetails = {
  series: [
    { data: [] },
  ],
}

export const furloughDetails = {
  series: [
    { data: [] },
  ],
}
export const orgDetails = {
  chartOptions: {
    chart: {
      stacked: true,
      type: 'bar',
      toolbar: { show: false },
    },
    grid: {
      padding: {
        top: -20,
        bottom: -10,
      },
      yaxis: {
        lines: { show: false },
      },
    },
    xaxis: {
      categories: [],
      labels: {
        style: {
          colors: '#6E6B7B',
          fontSize: '0.86rem',
          fontFamily: 'Montserrat',
        },
      },
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    colors: [$themeColors.primary, $themeColors.warning],
    plotOptions: {
      bar: {
        columnWidth: '17%',
        endingShape: 'rounded',
      },
      distributed: true,
    },
    yaxis: {
      labels: {
        style: {
          colors: '#6E6B7B',
          fontSize: '0.86rem',
          fontFamily: 'Montserrat',
        },
      },
    },
  },
  series: [
    {
      data: [],
      name: 'A'
    },
    {
      data: [],
      name: 'B'
    },
  ],
}
