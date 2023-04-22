import { ref, watch, computed } from "@vue/composition-api";
import store from "@/store";

// Notification
import { useToast } from "vue-toastification/composition";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";

export default function timekeepingDayList() {
  // Use toast
  const toast = useToast();

  const refInvoiceListTable = ref(null);
  const refHrBoxRecordListTable = ref(null);

  // Table Handlers
  const tableColumns = [
    { label:'STT', key: "stt", sortable: true, withDefaults:200,  },
    { label:'Ngày', key: "day", sortable: true, with:200 },
    { label:'Thứ', key: "th", sortable: true },
    { label:'Mã Nhân Viên', key: "employeeId", sortable: true, },
    { label:'Họ Tên', key: "fullName", sortable: false,with:200  },
    { label:'Phòng Ban', key: "department", sortable: true },
    { label:'Ca Làm', key: "shift", sortable: true },
    { label:'Thời Gian 1', key: "tg1", sortable: true },
    { label:'Thời Gian 2', key: "tg2", sortable: true },
    { label:'Thời Gian 3', key: "tg3", sortable: true },
    { label:'Thời Gian 4', key: "tg4", sortable: true },
    { label:'Bù Thẻ', key: "buthe", sortable: true },
    { label:'Nghỉ Phép', key: "leaveDay", sortable: true },
    { label:'Số Tiếng Nghỉ Phép', key: "totalLeaveDay", sortable: true },
    { label:'Trang Thái', key: "status", sortable: true },
    { label:'Ghi Chú', key: "note", sortable: true },
    { label:'actions', key: "actions" },
  ];
  const perPage = ref(10);
  const totalInvoices = ref(0);
  const currentPage = ref(1);
  const perPageOptions = [10, 25, 50, 100];
  const searchQuery = ref("");
  const sortBy = ref("id");
  const isSortDirDesc = ref(true);
  const statusFilter = ref(null);

  const dataMeta = computed(() => {
    const localItemsCount = refInvoiceListTable.value
      ? refInvoiceListTable.value.localItems.length
      : 0;
    return {
      from: perPage.value * (currentPage.value - 1) + (localItemsCount ? 1 : 0),
      to: perPage.value * (currentPage.value - 1) + localItemsCount,
      of: totalInvoices.value,
    };
  });

  const dataHrBoxRecordMeta = computed(() => {
    const localItemsCount = refHrBoxRecordListTable.value
      ? refHrBoxRecordListTable.value.localItems.length
      : 0;
    return {
      from: perPage.value * (currentPage.value - 1) + (localItemsCount ? 1 : 0),
      to: perPage.value * (currentPage.value - 1) + localItemsCount,
      of: totalInvoices.value,
    };
  });

  const refetchData = () => {
    refInvoiceListTable.value.refresh();
    refHrBoxRecordListTable.value.refresh();
  };

  watch([currentPage, perPage, searchQuery, statusFilter], () => {
    refetchData();
  });

  const fetchHrBoxDoorRecords = (ctx, callback) => {
    store
      .dispatch("timekeeping/fetchHrBoxDoorRecord", {
        q: searchQuery.value,
        perPage: perPage.value,
        page: currentPage.value,
        sortBy: sortBy.value,
        sortDesc: isSortDirDesc.value,
        status: statusFilter.value,
      })
      .then((response) => {
        debugger
        const { invoices, total } = response.data;
        callback(invoices);
        totalInvoices.value = total;
      })
      .catch(() => {
        toast({
          component: ToastificationContent,
          props: {
            title: "Error fetching invoices' list",
            icon: "AlertTriangleIcon",
            variant: "danger",
          },
        });
      });
  };

  const fetchSystemCode = (ctx,callback)=>{
    store.dispatch('timekeeping/fetchSystemCode').then((response) => {
      const data = response.data;
      callback(data);
    }).catch(() => {
        toast({
          component: ToastificationContent,
          props: {
            title: "Error fetching system code' list",
            icon: "AlertTriangleIcon",
            variant: "danger",
          },
        });
      });
  }

  const tableData = [{
    stt:1,
    day: '2023/04/21 12:45:00',
    th: 'Thứ 7',
    employeeId:'I202304030001',
    fullName:'Trần Minh Quyền',
    department:'IT Department',
    shift: 'Ngày',
    tg1: '7:30',
    tg2: '11:30',
    tg3: '00:00',
    tg4: '00:00',
    buthe:'',
    leaveDay: 4,
    totalLeaveDay: 4,
    status:'Hoàn thành',
    note:'',
    actions:'',
  }];

  const optionsShift = [
    { value: '0', text: 'Vui lòng chọn' },
    { value: '1', text: 'Ca 1' },
    { value: '2', text: 'Ca 2' },
    { value: '3', text: 'Ca 3' },
    { value: '4', text: 'Ca 4' },
  ]
  const optionsDepartment = [
    { value: '0', text: 'Vui lòng chọn' },
    { value: '1', text: 'Phòng 1' },
    { value: '2', text: 'Phòng 2' },
    { value: '3', text: 'Phòng 3' },
    { value: '4', text: 'Phòng 4' },
  ]

  return {
    fetchHrBoxDoorRecords,
    tableColumns,
    perPage,
    currentPage,
    totalInvoices,
    dataMeta,
    perPageOptions,
    searchQuery,
    sortBy,
    isSortDirDesc,
    refInvoiceListTable,
    statusFilter,
    optionsShift,
    optionsDepartment,
    refetchData,
    tableData,
    fetchSystemCode,
    dataHrBoxRecordMeta
  };
}
