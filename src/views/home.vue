<template>
  <p>{{ message }}</p>
</template>
<script setup>
import { onMounted, ref } from "vue";

const message = ref("");

onMounted(() => {
  message.value = "404 not found";
});
</script>

<style lang="scss" scoped></style>
