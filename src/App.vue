<template>
  <router-view v-if="isAlive" />
</template>

<script setup>
import { ref, nextTick, provide } from "vue";

//控制router-view的显示或隐藏，从而控制页面的再次加载
const isAlive = ref(true);
const reload = () => {
  isAlive.value = false;
  nextTick(() => {
    isAlive.value = true;
  });
};
provide("reload", reload);
</script>
