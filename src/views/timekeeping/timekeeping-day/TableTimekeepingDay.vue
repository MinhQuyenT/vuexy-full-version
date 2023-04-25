<template>
  <!-- Table Container Card -->
  <b-card style="padding: 0!important;">
    <div class="m-2">
      <div class="custom-search">
        <!-- advance search input -->
        <b-row>
          <b-col md="3">
            <b-form-group>
              <label style="float: left">Ngày:</label>
              <b-form-datepicker id="example-datepicker" label-no-date-selected="không có dữ liệu được chọn"
                v-model="param.dayOfWeek" prop="" class="mb-2"></b-form-datepicker>
            </b-form-group>
          </b-col>
          <b-col md="3">
            <b-form-group>
              <label style="float: left">Mã nhân viên:</label>
              <b-form-input v-model="param.personNO" placeholder="Mã nhân vien" type="text" class="d-inline-block"
                @input="advanceSearch" />
            </b-form-group>
          </b-col>
          <b-col md="3">
            <b-form-group>
              <label style="float: left">Họ tên:</label>
              <b-form-input v-model="param.fullName" placeholder="Họ tên" type="text" class="d-inline-block"
                @input="advanceSearch" />
            </b-form-group>
          </b-col>
          <b-col md="3">
            <b-form-group>
              <label style="float: left">Ca làm:</label>
              <b-form-select v-model="param.shift" :options="optionsShift" @input="advanceSearch"></b-form-select>
            </b-form-group>
          </b-col>
          <b-col md="3">
            <b-form-group>
              <h6 style="display: flex; font-size: 0.857rem">Trung tâm:</h6>
              <v-select v-model="param.orgNO" placeholder="-- Vui lòng chọn Trung tâm" @close="onDeselectingOrg"
                @option:selected="onChangeOrg" :options="systemOrgs" label="text"></v-select>
            </b-form-group>
          </b-col>
          <b-col md="3">
            <b-form-group>
              <b-form-group>
                <h6 style="display: flex; font-size: 0.857rem">Bộ phận:</h6>
                <v-select v-model="param.department" placeholder="-- Vui lòng chọn Trung tâm" :options="systemDepartments"
                  label="text"></v-select>
              </b-form-group>
            </b-form-group>
          </b-col>
          <b-col md="3">
            <b-form-group>
              <h6 style="display: flex; font-size: 0.857rem">Quốc tịch:</h6>
              <v-select v-model="param.systemCode" placeholder="-- Vui lòng chọn quốc tịch--" :options="systemCodes"
                label="text"></v-select>
            </b-form-group>
          </b-col>
          <b-col md="3">
            <b-form-group>
              <label style="float: left">Trạng thái:</label>
              <b-form-input v-model="param.note" placeholder="Ghi chú" type="text" class="d-inline-block"
                @input="advanceSearch" />
            </b-form-group>
          </b-col>
        </b-row>
        <!-- <b-button variant="relief-info" class="mr-1">Tra Cứu</b-button> -->
      </div>
    </div>
    <b-table style="height: 450px" table-style="width: max-content !important;" :classes="classes" aria-busy="true" :items="hrTrackingData"
      :select-mode="selectMode" selectable responsive table-class=" text-nowrap" :fields="tableColumns" primary-key="id"
      :sort-by.sync="sortBy" show-empty empty-text="Không có dữ liệu" :sort-desc.sync="isSortDirDesc"
      class="d-block table-cus" @row-selected="onRowSelected"  ref="refInvoiceListTable">
      <template v-for="(field, index) in tableColumns" :slot="field.key" slot-scope="data">
        <div v-if="field.stt">
          <h5>{{ index + 1 }}</h5>
        </div>
      </template>
    </b-table>
    <div class="mx-2 mb-2">
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
    </div>
    <sibar-detail v-model="isTaskHandlerSidebarActive" :items="items"></sibar-detail>
  </b-card>
</template>

<script>
import {
  BFormDatalist,
  BFormSelectOption,
  BFormSelect,
  BCard,
  BRow,
  BCol,
  BFormInput,
  BButton,
  BTable,
  BMedia,
  BAvatar,
  BLink,
  BBadge,
  BDropdown,
  BDropdownItem,
  BPagination,
  BFormGroup,
  BTooltip,
  BFormDatepicker,
} from "bootstrap-vue";
import vSelect from "vue-select";
import Multiselect from 'vue-multiselect'
import SibarDetail from "./SibarDetail.vue";
import { ref,onUnmounted } from "@vue/composition-api";
import store from "@/store";
import timekeepingDayList from "./TimekeepingDayList";
import timekeepingStoreModule from "../timekeepingStoreModule";

