<template>
  <el-card>
    <el-form ref="form" :model="formData" :rules="rules">
      <el-form-item label="姓名" prop="username">
        <el-col :span="8">
          <el-input v-model="formData.username" placeholder="用户名"> </el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-col :span="8">
          <el-input v-model="formData.email" placeholder="邮箱"> </el-input>
        </el-col>
      </el-form-item>
      <el-form-item class="form-item-section">
        <div class="flex-center form-btn">
          <el-button type="primary" @click="submitForm">确定</el-button>
        </div>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script setup>
import { onBeforeMount, reactive, ref } from "vue";
import service from "@/api/login";

const formData = reactive({});
const loading = ref(false);

onBeforeMount(() => {
  let id = service.router.currentRoute.value.query.id;
  console.log(service.router.currentRoute.value);

  Object.assign(formData, {
    id: 1,
    username: "张三",
    email: "zhangsan@example.com",
  });
});

const rules = reactive({
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 3, max: 20, message: "请输入有效的用户名", trigger: "blur" },
  ],
  email: [
    { required: true, message: "请输入邮箱", trigger: "blur" },
    { type: "email", message: "请输入有效的邮箱", trigger: "blur" },
  ],
});
const form = ref();
const submitForm = () => {
  form.value.validate((valid) => {
    if (!valid) {
      return false;
    }

    loading.value = true;

    //请求
    service.login
      .check(formData)
      .then((res) => {
        console.log("通过" + res);

        service.router.push("/user/list");
      })
      .catch((res) => {
        console.log("错误" + res);
      })
      .finally(() => {
        loading.value = false;
        console.log("结束");
      });
  });
};
</script>
<style lang="scss" scoped></style>
