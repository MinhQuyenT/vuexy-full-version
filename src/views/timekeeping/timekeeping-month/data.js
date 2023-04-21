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
      { label:'STT', key: "stt", sortable: true, withDefaults:200,  rowspan: 2 },
      { label:'Mã Nhân Viên', key: "employeeId", sortable: true},
      { label:'Họ Tên', key: "fullName", sortable: true, with:200, rowspan: 2 },
      { label:'1', key: "day1", sortable: false },
      { label:'2', key: "day2", sortable: false },
      { label:'3', key: "day3", sortable: false },
      { label:'4', key: "day4", sortable: false },
      { label:'5', key: "day5", sortable: false },
      { label:'6', key: "day6", sortable: false },
      { label:'7', key: "day7", sortable: false },
      { label:'8', key: "day8", sortable: false },
      { label:'9', key: "day9", sortable: false },
      { label:'10', key: "day10", sortable: false },
      { label:'11', key: "day11", sortable: false },
      { label:'12', key: "day12", sortable: false },
      { label:'13', key: "day13", sortable: false },
      { label:'14', key: "day14", sortable: false },
      { label:'15', key: "day15", sortable: false },
      { label:'16', key: "day16", sortable: false },
      { label:'17', key: "day17", sortable: false },
      { label:'18', key: "day18", sortable: false },
      { label:'19', key: "day19", sortable: false },
      { label:'20', key: "day20", sortable: false },
      { label:'21', key: "day21", sortable: false },
      { label:'22', key: "day22", sortable: false },
      { label:'23', key: "day23", sortable: false },
      { label:'24', key: "day24", sortable: false },
      { label:'25', key: "day25", sortable: false },
      { label:'26', key: "day26", sortable: false },
      { label:'27', key: "day27", sortable: false },
      { label:'28', key: "day28", sortable: false },
      { label:'29', key: "day29", sortable: false },
      { label:'30', key: "day30", sortable: false },
      { label:'31', key: "day31", sortable: false },
      { label:'Thời Gian Làm Việc', key: "totalWork", sortable: false,with:200  },
      { label:'Thời Gian Tăng Ca', key: "totalOvertime", sortable: true },
      { label:'Ghi Chú', key: "note", sortable: true},
      { label:'actions', key: "actions" },
    ];

    const items = [{
        stt: 1,
        employeeId: "I202304030001",
        fullName: "Trần Minh Quyền",
        day1: '8',
        day2: '8',
        day3: '8',
        day4: '7',
        day5: '7',
        day6: '8',
        day7: '8',
        day8: '8',
        day9: '8',
        day10:'8',
        day11:'8',
        day12:'8',
        day13:'8',
        day14:'8',
        day15:'8',
        day16:'8',
        day17:'8',
        day18:'8',
        day19:'8',
        day20:'8',
        day21:'8',
        day22:'8',
        day23:'8',
        day24:'8',
        day25:'8',
        day26:'8',
        day27:'8',
        day28:'8',
        day29:'8',
        day30:'8',
        day31:'8',
        totalWork: 5,
        totalOvertime: 5, 
    }];

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
      items,
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