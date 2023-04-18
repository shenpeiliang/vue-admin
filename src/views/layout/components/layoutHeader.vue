<template>
  <el-row class="flex-align-items-center" :align="middle">
    <el-col :span="4">
      <h2>后台管理系统</h2>
    </el-col>
    <el-col class="flex-justify-content-right" :offset="12" :span="8">
      <el-dropdown :hide-on-click="false">
        <span class="el-dropdown-link">
          管理员<el-icon class="el-icon--right"><arrow-down /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click.native="logout">退出系统</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-col>
  </el-row>
</template>
<script setup>
//路由
import router from '@/router/index'
import { useBarStore } from '@/stores/bar.js'

const logout = () => {
  // 清除缓存
  sessionStorage.clear()
  //清除浏览记录
  const barStore = useBarStore()
  barStore.clearHistory()

  router.push('/login')
}
</script>
<style lang="scss" scoped>
h2 {
  letter-spacing: 3px;
}

.el-dropdown {
  color: #fff;
  cursor: pointer;
  border: none;
  outline: none;
  :focus-visible {
    outline: none;
  }
}
</style>
