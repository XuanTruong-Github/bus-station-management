<script setup>
import Breadcrumb from "@/components/breadcrumb.vue";
const breadcrumbItems = [{ text: "Tổng quan", disabled: true }];
</script>
<template>
    <Breadcrumb :dataSource="breadcrumbItems" />
</template>

