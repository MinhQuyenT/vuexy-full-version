export function crudOp() {
  return {
    addBtn: false,
    excelBtn: false,
    border: true,
    index: true,
    expandLevel: 1,
    tableLoading: true,
    headerAlign: "center",
    align: "center",
    page: true,
    header:false,
    refreshBtn: false,
    columnBtn: false,
    menuBtn: false,
    menu: false,
    disabled: false,
    tree: true,
    labelWidth: 100,
    height: "59vh",
    column: [
      {
        width: 120,
        label: "STT",
        prop: "stt",
        display: true,
        overHidden: true,
      },
      {
        width: 120,
        label: "Ngày",
        prop: "date",
        display: true,
        overHidden: true,
      },
      {
        width: 130,
        label: "Thứ",
        prop: "dayofWeek",
        display: true,
        overHidden: true,
      },
      {
        width: 130,
        label: "Mã Nhân Viên",
        prop: "employeeId",
        display: true,
        overHidden: true,
      },
      {
        width: 130,
        label: "Họ Tên",
        prop: "fullName",
        display: true,
        overHidden: true,
      },
      {
        width: 130,
        label: "Bộ Phận",
        prop: "department",
        display: true,
        overHidden: true,
      },
      {
        width: 130,
        label: "Ca Làm",
        prop: "shift",
        display: true,
      },
      {
        width: 130,
        label: "TG1",
        prop: "tg1",
        display: true,
      },
      {
        width: 130,
        label: "TG2",
        prop: "tg2",
        display: true,
      },
      {
        width: 130,
        label: "TG3",
        prop: "tg3",
        display: true,
      },
      {
        width: 130,
        label: "TG4",
        prop: "tg4",
        display: true,
      },
      {
        width: 130,
        label: "Bù Thẻ",
        prop: "",
        display: true,
      },
      {
        width: 200,
        label: "Nghỉ Phép",
        prop: "createTime",
        display: true,
        overHidden: true,
      },
      {
        width: 200,
        label: "Số Tiếng Nghỉ Phép",
        prop: "storeLoad",
        display: true,
        overHidden: true,
      },
      {
        width: 130,
        label: "Trạng Thái",
        prop: "storeLocal",
        display: true,
      },
      {
        width: 200,
        label: "Ghi Chú",
        prop: "actionDesc",
        display: true,
        overHidden: true,
      },
      {
        width: 130,
        label: "",
        prop: "",
        display: true,
      },
    ],
  };
}

export function formOp1() {
  return {
    submitBtn: false,
    emptyBtn: false,
    fontSize: 8,
    menuBtn: false,
    fontWeight: "bold",
    padding: 0,
    column: [
      {
        label: "Mã NV",
        prop: "vatNo",
        value: "",
        name: "vatNo",
        span: 6,
      },
      {
        label: "Họ Tên",
        prop: "actionEffectEx",
        value: "",
        name: "actionEffectEx",
        span: 6,
      },
      {
        label: "Ngày",
        prop: "actionCode",
        value: "",
        name: "actionCode",
        span: 6,
      },
      {
        label: "Ca Làm",
        prop: "createTime",
        value: "",
        name: "createTime",
        span: 6,
      },
    ],
  };
}

export function formOp2() {
  return {
    submitBtn: false,
    emptyBtn: false,
    fontSize: 8,
    menuBtn: false,
    dialogCloseBtn: false,
    fontWeight: "bold",
    column: [
      {
        label: "Bộ Phận",
        prop: "storeLoad",
        value: "",
        name: "storeLoad",
        span: 6,
      },
      {
        label: "Nghỉ Phép",
        labelWidth:100,
        prop: "storeLocal",
        value: "",
        name: "storeLocal",
        span: 6,
      },
      {
        label: "Trạng Thái",
        labelWidth:100,
        prop: "creator",
        value: "",
        name: "creator",
        span: 6,
      },
      {
        label: "Ghi Chú",
        prop: "actionDesc",
        value: "",
        name: "actionDesc",
        span: 6,
      },
    ],
  };
}

export function formOpSelect() {
  return {
    submitBtn: false,
    emptyBtn: false,
    fontSize: 8,
    menuBtn: false,
    options: [{
      value: 'Option1',
      label: 'Option1'
    }, {
      value: 'Option2',
      label: 'Option2'
    }, {
      value: 'Option3',
      label: 'Option3'
    }, {
      value: 'Option4',
      label: 'Option4'
    }, {
      value: 'Option5',
      label: 'Option5'
    }],
    value: ''
  };
}

export function configParam(parameter) {
  let param = { ...parameter };
  Object.keys(param).forEach((key) => {
    let checkParam = !!param[key]
    if (!checkParam) {
      delete param[key];
    } else if (!param[key].includes('%')) {
      param[key] = `%${param[key]}`
    }
  })
  return param;
}
