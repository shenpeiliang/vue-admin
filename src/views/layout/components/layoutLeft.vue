<template>
  <el-scrollbar>
    <el-menu
      class="el-menu-vertical-demo"
      background-color="#1f262d"
      text-color="#fff"
      :default-active="activeMenu"
      active-text-color="#fa6419"
      router
      :collapse="isCollapse"
      default-openeds="[1, 2]"
    >
      <template v-for="(item, index) in menus">
        <el-sub-menu v-if="item.child.length > 0" :index="index">
          <template #title>
            <el-icon>
              <component :is="item.icon"></component>
            </el-icon>
            <span>{{ item.title }}</span>
          </template>
          <el-menu-item v-for="child of item.child" :index="child.index">{{
            child.title
          }}</el-menu-item>
        </el-sub-menu>

        <el-menu-item v-else index="{{ item.index }}">
          <el-icon>
            <component :is="item.icon"></component>
          </el-icon>
          <span>{{ item.title }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </el-scrollbar>
</template>
<script setup>
import service from "@/api/user";
import { onMounted, ref, computed, reactive } from "vue";
import { useBarStore } from "@/stores/bar.js";

let props = defineProps({
  isCollapse: {
    type: Boolean,
  },
});

const barStore = useBarStore();
const activeMenu = computed(() => barStore.currentPath);

const menus = reactive([
  {
    index: "/",
    title: "首页",
    icon: "HomeFilled",
    child: [],
  },
  {
    index: "User",
    title: "用户管理",
    icon: "User",
    child: [
      {
        title: "管理员",
        index: "/user/admin/list",
      },
      {
        title: "普通用户",
        index: "/user/buyer/list",
      },
      {
        title: "商家用户",
        index: "/user/seller/list",
      },
    ],
  },

  {
    index: "Config",
    title: "配置管理",
    icon: "setting",
    child: [
      {
        title: "系统配置",
        index: "/config/system",
      },
      {
        title: "业务配置",
        index: "/config/business",
      },
    ],
  },
]);
</script>
<style lang="scss" scoped>
$color: #394555;
.left-menu-section {
  .el-scrollbar {
    background-color: var(--bg-header);
  }

  .el-menu {
    border-right: 1px solid var(--bg-header);
  }
}
.collapse-section {
  background-color: $color;
}
</style>
