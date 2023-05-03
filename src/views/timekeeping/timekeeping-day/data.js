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
        { label:'STT', key: "index", sortable: true, with:200,  },
        { label:'Ngày', key: "trackingDate", sortable: true, with:200, formatter:val=> `${val}` },
        { label:'Thứ', key: "dayOfWeek", sortable: true, formatter: val => `${dayOfWeek(val)}` },
        { label:'Mã Nhân Viên', key: "personNo", sortable: true, },
        { label:'Họ Tên', key: "personName", sortable: false,with:200  },
        { label:'Bộ Phận', key: "orgName", sortable: true },
        { label:'Ca Làm', key: "shiftName", sortable: true },
        { label:'Thời Gian 1', key: "time1", sortable: true, formatter: val => `${val ? val: ''}` },
        { label:'Thời Gian 2', key: "time2", sortable: true, formatter: val => `${val ? val: ''}` },
        { label:'Thời Gian 3', key: "time3", sortable: true, formatter: val => `${val ? val: ''}` },
        { label:'Thời Gian 4', key: "time4", sortable: true, formatter: val => `${val ? val: ''}` },
        { label:'Số Giờ Làm', key: "workHours", sortable: true },
        { label:'Bù Thẻ', key: "offset", sortable: true },
        // { label:'Ca làm', key: "shiftId", sortable: true },
        { label:'Trang Thái', key: "status", sortable: true },
        { label:'Ghi Chú', key: "note", sortable: true },
      ]
}

export function faceInfoField(_this){
  return [
    { label: 'Tên thiết bị', key: "deviceName", sortable: true },
    { label: 'Tên vị trí', key: "doorName", sortable: true },
    { label: 'Thời gian quẹt gương mặt', key: "inTime", sortable: true },
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
];
}
export function offsetCard(_this){
  return [
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
        label: 'Ghi chú',
        key: 'reason',
        sortable: true
    }
]
}


// export function dataService(){

//     getHrTrackingData() {

//     }
// }
