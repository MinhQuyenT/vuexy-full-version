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
                v-model="param.day" prop="" class="mb-2"></b-form-datepicker>
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
              <label style="float: left">Phòng ban:</label>
              <b-form-select v-model="param.systemDepartment" :options="systemDepartments" @input="advanceSearch">
                <b-form-select-option :value="null" disabled>-- Vui lòng chọn phòng ban --</b-form-select-option>
              </b-form-select>
            </b-form-group>
          </b-col>
          <b-col md="3">
            <b-form-group>
              <label style="float: left">Quốc tịch:</label>
              <b-form-select v-model="param.systemCode" :options="systemCodes" @input="advanceSearch">
                <template #first>
                  <b-form-select-option :value="null" disabled>-- Vui lòng chọn quốc tịch --</b-form-select-option>
                </template>
              </b-form-select>
            </b-form-group>
          </b-col>
          <b-col md="3">
            <b-form-group>
              <label style="float: left">Ghi chú:</label>
              <b-form-input v-model="param.note" placeholder="Ghi chú" type="text" class="d-inline-block"
                @input="advanceSearch" />
            </b-form-group>
          </b-col>
        </b-row>
        <!-- <b-button variant="relief-info" class="mr-1">Tra Cứu</b-button> -->
      </div>
    </div>
    <b-table style="height: 450px" table-style="width: max-content !important;" :classes="classes" :items="tableData" :select-mode="selectMode" selectable
      responsive table-class=" text-nowrap" :fields="tableColumns" primary-key="id" :sort-by.sync="sortBy" show-empty
      empty-text="Không có dữ liệu" :sort-desc.sync="isSortDirDesc" class="d-block table-cus"
      @row-selected="onRowSelected"  v-b-toggle.sidebar-backdrop   ref="refInvoiceListTable">
    </b-table>
    <div class="mx-2 mb-2">
      <b-row>
        <b-col cols="12" sm="6" class="d-flex align-items-center justify-content-center justify-content-sm-start">
          <span class="text-muted">Showing {{ dataMeta.from }} to {{ dataMeta.to }} of
            {{ dataMeta.of }} entries</span>
        </b-col>
        <!-- Pagination -->
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
    <sibar-detail></sibar-detail>
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
import SibarDetail from "./SibarDetail.vue";
import { onUnmounted } from "@vue/composition-api";
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
        day: ''
      },
      noCollapse: false,
      modes: ["multi", "single", "range"],
      selectMode: "single",
      selected: [],
      data: [],
      systemCodes: [],
      systemDepartments: [],
      backdrop: false,
      classes: '',
    };
  },
  mounted() {

  },
  created: function () {
    this.param.day = Date(Date.now()).toString();
    this.getSystemCodes();
    this.getSystemDepartments();
    console.log(this.param.day);
  },
  methods: {
    getSystemCodes() {
      this.$store.dispatch('timekeeping/fetchSystemCode').then((response) => {
        this.systemCodes = response.data.filter(item => item.codeKey === "positics").map((res) => { return { value: res.codeId, text: res.codeNameVi } })
      })
    },
    getSystemDepartments() {
      this.$store.dispatch('timekeeping/fetchSystemDepartment').then((response) => {
        this.systemDepartments = response.data.map((res) => { return { value: res.orgNO, text: res.orgName } })
      })
    },
    advanceSearch(val) {
      this.searchTerm = val;
    },

    onRowSelected(items) {
      this.selected = items;
      this.classes = 'v-b-toggle.sidebar-backdrop'
      this.backdrop = true
     console.log(this.$refs);
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
}
</style>
<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
</style>
