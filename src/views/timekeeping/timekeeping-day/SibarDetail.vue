<template>
    <b-sidebar id="sidebar-backdrop" title="Sidebar with backdrop" sidebar-class="sidebar-lg" bg-variant="white" shadow
        backdrop right no-header>
        <div class="">
            <template >
                <!-- Header -->
                <div class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1">
                    <h5 class="mb-0">THÔNG TIN CHI TIẾT</h5>
                    <div>
                        <feather-icon class="ml-1 cursor-pointer" icon="XIcon" size="16"  />
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
                                           <strong>Họ tên: </strong>  Nguyễn Văn A
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
                            <b-table show-empty empty-text="Không có dữ liệu" table-style="width: max-content !important; " style="min-height: 610px!important;"
                                striped responsive :fields="faceInfoField" class="mb-0">

                            </b-table>
                        </b-card>
                    </b-col>
                    <b-col cols="12" lg="4">
                        <b-card title="DỮ LIỆU BÙ THẺ">
                            <b-table striped responsive :items="permissionsData" class="mb-0">
                                <template #cell(module)="data">
                                    {{ data.value }}
                                </template>
                                <!-- <template #cell()="data">
                                    <b-form-checkbox disabled :checked="data.value" />
                                </template> -->
                            </b-table>
                        </b-card>
                        <b-card title="ĐĂNG KÝ NGHỈ PHÉP" style="padding-top: 0;">
                            <b-table striped responsive :items="permissionsData" class="mb-0" >
                                <template #cell(module)="data">
                                    {{ data.value }}
                                </template>
                                <!-- <template #cell()="data">
                                    <b-form-checkbox disabled :checked="data.value" />
                                </template> -->
                            </b-table>
                        </b-card>
                    </b-col>
                </b-row>
            </template>
        </div>
    </b-sidebar>
</template>
<script>
import { BSidebar, BCard, BRow, BCol, BTable, BAvatar } from "bootstrap-vue";
import { ValidationObserver } from "vee-validate";
export default {
    data() {
        return {};
    },
    components: {
        BSidebar, ValidationObserver, BCard, BRow, BCol, BTable, BAvatar
    },
    setup() {
        const faceInfoField = [
            { label: 'Thời Gian', key: "date", sortable: true, withDefaults: 200, },
            { label: 'Mã Nhân Viên', key: "empNo", sortable: true, formatter: (val) => `$${val}`, with: 200 },
            { label: 'Họ Tên', key: "fullName", sortable: false, with: 200 },
            { label: 'Tên thiết bị', key: "department", sortable: true },
            { label: 'Tên vị trí', key: "locationName", sortable: true },
            { label: 'Thời gian Upload dữ liệu', key: "tg1", sortable: true },
            { label: 'Hình ảnh', key: "img", sortable: true },

        ]
        const permissionsData = [
            {
                module: 'Admin',
                read: true,
                write: false,
                create: false,
                delete: false,
            },
            {
                module: 'Staff',
                read: false,
                write: true,
                create: false,
                delete: false,
            },
            {
                module: 'Author',
                read: true,
                write: false,
                create: true,
                delete: false,
            },
            {
                module: 'Contributor',
                read: false,
                write: false,
                create: false,
                delete: false,
            },
            {
                module: 'User',
                read: false,
                write: false,
                create: false,
                delete: true,
            },
        ]

        return {
            permissionsData,
            faceInfoField
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