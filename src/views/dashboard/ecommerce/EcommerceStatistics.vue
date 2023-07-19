<template>
  <b-card v-if="data" no-body class="card-statistics">
    <b-card-header>
      <b-card-title>{{ $t('timekeepingInfo') }}</b-card-title>
      <b-col md="3">
        <b-dropdown v-model="yearVal" :text="yearVal" size="sm" class="budget-dropdown mr-2" variant="outline-primary"
          split @click.native="changeYear">
          <b-dropdown-item v-for="year in years" :key="year">
            {{ year }}
          </b-dropdown-item>
        </b-dropdown>
        <b-dropdown v-model="monthVal" :text="monthVal" size="sm" class="budget-dropdown" variant="outline-primary" split
          @click.native="changeMonth">
          <b-dropdown-item v-for="month in months" :key="month">
            {{ month }}
          </b-dropdown-item>
        </b-dropdown>
      </b-col>
    </b-card-header>
    <b-card-body class="statistics-body">
      <b-row>
        <b-col v-for="item in data" :key="item.icon" xl="3" sm="6" :class="item.customClass">
          <b-media no-body>
            <b-media-aside class="mr-2">
              <b-avatar size="48" :variant="item.color">
                <feather-icon size="24" :icon="item.icon" />
              </b-avatar>
            </b-media-aside>
            <b-media-body class="my-auto">
              <h4 class="font-weight-bolder mb-0">
                {{ item.title }}
              </h4>
              <b-card-text class="font-small-3 mb-0">
                {{ item.subtitle }}
              </b-card-text>
            </b-media-body>
          </b-media>
        </b-col>
      </b-row>
    </b-card-body>
  </b-card>
</template>

<script>
import {
  BCard,
  BCardHeader,
  BCardTitle,
  BCardText,
  BCardBody,
  BRow,
  BCol,
  BMedia,
  BMediaAside,
  BAvatar,
  BMediaBody,
  BDropdown,
  BDropdownItem,
} from 'bootstrap-vue'
import { useUtils as useI18nUtils } from '@core/libs/i18n'
export default {
  components: {
    BDropdownItem,
    BDropdown,
    BRow,
    BCol,
    BCard,
    BCardHeader,
    BCardTitle,
    BCardText,
    BCardBody,
    BMedia,
    BAvatar,
    BMediaAside,
    BMediaBody,
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    years: Array,
    months: Array,
  },
  data() {
    return {
      t:null,
      yearVal: '2023',
      monthVal: '4',
    }
  },
  mounted() {
    // this.t = useI18nUtils()
    const d = new Date()
    this.yearVal = d.getFullYear().toString()
    this.monthVal = d.getMonth().toString()
  },
  methods: {
    change() {
      this.$emit('changeDate', {
        year: this.yearVal,
        month: this.monthVal,
      })
      console.log({
        year: this.yearVal,
        month: this.monthVal,
      })
    },
    changeYear(val) {
      this.yearVal = val.target.innerText.trim()
      this.change()
    },
    changeMonth(val) {
      this.monthVal = val.target.innerText.trim(),
        this.change()
    },
  },
}
</script>
