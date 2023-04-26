<template>
  <div class="" style="height: 773px">
    <div class="grid-content" style="padding-top: 0; padding-left: 2px;">
      <b-button variant="relief-info" class="mr-1" @click="getHrTrackingData">Tra Cứu</b-button>
      <b-button variant="relief-warning" class="mr-1">Tính Toán</b-button>
      <b-button variant="relief-success" class="mr-1">Xuất File</b-button>
    </div>
    <b-card class="text-center border" style="padding: 0!important;">
      <div class="custom-search mb-2">
        <!-- advance search input -->
        <b-row>
          <b-col md="2">
            <b-form-group>
              <h6 style="display: flex; font-size: 0.857rem">Trung tâm:</h6>
              <v-select v-model="param.orgNO" placeholder="-- Vui lòng chọn Trung tâm" @close="onDeselectingOrg"
                @option:selected="onChangeOrg" :options="systemOrgs" label="text"></v-select>
            </b-form-group>
          </b-col>
          <b-col md="2">
            <b-form-group>
              <b-form-group>
                <h6 style="display: flex; font-size: 0.857rem">Bộ phận:</h6>
                <v-select v-model="param.department" placeholder="--Vui lòng chọn Trung tâm" :options="systemDeps"
                  label="text"></v-select>
              </b-form-group>
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
              <b-form-input v-model="param.fullName" placeholder="Họ tên" type="text" class="d-inline-block"
                @input="advanceSearch" />
            </b-form-group>
          </b-col>
          <b-col md="2">
            <b-form-group>
              <h6 style="display: flex; font-size: 0.857rem">Quốc tịch:</h6>
              <v-select v-model="param.systemCode" placeholder="--Vui lòng chọn quốc tịch--" :options="systemCodes"
                label="text"></v-select>
            </b-form-group>
          </b-col>
          <b-col md="2">
            <b-form-group>
              <h6 style="display: flex; font-size: 0.857rem">Ca làm:</h6>
              <v-select v-model="param.shift" placeholder="--Vui lòng chọn ca làm--" :options="systemCodeShift"
                label="text"></v-select>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="mt-1">
          <b-col md="2">
            <b-form-group>
              <label style="float: left">Ngày bắt đầu:</label>
              <b-form-datepicker id="dateBegin" :input-date="'YYYY-MM-DD'"
                :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                label-no-date-selected="Ngày bắt đầu" v-model="param.dateBegin" prop="" class="mb-2"></b-form-datepicker>
            </b-form-group>
          </b-col>
          <b-col md="2">
            <b-form-group>
              <label style="float: left">Ngày kết thúc:</label>
              <b-form-datepicker id="dateEnd" :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                label-no-date-selected="Ngày kết thúc" v-model="param.dateEnd" prop="" class="mb-2"></b-form-datepicker>
            </b-form-group>
          </b-col>
          <b-col md="2">
            <b-form-group>
              <label style="float: left">Trạng thái:</label>
              <b-form-input v-model="param.note" placeholder="Ghi chú" type="text" class="d-inline-block"
                @input="advanceSearch" />
            </b-form-group>
          </b-col>
          <b-col md="2">
            <b-form-group>
              <label style="float: left">Bù thẻ:</label>
              <b-form-select v-model="param.shift"  @input="advanceSearch"></b-form-select>
            </b-form-group>
          </b-col>
          <b-col md="2">
            <b-form-group>
              <label style="float: left">Nghỉ phép:</label>
              <b-form-select v-model="param.shift"  @input="advanceSearch"></b-form-select>
            </b-form-group>
          </b-col>
        </b-row>
        <!-- <b-button variant="relief-info" class="mr-1">Tra Cứu</b-button> -->
      </div>
      <b-table style="height: 485px" table-style="width: max-content !important;" :sticky-header="true" aria-busy="true"
        :select-mode="selectMode" selectable responsive table-class=" text-nowrap" :fields="tableColumns" :items="hrTrackingData" primary-key="id"
        :sort-by.sync="sortBy" show-empty empty-text="Không có dữ liệu" :sort-desc.sync="isSortDirDesc"
        class="d-block table-cus" @row-selected="onRowSelected" ref="refInvoiceListTable">
      </b-table>
      <!-- <div class="mx-2 mb-2">
      <b-row>
        <b-col cols="12" sm="6" class="d-flex align-items-center justify-content-center justify-content-sm-start">
          <span class="text-muted">Showing {{ dataMeta.from }} to {{ dataMeta.to }} of
            {{ dataMeta.of }} entries</span>
        </b-col>
        <b-col cols="12" sm="6" class="d-flex align-items-center justify-content-center justify-content-sm-end">
          <b-pagination v-model="currentPage" :total-rows="totalInvoices" :per-page="perPage" first-number last-number
            class="mb-0 mt-1 mt-sm-0" prev-class="prev-item" next-class="next-item">
            <template #prev-text>
              <feather-icon icon="ChevronLeftIcon" size="18" />
            </template>
            <template #next-text>
              <feather-icon icon="ChevronRightIcon" size="18" />
            </template>
          </b-pagination>
        </b-col>
      </b-row>
    </div> -->
    </b-card>
    <!-- Sidebar -->
    <sibar-detail v-model="isTaskHandlerSidebarActive" :items="itemRow" v-if="isTaskHandlerSidebarActive" ></sibar-detail>

    
  </div>
