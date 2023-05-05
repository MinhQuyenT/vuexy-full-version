<template>
  <div class="timekeeping-main">
    <div class="grid-content" style="padding-top: 0; padding-left: 2px;margin-top:-15px; margin-bottom: 10px;">
      <b-button variant="relief-info" class="mr-1" @click="getHrTrackingData" :disabled="isBusy">Tra Cứu</b-button>
      <b-button variant="relief-warning" class="mr-1" hidden>Tính Toán</b-button>
      <!-- <b-button variant="relief-success" class="mr-1" @click="report">Xuất File</b-button> -->
      <b-dropdown text="Xuất File" variant="relief-success">
        <b-dropdown-item value="vi" @click="report('vi')">Tiếng Việt</b-dropdown-item>
        <b-dropdown-item value="cn" @click="report('cn')">Tiếng Trung</b-dropdown-item>
        <b-dropdown-item value="en" @click="report('en')">Tiếng Anh</b-dropdown-item>
      </b-dropdown>
    </div>
    <!-- <div class="d-flex justify-content-center mb-1">
      <b-spinner v-if="spinner" label="Loading..." />
    </div> -->
    <b-card class="text-center border " style="padding: 0!important; padding-bottom:0; height:calc(100vh - 155px); ">
      <div class="custom-search " style="margin-bottom:2px">
        <!-- advance search input -->
        <b-row>
          <b-col md="2">
            <b-form-group>
              <h6 style="display: flex; font-size: 0.857rem">Trung tâm:</h6>
              <v-select v-model="param.orgId" placeholder="-- Trung tâm --" @close="onDeselectingOrg"
                @option:selected="onChangeOrg" :options="systemOrgs" option-text="text" option-value="organizeId"
                label="text"></v-select>
            </b-form-group>
          </b-col>
          <b-col md="2">
            <b-form-group>
              <h6 style="display: flex; font-size: 0.857rem">Bộ phận:</h6>
              <v-select v-model="param.department" placeholder="-- Bộ phận --" :options="systemDeps" option-text="text"
                option-value="value" label="text"></v-select>
            </b-form-group>
          </b-col>
          <b-col md="2">
            <b-form-group>
              <label style="float: left">Mã nhân viên:</label>
              <b-form-input id="personNO" v-model="param.personNO" autocomplete="off" placeholder="Mã nhân vien" type="text"
                class="d-inline-block personNO"
                @input="advanceSearch && showIConX('.personNO', '.imgPersonNO', 'activePersonNO')" />
              <div class="imgPersonNO">
                <feather-icon icon="XIcon" />
              </div>
            </b-form-group>
          </b-col>
          <b-col md="2">
            <b-form-group>
              <label style="float: left">Họ tên:</label>
              <b-form-input v-model="param.personName" id="personName" placeholder="Họ tên" autocomplete="off" type="text"
                class="d-inline-block personName"
                @input="advanceSearch && showIConX('.personName', '.imgPersonName', 'activePersonName')" />
              <div class="imgPersonName">
                <feather-icon icon="XIcon" />
              </div>
            </b-form-group>
          </b-col>
          <b-col md="2">
            <b-form-group>
              <h6 style="display: flex; font-size: 0.857rem">Quốc tịch:</h6>
              <v-select v-model="param.politics" placeholder="-- Quốc tịch --" :clearable="false" :options="systemCodes" option-text="text"
                option-value="value" label="text"></v-select>
            </b-form-group>
          </b-col>
          <b-col md="2">
            <b-form-group>
              <h6 style="display: flex; font-size: 0.857rem">Ca làm:</h6>
              <v-select v-model="param.shiftId" placeholder="-- Ca làm --" :options="systemCodeShift" option-text="text"
                option-value="value" label="text"></v-select>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="mt-1">
          <b-col md="2">
            <b-form-group>
              <label style="float: left">Ngày bắt đầu <span>(<strong class="text-danger">*</strong>)</span>:</label>
              <b-form-datepicker id="dateBegin" :input-date="'YYYY-MM-DD'"
                :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                label-no-date-selected="Ngày bắt đầu" v-model="param.dateBegin" prop="" class="mb-2"></b-form-datepicker>
            </b-form-group>
          </b-col>
          <b-col md="2">
            <b-form-group>
              <label style="float: left">Ngày kết thúc <span>(<strong
                    class="text-danger text-bold">*</strong>)</span>:</label>
              <b-form-datepicker id="dateEnd" :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                label-no-date-selected="Ngày kết thúc" v-model="param.dateEnd" prop="" class="mb-2"></b-form-datepicker>
            </b-form-group>
          </b-col>
          <b-col md="2">
            <b-form-group>
              <h6 style="display: flex; font-size: 0.857rem">Trạng thái:</h6>
              <v-select v-model="param.status" placeholder="--Trạng thái--" :options="systemCodeStatus" option-text="text"
                option-value="value" label="text"></v-select>
            </b-form-group>
          </b-col>
          <b-col md="2">
            <b-form-group>
              <h6 style="display: flex; font-size: 0.857rem">Bù thẻ:</h6>
              <v-select v-model="param.offset" placeholder="-- Bù thẻ --" :options="systemCodeBool" option-text="text"
                option-value="value" label="text"></v-select>
            </b-form-group>
          </b-col>
          <b-col md="2">
            <b-form-group>
              <h6 style="display: flex; font-size: 0.857rem">Nghỉ phép:</h6>
              <v-select v-model="param.furlough" placeholder="-- Nghỉ phép --" :options="systemCodeBool"
                option-text="text" option-value="value" label="text"></v-select>
            </b-form-group>
          </b-col>
        </b-row>
      </div>
      <b-overlay id="overlay-background" :show="isBusy" :variant="variant" :opacity="opacity" :blur="blur" rounded="sm"
        style="">
        <b-table style="height: calc(100vh - 400px)" @row-dblclicked="onRowBblClicked"
          table-style="width: 100% !important; text-align: left" :sticky-header="true" aria-busy="true"
          :select-mode="selectMode" selectable responsive table-class=" text-nowrap" :fields="tableColumns"
          :items="hrTrackingData" primary-key="id" :sort-by.sync="sortBy" show-empty empty-text="Không có dữ liệu"
          :sort-desc.sync="isSortDirDesc" class="d-block table-cus" ref="refInvoiceListTable">
        </b-table>
        <div class="mx-2 mb-0">
        <div class="d-flex align-items-center justify-content-end ">
          <div class="d-flex align-items-center mr-2">
            <span class="text-muted">Tổng:</span> {{ this.totalRow }}
          </div>
          <div class="d-flex align-items-center mr-2">
            <label> <span class="text-muted">Hiển thị</span></label>
            <v-select v-model="perPage" :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" append-to-body
              :calculate-position="withPopper" :options="perPageOptions" :clearable="false"
              class="per-page-selector d-inline-block ml-50 mr-1" />
          </div>

          <div class="d-flex align-items-center">
            <b-pagination v-model="currentPage" :total-rows="totalRow" :per-page="perPage" first-number last-number
              class="mb-0 mt-sm-0" prev-class="prev-item" next-class="next-item">
              <template #prev-text>
                <feather-icon icon="ChevronLeftIcon" size="18" />
              </template>
              <template #next-text>
                <feather-icon icon="ChevronRightIcon" size="18" />
              </template>
            </b-pagination>
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
import { BOverlay, BDropdown, BDropdownItem, BSpinner, BPagination, BCol, BTable, BRow, BButton, VBToggle, BCard, BFormSelect, BFormInput, BFormGroup, BFormDatepicker } from "bootstrap-vue";
import vSelect from "vue-select";
import SibarDetail from "./SibarDetail.vue";
import { tableColumn, ResetX, showIConX } from "./data.js"
import axiosIns from "@/libs/axios";
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { createPopper } from '@popperjs/core'

