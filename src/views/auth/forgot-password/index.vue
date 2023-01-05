<script setup>
import Result from "./components/result.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import useAuthStore from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();

const forgotForm = ref(null);
const email = ref(null);
const isSent = ref(false);

async function sentEmail() {
    try {
        loading.start();
        const result = await authStore.forgotPassword(email.value);
        if (result.status) isSent.value = result.status;
        else message("error", result.message);
    } catch (error) {
        console.log("Error: ", error);
        message("error", "Gửi yêu cầu thất bại! Lỗi hệ thống.");
    } finally {
        loading.stop();
    }
}

function handleSubmit() {
    forgotForm.value.validate((valid) => {
        if (valid) {
            sentEmail();
        } else return false;
    });
}
function clearValidate(prop) {
    forgotForm.value.clearValidate(prop);
}
</script>
<template>
    <section
        class="
            grid
            place-items-center
            w-screen
            min-h-full
            py-12
            px-4
            sm:px-6
            lg:px-8
            bg-gray-100
        "
    >
        <article
            class="w-[450px] max-w-md bg-white rounded-xl p-9 shadow"
            v-if="!isSent"
        >
            <div class="flex flex-col items-center mb-6">
                <img
                    class="h-16 w-auto"
                    src="@/assets/img/logo.png"
                    alt="Your Company"
                />
                <span
                    class="
                        mt-6
                        text-3xl
                        font-bold
                        tracking-tight
                        text-gray-900
                        uppercase
                    "
                >
                    Bạn quên mật khẩu?
                </span>
                <p class="mt-2 text-center text-base text-gray-600">
                    Chúng tôi sẽ gửi một email hướng dẫn đặt lại mật khẩu đến
                    địa chỉ email mà bạn cung cấp.
                </p>
            </div>

            <el-form
                ref="forgotForm"
                :model="{ email }"
                label-position="top"
                status-icon
                size="large"
            >
                <el-form-item
                    label="Email"
                    prop="email"
                    :rules="[
                        {
                            required: true,
                            message: 'Email không được bỏ trống!',
                            trigger: 'blur',
                        },
                        {
                            type: 'email',
                            message: 'Email không hợp lệ!',
                            trigger: 'blur',
                        },
                    ]"
                    @blur="clearValidate('email')"
                >
                    <el-input
                        v-model="email"
                        placeholder="Nhập địa chỉ email"
                        :maxlength="200"
                        show-word-limit
                        style="height: 48px"
                    />
                </el-form-item>
                <div class="flex justify-between items-center mt-9">
                    <el-button
                        icon="Back"
                        circle
                        @click="$router.push({ name: 'login' })"
                    ></el-button>
                    <el-button type="primary" @click="handleSubmit"
                        >Tiếp theo</el-button
                    >
                </div>
            </el-form>
        </article>
        <Result v-else />
    </section>
</template>

<style scoped>
.el-form-item__label {
    margin-bottom: 4px !important;
}
</style>
