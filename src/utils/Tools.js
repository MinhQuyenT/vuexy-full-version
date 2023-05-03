const HOST = "http://192.168.5.42:99/api/"

export const axiosGet=(url,params)=> {
  return axios({
    url:HOST+url,
    method:"GET",
    params:params
  })
}
