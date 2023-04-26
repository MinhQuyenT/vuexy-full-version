<template>
    <b-sidebar id="sidebar-backdrop" :visible="isTaskHandlerSidebarActive" title="Sidebar with backdrop"
        @change="(val) => $emit('update:is-task-handler-sidebar-active', val)" sidebar-class="sidebar-lg" bg-variant="white"
        shadow backdrop right no-header>
        <template #default="{ hide }">
            <!-- Header -->
            <div class="d-flex justify-content-between  content-sidebar-header px-2 py-1">
                <h5 class="mb-0">THÔNG TIN CHI TIẾT</h5>
                <div>
                    <feather-icon class="ml-1 cursor-pointer" icon="XIcon" size="16" @click="hide" />
                </div>
            </div>
            <!-- Body -->
            <b-card style="padding-bottom: 0;">
                <b-row>
                    <!-- User Info: Left col -->
                    <b-col cols="21" xl="4" class="d-flex flex-column">
                        <!-- User Avatar & Action Buttons -->
                        <div class="d-flex justify-content-start">
                            <b-avatar :src="'../../../assets/images/avatars/12.png'" size="104px" rounded />
                            <div class=" ml-1">
                                <div class="d-flex flex-wrap mb-1">
                                    <h5 class="mb-0">
                                        <strong>Họ tên: </strong>{{ items.personName }}
                                    </h5>
                                </div>
                                <div class="d-flex flex-wrap mb-1">
                                    <span class="card-text">
                                        <strong>Ngày sinh: </strong> {{ items.birthday }}
                                    </span>
                                </div>
                                <div class="d-flex flex-wrap">
                                    <span class="card-text mb-1">
                                        <strong>Bộ phận:1</strong> {{ items.orgName }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </b-col>
                    <!-- Right Col: Table -->
                    <b-col cols="12" xl="8">
                        <table class="mt-2 mt-xl-0" style="width: 55%;">
                            <tr>
                                <th class="pb-50">
                                    <feather-icon icon="UserIcon" class="mr-45" />
                                    <span class="font-weight-bold">Ca Làm</span>
                                </th>
                                <td class="pb-50">
                                    {{ items.shiftName }}
                                </td>
                            </tr>
                            <tr>
                                <th class="pb-50">
                                    <feather-icon icon="CheckIcon" class="mr-45" />
                                    <span class="font-weight-bold">Thời Gian Làm Việc</span>
                                </th>
                                <td class="pb-50 text-capitalize">
                                    {{ items.workTime }}
                                </td>
                            </tr>
                            <tr>
                                <th class="pb-50">
                                    <feather-icon icon="StarIcon" class="mr-45" />
                                    <span class="font-weight-bold">Thời Gian Nghỉ Trưa</span>
                                </th>
                                <td class="pb-50 text-capitalize">
                                    {{ items.breakTime }}
                                </td>
                            </tr>
                        </table>
                    </b-col>
                </b-row>
            </b-card>
            <b-row>
                <b-col cols="12" lg="8">
                    <b-card title="CHI TIẾT QUẸT GƯƠNG MẶT" style="padding: 0;">
                        <b-table style="height: 600px!important; width: 100%;!important" :no-border-collapse="true"
                            :sticky-header="true" show-empty empty-text="Không có dữ liệu"
                            table-style="width: max-content" striped responsive :fields="faceInfoField" :items="hrBoxDoorRecords" class="mb-0">
                        </b-table>
                    </b-card>
                </b-col>
                <b-col cols="12" lg="4">
                    <b-card title="DỮ LIỆU BÙ THẺ">
                        <b-table striped responsive style="width: 100%!important" table-style="width: 100%!important"
                        :sticky-header="true" show-empty empty-text="Không có dữ liệu"
                            :no-border-collapse="true" :fields="offsetCard" :items="hrTimeRecorder" class="mb-0">
                        </b-table>
                    </b-card>
                    <b-card title="ĐĂNG KÝ NGHỈ PHÉP" style="padding-top: 0;">
                        <b-table striped responsive :fields="registerLeave" class="mb-0">
                        </b-table>
                    </b-card>
                </b-col>
            </b-row>
        </template>
    </b-sidebar>
</template>
<script>
import { BSidebar, BCard, BRow, BCol, BTable, BAvatar, BPagination } from "bootstrap-vue";
import { ValidationObserver } from "vee-validate";
import { faceInfoField, registerLeave, offsetCard } from "./data.js"
import axiosIns from "@/libs/axios";
export default {
    components: {
        BSidebar, ValidationObserver, BCard, BRow, BCol, BTable, BAvatar, BPagination
    },
    data() {
        return {
            hrBoxDoorRecords: [],
            hrBoxDoorRecord: {},
            hrBoxDoorRecorders: [],
            hrTimeRecorder: {},
            backdrop: false,
            faceInfoField: faceInfoField(this),
            registerLeave: registerLeave(this),
            offsetCard: offsetCard(this),
            visible: false,
        };
    },
    model: {
        prop: 'isTaskHandlerSidebarActive',
        event: 'update:is-task-handler-sidebar-active',
    },
    props: {
        isTaskHandlerSidebarActive: {
            type: Boolean,
            required: true,
        },
        items: {
            type: Object
        }
    },
    mounted() {
        console.log('mounted');
        console.log(this.items)
        this.getHrBoxDoorRecord();
        this.getHrTimeRecorder();
    },
    created() { },
    updated: () => {
        console.log('updated', this?.items);
    },
    methods: {
        async getHrBoxDoorRecord() {
            try {
                const res = await axiosIns.get(`hrBoxDoorRecord?personNO=${this.items.personNo}`);
                this.hrBoxDoorRecords = res.data.records;
                console.log('getHrBoxDoorRecord', res.data.records);
            } catch (error) {
                console.log(error);
            }
        },
        async  getHrTimeRecorder() {
            try {
               const res =  await axiosIns.get(`hrTimeRecorder/byPerson?date=${this.items.trackingDate}&personNo=${this.items.personNo}`);
               this.hrTimeRecorder = res.data.records
            } catch (error) {
                console.log(error);
            }
        },

        close() {
            this.$emit('sendValue', false);
            this.isTaskHandlerSidebarActive = false
        },
        open () {
            this.isTaskHandlerSidebarActive = true
        },
    },
    // directives:{
    //     'click-outside': {
    //         bind: function(el, binding, vNode) {
    //             el.onclick = function(e) {
    //                 var modal = document.getElementsByClassName("modal");
    //                 el.addEventListener('click', function (event) {
    //                     if (!modal[0].contains(event.target)) {          
    //                        this.isTaskHandlerSidebarActive = false
    //                     } 
    //                 })            
    //            }
    //         } 
    //     }
    // },
    destroyed: () => {
        console.log('destroyed', this?.items);
    }
};
</script>
<style lang="scss">
.b-table-sticky-header {
    max-height: 600px;
}
table.b-table[aria-busy=false] {
    width: 100%s !important;
}

.b-sidebar>.b-sidebar-body {
    flex-grow: 1;
    height: 100%;
    overflow-y: visible !important;
}
</style>