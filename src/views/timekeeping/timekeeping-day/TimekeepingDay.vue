<template>
  <div class="timekeeping-main">
    <div class="grid-content" style="padding-top: 0; padding-left: 2px;margin-top:-15px; margin-bottom: 10px;">
      <b-button variant="relief-info" class="mr-1" @click="getHrTrackingData" :disabled="isBusy">{{
        $t('timekeeping-day.search') }}</b-button>
      <b-button variant="relief-warning" class="mr-1" hidden>Tính Toán</b-button>
      <!-- <b-button variant="relief-success" class="mr-1" @click="report">Xuất File</b-button> -->
      <b-dropdown :text="$t('timekeeping-day.exportExcel')" variant="relief-success">
        <b-dropdown-item value="vi" @click="report('vi')">{{ $t('timekeeping-day.vietnam') }}</b-dropdown-item>
        <b-dropdown-item value="cn" @click="report('cn')">{{ $t('timekeeping-day.china') }}</b-dropdown-item>
        <b-dropdown-item value="en" @click="report('en')">{{ $t('timekeeping-day.english') }}</b-dropdown-item>
      </b-dropdown>
    </div>
    <!-- <div class="d-flex justify-content-center mb-1">
      <b-spinner v-if="spinner" label="Loading..." />
    </div> -->
    <!-- <form-input :options="option1" :params="param"></form-input> -->
    <b-card class="text-center border " style="padding: 0!important; padding-bottom:0; height:calc(100vh - 155px); ">
      <div class="custom-search " style="margin-bottom:2px">
        <!-- advance search input -->
        <b-row>
          <b-col md="2">
            <b-form-group>
              <h6 style="display: flex; font-size: 0.857rem">{{ $t('timekeeping-day.orgName') }}:</h6>
              <v-select v-model="param.orgId" :placeholder="$t('timekeeping-day.orgName')" @close="onDeselectingOrg"
                @option:selected="onChangeOrg" :options="systemOrgs" option-text="text" option-value="organizeId"
                label="text"></v-select>
            </b-form-group>
          </b-col>
          <b-col md="2">
            <b-form-group>
              <h6 style="display: flex; font-size: 0.857rem">{{ $t('timekeeping-day.department') }}:</h6>
              <v-select v-model="param.department" :placeholder="$t('timekeeping-day.department')" :options="systemDeps"
                option-text="text" option-value="value" label="text"></v-select>
            </b-form-group>
          </b-col>
          <b-col md="2">
            <b-form-group>
              <label style="float: left">{{ $t('timekeeping-day.personNO') }}:</label>
              <b-form-input id="personNO" v-model="param.personNO" autocomplete="off"
                :placeholder="$t('timekeeping-day.personNO')" type="text" class="d-inline-block personNO"
                @input="advanceSearch" />
              <div style="position:absolute;top:30px;right:22px" v-if="param.personNO != null & param.personNO != ''">
                <feather-icon icon="XIcon" @click="clear('personNO')" />
              </div>
            </b-form-group>
          </b-col>
          <b-col md="2">
            <b-form-group>
              <label style="float: left">{{ $t('timekeeping-day.personName') }}:</label>
              <b-form-input v-model="param.personName" id="personName" :placeholder="$t('timekeeping-day.personName')"
                autocomplete="off" type="text" class="d-inline-block personName" />
              <div style="position:absolute;top:30px;right:22px" v-if="param.personName != null & param.personName != ''">
                <feather-icon icon="XIcon" @click="clear('personName')" />
              </div>
            </b-form-group>
          </b-col>
          <b-col md="2">
            <b-form-group>
              <h6 style="display: flex; font-size: 0.857rem">{{ $t('timekeeping-day.politics') }}:</h6>
              <v-select v-model="param.politics" :placeholder="$t('timekeeping-day.politics')" :clearable="false"
                :options="systemCodesPositics" option-text="text" option-value="value" label="text"></v-select>
            </b-form-group>
          </b-col>
          <b-col md="2">
            <b-form-group>
              <h6 style="display: flex; font-size: 0.857rem">{{ $t('timekeeping-day.shift') }}:</h6>
              <v-select v-model="param.shiftId" :placeholder="$t('timekeeping-day.shift')" :options="systemCodeShift"
                option-text="text" option-value="value" label="text"></v-select>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="mt-1">
          <b-col md="2">
            <b-form-group>
              <label style="float: left">{{ $t('timekeeping-day.dateBegin') }} <span>(<strong
                    class="text-danger">*</strong>)</span>:</label>
              <b-form-datepicker id="dateBegin" :input-date="'YYYY-MM-DD'"
                :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                label-no-date-selected="Ngày bắt đầu" v-model="param.dateBegin" prop="" class="mb-2"></b-form-datepicker>
            </b-form-group>
          </b-col>
          <b-col md="2">
            <b-form-group>
              <label style="float: left">{{ $t('timekeeping-day.dateEnd') }} <span>(<strong
                    class="text-danger text-bold">*</strong>)</span>:</label>
              <b-form-datepicker id="dateEnd" :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                label-no-date-selected="Ngày kết thúc" v-model="param.dateEnd" prop="" class="mb-2"></b-form-datepicker>
            </b-form-group>
          </b-col>
          <b-col md="2">
            <b-form-group>
              <h6 style="display: flex; font-size: 0.857rem">{{ $t('timekeeping-day.status') }}:</h6>
              <v-select v-model="param.status" :placeholder="$t('timekeeping-day.status')" :options="systemCodeStatus"
                option-text="text" option-value="value" label="text"></v-select>
            </b-form-group>
          </b-col>
          <b-col md="2">
            <b-form-group>
              <h6 style="display: flex; font-size: 0.857rem">{{ $t('timekeeping-day.offset') }}:</h6>
              <v-select v-model="param.offset" :placeholder="$t('timekeeping-day.offset')" :options="systemCodeBool"
                option-text="text" option-value="value" label="text"></v-select>
            </b-form-group>
          </b-col>
          <b-col md="2">
            <b-form-group>
              <h6 style="display: flex; font-size: 0.857rem">{{ $t('timekeeping-day.furlough') }}:</h6>
              <v-select v-model="param.furlough" :placeholder="$t('timekeeping-day.furlough')" :options="systemCodeBool"
                option-text="text" option-value="value" label="text"></v-select>
            </b-form-group>
          </b-col>
        </b-row>
      </div>
      <b-overlay id="overlay-background" :show="isBusy" :variant="variant" :opacity="opacity" :blur="blur" rounded="sm"
        style="">
        <b-table style="height: calc(100vh - 400px)" @row-dblclicked="onRowBblClicked"
          table-style="width: 100% !important; text-align: left" :sticky-header="true" aria-busy="true"
          select-mode="single" selectable responsive table-class=" text-nowrap" :fields="tableColumns"
          :items="hrTrackingData" primary-key="id" :sort-by.sync="sortBy" show-empty :empty-text="$t('timekeeping-day.noData')"
          :sort-desc.sync="isSortDirDesc" class="d-block table-cus table-bordered" ref="refInvoiceListTable">

          <template #cell(statusName)="data">
            <b-badge pill :variant="`light-${data.item.status == false ? 'danger' : 'success'}`" class="text-capitalize">
              {{ data.item.statusName }}
            </b-badge>
          </template>
        </b-table>
        <div class="mx-2 mb-0">
          <div class="d-flex align-items-center justify-content-end ">
            <div class="d-flex align-items-center mr-2">
              <span class="text-muted">{{ $t('timekeeping-day.sum') }}:</span> {{ this.totalRow }}
            </div>
            <div class="d-flex align-items-center mr-2">
              <label> <span class="text-muted">{{ $t('timekeeping-day.show') }}</span></label>
              <v-select v-model="perPage" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" append-to-body
                :calculate-position="withPopper" :options="perPageOptions" :clearable="false"
                class="per-page-selector d-inline-block ml-50 mr-1" />
            </div>
            <div>
              <b-pagination v-model="currentPage" :total-rows="totalRow" :per-page="perPage"></b-pagination>
            </div>
          </div>
        </div>
      </b-overlay>
    </b-card>
    <!-- Sidebar -->
    <sibar-detail v-model="isTaskHandlerSidebarActive" :items="itemRow" v-if="isTaskHandlerSidebarActive"></sibar-detail>
  </div>
