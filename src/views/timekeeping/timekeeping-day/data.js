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
        { label:'Họ Tên', key: "personName", sortable: true,with:200, tdClass:'text-left'  },
        { label:'Bộ Phận', key: "orgName", sortable: true, tdClass:'text-left' },
        { label:'Ca Làm', key: "shiftName", sortable: true },
        { label:'Thời Gian 1', key: "time1", sortable: true, formatter: val => `${val ? val: ''}`},
        { label:'Thời Gian 2', key: "time2", sortable: true, formatter: val => `${val ? val: ''}`},
        { label:'Thời Gian 3', key: "time3", sortable: true, formatter: val => `${val ? val: ''}`},
        { label:'Thời Gian 4', key: "time4", sortable: true, formatter: val => `${val ? val: ''}`},
        { label:'Số Giờ Làm', key: "workHours", sortable: true ,tdClass:'text-left'},
        { label:'Thời Gian Nghỉ Phép', key: "fourghHours", sortable: true ,tdClass:'text-left'},
        { label:'Loại Phép', key: "fourghName", sortable: true ,tdClass:'text-left'},
        { label:'Bù Thẻ', key: "offset", sortable: true ,tdClass:'text-left'},
        { label:'Trang Thái', key: "status", sortable: true ,tdClass:'text-left'},
        { label:'Ghi Chú', key: "note", sortable: true ,tdClass:'text-left'},
      ]
}

export function faceInfoField(_this){
  return [
    { label:'STT', key: "index", sortable: true, tdClass:'text-left'  },
    { label: 'Thời Gian Quẹt Gương Mặt', key: "inTime",thStyle: { width: "250px" }, sortable: true },
    { label: 'Tên Vị Trí', key: "doorName",thStyle: { width: "270px" }, sortable: true },
    { label: 'Tên Thiết Bị', key: "deviceName", thStyle: { width: "220px" },  sortable: true },
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
        label: 'Loại Phép',
        key: 'fullName',
        sortable: true
    },
    {
        label: 'Số Tiếng',
        key: 'sumH',
        sortable: true
    },
    {
        label: 'Lý Do',
        key: 'reason',
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
        label: 'Thời Gian Bù Thẻ',
        key: 'time',
        sortable: true
    },
    {
        label: 'Lý Do',
        key: 'reason',
        sortable: true
    }
]
}

  let component = null;

export const ResetX = {
	inserted(el, _binding, vnode) {
      el.onfocus = () => {
        vnode.elm.parentElement.style.position = "relative";
  
        if (el.value) {
          component.$el.classList.add("v-reset-input-active");
        }
      };
  
      el.onblur = () => {
        setTimeout(() => {
          component.$el.classList.remove("v-reset-input-active");
        }, 150);
      };
  
      let onClick = () => {
        el.value = "";
        el.dispatchEvent(new Event("input"));
        el.focus();
      };
      let resetComponent = Vue.extend({
        render(h) {
            return h("span", {
              // domProps: { innerHTML: "&#10006;" },
              domProps: { innerHTML: `<svg xmlns="http://www.w3.org/2000/svg" width="14px" height="14px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>` },
              class: { "v-reset-input": true },
              style: { position: "absolute", cursor: "default", padding: "7px 0", marginLeft:'-20px', cursor:"pointer" },
              on: {
                click: onClick
              }
            });
        }
      });
  
      if(el.value != null || el.value != ""){
      let span = document.createElement("span");
      el.after(span);
        component = new resetComponent().$mount(span);
      }
	},

	update(el) {
		if (!el.value) {
			component.$el.classList.remove("v-reset-input-active");
		} else {
			component.$el.classList.add("v-reset-input-active");
		}
	}
};

export function showIConX(Selector,imgSelector,active) {
  const item = document.querySelector(Selector).value;
  const img = document.querySelector(imgSelector)

  if(item.value <= 0){
    document.body.classList.remove(active)
  }else{
    document.body.classList.add(active)
  }
  img.addEventListener("click", ()=>{
    document.querySelector(Selector).value = "";
    document.body.classList.remove(active)
  })
}

