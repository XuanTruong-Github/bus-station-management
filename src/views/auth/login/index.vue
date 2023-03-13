<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import useAuthStore from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();

const loginForm = ref(null);
const rules = reactive({
  email: [
    {
      required: true,
      message: "Email không được bỏ trống!",
      trigger: "blur",
    },
    {
      type: "email",
      message: "Email không hợp lệ!",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "Mật khẩu không được bỏ trống!",
      trigger: "blur",
    },
  ],
});
const model = reactive({
  email: null,
  password: null,
});

async function hanldeLogin() {
  try {
    loading.start();
    const result = await authStore.login(model);
    if (result.status) {
      router.push({ name: "home" });
    } else {
      message("error", result.message);
    }
  } catch (error) {
    console.log("Error: ", error);
  } finally {
    loading.stop();
  }
}
function submitForm() {
  loginForm.value.validate((valid) => (valid ? hanldeLogin() : false));
}
function clearValidate(prop) {
  loginForm.value.clearValidate(prop);
}
</script>
<template>
  <section
    class="grid w-screen min-h-full px-4 py-12 bg-gray-200 place-items-center sm:px-6 lg:px-8"
  >
    <div class="w-[460px] space-y-8 bg-white rounded-xl p-10 shadow">
      <div class="flex flex-col items-center">
        <img
          class="w-auto h-16"
          src="@/assets/img/logo.png"
          alt="Your Company"
        />
        <span
          class="mt-6 text-3xl font-bold tracking-tight text-gray-900 uppercase"
        >
          Bến xe phía bắc lạng sơn
        </span>

        <p class="mt-2 text-base text-gray-600">
          Xin chào, vui lòng nhập thông tin đăng nhập
        </p>
      </div>

      <el-form
        ref="loginForm"
        :model="model"
        label-position="top"
        status-icon
        size="large"
        :rules="rules"
      >
        <el-form-item label="Email" prop="email">
          <el-input
            v-model="model.email"
            placeholder="Nhập địa chỉ email"
            :maxlength="200"
            show-word-limit
            class="h-12"
            @blur="clearValidate('email')"
          />
        </el-form-item>

        <div class="relative">
          <router-link
            to="/forgot-password"
            class="absolute top-0 right-0 z-10 text-sm font-medium hover:underline"
            >Quên mật khẩu?</router-link
          >

          <el-form-item label="Mật khẩu" prop="password" class="relative">
            <el-input
              v-model="model.password"
              type="password"
              autocomplete="off"
              placeholder="Nhập mật khẩu"
              :show-password="true"
              :maxlength="20"
              class="h-12"
              @blur="clearValidate('password')"
            />
          </el-form-item>
        </div>

        <el-button
          type="primary"
          class="w-full mt-4"
          style="height: 48px"
          @click="submitForm"
          >Đăng nhập</el-button
        >
      </el-form>
    </div>
  </section>
</template>
