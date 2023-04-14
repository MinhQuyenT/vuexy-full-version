<template>
  <div class="app-calendar overflow-hidden border">
    <div class="">
      <!-- Sidebar -->
      <div class="grid-content" style="padding: 15px">
        <el-card class="box-card">
          <div class="text item">
            <el-row>
              <el-col :span="3" >
                <avue-form :option="optionSelect" v-model="form"></avue-form>
              </el-col>
              <el-col :span="21" >
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
  </div>
</template>

<script>
import { BCol, BRow } from "bootstrap-vue";
import { crudOp, formOp1, formOp2, formOpSelect } from "./data";

export default {
  data() {
    return {
      form: '',
      page: {
        pageSize: 20,
        currentPage: 1,
        total: 0,
      },
      crud: false,
      option: crudOp(this),
      optionSelect: formOpSelect(),
      dataCrud: this.result,
      optionform1: formOp1(this),
      optionform2: formOp2(this),
    };
  },
  components: {
    BRow,
    BCol,
  },
};
</script>

<style lang="scss">
.el-input__inner:focus {
  border: 1px solid #7367f0 !important;
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
