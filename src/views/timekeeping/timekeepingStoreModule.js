import axios from '@axios'

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    fetchHrTrackingData() {
      return new Promise((resolve, reject) => {
        axios
          .get('/HrTrackingData')
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
    fetchSystemOrg(){
      return new Promise((resolve,reject)=>{
        axios
        .get('/systemDepartment/org')
        .then(response=> resolve(response))
        .catch(error=>reject(error))
      })
    },
    fetchSystemDepartments(ctx, {orgNO}){
      return new Promise((resolve,reject)=>{
        axios
        .get(`/systemDepartment?orgNO=${orgNO}`)
        .then(response=> resolve(response))
        .catch(error=>reject(error))
      })
    },
    fetchSystemDepartmentAll(){
      return new Promise((resolve,reject)=>{
        axios
        .get('/systemDepartment/dep')
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
    },
    fetchHrTimeRecorder(){
      return new Promise((resolve,reject)=>{
        axios
        .get('/hrTimeRecorder/byPerson?date=2023-04-23&personNo=I20230403001')
        .then(response=> resolve(response))
        .catch(error=>reject(error))
      })
    }
  },
}
