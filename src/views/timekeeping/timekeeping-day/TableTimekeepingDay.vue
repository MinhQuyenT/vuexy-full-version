<template>
  <!-- Table Container Card -->
  <b-card no-body>
    <div class="m-2">
      <div class="custom-search">
        <!-- advance search input -->
        <b-row>
          <b-col md="3">
            <b-form-group>
              <label style="float: left">Ngày:</label>
              <b-form-datepicker
                id="example-datepicker"
                v-model="param.day"
                prop=""
                class="mb-2"
              ></b-form-datepicker>
            </b-form-group>
          </b-col>
          <b-col md="3">
            <b-form-group>
              <label style="float: left">Mã nhân viên:</label>
              <b-form-input
                v-model="param.employeeId"
                placeholder="Mã nhân vien"
                type="text"
                class="d-inline-block"
                @input="advanceSearch"
              />
            </b-form-group>
          </b-col>
          <b-col md="3">
            <b-form-group>
              <label style="float: left">Họ tên:</label>
              <b-form-input
                v-model="param.fullName"
                placeholder="Họ tên"
                type="text"
                class="d-inline-block"
                @input="advanceSearch"
              />
            </b-form-group>
          </b-col>
          <b-col md="3">
            <b-form-group>
              <label style="float: left">Ca làm:</label>
              <b-form-input
                v-model="param.shift"
                placeholder="Ca làm"
                type="text"
                class="d-inline-block"
                @input="advanceSearch"
              />
            </b-form-group>
          </b-col>
          <b-col md="3">
            <b-form-group>
              <label style="float: left">Phòng ban:</label>
              <b-form-input
                v-model="param.department"
                placeholder="Phòng ban"
                type="text"
                class="d-inline-block"
                @input="advanceSearch"
              />
            </b-form-group>
          </b-col>
          <b-col md="3">
            <b-form-group>
              <label style="float: left">Ghi chú:</label>
              <b-form-input
                v-model="param.note"
                placeholder="Ghi chú"
                type="text"
                class="d-inline-block"
                @input="advanceSearch"
              />
            </b-form-group>
          </b-col>
        </b-row>
      </div>
    </div>

    <b-table
      style="height: 480px;"
      :select-mode="selectMode"
      selectable
      responsive="md"
      :fields="tableColumns"
      primary-key="id"
      :sort-by.sync="sortBy"
      show-empty
      empty-text="Không có dữ liệu"
      :sort-desc.sync="isSortDirDesc"
      class="d-block"
      @row-selected="onRowSelected"
      ref="refInvoiceListTable"
    >
    </b-table>
    <div class="mx-2 mb-2">
      <b-row>
        <b-col
          cols="12"
          sm="6"
          class="d-flex align-items-center justify-content-center justify-content-sm-start"
        >
          <span class="text-muted"
            >Showing {{ dataMeta.from }} to {{ dataMeta.to }} of
            {{ dataMeta.of }} entries</span
          >
        </b-col>
        <!-- Pagination -->
        <b-col
          cols="12"
          sm="6"
          class="d-flex align-items-center justify-content-center justify-content-sm-end"
        >
          <b-pagination
            v-model="currentPage"
            :total-rows="totalInvoices"
            :per-page="perPage"
            first-number
            last-number
            class="mb-0 mt-1 mt-sm-0"
            prev-class="prev-item"
            next-class="next-item"
          >
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
</template>

<script>
import {
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
import { avatarText } from "@core/utils/filter";
import vSelect from "vue-select";
import { onUnmounted } from "@vue/composition-api";
import store from "@/store";
import timekeepingDayList from "./TimekeepingDayList";
// axios
import axios from "axios";
import  invoiceStoreModule from "../invoiceStoreModule";

export default {
  data() {
    return {
      stickyHeader: true,
      param: {},
      noCollapse: false,
      modes: ["multi", "single", "range"],
      fields: ["selected", "isActive", "age", "first_name", "last_name"],
      selectMode: "single",
      selected: [],
      data: [],
    };
  },
  methods: {
    advanceSearch(val) {
      this.searchTerm = val;
    },

    onRowSelected(items) {
      this.selected = items;
    },

    // fetchTimekeepings() {
    //   try {
    //     getHrBoxDoorRecord(this.param)
    //       .then((res) => {
    //         console.log(res);
    //         this.refresh = true;
    //       })
    //       .catch((err) => {
    //         this.$tip.error(this.$t("public.bccg") + err);
    //       });
    //   } catch (error) {}
    // },
  },
  components: {
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
    vSelect,
  },
  setup() {
    const INVOICE_APP_STORE_MODULE_NAME = "TimeKeeping";

    // Register module
    if (!store.hasModule(INVOICE_APP_STORE_MODULE_NAME))
      store.registerModule(INVOICE_APP_STORE_MODULE_NAME, invoiceStoreModule);

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(INVOICE_APP_STORE_MODULE_NAME))
        store.unregisterModule(INVOICE_APP_STORE_MODULE_NAME);
    });

    const statusOptions = [
      "Downloaded",
      "Draft",
      "Paid",
      "Partial Payment",
      "Past Due",
    ];

    const {
      // fetchTimekeepings,
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
    } = timekeepingDayList();
    return {
      // fetchTimekeepings,
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
      statusOptions,
      avatarText,
    };
  },
};
</script>

<style lang="scss" scoped>
.table-responsive {
  display: block;
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}
.table.b-table {
  width: max-content !important;
}
.table.b-table > tbody > .table-active,
.table.b-table > tbody > .table-active > th,
.table.b-table > tbody > .table-active > td {
  background-color: #bdf !important;
}
table#table-transition-example .flip-list-move {
  transition: transform 1s;
}
.form-group{
  margin-bottom: 0
}
.card-body{
  padding: 0!important
}
</style>

<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
</style>
