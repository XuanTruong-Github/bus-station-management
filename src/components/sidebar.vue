<script setup>
import { ref } from "vue";
import UserPanel from "./userPanel.vue";
import menu from "../configs/menu";
const isOpen = ref(false);
function handleToogle() {
    isOpen.value = !isOpen.value;
}
</script>
<template>
    <el-aside class="max-w-[240px] flex flex-col">
        <el-menu
            class="w-[240px] min-w-[72px] flex-1 relative"
            mode="vertical"
            :collapse="isOpen"
            :default-active="$route.path"
            router
        >
            <div class="flex items-center pl-[0.85rem] h-14">
                <ElButton link @click="handleToogle">
                    <template #icon>
                        <i class="mdi mdi-menu text-2xl"></i>
                    </template>
                </ElButton>
                <span
                    class="whitespace-nowrap text-base ml-[26px] flex-1"
                    v-show="!isOpen"
                    >Quản lý thông tin
                </span>
            </div>
            <el-menu-item
                v-for="(item, index) in menu"
                :key="index"
                :index="item.path"
                :route="item.path"
                class="rounded-md"
            >
                <el-icon><i :class="item.icon"></i></el-icon>
                <template #title> {{ item.text }}</template>
            </el-menu-item>
            <UserPanel :state="isOpen" />
        </el-menu>
    </el-aside>
</template>

<style lang="scss" scoped>
.el-aside {
    overflow: unset !important;
    width: fit-content !important;
    ul.el-menu {
        padding-inline: 12px;
        .el-menu-item {
            height: 50px;
            line-height: 50px;
            padding-inline: 12px !important;
            .el-icon {
                margin-right: 24px;
                font-size: 24px;
            }
            :deep(.el-menu-tooltip__trigger) {
                font-size: 24px !important;
                padding-left: 12px !important;
            }
        }
        .el-menu-item.is-active {
            font-weight: 600;
            background-color: #f2f2f2;
        }
    }
}
</style>
