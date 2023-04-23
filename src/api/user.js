//路由
import router from '@/router/index'

//http客户端
import client from '../utils/http/client.js'
import { ElMessage } from 'element-plus'

const api = {
  getBuyer: (query) => {
    return client.post("/admin/user/buyer", query)
  },
  getSeller: (query) => {
    return client.post("/admin/user/seller", query)
  },
  getAdmin: (query) => {
    return client.post("/admin/user/manager", query)
  },
  authr: (query) => {
    return client.get(`/admin/user/auth/${query}`)
  },
  block: (query) => {
    return client.get(`/admin/user/block/${query}`)
  },
  unBlock: (query) => {
    return client.get(`/admin/user/unblock/${query}`)
  },
  getDetail: (query) => {
    return client.get(`/admin/user/detail/${query}`)
  },
  delete: (query) => {
    return client.get(`/admin/user/delete/${query}`)
  },
  authentication: () => {
    return client.get(`/admin/user/authentication`)
  },

  add: (data) => {
    return client.post(`/admin/user/add`, data)
  },
  edit: (query, data) => {
    return client.post(`/admin/user/edit/${query}`, data)
  },
}

export default {
  router,
  ElMessage,
  api,
}
