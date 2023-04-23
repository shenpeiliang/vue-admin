<template>
  <el-card>
    <formComponent
      @submit="submitForm()"
      @img="changeHeadimgurl"
      v-model:formData="formData"
    />
  </el-card>
</template>
<script setup>
import { reactive, ref, inject } from "vue";
import service from "@/api/user";
import formComponent from "./components/form.vue";

const formData = reactive({
  utype: 3,
  uname: "",
  password: "",
  nickname: "",
  mobile: "",
  email: "",
  authentication: "",
  headimgurl: "",
});

//重新加载页面
const reload = inject("reload");

const loading = ref(false);
const submitForm = () => {
  loading.value = true;
  //请求
  service.api
    .add(formData)
    .then((res) => {
      service.ElMessage({
        message: res.msg,
        type: "success",
      });

      reload();
    })
    .catch((res) => {
      service.ElMessage.error(res.msg);
    })
    .finally(() => {
      loading.value = false;
    });
};
//头像修改
const changeHeadimgurl = (val) => {
  formData.headimgurl = val;
};
</script>
<style lang="scss" scoped></style>
