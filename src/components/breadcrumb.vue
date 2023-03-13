<script setup>
const props = defineProps({
  dataSource: {
    type: Array,
    default: [],
  },
});
</script>
<template>
  <ElBreadcrumb separator-icon="arrowRight" v-if="dataSource.length">
    <template v-for="(item, index) in dataSource" :key="index">
      <ElBreadcrumbItem v-if="item?.disabled"
        >{{ item.text }}
      </ElBreadcrumbItem>
      <ElBreadcrumbItem v-else :to="{ path: item?.path }"
        >{{ item.text }}
      </ElBreadcrumbItem>
    </template>
  </ElBreadcrumb>
  <ElDivider />
</template>
