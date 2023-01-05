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
        <div
            class="
                w-[450px]
                max-w-md
                space-y-8
                bg-white
                rounded-2xl
                p-10
                shadow
            "
        >
            <div class="flex flex-col items-center">
                <img
                    class="h-16 w-auto"
                    src="@/assets/img/logo.png"
                    alt="Your Company"
                />
                <span
                    class="mt-2 text-4xl font-medium tracking-tight uppercase"
                >
                    đổi mật khẩu
                </span>
                <p class="mt-2 text-center text-base text-gray-600">
                    Một mật khẩu an toàn sẽ giúp ích cho việc bảo mật tài khoản
                    của bạn
                </p>
            </div>

            <el-form
                ref="changePasswordForm"
                :model="model"
                label-position="top"
                status-icon
                size="large"
                :rules="rules"
            >
                <el-form-item label="Mật khẩu mới" prop="password">
                    <el-input
                        v-model="model.password"
                        type="password"
                        autocomplete="off"
                        placeholder="Nhập mật khẩu mới"
                        :show-password="true"
                        :maxlength="20"
                        @blur="clearValidate('password')"
                    />
                </el-form-item>
                <el-form-item
                    label="Xác nhận mật khẩu mới"
                    prop="confirmPassword"
                >
                    <el-input
                        v-model="model.confirmPassword"
                        type="password"
                        autocomplete="off"
                        placeholder="Xác nhận mật khẩu"
                        :show-password="true"
                        :maxlength="20"
                        @blur="clearValidate('confirmPassword')"
                    />
                </el-form-item>
                <div class="flex items-center justify-between mt-8">
                    <el-button
                        title="Trở lại trang chủ"
                        circle
                        icon="back"
                        @click="$router.push({ name: 'home' })"
                    >
                    </el-button>
                    <el-button type="primary" @click="handleSubmit"
                        >Lưu lại</el-button
                    >
                </div>
            </el-form>
        </div>
    </section>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import useAuthStore from "@/stores/auth";
const router = useRouter();
const authStore = useAuthStore();
const changePasswordForm = ref(null);
const model = reactive({
    password: null,
    confirmPassword: null,
});
const rules = reactive({
    password: [
        {
            required: true,
            message: "Mật khẩu không được bỏ trống!",
            trigger: "blur",
        },
    ],
    confirmPassword: [
        {
            required: true,
            message: "Mật khẩu xác nhận không được bỏ trống!",
            trigger: "blur",
        },
        {
            validator: (rule, value, callback) => {
                if (value != model.password) {
                    callback(new Error("Mật khẩu xác nhận không trùng khớp"));
                } else callback();
            },
            trigger: "blur",
        },
    ],
});
async function changePassword() {
    try {
        loading.start();
        const result = await authStore.changePassword(model.password);
        if (result.status) {
            message("success", result.message);
            router.push({ name: "home" });
        } else {
            message("error", result.message);
        }
    } catch (error) {
        console.log("error: ", error);
        message("Thay đổi mật khẩu thất bại! Lỗi hệ thống");
    } finally {
        loading.stop();
    }
}
function handleSubmit() {
    changePasswordForm.value.validate((valid) => {
        if (valid) changePassword();
        else return false;
    });
}
function clearValidate(prop) {
    changePasswordForm.value.clearValidate(prop);
}
</script>


<style scoped>
>>> .el-form-item__label {
    margin-bottom: 6px !important;
}
</style>
