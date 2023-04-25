<template>
    <b-sidebar id="sidebar-backdrop" :visible="isTaskHandlerSidebarActive" title="Sidebar with backdrop"
        sidebar-class="sidebar-lg" bg-variant="white" shadow backdrop right no-header>
        <div class="">
            <template>
                <!-- Header -->
                <div class="d-flex justify-content-between  content-sidebar-header px-2 py-1">
                    <h5 class="mb-0">THÔNG TIN CHI TIẾT</h5>
                    <div>
                        <feather-icon class="ml-1 cursor-pointer" icon="XIcon" size="16" />
                    </div>
                </div>
                <!-- Body -->
                <b-card style="padding-bottom: 0;">
                    <b-row>
                        <!-- User Info: Left col -->
                        <b-col cols="21" xl="4" class="d-flex justify-content-between flex-column">
                            <!-- User Avatar & Action Buttons -->
                            <div class="d-flex justify-content-start">
                                <b-avatar :src="'../../../assets/images/avatars/12.png'" size="104px" rounded />
                                <div class="d-flex flex-column ml-1">
                                    <div class="mb-1">
                                        <h4 class="mb-1">
                                            <strong>Họ tên: </strong> Nguyễn Văn A
                                        </h4>
                                        <span class="card-text mb-1">
                                            <strong>Ngày sinh: </strong> 13/05/1998
                                        </span>
                                    </div>
                                    <div class="d-flex flex-wrap">
                                        <span class="card-text mb-1">
                                            <strong>Bộ phận: </strong>
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
                                        Ca Sáng
                                    </td>
                                </tr>
                                <tr>
                                    <th class="pb-50">
                                        <feather-icon icon="CheckIcon" class="mr-45" />
                                        <span class="font-weight-bold">Thời Gian</span>
                                    </th>
                                    <td class="pb-50 text-capitalize">
                                        7h30
                                    </td>
                                </tr>
                                <tr>
                                    <th class="pb-50">
                                        <feather-icon icon="StarIcon" class="mr-45" />
                                        <span class="font-weight-bold">Thời Gian Nghỉ Trưa</span>
                                    </th>
                                    <td class="pb-50 text-capitalize">
                                        11h30
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
                                table-style="width: 100%;!important" striped responsive :fields="faceInfoField" class="mb-0"
                                :items="hrBoxDoorRecords">
                            </b-table>
                        </b-card>
                    </b-col>
                    <b-col cols="12" lg="4">
                        <b-card title="DỮ LIỆU BÙ THẺ">
                            <b-table striped responsive style="width: 100%!important" table-style="width: 100%!important"
                                :no-border-collapse="true" :fields="optiontb2" :items="hrTimeRecorder" class="mb-0">
                            </b-table>
                        </b-card>
                        <b-card title="ĐĂNG KÝ NGHỈ PHÉP" style="padding-top: 0;">
                            <b-table striped responsive :items="data" :fields="option" class="mb-0">
                            </b-table>
                        </b-card>
                    </b-col>
                </b-row>
            </template>
        </div>
    </b-sidebar>
</template>
<script>
import { BSidebar, BCard, BRow, BCol, BTable, BAvatar, BPagination } from "bootstrap-vue";
import store from "@/store";
import { ValidationObserver } from "vee-validate";
import timekeepingDayList from "./TimekeepingDayList";
import { onUnmounted } from "@vue/composition-api";
import timekeepingStoreModule from "../timekeepingStoreModule";
export default {
    data() {
        return {
            hrBoxDoorRecords: [],
            hrBoxDoorRecord: {},
            hrBoxDoorRecorders: [],
            hrTimeRecorder: {},
            backdrop: false,
            option: [
                {
                    label: 'Ngày',
                    key: 'date',
                    sortable: true
                },
                {
                    label: 'Họ Tên',
                    key: 'fullName',
                    sortable: true
                },
                {
                    label: 'Bù Phép',
                    key: 'leave',
                    sortable: true
                },
                {
                    label: 'Loại Phép',
                    key: 'leaveType',
                    sortable: true
                },
                {
                    label: 'Số Tiếng nghỉ',
                    key: 'sumH',
                    sortable: true
                }
            ],

            optiontb2: [
                {
                    label: 'Ngày',
                    key: 'swipeDate1',
                    sortable: true
                },
                {
                    label: 'Bù Phép',
                    key: 'swipeTime1',
                    sortable: true
                },
                {
                    label: 'Ghi chú',
                    key: 'reason',
                    sortable: true
                }
            ],

            data: [
                {
                    date: "20/04/2023",
                    fullName: 'Tran Minh Quyen',
                    leave: 'Bênh',
                    leaveType: 'Ngày',
                    sumH: '7',
                },

            ],
        };
    },
    created() {
        this.getHrBoxDoorRecord();
        this.getHrTimeRecorder();
    },
    methods: {
        getHrBoxDoorRecord() {
            this.$store.dispatch('timekeeping/fetchHrBoxDoorRecord').then((response) => {
                this.hrBoxDoorRecords = response.data.records;
                this.hrBoxDoorRecord = this.hrBoxDoorRecord[0];
                console.log(this.hrBoxDoorRecords);
            })
        },
        getHrTimeRecorder() {
            this.$store.dispatch('timekeeping/fetchHrTimeRecorder').then((response) => {
                this.hrTimeRecorder = response.data;
            })
        }

    },
    components: {
        BSidebar, ValidationObserver, BCard, BRow, BCol, BTable, BAvatar, BPagination
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
            type: Object,
            required: true,
        },
        // clearTaskData: {
        //     type: Function,
        //     required: true,
        // },
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

        const faceInfoField = [
            { label: 'Tên thiết bị', key: "deviceName", sortable: true },
            { label: 'Tên vị trí', key: "doorName", sortable: true },
            { label: 'Thời gian quẹt gương mặt', key: "inTime", sortable: true },
        ];
        const {
            fetchHrBoxDoorRecords,
            perPage,
            currentPage,
            totalInvoices,
            perPageOptions,
            searchQuery,
            sortBy,
            isSortDirDesc,
            refInvoiceListTable,
            statusFilter,
            refetchData,
            dataHrBoxRecordMeta
        } = timekeepingDayList();

        return {
            fetchHrBoxDoorRecords,
            perPage,
            currentPage,
            totalInvoices,
            perPageOptions,
            searchQuery,
            sortBy,
            isSortDirDesc,
            refInvoiceListTable,
            statusFilter,
            refetchData,
            dataHrBoxRecordMeta,
            faceInfoField,
        }
    },
};
</script>
<style lang="scss">
/* Busy table styling */
// table.b-table[aria-busy="false"] {
//     width: 100%!important;
// }

.b-table-sticky-header {
    max-height: 600px;
}



.b-sidebar>.b-sidebar-body {
    flex-grow: 1;
    height: 100%;
    overflow-y: visible !important;
}
</style>