<template>
  <div class="" style="height: 773px">
    <div class="grid-content" style="padding-top: 0; padding-left: 2px;">
      <b-button variant="relief-info" class="mr-1">Tra Cứu</b-button>
      <b-button variant="relief-warning" class="mr-1">Tính Toán</b-button>
      <b-button v-b-toggle.sidebar-backdrop variant="relief-success" class="mr-1">Xuất File</b-button>
    </div>
    <b-card class="text-center border" style="padding: 0!important;">
      <table-timekeeping-day></table-timekeeping-day>
    </b-card>
    <!-- Sidebar -->
    <sibar-detail></sibar-detail>
  </div>
</template>

<script>
import { BCol, BRow, BButton, VBToggle, BCard } from "bootstrap-vue";
import TableTimekeepingDay from "./TableTimekeepingDay";
import SibarDetail from "./SibarDetail.vue";

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
  components: { BRow, BCol, BCard, BButton, VBToggle, TableTimekeepingDay, SibarDetail },
};
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

@import "@core/scss/vue/apps/calendar.scss";
</style>
