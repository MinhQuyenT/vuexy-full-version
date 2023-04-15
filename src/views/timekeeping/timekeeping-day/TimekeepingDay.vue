<template>
  <div class="app-calendar overflow-hidden border" style="height: 773px">
    <div class="">
      <div class="grid-content" style="padding: 15px">
        <b-button variant="relief-info" class="mr-1">Tra Cứu</b-button>
        <b-button variant="relief-warning" class="mr-1">Tính Toán</b-button>
        <b-button
          v-b-toggle.sidebar-backdrop
          variant="relief-success"
          class="mr-1"
          >Xuất File</b-button
        >
        <el-card class="box-card">
          <div class="text item">
            <el-row>
              <el-col :span="4">
                <el-form
                  :model="ruleForm"
                  :rules="rules"
                  ref="ruleForm"
                  label-width="120px"
                  class="demo-ruleForm"
                >
                  <el-form-item
                    label="Department"
                    prop="region"
                    style="margin-bottom: 0 !important"
                  >
                  </el-form-item>
                  <el-select
                    v-model="ruleForm.region"
                    placeholder="Activity zone"
                  >
                    <el-option label="Zone one" value="shanghai"></el-option>
                    <el-option label="Zone two" value="beijing"></el-option>
                  </el-select>
                </el-form>
              </el-col>
              <el-col :span="20">
                <avue-form :option="optionform1" v-model="form"> </avue-form>
                <avue-form :option="optionform2" v-model="form"> </avue-form>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </div>
      <el-row>
        <el-col :span="24">
          <avue-crud
            :option="option"
            :data="dataCrud"
            :page.sync="page"
          ></avue-crud>
        </el-col>
      </el-row>
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
      no-header>
      <div class="">
        <template #default="{hide}">
          <!-- Header -->
          <div class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1">
            <h5 class="mb-0">Thông tin chi tiết</h5>
            <div>
              <feather-icon
                icon="TrashIcon"
                class="cursor-pointer"
                @click="hide"
              />
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
import { BCol, BRow, BButton, BSidebar, VBToggle } from "bootstrap-vue";
import { crudOp, formOp1, formOp2, formOpSelect } from "./data";
import { ValidationObserver } from "vee-validate";
import ItemTimekeeingDay from "./ItemTimekeeingDay.vue";

export default {
  data() {
    return {
      form: "",
      page: {
        pageSize: 20,
        currentPage: 1,
        total: 0,
      },
      crud: false,
      option: crudOp(this),
      // optionSelect: formOpSelect(),
      dataCrud: this.result,
      optionform1: formOp1(this),
      optionform2: formOp2(this),
      ruleForm: {
        region: "",
      },
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
    BButton,
    BSidebar,
    VBToggle,
    ValidationObserver,
    ItemTimekeeingDay,
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