export default {
  data() {
    return {
      stickyHeader: true,
      param: {
        systemCode: null,
        systemDepartment: null,
        day: '',
        orgNO: null,
      },
      noCollapse: false,
      modes: ["multi", "single", "range"],
      selectMode: "single",
      selected: [],
      data: [],
      systemCodes: [],
      systemDepartments: [],
      hrTrackingData: [],
      systemOrgs: [],
      backdrop: false,
      classes: '',
    };
  },
  mounted() {

  },
  created: function () {
    // this.param.dayOfWeek = null
    this.getSystemCodes();
    this.getSystemOrgs();
    this.getSystemDepartmentAll();
    this.getSystemDepartmentAll();
    this.getHrTrackingData();
  },
  methods: {
    getHrTrackingData() {
      this.$store.dispatch('timekeeping/fetchHrTrackingData').then((response) => {
        this.hrTrackingData = response.data;
      })
    },
    getSystemCodes() {
      this.$store.dispatch('timekeeping/fetchSystemCode').then((response) => {
        this.systemCodes = response.data.filter(item => item.codeKey === "positics").map((res) => { return { value: res.codeId, text: res.codeNameVi } })
      })
    },
    getSystemOrgs() {
      this.$store.dispatch('timekeeping/fetchSystemOrg').then((response) => {
        this.systemOrgs = response.data.map((res) => { return { value: res.orgNO, text: res.orgName } })
      })
    },

    getSystemDepartmentAll() {
      this.$store.dispatch('timekeeping/fetchSystemDepartmentAll').then((response) => {
        this.systemDepartments = response.data.map((res) => { return { value: res.orgNO, text: res.orgName } })
      })
    },

    getSystemDepartmentByOrgNO(orgNO) {
      this.$store.dispatch('timekeeping/fetchSystemDepartments', { orgNO: orgNO?.value }).then((response) => {
        this.systemDepartments = response.data.map((res) => { return { value: res.orgNO, text: res.orgName } })
      })
    },

    onChangeOrg(orgNO) {
      this.getSystemDepartmentByOrgNO(orgNO);
    },

    onDeselectingOrg() {
      if (!this.param.orgNO) {
        this.getSystemDepartmentAll();
      }
    },

    advanceSearch(val) {
      this.searchTerm = val;
    },

    onRowSelected(items) {
      this.selected = items;
      this.classes = 'v-b-toggle.sidebar-backdrop'
      this.backdrop = true
      this.handleTaskClick(items);
    },
  },
  components: {
    BFormDatalist,
    BFormSelectOption,
    BFormSelect,
    BCard,
    BRow,
    BCol,
    BFormInput,
    BButton,
    BTable,
    BMedia,
    BAvatar,
    BLink,
    BBadge,
    BDropdown,
    BDropdownItem,
    BPagination,
    BTooltip,
    BFormGroup,
    BFormDatepicker,
    SibarDetail,
    Multiselect,
    vSelect,
  },
  setup() {
    const TIMEKEEPING_APP_STORE_MODULE_NAME = "timeKeeping";

    // const INVOICE_APP_STORE_MODULE_NAME = 'app-invoice'

    // Register module
    if (!store.hasModule(TIMEKEEPING_APP_STORE_MODULE_NAME)) store.registerModule(TIMEKEEPING_APP_STORE_MODULE_NAME, timekeepingStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(TIMEKEEPING_APP_STORE_MODULE_NAME)) store.unregisterModule(TIMEKEEPING_APP_STORE_MODULE_NAME)
    })
    
    const blankItem = {}

    const items = ref(JSON.parse(JSON.stringify(blankItem)))
    const isTaskHandlerSidebarActive = ref(false)

    const handleTaskClick = (item) => {
      items.value = item
      isTaskHandlerSidebarActive.value = true;
    }
    const {
      tableData,
      tableColumns,
      perPage,
      currentPage,
      totalInvoices,
      dataMeta,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refInvoiceListTable,
      statusFilter,
      refetchData,
      optionsShift,
      optionsDepartment
    } = timekeepingDayList();

    return {
      items,
      tableData,
      tableColumns,
      perPage,
      currentPage,
      totalInvoices,
      dataMeta,
      perPageOptions,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refInvoiceListTable,
      statusFilter,
      optionsShift,
      optionsDepartment,
      refetchData,

      isTaskHandlerSidebarActive,

      // Click Handler
      handleTaskClick,
    };
  },
};
</script>
<style lang="scss" scoped>
/* Busy table styling */
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

.card-body {
  padding: 0 !important;
}</style>
<style lang="scss">@import "@core/scss/vue/libs/vue-select.scss";</style>