export default {
  components: { BOverlay, BDropdown, BDropdownItem, BSpinner, BCol, BTable, BRow, BPagination, BButton, VBToggle, BCard, BFormSelect, BFormInput, BFormGroup, BFormDatepicker, vSelect, SibarDetail },
  data() {
    return {
      stickyHeader: true,
      param: {
        dateBegin: new Date().toISOString(),
        dateEnd: new Date().toISOString(),
        systemCode: null,
        systemDepartment: null,
        orgNO: null,
        politics: {value:1, text:'Việt nam'},
      },
      noCollapse: false,
      modes: ["multi", "single", "range"],
      selectMode: "single",
      selected: [],
      itemRow: {},
      systemCodes: [],
      systemDeps: [],
      hrTrackingData: [],
      systemOrgs: [],
      systemCodeBool: [],
      systemCodeStatus: [],
      systemCodeShift: [],
      backdrop: false,
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
      placement: 'top'
    };
  },
  mounted() {
    this.getSystemOrg();
    this.getSystemCodePositics();
    this.setParam();
    this.getSystemDep();
    this.getSystemCodeShift();
    this.getSystemCodeBool();
    this.getSystemCodeStatus();
    this.getHrTrackingData();
  },
  created() {},
  watch: {
    perPage: function (currentPage, oldCurrentPage) {
      this.getHrTrackingData();
    },

    currentPage: function (currentPage, oldCurrentPage) {
      this.getHrTrackingData();
    },
  },
  methods: {
    getHrTrackingData() {
      this.isBusy = true
      axiosIns.get('hrTrackingData', { params: this.setParam() }).then((res) => {
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
            this.totalRow = res.data.data.total;
            this.currentPage = res.data.data.current;
            this.hrTrackingData.map((item, index) => {
              item.index = index + 1;
              item.trackingDate = new Date(item.trackingDate).toLocaleDateString("fr-CA");
              item.offset = item.offset == 1 ? this.systemCodeBool.filter(v => v.value == 1)[0].text : this.systemCodeBool.filter(v => v.value == 0)[0].text;
              item.status = item.status == true ? this.systemCodeStatus.filter(v => v.value == 1)[0].text : this.systemCodeStatus.filter(v => v.value == 0)[0].text;
            })
          } else {
            this.hrTrackingData = [];
            this.totalRow = 0;
            this.currentPage = 1;

          }
        }
      }).catch(err => { })
    },

    report(value) {
      
      var params = new URLSearchParams(this.setParam()).toString();
      var url = `http://192.168.5.42:99/api/hrTrackingData/download${params ? '?' + params : ''}`;
      window.open(url, 'Download');
    },

    getSystemOrg() {
      axiosIns.get('systemDepartment/org').then(res => {
        this.systemOrgs = res.data.map((item) => { return { value: item.orgNO, text: item.orgName, organizeId: item.organizeId } })
      }).catch()
    },

    getSystemCodeShift() {
      axiosIns.get('systemCode?codeKey=workShift').then(res => {
        this.systemCodeShift = res.data.map((item) => { return { value: item.codeValue, text: item.codeNameVi } })
      }).catch()
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

    getSystemCodePositics() {
      axiosIns.get(`/systemCode`).then(res => {
        this.systemCodes = res.data.filter(item => item.codeKey === "positics").map((res) => { return { value: res.codeId, text: res.codeNameVi } })
      }).catch()
    },

    getSystemCodeBool() {
      axiosIns.get(`/systemCode`).then(res => {
        this.systemCodeBool = res.data.filter(item => item.codeKey === "bool").map((res) => { return { value: res.codeValue, text: res.codeNameVi } })
      }).catch()
    },

    getSystemCodeStatus() {
      axiosIns.get(`/systemCode`).then(res => {
        this.systemCodeStatus = res.data.filter(item => item.codeKey === "status").map((res) => { return { value: res.codeValue, text: res.codeNameVi } })
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

    setParam(){
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

    showIConX(Selector, imgSelector, active) {
      const item = document.querySelector(Selector).value;
      const img = document.querySelector(imgSelector)
      if (item.value <= 0) {
        document.body.classList.remove(active)
      } else {
        document.body.classList.add(active)
      }
      img.addEventListener("click", () => {
        debugger
        document.querySelector(Selector).value = "";
        if(Selector == ".personNO"){
          this.param.personNO = ""
        }
        if(Selector == ".personName"){
          this.param.personName = ""
        }
        document.body.classList.remove(active)
      })
    },

    onRowSelected(items) { },
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
  directives: {
    ResetX
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

// table.b-table[aria-busy="false"] {
//   width: max-content !important;
// }

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

.imgPersonNO {
  display: none;
}

.imgPersonName {
  display: none;
}

.activePersonNO .imgPersonNO {
  position: absolute;
  margin-top: -30px;
  margin-left: 230px;
  display: block;
  right: 20px;
  color: #6e6b7b;
}

.activePersonName .imgPersonName {
  right: 26px;
  position: absolute;
  margin-top: -30px;
  display: block;
  right: 20px;
  color: #6e6b7b;
}
@media screen and (max-width: 1405px) {
  .table-cus{
    height: calc(100vh - 460px)!important
  }
}

</style>
