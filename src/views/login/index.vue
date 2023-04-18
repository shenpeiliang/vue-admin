<template>
  <div class="flex-center login-wrapper">
    <el-form class="login-form" ref="login" :model="formData" :rules="rules">
      <h3 class="text-center login-title">后台管理系统</h3>
      <el-form-item class="form-item-section" prop="username">
        <el-input
          v-model.trim="formData.username"
          prefix-icon="user"
          placeholder="请输入用户名"
          size="large"
        ></el-input>
      </el-form-item>
      <el-form-item class="form-item-section" prop="password">
        <el-input
          v-model.trim="formData.password"
          prefix-icon="lock"
          placeholder="请输入密码"
          type="password"
          show-password
          size="large"
        ></el-input>
      </el-form-item>
      <el-form-item class="form-item-section" prop="code">
        <el-input
          v-model.trim="formData.code"
          placeholder="请输入验证码"
          maxlength="4"
          size="large"
        >
          <template #append>
            <img :src="captchaImgUrl" @click="refreshCode" class="login-code" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item class="form-item-section">
        <div class="flex-center form-btn">
          <el-button
            type="primary"
            :loading="loading"
            :disabled="loading"
            size="large"
            round
            @click="submitForm"
            >登录</el-button
          >
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import { userStore } from "@/stores/user.js";
import service from "@/api/login";
const rules = reactive({
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 3, max: 20, message: "请输入有效的用户名", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 5, max: 20, message: "请输入有效的密码", trigger: "blur" },
  ],
  code: [
    { required: true, message: "请输入验证码", trigger: "blur" },
    { len: 4, message: "请输入有效的验证码", trigger: "blur" },
  ],
});

//验证码
const captchaImgUrl = ref("");
const refreshCode = () => {
  // 刷新图形验证码
  const timestamp = Date.now();
  captchaImgUrl.value = `/api/admin/login/captcha?_t=${timestamp}`; // 后端 API 接口
};

onMounted(() => {
  refreshCode();
});

//请求数据
const formData = reactive({
  username: "",
  password: "",
  code: "",
});

const loading = ref(false);

const login = ref();
const submitForm = () => {
  login.value.validate((valid) => {
    if (!valid) {
      return false;
    }

    loading.value = true;

    //请求
    service.login
      .check(formData)
      .then((res) => {
        //缓存
        const user = userStore();
        user.login(res.data.token);

        service.router.push("/user/buyer/list");
      })
      .catch((res) => {
        service.ElMessage.error(res.msg);
        formData.code = "";
        refreshCode();
      })
      .finally(() => {
        loading.value = false;
      });
  });
};
</script>
<style scoped lang="scss">
@import "./index.scss";
</style>
