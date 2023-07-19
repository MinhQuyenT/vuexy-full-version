<template>
  <b-card v-if="data" no-body class="card-revenue-budget">
    <b-row class="mx-0">
      <b-col class="revenue-report-wrapper">
        <div class="d-sm-flex justify-content-between align-items-center mb-3">
          <h4 class="card-title mb-50 mb-sm-0">
            Chi tiết từng bộ phận
          </h4>
          <div class="d-flex align-items-center">
            <div class="d-flex align-items-center mr-2">
              <span class="bullet bullet-primary svg-font-small-3 mr-50 cursor-pointer" />
              <span>Bù thẻ</span>
            </div>
            <div class="d-flex align-items-center ml-75">
              <span class="bullet bullet-warning svg-font-small-3 mr-50 cursor-pointer" />
              <span>Nghỉ phép </span>
            </div>
          </div>
        </div>

        <!-- chart -->
        <vue-apex-charts id="revenue-report-chart" type="bar" height="230" :options="data.chartOptions"
          :series="data.series" />
      </b-col>


    </b-row>
  </b-card>
</template>

<script>
import {
  BCard, BRow, BCol
} from 'bootstrap-vue'
import VueApexCharts from 'vue-apexcharts'
import { $themeColors } from '@themeConfig'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    VueApexCharts,
    BCard,
    BRow,
    BCol,
  },
  directives: {
    Ripple,
  },
  props: {
    data: {
      type: Object,
      default: () => { },
    },
  },
  data() {
    return {
      revenue_report: {},
      // budget chart
      budgetChart: {
        options: {
          chart: {
            height: 80,
            toolbar: { show: false },
            zoom: { enabled: false },
            type: 'line',
            sparkline: { enabled: true },
          },
          stroke: {
            curve: 'smooth',
            dashArray: [0, 5],
            width: [2],
          },
          colors: [$themeColors.primary, '#dcdae3'],
          tooltip: {
            enabled: false,
          },
        },
      },
    }
  }
}
</script>
