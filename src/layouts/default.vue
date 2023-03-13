<script setup>
import Sidebar from "@/components/sidebar.vue";
</script>
<template>
    <ElContainer class="h-screen">
        <Sidebar />
        <ElMain class="bg-gray-100">
            <slot></slot>
        </ElMain>
    </ElContainer>
</template>
