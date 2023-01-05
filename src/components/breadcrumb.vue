<script setup>
const props = defineProps({
  dataSource: {
    type: Array,
    default: [],
  },
});
</script>
<template>
  <el-breadcrumb separator-icon="arrowRight" v-if="dataSource.length">
    <template v-for="(item, index) in dataSource" :key="index">
      <el-breadcrumb-item v-if="item?.disabled"
        >{{ item.text }}
      </el-breadcrumb-item>
      <el-breadcrumb-item v-else :to="{ path: item?.path }"
        >{{ item.text }}
      </el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>
