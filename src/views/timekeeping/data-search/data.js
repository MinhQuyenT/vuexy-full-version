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
        { label:'STT', key: "index", sortable: true, thStyle: { width: "200px" }, tdClass:'text-left'  },
        { label:'Ngày', key: "trackingDate", sortable: true, thStyle: { width: "200px" }, formatter:val=> `${val}`, tdClass:'text-left' },
        { label:'Thứ', key: "dayOfWeek", sortable: true, formatter: val => `${dayOfWeek(val)}`,thStyle: { width: "200px" }, tdClass:'text-left' },
        { label:'Mã Nhân Viên', key: "personNo", sortable: true, thStyle: { width: "200px" }, tdClass:'text-left'},
        { label:'Họ Tên', key: "personName", sortable: false, with:200, thStyle: { width: "200px" },  tdClass:'text-left'  },
        { label:'Bộ Phận', key: "orgName", sortable: true, tdClass:'text-left' , thStyle: { width: "200px" }},
        { label:'Ca Làm', key: "shiftName", sortable: true  , thStyle: { width: "200px" }},
        { label:'Thời Gian 1', key: "time1", sortable: true, formatter: val => `${val ? val: ''}` , thStyle: { width: "200px" }},
        { label:'Thời Gian 2', key: "time2", sortable: true, formatter: val => `${val ? val: ''}` , thStyle: { width: "200px" }},
        { label:'Thời Gian 3', key: "time3", sortable: true, formatter: val => `${val ? val: ''}` , thStyle: { width: "200px" }},
        { label:'Thời Gian 4', key: "time4", sortable: true, formatter: val => `${val ? val: ''}` , thStyle: { width: "200px" }},
        { label:'Số Giờ Làm', key: "workHours", sortable: true ,tdClass:'text-left , thStyle: { width: "200px" }'},
        { label:'Bù Thẻ', key: "offset", sortable: true ,tdClass:'text-left' , thStyle: { width: "200px" }},
        { label:'Trang Thái', key: "status", sortable: true ,tdClass:'text-left' , thStyle: { width: "200px" }},
        { label:'Ghi Chú', key: "note", sortable: true ,tdClass:'text-left' , thStyle: { width: "200px" }},
      ]
}