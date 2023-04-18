<template>
  <el-card>
    <el-form ref="form" :model="searchData" :rules="rules">
      <el-form-item prop="keyword">
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

        <el-button
          class="search-section-btn"
          type="primary"
          size="medium"
          @click="toCreate()"
          >添加用户</el-button
        >
      </el-form-item>
    </el-form>

    <div class="table-section">
      <el-table :data="pageData" v-loading="loading" stripe :table-layout="auto">
        <el-table-column label="序号">
          <template #default="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
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
      <loadMoreBtn @click="loadMore()"></loadMoreBtn>
    </div>
  </el-card>
</template>
<script setup>
import { ElMessage, ElMessageBox } from "element-plus";
import { onMounted, reactive, ref } from "vue";
import service from "@/api/user";
import loadMoreBtn from "@/components/loadMoreBtn.vue";

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
  service.router.push({ path: "/user/buyer/detail", query: { id: id } });
};

//创建
const toCreate = () => {
  service.router.push("/user/buyer/add");
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
    })
    .catch(() => {});
};

const getPageData = () => {
  // TODO: 调用后端API获取用户列表
  pageData.value = service.api.getBuyer();
};

const loadMore = () => {
  pageData.value.push(...service.api.getBuyer());
};
</script>
<style lang="scss" scoped></style>
