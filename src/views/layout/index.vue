<template>
  <el-container class="main-section">
    <el-header>
      <layoutHeader />
    </el-header>
    <el-container class="aside-main-section">
      <el-aside class="left-menu-section" width="auto">
        <layoutLeft v-model:isCollapse="isCollapse" />
      </el-aside>
      <el-container>
        <div class="flex-column">
          <div class="history-tabs">
            <div class="flex-align-items-center collapse-btn">
              <el-icon class="collapse-btn" :size="20" :color="'#909399'">
                <Expand v-if="isCollapse" @click="isCollapse = !isCollapse" />
                <Fold v-if="!isCollapse" @click="isCollapse = !isCollapse" />
              </el-icon>
              <el-scrollbar>
                <el-tag
                  v-for="(item, index) in history"
                  :key="item.meta.title"
                  :type="route.path == item.path ? '' : 'info'"
                  @close="closeBar(index)"
                  @click="openBar(index)"
                  closable
                >
                  {{ item.meta.title }}
                </el-tag>
              </el-scrollbar>
            </div>
          </div>
          <el-main>
            <router-view v-slot="{ Component }">
              <transition name="fade-transform" mode="out-in">
                <component :is="Component" />
              </transition>
            </router-view>
          </el-main>
        </div>
      </el-container>
    </el-container>
  </el-container>
</template>
<script setup>
import layoutHeader from "./components/layoutHeader.vue";
import layoutLeft from "./components/layoutLeft.vue";
//import layoutFooter from './components/layoutFooter.vue'
import { useBarStore } from "@/stores/bar.js";

import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
const isCollapse = ref(false);
const barStore = useBarStore();
const history = computed(() => barStore.history);

const route = useRoute();
const router = useRouter();

//移除bar
const closeBar = (index) => {
  barStore.removeFromHistoryByIndex(router, index);
};

const openBar = (index) => {
  barStore.openRouteByIndex(index);
};
</script>
<style lang="scss">
@import "./index.scss";
</style>
