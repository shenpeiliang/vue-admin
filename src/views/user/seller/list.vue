<template>
  <el-card>
    <el-input
      style="width: 500px"
      @clear="search"
      clearable
      v-model="searchData.keyword"
      placeholder="请输入用户姓名"
      show-word-limit
      maxlength="30"
      class="input-with-select"
    >
      <template #append>
        <el-button icon="Search" @click="search" />
      </template>
    </el-input>

    <div class="table-section">
      <el-table :data="pageData" v-loading="loading" height="500" :table-layout="auto">
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="danger" size="small" @click="toDelete(scope.$index)"
              >删除</el-button
            >
            <el-button size="small" @click="toDetail(scope.$index)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-card>
</template>
<script setup>
import { ElMessage, ElMessageBox } from "element-plus";
import { onMounted, reactive, ref } from "vue";
import service from "@/api/user";

const pageData = ref([]);
const loading = ref(true);
const searchData = reactive({
  keyword: "",
  cursor: "",
});

//Dom挂在完成后
onMounted(() => {
  getPageData();
  loading.value = false;
});

//搜索
const search = () => {
  searchData.cursor = "";
  getPageData();
};

// 跳转详情页
const toDetail = (idx) => {
  let id = pageData.value[idx].id;
  service.router.push({ path: "/user/detail", query: { id: id } });
};

//删除
const toDelete = (idx) => {
  ElMessageBox.confirm("确定要删除该记录吗?", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      let id = pageData.value[idx].id;

      pageData.value.splice(idx, 1);
      /* const res = await userApi.delUser({ id: id });
      if (res.data.success) {
        ElMessage.success("删除成功");
        getUserList();
      } else {
        ElMessage.error("删除失败");
      } */
    })
    .catch(() => {});
};

const getPageData = () => {
  // TODO: 调用后端API获取用户列表
  pageData.value = service.api.getBuyer();
};
</script>
<style lang="scss" scoped></style>
