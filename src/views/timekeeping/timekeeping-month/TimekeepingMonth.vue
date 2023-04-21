
<template>
  <div>
    <div class="" style="height: 773px">
      <div class="grid-content" style="padding-top: 0; padding-left: 2px;">
        <b-button variant="relief-info" class="mr-1">Tra Cứu</b-button>
        <b-button variant="relief-warning" class="mr-1">Tính Toán</b-button>
        <b-button v-b-toggle.sidebar-backdrop variant="relief-success" class="mr-1">Xuất File</b-button>
      </div>
      <b-card class="text-center border" style="padding: 0!important;">
        <b-card style="padding: 0!important;">
          <div class="m-2">
            <div class="custom-search">
              <!-- advance search input -->
              <b-row>
                <b-col md="3">
                  <b-form-group>
                    <label style="float: left">Tháng:</label>
                    <b-form-select v-model="param.month" :options="options"></b-form-select>
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
                    <b-form-input v-model="param.shift" placeholder="Ca làm" type="text" class="d-inline-block"
                      @input="advanceSearch" />
                  </b-form-group>
                </b-col>
                <b-col md="3">
                  <b-form-group>
                    <label style="float: left">Phòng ban:</label>
                    <b-form-input v-model="param.department" placeholder="Phòng ban" type="text" class="d-inline-block"
                      @input="advanceSearch" />
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
              <!-- <b-button variant="relief-info" class="mr-1" @click="fetchData">Tra Cứu</b-button> -->
            </div>
          </div>
          <b-table style="height: 450px" table-style="width: max-content !important;" :select-mode="selectMode" selectable
            responsive table-class=" text-nowrap" :fields="tableColumns" :items="items" primary-key="id" :sort-by.sync="sortBy" 
            show-empty empty-text="Không có dữ liệu" :sort-desc.sync="isSortDirDesc" class="d-block table-cus"
            @row-selected="onRowSelected" ref="refInvoiceListTable">
            <!-- <template #thead-top="data">
              <b-tr>
                <b-th rowspan="2" :sort-desc.sync="isSortDirDesc" class="text-center"> STT</b-th>
                <b-th rowspan="2">Mã Nhân Viên</b-th>
                <b-th variant="secondary" rowspan="2">Họ Tên</b-th>
                <b-th variant="primary"  colspan="31">Ngày Làm Việc</b-th>
                <b-th variant="danger" colspan="2">Tổng</b-th>
                <b-th variant="danger" rowspan="2">Ghi Chú</b-th>
                <b-th variant="danger" rowspan="2">Actions</b-th>
              </b-tr>
            </template> -->
          </b-table>
          <div class="mx-2 mb-2">
            <b-row>
              <b-col cols="12" sm="6" class="d-flex align-items-center justify-content-center justify-content-sm-start">
                <span class="text-muted">Showing 1 to 1 of
                  1 entries</span>
              </b-col>
              <!-- Pagination -->
              <b-col cols="12" sm="6" class="d-flex align-items-center justify-content-center justify-content-sm-end">
                <b-pagination v-model="currentPage" :total-rows="totalInvoices" :per-page="perPage" first-number
                  last-number class="mb-0 mt-1 mt-sm-0" prev-class="prev-item" next-class="next-item">
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
        </b-card>
      </b-card>
      <!-- Sidebar -->
      <!-- <sibar-detail></sibar-detail> -->
    </div>
  </div>
</template>

<script>
import {
  VBToggle,BTh, BTr , BFormSelect, BCard, BRow, BCol, BFormInput, BButton, BTable, BMedia, BAvatar, BLink, BBadge, BDropdown,
  BDropdownItem, BPagination, BFormGroup, BTooltip, BFormDatepicker
} from "bootstrap-vue";
import { onUnmounted } from "@vue/composition-api";
import store from "@/store";
import data from "./data";
import timekeepingStoreModule from "../timekeepingStoreModule";
export default {
  name: 'TimekeepingMoth',
  components: {
    BTh, BTr,  BButton, BFormSelect, BCard, BRow, BCol, BFormInput, BButton, BTable, BMedia, BAvatar, BLink, BBadge, BDropdown, BDropdownItem, BPagination, BFormGroup, BTooltip, BFormDatepicker
  },
  created() {

  },
  data() {
    return {
      param: {},
      noCollapse: false,
      modes: ["multi", "single", "range"],
      selectMode: "single",
      selected: [],
      data: [],
      options: [
        { value: null, text: 'Please select an option' },
        { value: '1', text: 'tháng 1' },
        { value: '2', text: 'tháng 2' },
        { value: '3', text: 'tháng 3' },
        { value: '4', text: 'tháng 4' },
      ]
    }
  },
  props: {

  },
  methods: {
    advanceSearch(val) {
      this.searchTerm = val;
    },

    onRowSelected(items) {
      this.selected = items;
    },
  },
  setup() {
    const INVOICE_APP_STORE_MODULE_NAME = "timeKeeping";

    // Register module
    if (!store.hasModule(INVOICE_APP_STORE_MODULE_NAME))
      store.registerModule(INVOICE_APP_STORE_MODULE_NAME, timekeepingStoreModule);

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(INVOICE_APP_STORE_MODULE_NAME))
        store.unregisterModule(INVOICE_APP_STORE_MODULE_NAME);
    })

    const {
      fetchTimekeepings,
      items,
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
    } = data();

    return {
      fetchTimekeepings,
      tableColumns,
      perPage,
      items,
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
    };
  },
}
</script>

<style lang="scss" scoped>
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

