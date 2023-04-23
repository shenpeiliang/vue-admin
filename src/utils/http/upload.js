import axios from 'axios'
import { userStore } from "@/stores/user.js";
import router from '@/router/index.js';

const user = userStore()

// 1. 创建axios实例
const instance = axios.create({
  // 接口
  baseURL: import.meta.env.VITE_APP_API_URL,
  // 超时时间
  timeout: 50000,
  // 发送请求带上cookie
  withCredentials: true,
})

// 2.请求拦截
instance.interceptors.request.use(
  (config) => {
    config.headers['Content-Type'] = 'multipart/form-data'
    config.headers['Accept'] = 'application/json, text/javascript, */*; q=0.01'

    return config
  },
  (error) => {
    //请求发生错误，抛出异常
    Promise.reject(error)
  }
)

// 3.响应拦截
instance.interceptors.response.use(
  async res => {
    if (res.data.code == '200') {
      return Promise.resolve(res.data)
    } else if (res.data.code == '1000') {
      await router.push("/login")
      location.reload()
      return Promise.reject("No permission")
    } else {
      return Promise.reject(res.data)
    }
  },
  (error) => {
    let message = "网络错误，无法获得服务"
    if (error && error.response) {
      const status = error.response.status
      switch (status) {
        case 400:
          message = '请求错误'
          break
        case 401:
          message = '未授权，请重新登录'
          break
        case 403:
          message = '拒绝访问'
          break
        case 404:
          message = '请求错误，未找到相应的资源'
          break
        case 408:
          message = '请求超时'
          break
        case 500:
          message = '服务器内部错误'
          break
        case 501:
          message = '网络未实现'
          break
        case 502:
          message = '网络错误'
          break
        case 503:
          message = '服务不可用'
          break
        case 504:
          message = '网络超时'
          break
        case 505:
          message = 'HTTP版本不支持该请求'
          break
        default:
          message = '请求失败'
      }
    } else {
      if (JSON.stringify(error).includes('timeout')) {
        message = '服务器响应超时，请刷新页面'
      } else {
        message = '连接服务器失败'
      }
    }

    return Promise.reject({ msg: message })
  }
)
// 4.导出 axios 实例
export default instance
