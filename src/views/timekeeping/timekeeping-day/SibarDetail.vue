<template>
    <div class="sidebar-wrapper d-flex justify-content-between flex-column flex-grow-1">
        <div class="p-2">
            <b-sidebar id="sidebar-backdrop" :visible="isTaskHandlerSidebarActive" title="Sidebar with backdrop"
                style="overflow-x: scroll;" :no-enforce-focus="true" :no-close-on-esc="true" :no-close-on-backdrop="true"
                @change="(val) => $emit('update:is-task-handler-sidebar-active', val)" sidebar-class="sidebar-lg"
                bg-variant="white" shadow backdrop right no-header
                @shown="(val) => $emit('update:is-task-handler-sidebar-active', val)">
                <template #default="{ hide }">
                    <!-- Header -->
                    <div class="d-flex justify-content-between  content-sidebar-header px-2 py-1">
                        <h5 class="mb-0">THÔNG TIN CHI TIẾT</h5>
                        <div>
                            <feather-icon class="ml-1 cursor-pointer" icon="XIcon" size="16" @click="hide" />
                        </div>
                    </div>
                    <!-- Body -->
                    <b-card>
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
                                                <strong>Ngày sinh: </strong> {{ items.birthday != null ?
                                                    items.birthday.substring(0, 10) : items.birthday }}
                                            </span>
                                        </div>
                                        <div class="d-flex flex-wrap">
                                            <span class="card-text mb-1">
                                                <strong>Bộ phận:</strong> {{ items.orgName }}
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
                        <b-col cols="12" lg="8" md="8" xs="12">
                            <b-card title="CHI TIẾT QUẸT GƯƠNG MẶT" class="hrBoxDoorRecords"
                                style="height: calc(100vh - 240px)">
                                <b-table style=" width: 100%!important" :no-border-collapse="true" aria-busy="true"
                                    :sticky-header="true" show-empty empty-text="Không có dữ liệu" 
                                    table-style="width: max-content!important" striped responsive :fields="faceInfoField"
                                    :items="hrBoxDoorRecords" class="mb-0 text-nowrap">
                                </b-table>
                            </b-card>
                        </b-col>
                        <b-col cols="12" lg="4" md="4" xs="12">
                            <b-row>
                                <b-col cols="12">
                                    <b-card title="DỮ LIỆU BÙ THẺ" style=" height: calc(50vh - 139px)">
                                        <b-table striped responsive style=" width: 100%!important "
                                            table-style="width: max-content!important" :sticky-header="true" show-empty
                                            empty-text="Không có dữ liệu" :no-border-collapse="true" aria-busy="true"
                                            :fields="offsetCard" :items="hrTimeRecorder" class="mb-0">
                                        </b-table>
                                    </b-card>
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col cols="12">
                                    <b-card title="LỊCH SỬ NGHỈ PHÉP" style=" height:  calc(50vh - 130px)">
                                        <b-table striped responsive style=" width: 100%!important" :fields="registerLeave"
                                            class="mb-0" show-empty table-style="width: max-content!important"
                                            :no-border-collapse="true" empty-text="Không có dữ liệu">
                                        </b-table>
                                    </b-card>
                                </b-col>
                            </b-row>
                        </b-col>
                    </b-row>
                </template>
            </b-sidebar>
        </div>
    </div>
</template>
<script>
import { BSidebar, BCard, BRow, BCol, BTable, BAvatar, BPagination } from "bootstrap-vue";
import { ValidationObserver } from "vee-validate";
import { faceInfoField, registerLeave, offsetCard } from "./data.js"
import axiosIns from "@/libs/axios";
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
export default {
    components: {
        BSidebar, ValidationObserver, BCard, BRow, BCol, BTable, BAvatar, BPagination, VuePerfectScrollbar
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
            perfectScrollbarSettings: {
                maxScrollbarLength: 50,
            }
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
        },
    },
    mounted() {
        this.getHrBoxDoorRecord();
        this.getHrTimeRecorder();
    },
    created() { },
    updated: () => {
    },
    methods: {
        async getHrBoxDoorRecord() {
            try {
                const res = await axiosIns.get(`hrBoxDoorRecord/detail?date=${this.items.trackingDate}&personNo=${this.items.personNo}&shiftId=${this.items.shiftId}`);
                if (res.data) {
                    this.hrBoxDoorRecords = res.data;
                    this.hrBoxDoorRecords.map((item, index) => {
                        item.index = index + 1;
                    })
                }
            } catch (error) {
                console.log(error);
            }
        },
        async getHrTimeRecorder() {
            try {
                const res = await axiosIns.get(`hrTimeRecorder/byPerson?date=${this.items.trackingDate}&personNo=${this.items.personNo}`);
                this.hrTimeRecorder = res.data
            } catch (error) {
                console.log(error);
            }
        },
        hidden() {
            console.log("hiddenEvent")
        },
        close() {
            this.$emit('sendValue', false);
            this.isTaskHandlerSidebarActive = false
        },
        open() {
            this.isTaskHandlerSidebarActive = true
        },
    },
    destroyed: () => {
        // console.log('destroyed', this?.items);
    }
};
</script>
<style lang="scss">
// .b-table-sticky-header {
//     max-height: 600px;
// }

table.b-table[aria-busy=false] {
    width: max-content;
}

.b-sidebar>.b-sidebar-body {
    flex-grow: 1;
    height: 100%;
    overflow-y: visible !important;
}

.stop-scrolling {
    height: 100%;
    overflow: hidden;
}

.b-table-sticky-header {
    max-height: 650px !important;
}

.hrBoxDoorRecords {
    height: 75vh;
}
.hrBoxDoorRecords .card-body{
    padding:0!important;
    padding-left: 20px!important;
    padding-top: 1.5rem!important;
}

@media screen and (max-width: 1440px) {
    .hrBoxDoorRecords {
        height: calc(100vh - 460px) !important;
    }

    .b-table-sticky-header {
        max-height: 200px !important;
    }

    .b-sidebar.b-sidebar-right {
        overflow: scroll !important;
    }
}
@media screen and (max-width: 1788px) {
    .hrBoxDoorRecords {
        height: calc(100vh - 460px) !important;
    }

    .b-table-sticky-header {
        max-height: 500px !important;
    }

    .b-sidebar.b-sidebar-right {
        overflow: scroll !important;
    }
}
</style>