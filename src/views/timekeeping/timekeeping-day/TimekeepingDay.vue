<template>
  <div class="" style="height: 770px">
    <div class="grid-content" style="padding-top: 0; padding-left: 2px; margin-top: -20px;">
      <b-button variant="relief-info" class="mr-1" @click="getHrTrackingData" :disabled="isBusy">Tra Cứu</b-button>
      <b-button variant="relief-warning" class="mr-1">Tính Toán</b-button>
      <b-button variant="relief-success" class="mr-1" @click="report">Xuất File</b-button>
    </div>
    <!-- <div class="d-flex justify-content-center mb-1">
      <b-spinner v-if="spinner" label="Loading..." />
    </div> -->
    <b-card class="text-center border " style="padding: 0!important;">
      <div class="custom-search mb-2">
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
              <b-form-input v-model="param.personNO" placeholder="Mã nhân vien" type="text" class="d-inline-block"
                @input="advanceSearch" />
            </b-form-group>
          </b-col>
          <b-col md="2">
            <b-form-group>
              <label style="float: left">Họ tên:</label>
              <b-form-input v-model="param.personName" placeholder="Họ tên" type="text" class="d-inline-block"
                @input="advanceSearch" />
            </b-form-group>
          </b-col>
          <b-col md="2">
            <b-form-group>
              <h6 style="display: flex; font-size: 0.857rem">Quốc tịch:</h6>
              <v-select v-model="param.politics" placeholder="-- Quốc tịch --" :options="systemCodes" option-text="text"
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
              <label style="float: left">Ngày kết thúc<span>(<strong class="text-danger text-bold">*</strong>)</span>:</label>
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
        style="height: 548px">
        <b-table style="height: 548px" @row-dblclicked="onRowBblClicked"
          table-style="width: 100% !important; text-align: left" :sticky-header="true" aria-busy="true"
          :select-mode="selectMode" selectable responsive table-class=" text-nowrap" :fields="tableColumns"
          :items="hrTrackingData" primary-key="id" :sort-by.sync="sortBy" show-empty empty-text="Không có dữ liệu"
          :sort-desc.sync="isSortDirDesc" class="d-block table-cus" ref="refInvoiceListTable">
        </b-table>
      </b-overlay>
    </b-card>
    <!-- Sidebar -->
    <sibar-detail v-model="isTaskHandlerSidebarActive" :items="itemRow" v-if="isTaskHandlerSidebarActive"></sibar-detail>
  </div>
</template>

<script>
import {  BOverlay, BSpinner, BCol, BTable, BRow, BButton, VBToggle, BCard, BFormSelect, BFormInput, BFormGroup, BFormDatepicker } from "bootstrap-vue";
import vSelect from "vue-select";
import SibarDetail from "./SibarDetail.vue";
import { tableColumn } from "./data.js"
import axiosIns from "@/libs/axios";
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  components: { BOverlay, BSpinner, BCol, BTable, BRow, BButton, VBToggle, BCard, BFormSelect, BFormInput, BFormGroup, BFormDatepicker, vSelect, SibarDetail },
  data() {
    return {
      stickyHeader: true,
      param: {
        dateBegin: new Date().toISOString(),
        dateEnd: new Date().toISOString(),
        systemCode: null,
        systemDepartment: null,
        orgNO: null,
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
    };
  },
  mounted() {
    this.getSystemOrg();
    this.getHrTrackingData();
    this.getSystemDep();
    this.getSystemCodePositics();
    this.getSystemCodeShift();
    this.getSystemCodeBool();
    this.getSystemCodeStatus();
  },
  created: {},
  methods: {
    getHrTrackingData() {
      let obj = {
        dateBegin: new Date(this.param.dateBegin).toLocaleDateString("fr-CA"),
        dateEnd: new Date(this.param.dateEnd).toLocaleDateString("fr-CA"),
      }
      if (this.param.orgId) {
        obj = Object.assign(obj, { orgId: this.param.orgId.organizeId })
      }
      if (this.param.department) {
        obj = Object.assign(obj, { department: this.param.department })
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
      if (this.param.personName) {
        obj = Object.assign(obj, { personName: this.param.personName })
      }
      this.isBusy = true
      axiosIns.get('hrTrackingData', { params: obj }).then((res) => {
        if (res.code == -1) {
          this.$toast.error({
            component: ToastificationContent,
            position: 'top-right',
            props: {
              variant: 'warning',
              text: `Vui lòng nhập ngày tháng!`,
            },
          })
        } else {
          this.isBusy = false;
          this.hrTrackingData = res.data.data;
          console.log(res.data.data);
          if (this.hrTrackingData != null) {
            this.hrTrackingData.map((item, index) => {
              item.index = index + 1;
              item.trackingDate = new Date(item.trackingDate).toLocaleDateString("fr-CA");
              item.offset = item.offset == 1 ? this.systemCodeBool.filter(v => v.value == 1)[0].text : this.systemCodeBool.filter(v => v.value == 0)[0].text;
              item.status = item.status == true ? this.systemCodeStatus.filter(v => v.value == 1)[0].text : this.systemCodeStatus.filter(v => v.value == 0)[0].text;
            })
          }
        }
      }).catch(err => {
        if (err) {
          console.log(err);
          this.$toast.error({
            component: ToastificationContent,
            position: 'top-right',
            props: {
              title: ``,
              icon: 'ConnectIcon',
              variant: 'warning',
              text: `Vui lòng nhập ngày tháng!`,
            },
          })
        }
      })
    },

    report() {
      let obj = {
        dateBegin: new Date(this.param.dateBegin).toLocaleDateString("fr-CA"),
        dateEnd: new Date(this.param.dateEnd).toLocaleDateString("fr-CA"),
      }
      if (this.param.orgId) {
        obj = Object.assign(obj, { orgId: this.param.orgId.organizeId })
      }
      if (this.param.department) {
        obj = Object.assign(obj, { department: this.param.department })
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
      if (this.param.personName) {
        obj = Object.assign(obj, { personName: this.param.personName })
      }
      var params = new URLSearchParams(obj).toString();
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
        this.systemDeps = res.data.map((item) => { return { value: item.orgNO, text: item.orgName } })
      }).catch()
    },

    getSystemDepByOrg(item) {
      axiosIns.get(`/systemDepartment?parentOID=${item.organizeId}`).then(res => {
        this.systemDeps = res.data.map((item) => { return { value: item.orgNO, text: item.orgName } })
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

    onRowSelected(items) {
      // this.isTaskHandlerSidebarActive = true;
      // if(this.isTaskHandlerSidebarActive == true){
      //   this.itemRow = items[0]
      // }
    },
    advanceSearch(val) {
      this.searchTerm = val;
    },
    onDeselectingOrg() {
      if (!this.param.orgId) {
        this.getSystemDep();
      }
    }
  }
};
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
</style>
