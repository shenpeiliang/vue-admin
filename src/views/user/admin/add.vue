<template>
  <div>
    <h1>用户列表</h1>
    <el-table :data="pageData">
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
    </el-table>
  </div>
</template>
<script setup>
import { onMounted, reactive, ref } from "vue";

const pageData = ref([]);
const searchData = reactive({
  keyword: "",
});

//Dom挂在完成后
onMounted(() => {
  getPageData();
});

const getPageData = () => {
  // TODO: 调用后端API获取用户列表
  pageData.value = [
    { username: "张三", email: "zhangsan@example.com" },
    { username: "李四", email: "lisi@example.com" },
  ];
};
</script>
<style lang="scss" scoped></style>
