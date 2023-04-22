<template>
    <b-sidebar id="sidebar-backdrop" title="Sidebar with backdrop" sidebar-class="sidebar-lg" bg-variant="white" shadow
        backdrop right no-header>
        <div class="">
            <template>
                <!-- Header -->
                <div class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1">
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
                                            <strong>Ngày sinh: </strong> 01/01/2023
                                        </span>
                                    </div>
                                    <div class="d-flex flex-wrap">
                                        <span class="card-text mb-1">
                                            <strong>Bộ phận: </strong> IT
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
                        <b-card title="CHI TIẾT QUẸT GƯƠNG MẶT">
                            <b-table show-empty empty-text="Không có dữ liệu" table-style="width: max-content !important; "
                                style="min-height: 610px!important;" striped responsive :fields="faceInfoField" class="mb-0"
                                :items="fetchHrBoxDoorRecords">
                            </b-table>
                            <div class="mx-2 mb-2">
                                <b-row>
                                    <b-col cols="12" sm="6"
                                        class="d-flex align-items-center justify-content-center justify-content-sm-start">
                                        <span class="text-muted">Showing {{ dataHrBoxRecordMeta.from }} to {{
                                            dataHrBoxRecordMeta.to }} of
                                            {{ dataHrBoxRecordMeta.of }} entries</span>
                                    </b-col>
                                    <!-- Pagination -->
                                    <b-col cols="12" sm="6"
                                        class="d-flex align-items-center justify-content-center justify-content-sm-end">
                                        <b-pagination v-model="currentPage" :total-rows="totalInvoices" :per-page="perPage"
                                            first-number last-number class="mb-0 mt-1 mt-sm-0" prev-class="prev-item"
                                            next-class="next-item">
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
                    </b-col>
                    <b-col cols="12" lg="4">
                        <b-card title="DỮ LIỆU BÙ THẺ">
                            <b-table striped responsive :fields="optiontb2" class="mb-0">
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
            hrBoxDoorRecord: {},
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
                    key: 'date',
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
                    label: 'Số Tiếng',
                    key: 'sumH',
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
        console.log(this.fetchHrBoxDoorRecords());
    },
    methods: {
        getHrBoxDoorRecord() {
            this.$store.dispatch('timekeeping/fetchHrBoxDoorRecord').then((response) => {
                this.hrBoxDoorRecord = response.data;
            })
        }
    },

    components: {
        BSidebar, ValidationObserver, BCard, BRow, BCol, BTable, BAvatar, BPagination
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
            { label: 'Số Thẻ', key: "cardNum", sortable: true, withDefaults: 200, },
            { label: 'Mã Nhân Viên', key: "personNo", sortable: true, with: 200 },
            { label: 'Họ Tên', key: "personName", sortable: false, with: 200 },
            { label: 'Tên thiết bị', key: "deviceName", sortable: true },
            { label: 'Tên vị trí', key: "doorName", sortable: true },
            { label: 'Thời gian Upload dữ liệu', key: "inTime", sortable: true },
            { label: 'Hình ảnh', key: "pictureFile", sortable: true },
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
table.b-table[aria-busy="false"] {
    width: max-content !important;
}

.b-sidebar>.b-sidebar-body {
    flex-grow: 1;
    height: 100%;
    overflow-y: visible !important;
}
</style>