</template>

<script>
import { BCol, BTable, BRow, BButton, VBToggle, BCard, BFormSelect, BFormInput, BFormGroup, BFormDatepicker } from "bootstrap-vue";
import vSelect from "vue-select";
import SibarDetail from "./SibarDetail.vue";
import { tableColumn } from "./data.js"
import axiosIns from "@/libs/axios";
import {functionUtility} from "@core/helpers/functionUtility"

export default {
  components: { BCol, BTable, BRow, BButton, VBToggle, BCard, BFormSelect, BFormInput, BFormGroup, BFormDatepicker, vSelect, SibarDetail },
  data() {
    return {
      stickyHeader: true,
      param: {
        dateBegin: new Date().toISOString(),
        dateEnd: new Date().toISOString(),
        systemCode: null,
        systemDepartment: null,
        day: '',
        orgNO: null,
      },
      noCollapse: false,
      modes: ["multi", "single", "range"],
      selectMode: "single",
      selected: [],
      itemRow: {},
      isChange: false,
      systemCodes: [],
      systemDeps: [],
      hrTrackingData: [],
      systemOrgs: [],
      systemCodeShift: [],
      backdrop: false,
      tableColumns: tableColumn(this),
      // optionsShift: timekeepingDayData.optionsShift,
      sortBy: null,
      sortDesc: null,
      isSortDirDesc: null,
      isTaskHandlerSidebarActive: false
    };
  },
  mounted() {
    console.log(this.isChange);
    this.getHrTrackingData();
    this.getSystemOrg();
    this.getSystemDep();
    this.getSystemCodePositics();
    this.getSystemCodeShift();
  },
  created: {
    
  },
  methods: {
    getHrTrackingData() {
      const params = new URLSearchParams();
      params.append('dateBegin', new Date(this.param.dateBegin).toLocaleDateString());
      params.append('dateEnd', new Date(this.param.dateEnd).toLocaleDateString());
      // this.param.dateBegin = new Date(this.param.dateBegin).toLocaleDateString();
      // this.param.dateEnd = new Date(this.param.dateEnd).toLocaleDateString();
      // let params = new functionUtility.ToParams(this.param)
      // debugger
      axiosIns.get('hrTrackingData', {params:params}).then((res) => {
        this.hrTrackingData = res.data.data;
        this.hrTrackingData.map((item,index)=>{
          item.index = index + 1;
          item.trackingDate = new Date(item.trackingDate).toLocaleDateString();
        })
      }).catch(err=>{})
    },

    getSystemOrg() {
      axiosIns.get('systemDepartment/org').then(res => {
        this.systemOrgs = res.data.map((item) => { return { value: item.orgNO, text: item.orgName, organizeId: item.organizeId } })
      }).catch()
    },
    
    getSystemCodeShift(){
      axiosIns.get('systemCode?codeKey=workShift').then(res => {
        this.systemCodeShift = res.data.map((item) => { return { value: item.codeId, text: item.codeNameVi } })
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

    onChangeOrg(item) {
      this.getSystemDepByOrg(item);
    },

    onRowSelected(items) {
      console.log('onRowSelected', items[0]);
      this.isChange = true;
        this.itemRow = items[0]
        this.isTaskHandlerSidebarActive = true;
      
    },
    advanceSearch(val) {
      this.searchTerm = val;
    },
    onDeselectingOrg() {
      if (!this.param.orgNO) {
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
table.b-table[aria-busy="false"] {
  width: max-content !important;
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
</style>
