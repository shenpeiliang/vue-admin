<template>
  <el-form ref="form" :model="formData" :rules="rules" label-width="100px">
    <el-form-item label="头像">
      <el-col :span="8">
        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          :limit="1"
          accept=".jpg,.png"
          :on-exceed="handleExceed"
          :http-request="uploadFile"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          ref="simpleUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-col>
    </el-form-item>
    <el-form-item label="用户名" prop="uname">
      <el-col :span="8">
        <el-input
          show-word-limit
          maxlength="30"
          v-model.trim="formData.uname"
          placeholder="用户名"
        >
        </el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="密码">
      <el-col :span="8">
        <el-input
          v-model.trim="formData.password"
          type="password"
          maxlength="30"
          show-password
          placeholder="密码"
        >
        </el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="昵称" prop="nickname">
      <el-col :span="8">
        <el-input
          show-word-limit
          maxlength="30"
          v-model.trim="formData.nickname"
          placeholder="昵称"
        >
        </el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="手机号" prop="mobile">
      <el-col :span="8">
        <el-input v-model.trim="formData.mobile" placeholder="手机号"> </el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-col :span="8">
        <el-input v-model.trim="formData.email" placeholder="邮箱"> </el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="认证标签" prop="authentication">
      <el-radio-group v-model.trim="formData.authentication">
        <el-radio
          v-for="(item, index) in options"
          :label="item.title"
          size="large"
          border
          >{{ item.title }}</el-radio
        >
      </el-radio-group>
    </el-form-item>
    <el-form-item class="form-item-section">
      <el-col :span="8">
        <div class="flex-center form-btn">
          <el-button type="primary" size="large" @click="submitForm">确定</el-button>
        </div>
      </el-col>
    </el-form-item>
  </el-form>
</template>
<script setup>
import { onMounted, watch, defineEmits, reactive, ref } from "vue";
import service from "@/api/user";
import client from "@/utils/http/client.js";
import tool from "@/utils/tool/function.js";

const emit = defineEmits(["submit", "img"]);

//上传限制
const beforeAvatarUpload = (rawFile) => {
  if (!tool.array.in(rawFile.type, ["image/jpeg", "image/png"])) {
    service.ElMessage.error("您上传的文件格式不正确");
    return false;
  }

  if (rawFile.size / 1024 / 1024 > 2) {
    service.ElMessage.error("图片大小不能超过2MB!");
    return false;
  }

  return true;
};

//超出数量时处理
const handleExceed = (files, uploadFiles) => {
  uploadFiles.splice(0, 1, files[0]);
  uploadFile(files[0]);
};

//上传事件处理
const uploadFile = (params) => {
  const file = params.file || params;
  var form = new FormData();
  form.append("_file", file);
  form.append("img_type", "avatar");
  client.upload("/admin/upload/img", form).then((res) => {
    emit("img", res.data.path);
  });
};

const options = reactive([]);
const loading = ref(true);
const props = defineProps({
  formData: {
    type: Object,
    default: {},
  },
});

//图片上传
const imageUrl = ref("");

watch(
  () => props.formData.headimgurl,
  (newValue, oldValue) => {
    imageUrl.value = tool.path.join(import.meta.env.VITE_SERVER_URL, newValue);
  }
);

const rules = reactive({
  uname: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 3, max: 20, message: "请输入有效的用户名", trigger: "blur" },
  ],
});
const form = ref();

const submitForm = () => {
  form.value.validate((valid) => {
    if (!valid) {
      return false;
    }
    emit("submit");
  });
};

const getOptionsData = () => {
  service.api
    .authentication()
    .then((res) => {
      Object.assign(options, res.data);
    })
    .catch((res) => {
      service.ElMessage.error(res.msg);
    })
    .finally(() => {
      loading.value = false;
    });
};

onMounted(async () => {
  getOptionsData();
});
</script>
<style lang="scss" scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
