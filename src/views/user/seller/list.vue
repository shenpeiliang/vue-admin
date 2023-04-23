<template>
  <el-card>
    <el-form ref="form" :model="searchData">
      <el-form-item prop="keyword">
        <el-input
          style="width: 500px"
          @clear="search"
          clearable
          v-model.trim="searchData.keyword"
          placeholder="请输入用户名"
          show-word-limit
          maxlength="20"
          class="input-with-select"
        >
        </el-input>

        <el-select
          v-model.number="searchData.state"
          class="m-2"
          clearable
          placeholder="状态"
        >
          <el-option
            v-for="item in userStates"
            :key="item.value"
            :label="item.title"
            :value="item.value"
          />
        </el-select>

        <el-button icon="Search" @click="search"> 搜索</el-button>
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
        <el-table-column prop="id" width="50" align="center" label="ID">
        </el-table-column>
        <el-table-column label="头像" width="80" align="center">
          <template #default="scope">
            <el-avatar :size="40" :src="scope.row.headimgurl"></el-avatar>
          </template>
        </el-table-column>
        <el-table-column prop="uname" align="center" label="用户名">
          <template #default="scope">
            <el-tooltip class="box-item" placement="top-start" effect="dark">
              <template #content>
                {{ scope.row.nickname }}
              </template>
              {{ scope.row.uname }}
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="mobile" align="center" label="手机号码">
          <template #default="scope">
            {{ scope.row.mobile || "-" }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="认证标签">
          <template #default="scope">
            {{ scope.row.authentication || "-" }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="注册时间">
          <template #default="scope">
            {{ scope.row.add_time }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="最近登录时间">
          <template #default="scope">
            {{ scope.row.last_login_time }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="state_txt"
          label="当前状态"
        ></el-table-column>

        <el-table-column align="center" label="操作" width="350">
          <template #default="scope">
            <el-button
              type="success"
              v-if="scope.row.state == 1"
              size="small"
              @click="toAuth(scope.$index)"
              >审核</el-button
            >
            <el-button
              type="warning"
              v-if="scope.row.state == 2"
              size="small"
              @click="toBlock(scope.$index)"
              >屏蔽</el-button
            >
            <el-button
              type="warning"
              v-if="scope.row.state == 3"
              size="small"
              @click="toUnBlock(scope.$index)"
              >解除屏蔽</el-button
            >
            <el-button type="danger" size="small" @click="toDelete(scope.$index)"
              >删除</el-button
            >
            <el-button size="small" @click="toDetail(scope.$index)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <loadMoreBtn @click="loadMore()" v-if="showLoadMoreBtn"></loadMoreBtn>
    </div>
  </el-card>
</template>
<script setup>
import { ElMessage, ElMessageBox } from "element-plus";
import { onMounted, reactive, ref } from "vue";
import service from "@/api/user";
import loadMoreBtn from "@/components/loadMoreBtn.vue";
import filter from "@/filters/common.js";

const pageData = ref([]);
const userStates = filter.getUserStates();
const loading = ref(true);
const showLoadMoreBtn = ref(false);
const searchData = reactive({
  keyword: "",
  state: 0,
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
  service.router.push({ path: "/user/seller/detail", query: { id: id } });
};

//创建
const toCreate = () => {
  service.router.push("/user/seller/add");
};

//删除
const toDelete = (idx) => {
  ElMessageBox.confirm("确定要删除该记录吗?", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      service.api
        .delete(pageData.value[idx].id)
        .then((res) => {
          pageData.value.splice(idx, 1);
        })
        .catch((res) => {
          service.ElMessage.error(res.msg);
        })
        .finally(() => {
          loading.value = false;
        });
    })
    .catch(() => {});
};

const toAuth = (idx) => {
  ElMessageBox.confirm("确定要审核该记录吗?", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      service.api
        .auth(pageData.value[idx].id)
        .then((res) => {
          pageData.value[idx].state = 2;
        })
        .catch((res) => {
          service.ElMessage.error(res.msg);
        })
        .finally(() => {
          loading.value = false;
        });
    })
    .catch(() => {});
};

const toBlock = (idx) => {
  ElMessageBox.confirm("确定要屏蔽该记录吗?", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      service.api
        .block(pageData.value[idx].id)
        .then((res) => {
          pageData.value[idx].state = 3;
        })
        .catch((res) => {
          service.ElMessage.error(res.msg);
        })
        .finally(() => {
          loading.value = false;
        });
    })
    .catch(() => {});
};

const toUnBlock = (idx) => {
  ElMessageBox.confirm("确定要解除屏蔽该记录吗?", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      service.api
        .unBlock(pageData.value[idx].id)
        .then((res) => {
          pageData.value[idx].state = 2;
        })
        .catch((res) => {
          service.ElMessage.error(res.msg);
        })
        .finally(() => {
          loading.value = false;
        });
    })
    .catch(() => {});
};

const getPageData = () => {
  // TODO: 调用后端API获取用户列表
  service.api
    .getSeller(searchData)
    .then((res) => {
      res.data.rows.forEach((item, index) => {
        res.data.rows[index].last_login_time = filter.dateFormat(item.last_login_time);
        res.data.rows[index].add_time = filter.dateFormat(item.add_time);
        res.data.rows[index].state_txt = filter.userStateFormat(item.state);
      });

      if (res.data.rows.length == 10) {
        showLoadMoreBtn.value = true;
      }

      if (searchData.cursor != "") {
        pageData.value.push(...res.data.rows);
      } else {
        pageData.value = res.data.rows;
      }

      searchData.cursor = res.data.cursor;
    })
    .catch((res) => {
      service.ElMessage.error(res.msg);
    })
    .finally(() => {
      loading.value = false;
    });
};

const loadMore = () => {
  getPageData();
};
</script>
<style lang="scss" scoped></style>
