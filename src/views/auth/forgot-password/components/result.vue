<template>
    <article class="w-[580px] bg-white rounded-xl shadow">
        <el-result
            class="w-full h-full"
            icon="success"
            title="Yêu cầu đặt lại mật khẩu đã được gửi đi"
            sub-title="Chúng tôi đã gửi hưỡng dẫn đặt lại mật khẩu qua địa chỉ email mà
                  bạn đã cung cấp, vui lòng kiểm tra hòm thư của bạn."
        >
            <template #extra>
                <ElButton
                    type="primary"
                    @click="$router.push({ name: 'login' })"
                    >Đăng nhập</ElButton
                >
            </template>
        </el-result>
    </article>
</template>
