import { ref, watch, computed } from "@vue/composition-api";
import store from "@/store";

// Notification
import { useToast } from "vue-toastification/composition";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";

export function useTimekeepingHandle(props, emit){
  const taskLocal = ref(JSON.parse(JSON.stringify(props.task.value)))
  const resetTaskLocal = () => {
    taskLocal.value = JSON.parse(JSON.stringify(props.task.value))
  }
  watch(props.task, () => {
    resetTaskLocal()
  })
}

export default function timekeepingDayList() {
  // Use toast
  const toast = useToast();

  const refInvoiceListTable = ref(null);
  const refHrBoxRecordListTable = ref(null);

  const dayOfWeek = (day)=> {
    switch (day) {
     case "0":
       return "Thứ Hai";
     case "1":
       return "Thứ Ba";
     case "2":
       return "Thứ Tư";
     case "3":
       return "Thứ Năm";
     case "4":
       return "Thứ Sáu";
     case "5":
       return "Thứ Bảy";
     case "6":
       return "Chủ Nhật";
     default:
       return "";
    }
 }

  // Table Handlers
  const tableColumns = [
    { label:'STT', key: "stt", sortable: true, withDefaults:200, formatter: val => `${dayOfWeek(val)}`  },
    { label:'Ngày', key: "trackingDate", sortable: true, with:200 },
    { label:'Thứ', key: "dayOfWeek", sortable: true, formatter: val => `${dayOfWeek(val)}` },
    { label:'Mã Nhân Viên', key: "personNo", sortable: true, },
    { label:'Họ Tên', key: "personName", sortable: false,with:200  },
    { label:'Bộ Phận', key: "orgName", sortable: true },
    { label:'Ca Làm', key: "shiftName", sortable: true },
    { label:'Thời Gian 1', key: "time1", sortable: true, formatter: val => `${val ? val: 0}` },
    { label:'Thời Gian 2', key: "time2", sortable: true, formatter: val => `${val ? val: 0}` },
    { label:'Thời Gian 3', key: "time3", sortable: true, formatter: val => `${val ? val: 0}` },
    { label:'Thời Gian 4', key: "time4", sortable: true, formatter: val => `${val ? val: 0}` },
    { label:'Bù Thẻ', key: "buthe", sortable: true },
    { label:'Nghỉ Phép', key: "leaveDay", sortable: true },
    { label:'Số Giờ Làm', key: "workHours", sortable: true },
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
