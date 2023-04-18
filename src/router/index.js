import { createRouter, createWebHashHistory } from 'vue-router'
import { useBarStore } from '@/stores/bar.js'
import { userStore } from '@/stores/user.js'

import user from './user.js'
import common from './common.js'

const routes = [
  ...user,
  ...common,
]

const router = createRouter({
  //history 模式
  history: createWebHashHistory(),
  routes,
})

//前置钩子
router.beforeEach(async (to, from, next) => {
  if (to.meta.title) {
    document.title = '后台管理系统 - ' + to.meta.title
  }

  //记录访问历史
  const barStore = useBarStore()
  const user = userStore()
  let token = user.getToken
  if (['/404', '/login'].indexOf(to.path) === -1) {
    if (!token) {
      return next("/login")
    }

    barStore.addToHistory(to)
  }

  return next()
})

//后置钩子
router.afterEach((to, from) => {
  //删除访问历史
  // const barStore = useBarStore()
  // barStore.removeFromHistory(from)
})

export default router
