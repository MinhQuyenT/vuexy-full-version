import Vue from 'vue'

// axios
import axios from 'axios'

const axiosIns = axios.create({
  // You can add your headers here
  // ================================
  baseURL: 'http://192.168.5.42:99/api',
  timeout: 5000,
  headers: {
    "Content-type": "application/json"
  }
})

Vue.prototype.$http = axiosIns

export default axiosIns
