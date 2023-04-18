<template>
  <div class="flex-center main-section">
    <div class="text-center content-section">
      <h1>404</h1>
      <p class="msg">{{ message }}</p>
      <div class="flex-center form-btn">
        <el-button type="primary" @click="toBack()">返回上一页</el-button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";

import router from "@/router/index";

const message = ref("抱歉，您访问的页面不存在。");

const toBack = () => {
  router.go(-1);
};
</script>

<style lang="scss" scoped>
.main-section {
  width: 100%;
  height: 100%;

  background-color: var(--bg-main);
  .content-section {
    width: 300px;
  }
  .msg {
    color: #848486;
  }
}
</style>