</template>

<script>

import SibarDetail from "./SibarDetail.vue";
import { tableColumn, } from "./data.js"
import axiosIns from "@/libs/axios";
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { createPopper } from '@popperjs/core'

export default {
  components: { SibarDetail },
  data() {
    return {
      systemCodesPositics: [],
      option1: [],
      param: {
        dateBegin: new Date().toISOString(),
        dateEnd: new Date().toISOString(),
        systemCode: null,
        systemDepartment: null,
        orgNO: null,
        politics: { value: 2, text: 'Việt nam' },
      },
      selected: [],
      itemRow: {},
      systemCode: [],
      systemDeps: [],
      hrTrackingData: [],
      hrTrackingDataTest: [],
      systemOrgs: [],
      systemCodeBool: [],
      systemCodeStatus: [],
      systemCodeShift: [],
      tableColumns: tableColumn(this),
      sortBy: null,
      sortDesc: null,
      isBusy: false,
      isSortDirDesc: null,
      isTaskHandlerSidebarActive: false,
      spinner: false,
      variant: 'light',
      opacity: 0.85,
      blur: '2px',
      perPageOptions: [10, 20, 25, 50, 100],
      perPage: 20,
      currentPage: 1,
      totalRow: 0,
      placement: 'top',
    };
  },
  async mounted() {
    await this.getSystemCode();
    this.systemCodeLanguage();
    this.getSystemOrg();
    this.setParam();
    this.getSystemDep();
    this.getHrTrackingData();
    this.hrTrackingData.map((item, index) => {
      item.index = index + 1;
      item.trackingDate = new Date(item.trackingDate).toLocaleDateString("fr-CA");
      item.dayOfWeekName = this.configSystemCode("dayOfWeek", item.dayOfWeek);
      item.offsetName = this.configSystemCode("bool", item.offset);
      item.statusName = this.configSystemCode("status", item.status);
      item.shiftName = this.configSystemCode("workShift", item.shiftId);
    })

  },
  beforeUpdate() {
    this.systemCodeLanguage();
    this.hrTrackingData.map((item, index) => {
      item.index = index + 1;
      item.trackingDate = new Date(item.trackingDate).toLocaleDateString("fr-CA");
      item.dayOfWeekName = this.configSystemCode("dayOfWeek", item.dayOfWeek);
      item.offsetName = this.configSystemCode("bool", item.offset);
      item.statusName = this.configSystemCode("status", item.status);
      item.shiftName = this.configSystemCode("workShift", item.shiftId);
    })
    this.tableColumns = tableColumn(this);
  },
  watch: {
    perPage: function (currentPage, oldCurrentPage) {
      this.getHrTrackingData();
    },

    currentPage: function (currentPage, oldCurrentPage) {
      this.getHrTrackingData();
    },
  },
  methods: {
    async getSystemCode() {
      await axiosIns.get('systemCode').then(res => {
        this.systemCode = res.data.map((item) => {
          return { codeValue: item.codeValue, codeNameVi: item.codeNameVi, codeNameEn: item.codeNameEn, codeNameCn: item.codeNameCn, codeKey: item.codeKey }
        })
      }).catch()
    },

    systemCodeLanguage() {
      this.systemCodeShift = this.systemCode.filter(item => item.codeKey === 'workShift').map(item => {
        return { value: item.codeValue, text: this.$i18n.locale === 'en' ? item.codeNameVi : this.$i18n.locale === 'vi' ? item.codeNameVi : item.codeNameCn }
      })
      this.systemCodesPositics = this.systemCode.filter(item => item.codeKey === 'positics').map(item => {
        return { value: item.codeValue, text: this.$i18n.locale === 'en' ? item.codeNameVi : this.$i18n.locale === 'vi' ? item.codeNameVi : item.codeNameCn }
      })
      this.systemCodeStatus = this.systemCode.filter(item => item.codeKey === 'status').map(item => {
        return { value: item.codeValue, text: this.$i18n.locale === 'en' ? item.codeNameVi : this.$i18n.locale === 'vi' ? item.codeNameVi : item.codeNameCn }
      })
      this.systemCodeBool = this.systemCode.filter(item => item.codeKey === 'bool').map(item => {
        return { value: item.codeValue, text: this.$i18n.locale === 'en' ? item.codeNameVi : this.$i18n.locale === 'vi' ? item.codeNameVi : item.codeNameCn }
      })
    },

    getHrTrackingData() {
      this.isBusy = true
      axiosIns.get('hrTrackingData', { params: this.setParam() }).then((res) => {
        console.log('res: ', res);
        if (res.data.code == -1) {
          this.$toast.error({
            component: ToastificationContent,
            position: 'top-right',
            props: {
              variant: 'warning',
              icon: 'CheckCircleIcon',
              text: `${res.data.msg}`,
            },
          })
        } else {
          this.$toast({
            component: ToastificationContent,
            position: 'top-right',
            props: {
              variant: 'success',
              icon: 'CheckCircleIcon',
              text: `${res.data.msg}`,
            },
          })
          this.isBusy = false;
          if (res.data.data != null) {
            this.hrTrackingData = res.data?.data.records;
            this.hrTrackingDataTest = res.data?.data.records;
            this.totalRow = res.data.data.total;
            this.currentPage = res.data.data.current;
          } else {
            this.hrTrackingData = [];
            this.totalRow = 0;
            this.currentPage = 1;
          }

          console.log(this.hrTrackingDataTest);
        }
      }).catch(err => { })
    },

    configSystemCode(codeKey, codeValue) {
      if (codeValue === true) {
        codeValue = 1
      } else if (codeValue === false) {
        codeValue = 0
      } else codeValue = codeValue
      const name = this.systemCode.filter(item => item.codeKey === codeKey && item.codeValue === codeValue.toString()).map(item => {
        return { name: this.$i18n.locale === 'en' ? item.codeNameVi : this.$i18n.locale === 'vi' ? item.codeNameVi : item.codeNameCn }
      })
      return name[0]?.name
    },

    report() {
      var params = new URLSearchParams(this.setParam()).toString();
      var url = `http://192.168.5.42:99/api/hrTrackingData/download${params ? '?' + params : ''}`;
      window.open(url, 'Download');
    },

    getSystemOrg() {
      axiosIns.get('systemDepartment/org').then(res => {
        this.systemOrgs = res.data.map((item) => { return { value: item.orgNO, text: item.orgName, organizeId: item.organizeId } })
      }).catch()
    },

    getSystemDep() {
      axiosIns.get('systemDepartment/dep').then(res => {
        this.systemDeps = res.data.map((item) => { return { value: item.parentOID, text: item.orgName } })
      }).catch()
    },

    getSystemDepByOrg(item) {
      axiosIns.get(`/systemDepartment?parentOID=${item.organizeId}`).then(res => {
        this.systemDeps = res.data.map((item) => { return { value: item.parentOID, text: item.orgName } })
      }).catch()
    },

    onChangeOrg(item) {
      this.getSystemDepByOrg(item);
    },

    onRowBblClicked(items) {
      this.isTaskHandlerSidebarActive = true;
      if (this.isTaskHandlerSidebarActive == true) {
        this.itemRow = items
      }
    },
    setParam() {
      let obj = {
        dateBegin: new Date(this.param.dateBegin).toLocaleDateString("fr-CA"),
        dateEnd: new Date(this.param.dateEnd).toLocaleDateString("fr-CA"),
      }
      if (this.param.orgId) {
        obj = Object.assign(obj, { orgId: this.param.orgId.organizeId })
      }
      if (this.param.department) {
        obj = Object.assign(obj, { department: this.param.department.value })
      }
      if (this.param.politics) {
        obj = Object.assign(obj, { politics: this.param.politics.value })
      }
      if (this.param.shiftId) {
        obj = Object.assign(obj, { shiftId: this.param.shiftId.value })
      }
      if (this.param.offset) {
        obj = Object.assign(obj, { offset: this.param.offset.value })
      }
      if (this.param.personNO) {
        obj = Object.assign(obj, { personNo: this.param.personNO })
      }
      if (this.param.status) {
        obj = Object.assign(obj, { status: this.param.status.value })
      }
      if (this.param.personName) {
        obj = Object.assign(obj, { personName: this.param.personName })
      }
      if (this.currentPage) {
        obj = Object.assign(obj, { page: +this.currentPage })
      }
      if (this.perPage) {
        obj = Object.assign(obj, { rows: this.perPage })
      }
      return obj
    },

    clear(val) {
      this.param[val] = null;
    },

    advanceSearch(val) {
      this.searchTerm = val;
    },

    onDeselectingOrg() {
      if (!this.param.orgId) {
        this.getSystemDep();
      }
    },

    withPopper(dropdownList, component, { width }) {
      dropdownList.style.width = width
      const popper = createPopper(component.$refs.toggle, dropdownList, {
        placement: this.placement,
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, -1],
            },
          },
          {
            name: 'toggleClass',
            enabled: true,
            phase: 'write',
            fn({ state }) {
              component.$el.classList.toggle(
                'drop-up',
                state.placement === 'top'
              )
            },
          },
        ],
      })
      return () => popper.destroy()
    },
  },
}
</script>
<style lang="scss">
.el-input__inner:focus {
  border: 1px solid #7367f0 !important;
}

.b-sidebar.sidebar-lg {
  width: 70% !important;
}

.table.b-table>tbody>.table-active,
.table.b-table>tbody>.table-active>th,
.table.b-table>tbody>.table-active>td {
  background-color: #bdf !important;
}

table#table-transition-example .flip-list-move {
  transition: transform 1s;
}

.form-group {
  margin-bottom: 0;
}

.b-table-sticky-header {
  max-height: 700px;
}

table#table-transition-example .flip-list-move {
  transition: transform 1s;
}

.timekeeping-main {
  height: auto;
  max-height: 100%;
}

body {
  min-height: 100%;
}

[data-popper-placement='top'] {
  border-radius: 4px 4px 0 0;
  border-top-style: solid;
  border-bottom-style: none;
  box-shadow: 0 -3px 6px rgba(0, 0, 0, 0.15);
}

@media screen and (max-width: 1405px) {
  .table-cus {
    height: calc(100vh - 460px) !important
  }
}
</style>
