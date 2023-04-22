import axios from '@axios'

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    fetchTimekeepings(ctx, queryParams) {
      return new Promise((resolve, reject) => {
        axios
          .get('/hrBoxDoorRecord', { params: queryParams })
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchSystemCode(){
      return new Promise((resolve,reject)=>{
        axios
        .get('/systemCode')
        .then(response=> resolve(response))
        .catch(error=>reject(error))
      })
    },
    fetchSystemDepartment(){
      return new Promise((resolve,reject)=>{
        axios
        .get('/systemDepartment')
        .then(response=> resolve(response))
        .catch(error=>reject(error))
      })
    },
    fetchHrBoxDoorRecord(){
      return new Promise((resolve,reject)=>{
        axios
        .get('/hrBoxDoorRecord/page?personName=TRAN MINH QUYEN陈明权')
        .then(response=> resolve(response))
        .catch(error=>reject(error))
      })
    }
  },
}
