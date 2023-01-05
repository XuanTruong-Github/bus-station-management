<script setup>
import Sidebar from "@/components/sidebar.vue";
</script>
<template>
  <el-container class="h-screen">
    <Sidebar />
    <el-main class="bg-gray-100 max-h-screen">
      <slot></slot>
    </el-main>
  </el-container>
</template>
