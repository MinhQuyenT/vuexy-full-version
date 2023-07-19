
import { BBadge, BOverlay,BSidebar, BDropdown, BDropdownItem, BSpinner, BPagination, BCol, BTable, BRow, BButton, VBToggle, BCard, BFormSelect, BFormInput, BFormGroup, BFormDatepicker } from "bootstrap-vue";
import vSelect from "vue-select";
import FormInput from '@/views/components/common/FormInput.vue'

export default function bootStrapVue(Vue){
    Vue.component('BCol', BCol)
    Vue.component('BBadge', BBadge)
    Vue.component('BRow', BRow)
    Vue.component('BButton', BButton)
    Vue.component('VBToggle', VBToggle)
    Vue.component('BSidebar', BSidebar)
    Vue.component('BCard', BCard)
    Vue.component('BDropdown', BDropdown)
    Vue.component('BOverlay', BOverlay)
    Vue.component('BDropdownItem', BDropdownItem)
    Vue.component('BSpinner', BSpinner)
    Vue.component('BPagination', BPagination)
    Vue.component('BFormInput', BFormInput)
    Vue.component('BFormSelect', BFormSelect)
    Vue.component('BTable', BTable)
    Vue.component('BFormGroup', BFormGroup)
    Vue.component('BFormDatepicker', BFormDatepicker)
    Vue.component('vSelect', vSelect)
    Vue.component('FormInput', FormInput)
}