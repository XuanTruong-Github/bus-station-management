<script setup>
import Sidebar from "@/components/sidebar.vue";
</script>
<template>
  <el-container class="h-screen">
    <Sidebar />
    <el-main class="max-h-screen bg-gray-100">
      <slot></slot>
    </el-main>
  </el-container>
</template>
