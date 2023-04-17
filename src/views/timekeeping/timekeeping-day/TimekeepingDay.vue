<template>
  <div class="app-calendar overflow-hidden border" style="height: 773px">
    <div class="">
      <div class="grid-content" style="padding-top: 10px; padding-left: 10px;">
        <b-button variant="relief-info" class="mr-1">Tra Cứu</b-button>
        <b-button variant="relief-warning" class="mr-1">Tính Toán</b-button>
        <b-button
          v-b-toggle.sidebar-backdrop
          variant="relief-success"
          class="mr-1"
          >Xuất File</b-button>
      </div>
      <b-card class="text-center border">
        <div class="bg-secondary text-light">
          <table-timekeeping-day></table-timekeeping-day>
        </div>
      </b-card>
    </div>
    <!-- Sidebar -->
    <b-sidebar
      id="sidebar-backdrop"
      title="Sidebar with backdrop"
      sidebar-class="sidebar-lg"
      bg-variant="white"
      shadow
      backdrop
      right
      no-header
    >
      <div class="">
        <template>
          <!-- Header -->
          <div class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1">
            <h5 class="mb-0">Thông tin chi tiết</h5>
            <div>
              <feather-icon icon="TrashIcon" class="cursor-pointer" />
            </div>
          </div>
          <!-- Body -->
          <validation-observer ref="refFormObserver">
            <!-- Form -->
          </validation-observer>
        </template>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
import { BCol, BRow, BButton, BSidebar, VBToggle, BCard } from "bootstrap-vue";
import { ValidationObserver } from "vee-validate";
import TableTimekeepingDay from "./TableTimekeepingDay";

export default {
  data() {
    return {
      rules: {
        region: [
          {
            required: true,
            message: "Please select Activity zone",
            trigger: "change",
          },
        ],
      },
    };
  },

  components: {
    BRow,
    BCol,
    BCard,
    BButton,
    BSidebar,
    VBToggle,
    ValidationObserver,
    TableTimekeepingDay,
  },
};
</script>

<style lang="scss">
.el-input__inner:focus {
  border: 1px solid #7367f0 !important;
}
.b-sidebar.sidebar-lg {
  width: 70% !important;
}
.table.b-table > tbody > .table-active,
.table.b-table > tbody > .table-active > th,
.table.b-table > tbody > .table-active > td {
  background-color: #bdf !important;
}
table#table-transition-example .flip-list-move {
  transition: transform 1s;
}
@import "@core/scss/vue/apps/calendar.scss";
</style>
