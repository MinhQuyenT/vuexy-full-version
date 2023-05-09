<template>
  <section id="dashboard-ecommerce">
    <b-row class="match-height">
      <b-col>
        <ecommerce-statistics
          :data="data.statisticsItems"
          :years="years"
          :months="months"
          @changeDate="change"
        />
      </b-col>
    </b-row>
    <b-row class="match-height">
      <b-col lg="4">
        <b-row class="match-height">
          <b-col
            lg="6"
            md="3"
            cols="6"
          >
            <ecommerce-profit-chart :data="data.offsetDetails" />
          </b-col>
          <b-col
            lg="6"
            md="3"
            cols="6"
          >
            <ecommerce-profit-chart :data="data.furloughDetails" />
          </b-col>
          <b-col
            lg="12"
            md="6"
          >
            <ecommerce-earnings-chart :data="data.earningsCharts" />
          </b-col>
        </b-row>
      </b-col>
      <b-col lg="8">
        <ecommerce-revenue-report :data="data.orgDetails" />
      </b-col>
    </b-row>
  </section>
</template>

<script>
import { BRow, BCol } from 'bootstrap-vue'

import { axiosGet } from '@/utils/Tools'
import {
  furloughDetails, offsetDetails, orgDetails, statisticsItems,
} from '@/const/contants'
import EcommerceStatistics from './EcommerceStatistics.vue'
import EcommerceRevenueReport from './EcommerceRevenueReport.vue'
import EcommerceProfitChart from './EcommerceProfitChart.vue'
import EcommerceEarningsChart from './EcommerceEarningsChart.vue'

export default {
  components: {
    BRow,
    BCol,
    EcommerceStatistics,
    EcommerceRevenueReport,
    EcommerceProfitChart,
    EcommerceEarningsChart,
  },
  data() {
    return {
      data: {},
      years: ['2022', '2023'],
      months: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    }
  },
  async created() {
    const d = new Date();
    this.initData(d.getFullYear(), d.getMonth())
    // this.$http.get('/ecommerce/data').then(response => { console.log(response.data)})
  },
  methods: {
    change(val) {
      this.initData(val.year, val.month)
    },
    async initData(year, month) {
      const res = await axiosGet('hrStatistical', {
        year,
        month,
      })
      const {
        monthStatis,
        orgDetail,
        offsetDetail,
      } = res.data.data

      statisticsItems[0].title = monthStatis.personNum
      statisticsItems[1].title = monthStatis.dataNum
      statisticsItems[2].title = monthStatis.offsetNum
      statisticsItems[3].title = monthStatis.furloughNum
      const earningsCharts = {
        series: [],
        title: '',
      }
      earningsCharts.series = []
      earningsCharts.series.push(100 - (monthStatis.offsetNum / monthStatis.personNum * 100))
      earningsCharts.series.push(monthStatis.offsetNum / monthStatis.personNum * 100)
      earningsCharts.title = `${(monthStatis.offsetNum / monthStatis.personNum * 100).toFixed(2)}%`
      let count = 0
      offsetDetails.series[0].data = []
      furloughDetails.series[0].data = []
      offsetDetail.map(e => {
        count += (e.amount != null ? Number(e.amount) : 0)
        offsetDetails.series[0].data.push(e.amount)
        furloughDetails.series[0].data.push(0)
      })
      offsetDetails.sum = count
      offsetDetails.title = 'Bù thẻ'

      furloughDetails.title = 'Nghỉ phép'
      furloughDetails.sum = 0
      orgDetails.series[0].data = []
      orgDetails.chartOptions.xaxis.categories=[];
      orgDetail.map(e => {
        orgDetails.series[0].data.push(e.offsetNum || 0)
        orgDetails.series[1].data.push(e.furloughNum || 0)
        orgDetails.chartOptions.xaxis.categories.push(e.orgName)
      })
      this.data = {
        statisticsItems,
        offsetDetails,
        orgDetails,
        earningsCharts,
        furloughDetails,
      }
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/dashboard-ecommerce.scss';
@import '@core/scss/vue/libs/chart-apex.scss';
</style>
