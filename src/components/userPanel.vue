<template>
  <section
    class="flex items-center h-16 border-t-[1px] absolute bottom-0 left-3 right-3 pl-2 bd-t"
  >
    <el-icon class="bg-[#409eff] rounded-full p-1" color="white" :size="32"
      ><User
    /></el-icon>
    <div class="flex flex-col flex-1 ml-5 relative" v-if="!state">
      <span class="whitespace-nowrap font-medium text-sm"
        >{{ userStore.userInfo?.hoTen || "User" }}
      </span>
      <span class="whitespace-nowrap text-xs">{{
        userStore.userInfo?.chucVu.tenChucVu || "Role"
      }}</span>
      <div class="absolute right-0 top-1/2 translate-y-[-50%]">
        <el-dropdown trigger="click">
          <el-icon class="el-dropdown-link" size="20">
            <i class="mdi mdi-unfold-more-horizontal"></i>
          </el-icon>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="$router.push({ name: 'user-info' })"
                >Thông tin tài khoản</el-dropdown-item
              >
              <el-dropdown-item @click="handleLogout"
                >Đăng xuất</el-dropdown-item
              >
            </el-dropdown-menu>
          </template></el-dropdown
        >
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from "vue-router";
import useUserStore from "../stores/user";
import useAuthStore from "../stores/auth";
defineProps({
  state: {
    type: Boolean,
    default: true,
  },
});
const router = useRouter();
const authStore = useAuthStore();
const userStore = useUserStore();

const handleLogout = async () => {
  try {
    loading.start();
    const result = await authStore.logOut();
    if (result.status) {
      router.push({ name: "login" });
    } else message("error", result.message);
  } catch (error) {
    console.log(error);
    message("error", "Đã xảy ra lỗi!");
  } finally {
    loading.stop();
  }
};
</script>
