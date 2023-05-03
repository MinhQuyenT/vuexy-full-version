export function tableColumn (_this){

    const dayOfWeek = (day)=> {
        switch (day) {
         case "0":
           return "Chủ Nhật";
         case "1":
           return "Thứ Hai";
         case "2":
           return "Thứ Ba";
         case "3":
           return "Thứ Tư";
         case "4":
           return "Thứ Năm";
         case "5":
           return "Thứ Sáu";
         case "6":
           return "Chủ Bảy";
         default:
           return "";
        }
     }
    return [
        { label:'STT', key: "index", sortable: true, thStyle: { width: 200 }, tdClass:'text-left'  },
        { label:'Ngày', key: "trackingDate", sortable: true, with:200, formatter:val=> `${val}`, tdClass:'text-left' },
        { label:'Thứ', key: "dayOfWeek", sortable: true, formatter: val => `${dayOfWeek(val)}`, tdClass:'text-left' },
        { label:'Mã Nhân Viên', key: "personNo", sortable: true, tdClass:'text-left'},
        { label:'Họ Tên', key: "personName", sortable: false,with:200, tdClass:'text-left'  },
        { label:'Bộ Phận', key: "orgName", sortable: true, tdClass:'text-left' },
        { label:'Ca Làm', key: "shiftName", sortable: true },
        { label:'Thời Gian 1', key: "time1", sortable: true, formatter: val => `${val ? val: ''}`},
        { label:'Thời Gian 2', key: "time2", sortable: true, formatter: val => `${val ? val: ''}`},
        { label:'Thời Gian 3', key: "time3", sortable: true, formatter: val => `${val ? val: ''}`},
        { label:'Thời Gian 4', key: "time4", sortable: true, formatter: val => `${val ? val: ''}`},
        { label:'Số Giờ Làm', key: "workHours", sortable: true ,tdClass:'text-left'},
        { label:'Bù Thẻ', key: "offset", sortable: true ,tdClass:'text-left'},
        { label:'Trang Thái', key: "status", sortable: true ,tdClass:'text-left'},
        { label:'Ghi Chú', key: "note", sortable: true ,tdClass:'text-left'},
      ]
}

export function faceInfoField(_this){
  return [
    { label:'STT', key: "index", sortable: true, tdClass:'text-left'  },
    { label: 'Tên Thiết Bị', key: "deviceName", thStyle: { width: "250px" },  sortable: true },
    { label: 'Tên Vị Trí', key: "doorName",thStyle: { width: "280px" }, sortable: true },
    { label: 'Thời Gian Quẹt Gương Mặt', key: "inTime",thStyle: { width: "300px" }, sortable: true },
  ];
}
export function registerLeave(_this){
  return [
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
        label: 'Loại Phép',
        key: 'leaveType',
        sortable: true
    },
    {
        label: 'Số Tiếng Nghỉ',
        key: 'sumH',
        sortable: true
    }
];
}
export function offsetCard(_this){
  return [
    {
        label: 'STT',
        key: 'index',
        sortable: true
    },
    {
        label: 'Ngày',
        key: 'date',
        sortable: true
    },
    {
        label: 'Bù Phép',
        key: 'time',
        sortable: true
    },
    {
        label: 'Ghi Chú',
        key: 'reason',
        sortable: true
    }
]
}

