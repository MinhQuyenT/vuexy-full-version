export function tableColumn (_this){
    return [
        { label:'STT', key: "index", sortable: true, thStyle: { width: 200 }, tdClass:'text-left'  },
        { label: _this.$i18n.t("timekeeping-day.trackingDate"), key: "trackingDate", sortable: true, with:200, formatter:val=> `${val}`, tdClass:'text-left' },
        { label: _this.$i18n.t("timekeeping-day.dayOfWeek"), key: "dayOfWeekName", sortable: true, tdClass:'text-left' },
        { label: _this.$i18n.t("timekeeping-day.personNO"), key: "personNo", sortable: true, tdClass:'text-left'},
        { label: _this.$i18n.t("timekeeping-day.personName"), key: "personName", sortable: true,with:200, tdClass:'text-left'  },
        { label: _this.$i18n.t("timekeeping-day.department"), key: "orgName", sortable: true, tdClass:'text-left' },
        { label: _this.$i18n.t("timekeeping-day.shift"), key: "shiftName", sortable: true },
        { label: _this.$i18n.t("timekeeping-day.time1"), key: "time1", sortable: true, formatter: val => `${val ? val: ''}`},
        { label: _this.$i18n.t("timekeeping-day.time2"), key: "time2", sortable: true, formatter: val => `${val ? val: ''}`},
        { label: _this.$i18n.t("timekeeping-day.time3"), key: "time3", sortable: true, formatter: val => `${val ? val: ''}`},
        { label: _this.$i18n.t("timekeeping-day.time4"), key: "time4", sortable: true, formatter: val => `${val ? val: ''}`},
        { label: _this.$i18n.t("timekeeping-day.workHours"), key: "workHours", sortable: true ,tdClass:'text-left'},
        { label: _this.$i18n.t("timekeeping-day.fourghHours"), key: "fourghHours", sortable: true ,tdClass:'text-left'},
        { label: _this.$i18n.t("timekeeping-day.fourghName"), key: "fourghName", sortable: true ,tdClass:'text-left'},
        { label: _this.$i18n.t("timekeeping-day.offset"), key: "offsetName", sortable: true ,tdClass:'text-left'},
        { label: _this.$i18n.t("timekeeping-day.status"), key: "statusName", sortable: true ,tdClass:'text-left'},
        { label: _this.$i18n.t("timekeeping-day.note"), key: "note", sortable: true ,tdClass:'text-left'},
      ]
}

export function faceInfoField(_this){
  return [
    { label: 'STT', key: "index", sortable: true, tdClass:'text-left'  },
    { label: _this.$i18n.t("timekeeping-day.faceScanDetail.faceScanTime"), key: "inTime",thStyle: { width: "250px" }, sortable: true },
    { label: _this.$i18n.t("timekeeping-day.faceScanDetail.faceScanLocation"), key: "doorName",thStyle: { width: "270px" }, sortable: true },
    { label:  _this.$i18n.t("timekeeping-day.faceScanDetail.faceScanDeviceName"), key: "deviceName", thStyle: { width: "220px" },  sortable: true },
  ];
}
export function registerLeave(_this){
  return [
    {
        label: _this.$i18n.t("timekeeping-day.trackingDate"),
        key: 'date',
        sortable: true
    },
    {
        label:  _this.$i18n.t("timekeeping-day.leaveType"),
        key: 'fullName',
        sortable: true
    },
    {
        label: _this.$i18n.t("timekeeping-day.numberHours"),
        key: 'sumH',
        sortable: true
    },
    {
        label: _this.$i18n.t("timekeeping-day.reason"),
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
        label: _this.$i18n.t("timekeeping-day.trackingDate"),
        key: 'date',
        sortable: true
    },
    {
        label: _this.$i18n.t("timekeeping-day.offsetTime"),
        key: 'time',
        sortable: true
    },
    {
        label: _this.$i18n.t("timekeeping-day.reason"),
        key: 'reason',
        sortable: true
    }
]
}

