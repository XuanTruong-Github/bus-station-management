<template>
    <Breadcrumb :dataSource="breadcrumbItems" />
    <el-form
        ref="userInfoForm"
        :rules="rules"
        :model="model"
        class="w-[500px] bg-white mx-auto mt-12 p-6 rounded-lg bd"
        label-position="left"
        label-width="40%"
        size="large"
        scroll-to-error
        status-icon
    >
        <h5 class="mb-1 font-medium text-lg">Thông tin chung</h5>
        <p class="text-gray-600">Một số thông tin về tài khoản của bạn</p>
        <hr class="my-6" />
        <el-form-item label="Họ tên" prop="hoTen">
            <ElInput
                v-model="model.hoTen"
                :maxlength="200"
                show-word-limit
                @blur="clearValidate('hoTen')"
            />
        </el-form-item>
        <hr class="my-6" />
        <el-form-item label="Email" prop="email">
            <ElInput v-model="model.email" readonly />
        </el-form-item>
        <hr class="my-6" />
        <el-form-item label="Số điện thoại" prop="soDienThoai">
            <ElInput
                v-model="model.soDienThoai"
                :maxlength="13"
                show-word-limit
                @blur="clearValidate('soDienThoai')"
            />
        </el-form-item>
        <hr class="my-6" />
        <el-form-item label="Chức vụ" prop="chucVu">
            <ElInput v-model="model.chucVu" readonly />
        </el-form-item>
        <hr class="my-6" />
        <div class="flex items-center justify-between">
            <router-link
                to="/change-password"
                class="el-link el-link--primary is-underline"
                >Đặt lại mật khẩu</router-link
            >
            <ElButton type="primary" size="large" @click="onSubmit"
                >Lưu lại</ElButton
            >
        </div>
    </el-form>
</template>

<script setup>
import Breadcrumb from "@/components/breadcrumb.vue";
import { ref, reactive } from "vue";
import useAuthStore from "@/stores/auth";
import useUserStore from "@/stores/user";

const breadcrumbItems = reactive([
    {
        text: "Thông tin tài khoản",
        disabled: true,
    },
]);
const userInfoForm = ref(null);
const rules = reactive({
    hoTen: [
        {
            required: true,
            message: "Họ tên không được bỏ trống!",
            trigger: "blur",
        },
    ],
    soDienThoai: [
        {
            min: 10,
            max: 13,
            message: "Số điện thoại không hợp lệ",
            trigger: "blur",
        },
    ],
});
const model = reactive({
    id: null,
    hoTen: null,
    email: null,
    soDienThoai: null,
    chucVu: null,
});
const authStore = useAuthStore();
const userStore = useUserStore();

function clearValidate(prop) {
    userInfoForm.value.clearValidate(prop);
}

async function getUserInfo() {
    try {
        loading.start();
        const { id } = authStore.session.user;
        const result = await userStore.getUserInfo(id);
        if (result.status) {
            model.id = result.data.id;
            model.hoTen = result.data.hoTen;
            model.email = result.data.email;
            model.soDienThoai = result.data.soDienThoai;
            model.chucVu = result.data.chucVu.tenChucVu;
        } else {
            message("error", result.message);
        }
    } catch (error) {
        console.log(error);
        message("error", "Lấy thông tin tài khoản thất bại! Lỗi hệ thống");
    } finally {
        loading.stop();
    }
}

async function updateUserInfo() {
    try {
        loading.start();
        const result = await userStore.updateUserInfo(model);
        if (result.status) message("success", result.message);
        else message("error", result.message);
    } catch (error) {
        message("error", "Cập nhật thông tin tài khoản thất bại! Lỗi hệ thống");
    } finally {
        loading.stop();
    }
}
function onSubmit() {
    userInfoForm.value.validate((valid) => {
        if (valid) {
            updateUserInfo();
        } else return false;
    });
}
getUserInfo();
</script>

