
<template>
  <div>
    <div class="grid-content" style="padding-top: 0; padding-left: 2px; margin-top: -20px;">
      <b-button variant="relief-info" class="mr-1">Tra Cứu</b-button>
      <b-button variant="relief-success" class="mr-1">Xuất File</b-button>
    </div>
    <div class="app-calendar  border">
      <div class="row no-gutters" style="min-height: 790px;">
        <!-- Sidebar -->
        <div class="col app-calendar-sidebar flex-grow-0 d-flex flex-column"
          style="border-right: 1px solid #ebe9f1; background-color: unset">
          <div class="sidebar-wrapper d-flex  flex-column flex-grow-1">
            <div class="card shadow-none border-0 mb-0 rounded-0" style="border-bottom:1px solid #ebe9f1!important ;">
              <div class="card-body ">
                <div class="">
                  <div class="form-group-compose text-center compose-btn">
                    <b-form-group>
                      <!-- <h6 style="display: flex; font-size: 0.857rem">Bộ phận:</h6> -->
                      <v-select placeholder="-- Bộ phận --" option-text="text" option-value="value"
                        label="text"></v-select>
                    </b-form-group>
                  </div>
                </div>
              </div>
            </div>
            <div class="card shadow-none border-0 mb-0 rounded-0" style="border-bottom:1px solid #ebe9f1!important ;">
              <div class="app-action">
                <div class="action-left">
                  <b-form-checkbox>
                    Chọn tất cả
                  </b-form-checkbox>
                </div>
              </div>
            </div>
            <vue-perfect-scrollbar :settings="perfectScrollbarSettings" class="email-user-list scroll-area">
              <ul class="email-media-list" style="padding: 0;" >
                <b-media tag="li" no-body class="mt-1 mb-1 border-bottom" style="padding-left: 20px; padding-top: 5px; cursor: pointer;" >
                  <b-media-aside class="media-left mr-50">
                    <div class="user-action">
                      <b-form-checkbox />
                    </div>
                  </b-media-aside>
                  <b-media-body>
                    <div class="mail-details">
                      <div class="mail-items">
                        <h5 class="mb-25">
                          Nguyen Văn A
                        </h5>
                        <span class="text-truncate">test</span>
                      </div>
                    </div>
                    <div class="mail-message">
                      <p class="text-truncate ">
                        test
                      </p>
                    </div>
                  </b-media-body>
                </b-media>
                <b-media tag="li" no-body class="mt-1 mb-1 border-bottom" style="padding-left: 20px; padding-top: 5px; cursor: pointer;">
                  <b-media-aside class="media-left mr-50">
                    <div class="user-action">
                      <b-form-checkbox />
                    </div>
                  </b-media-aside>
                  <b-media-body>
                    <div class="mail-details">
                      <div class="mail-items">
                        <h5 class="mb-25">
                          Nguyen Văn A
                        </h5>
                        <span class="text-truncate">test</span>
                      </div>
                    </div>

                    <div class="mail-message">
                      <p class="text-truncate ">
                        test
                      </p>
                    </div>
                  </b-media-body>
                </b-media>
              </ul>
              <!-- <div class="no-results" :class="'show'">
                <h5>No Items Found</h5>
              </div> -->
            </vue-perfect-scrollbar>
          </div>
        </div>
        <!-- Calendar -->
        <div class="col">
          <div class="card shadow-none border-0 mb-0 rounded-0" style="border-bottom:1px solid #ebe9f1!important ;">
            <div class="card-body pb-0">
              <div class="d-flex align-content-center justify-content-between">
                <div class="custom-search">
                  <!-- advance search input -->
                  <b-row>
                    <b-col md="2">
                      <b-form-group>
                        <label style="float: left">Từ ngày <span>(<strong class="text-danger">*</strong>)</span>:</label>
                        <b-form-datepicker id="dateBegin" :input-date="'YYYY-MM-DD'"
                          :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                          label-no-date-selected="Ngày bắt đầu" v-model="param.dateBegin" prop=""></b-form-datepicker>
                      </b-form-group>
                    </b-col>
                    <b-col md="2">
                      <b-form-group>
                        <label style="float: left">Đến ngày<span>(<strong
                              class="text-danger text-bold">*</strong>)</span>:</label>
                        <b-form-datepicker id="dateEnd"
                          :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                          label-no-date-selected="Ngày kết thúc" v-model="param.dateEnd" prop=""></b-form-datepicker>
                      </b-form-group>
                    </b-col>
                    <b-col md="2">
                      <b-form-group>
                        <label style="float: left">Mã nhân viên:</label>
                        <b-form-input v-model="param.personNO" placeholder="Mã nhân vien" type="text"
                          class="d-inline-block" @input="advanceSearch" />
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
                        <v-select v-model="param.politics" placeholder="-- Quốc tịch --" option-text="text"
                          option-value="value" label="text"></v-select>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row class="mb-1">
                    <b-col md="2">
                      <b-form-group>
                        <h6 style="display: flex; font-size: 0.857rem">Ca làm:</h6>
                        <v-select v-model="param.shiftId" placeholder="-- Ca làm --" option-text="text"
                          option-value="value" label="text"></v-select>
                      </b-form-group>
                    </b-col>
                    <b-col md="2">
                      <b-form-group>
                        <h6 style="display: flex; font-size: 0.857rem">Trạng thái:</h6>
                        <v-select v-model="param.status" placeholder="--Trạng thái--" option-text="text"
                          option-value="value" label="text"></v-select>
                      </b-form-group>
                    </b-col>
                    <b-col md="2">
                      <b-form-group>
                        <h6 style="display: flex; font-size: 0.857rem">Bù thẻ:</h6>
                        <v-select v-model="param.offset" placeholder="-- Bù thẻ --" option-text="text"
                          option-value="value" label="text"></v-select>
                      </b-form-group>
                    </b-col>
                    <b-col md="2">
                      <b-form-group>
                        <h6 style="display: flex; font-size: 0.857rem">Nghỉ phép:</h6>
                        <v-select v-model="param.furlough" placeholder="-- Nghỉ phép --" option-text="text"
                          option-value="value" label="text"></v-select>
                      </b-form-group>
                    </b-col>
                  </b-row>
                </div>
              </div>
            </div>
          </div>
          <div class="d-block" style="width: 100%;">
            <!-- <b-overlay id="overlay-background" :show="isBusy" :variant="variant" :opacity="opacity" :blur="blur" 
              rounded="sm" style="height: 548px"> -->
            <b-table style="height: 548px; width:100%!important;" :sticky-header="true" responsive :fields="tableColumns"
              primary-key="id" :sort-by.sync="sortBy" show-empty empty-text="Không có dữ liệu"
              :sort-desc.sync="isSortDirDesc" ref="refInvoiceListTable">
            </b-table>
            <!-- </b-overlay> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import { BButton, BFormGroup, BFormCheckbox, BFormDatepicker, BFormInput, BRow, BCol, BTable, BMedia, BMediaAside, BAvatar } from 'bootstrap-vue'
import vSelect from "vue-select";
import { tableColumn } from "./data.js"
export default {
  name: 'DataSearch',
  components: { BButton, BFormGroup, BFormCheckbox, BFormDatepicker, BFormInput, BRow, BCol, BTable, BMedia, BMediaAside, BAvatar, vSelect, VuePerfectScrollbar },
  created() {

  },
  data() {
    return {
      param: {},
      tableColumns: tableColumn(this),
      sortBy: null,
      sortDesc: null,
      isSortDirDesc: null,
      perfectScrollbarSettings: {
        maxScrollbarLength: 250,
      }
    }
  },
  props: {

  },
  methods: {
    advanceSearch() {

    },

    onRowBblClicked() {

    }
  },
}
</script>

<style lang="scss" scoped>
.app-action {
  padding: 0.9rem 1.5rem;
  border-bottom: 1px solid #ebe9f1;
  background-color: #fff;
}

table.b-table[aria-busy=false] {
  width: max-content !important;
}

@import "@core/scss/vue/apps/calendar.scss";
</style>

