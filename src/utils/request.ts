import axios from 'axios'
import qs from 'qs'
import { BASE_API } from '../config'

// 设置默认请求头
axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded'
// 发送请求前处理request的数据
axios.defaults.transformRequest = [
  function(data) {
    return qs.stringify(data)
  }
]
// 带cookie请求
// axios.defaults.withCredentials = true;

// 创建axios实例
const service = axios.create({
  baseURL: BASE_API, // api的base_url
  timeout: 15000, // 请求超时时间
  transformRequest: [
    function(data) {
      // Do whatever you want to transform the data
      return qs.stringify(data)
    }
  ],
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

// request拦截器
service.interceptors.request.use(
  config => {
    if (!config.data) {
      config.data = {}
    }
    return config
  },
  error => {
    // Do something with request error console.log(error); // for debug
    Promise.reject(error)
  }
)

// respone拦截器
service.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
