//路由
import router from '@/router/index'

//http客户端
import client from '../utils/http/client.js'

const api = {
  getBuyer: (data) => {
    return [
      { id: 1, username: '张三', email: 'zhangsan@example.com' },
      { id: 2, username: '李四', email: 'lisi@example.com' },
      { id: 3, username: '张三', email: 'zhangsan@example.com' },
      { id: 1, username: '张三', email: 'zhangsan@example.com' },
      { id: 2, username: '李四', email: 'lisi@example.com' },
      { id: 3, username: '张三', email: 'zhangsan@example.com' },
    ]
    //return client.post("/user/buyer", data)
  },
}

export default {
  router,
  api,
}
