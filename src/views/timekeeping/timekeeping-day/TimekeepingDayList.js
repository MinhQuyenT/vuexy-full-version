import { ref, watch, computed } from "@vue/composition-api";
import store from "@/store";

// Notification
import { useToast } from "vue-toastification/composition";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";

export default function timekeepingDayList() {
  // Use toast
  const toast = useToast();

  const refInvoiceListTable = ref(null);

  // Table Handlers
  const tableColumns = [
    { label:'STT', key: "STT", sortable: true, withDefaults:200,  },
    { label:'Ngày', key: "day", sortable: true, with:200 },
    { label:'Thứ', key: "Thứ", sortable: true },
    { label:'Mã Nhân Viên', key: "employeeId", sortable: true, formatter: (val) => `$${val}`, with:200 },
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

  const refetchData = () => {
    refInvoiceListTable.value.refresh();
  };

  watch([currentPage, perPage, searchQuery, statusFilter], () => {
    refetchData();
  });

  const fetchTimekeepings = (ctx, callback) => {
    store
      .dispatch("/hrBoxDoorRecord", {
        q: searchQuery.value,
        perPage: perPage.value,
        page: currentPage.value,
        sortBy: sortBy.value,
        sortDesc: isSortDirDesc.value,
        status: statusFilter.value,
      })
      .then((response) => {
        console.log(response);
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

  return {
    fetchTimekeepings,
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
    refetchData,
  };
}
