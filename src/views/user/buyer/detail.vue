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
import { onBeforeMount, reactive, ref } from "vue";
import service from "@/api/user";
import formComponent from "./components/form.vue";

const formData = reactive({});

onBeforeMount(() => {
  getPageData();
});

//页面数据
const loading = ref(true);
const getPageData = () => {
  service.api
    .getDetail(service.router.currentRoute.value.query.id)
    .then((res) => {
      res.data.password = "";
      Object.assign(formData, res.data);
    })
    .catch((res) => {
      service.ElMessage.error(res.msg);
    })
    .finally(() => {
      loading.value = false;
    });
};

const submitForm = () => {
  loading.value = true;
  //请求
  service.api
    .edit(formData.id, formData)
    .then((res) => {
      service.ElMessage({
        message: res.msg,
        type: "success",
      });
      //初始数据
      getPageData();
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
