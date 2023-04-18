//路由
import router from "@/router/index"

//http客户端
import client from '../utils/http/client.js';

import { ElMessage } from 'element-plus'

const login = {
    //登录
    check: (data) => {
        return client.post("/admin/login/check", data)
    },
}

export default {
    router, login, ElMessage
}