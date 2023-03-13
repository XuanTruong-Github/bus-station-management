<script>
import Breadcrumb from "@/components/breadcrumb.vue";
import useBenXeStore from "@/stores/benXe";
import supabase from "@/plugins/supabase";
import useTinhThanh from "@/composables/useTinhThanh";
import useQuanHuyen from "@/composables/useQuanHuyen";
import useLoaiBenXe from "@/composables/useLoaiBenXe";
export default {
    components: {
        Breadcrumb,
    },
    setup() {
        const benDenStore = useBenXeStore();
        const { danhSachTinhThanh, getDanhSachTinhThanh } = useTinhThanh();
        const { danhSachQuanHuyen, getDanhSachQuanHuyen } = useQuanHuyen();
        const { danhSachLoaiBenXe, getDanhSachLoaiBenXe } = useLoaiBenXe();
        getDanhSachTinhThanh();
        getDanhSachLoaiBenXe();
        return {
            benDenStore,
            danhSachTinhThanh,
            danhSachQuanHuyen,
            getDanhSachQuanHuyen,
            danhSachLoaiBenXe,
        };
    },
    data() {
        return {
            breadcrumbItems: [
                {
                    text: "Quản lý bến đến",
                    path: "/quan-ly-thong-tin/ben-den",
                    disabled: false,
                },
                {
                    text: "Tạo bến đến",
                    disabled: true,
                },
            ],
            form: {
                loading: false,
                fields: {
                    id: null,
                    maBenXe: null,
                    tenBenXe: null,
                    idLoaiBenXe: null,
                    email: null,
                    soDienThoai: null,
                    idTinh: null,
                    idHuyen: null,
                    diaChi: null,
                },
                rules: {
                    maBenXe: [
                        {
                            required: true,
                            message: "Mã bến xe không được bỏ trống!",
                            trigger: "blur",
                        },
                    ],
                    tenBenXe: [
                        {
                            required: true,
                            message: "Tên bến xe không được bỏ trống!",
                            trigger: "blur",
                        },
                        {
                            max: 200,
                            message: "Tên bến xe không được vượt quá 200 ký tự",
                            trigger: "blur",
                        },
                    ],
                    idLoaiBenXe: [
                        {
                            required: true,
                            message: "Loại bến xe không được bỏ trống!",
                            trigger: "blur",
                        },
                    ],
                    email: [
                        {
                            type: "email",
                            message: "Email không hợp lệ",
                            trigger: "blur",
                        },
                        {
                            max: 200,
                            message: "Email không được vượt qúa 200 ký tự!",
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
                    idTinh: [
                        {
                            required: true,
                            message: "Tỉnh thành không được bỏ trống!",
                            trigger: "blur",
                        },
                    ],
                    idHuyen: [
                        {
                            required: true,
                            message: "Quận huyện không được bỏ trống!",
                            trigger: "blur",
                        },
                    ],
                    diaChi: [
                        {
                            max: 500,
                            message: "Địa chỉ không được vượt qúa 500 ký tự!",
                            trigger: "blur",
                        },
                    ],
                },
            },
            showDialogDelete: false,
            chucNang: "tao-ben-den",
            trangThai: true,
        };
    },
    methods: {
        handleChonTinhThanh(id) {
            this.form.fields.idHuyen = null;
            this.getDanhSachQuanHuyen(id);
        },

        xacDinhChucNang() {
            if (this.$route.name == "sua-ben-den") {
                this.chucNang = "sua-ben-den";
                if (this.$route?.query?.id) {
                    this.breadcrumbItems[1].text = "Sửa thông tin bến đến";
                    this.getChiTietBenDen(this.$route.query.id);
                } else this.$message("error", "Vui lòng truyền ID bến xe!");
            }
        },
        clearValidate(prop) {
            this.$refs.formRef.clearValidate(prop);
        },
        onSubmit() {
            this.$refs.formRef.validate((valid) => {
                if (valid) {
                    if (this.chucNang == "tao-ben-den") this.themBenDen();
                    else if (this.chucNang == "sua-ben-den") this.suaBenDen();
                } else return;
            });
        },
        async getChiTietBenDen(id) {
            loading.start();
            const { data, error } = await supabase
                .from("benXe")
                .select()
                .eq("id", id)
                .limit(1)
                .single();
            if (error) {
                console.log(
                    "🚀 ~ file: index.vue:332 ~ getChiTietBenDen ~ error:",
                    error
                );
                message("error", "Lấy chi tiết bến đến thất bại! Lỗi hệ thống");
            } else {
                this.form.fields = data;
                this.trangThai = data.trangThai == "Đang hoạt động";
                await this.getDanhSachQuanHuyen(data.idTinh);
            }
            loading.stop();
        },
        async themBenDen() {
            this.form.loading = true;
            let benDen = { ...this.form.fields };
            delete benDen.id;
            const { error } = await supabase.from("benXe").insert([benDen]);
            if (error) {
                console.log(
                    "🚀 ~ file: index.vue:182 ~ themBenDen ~ error:",
                    error
                );
                message(
                    "error",
                    "Thêm bến đến thất bại! Mã bến xe đã tồn tại trong hệ thống."
                );
            } else {
                message("success", "Thêm bến đến thành công");
                this.$router.push({ name: "quan-ly-ben-den" });
            }
            this.form.loading = false;
        },
        async suaBenDen() {
            try {
                loading.start();
                const result = await this.benDenStore.Update(this.benDen);
                if (result.status) {
                    message("success", result.message);
                    this.$router.push({ name: "quan-ly-ben-den" });
                } else message("error", result.message);
            } catch (error) {
                console.log(error);
                message(
                    "error",
                    "Thay đổi thông tin bến đến thất bại, lỗi hệ thống! "
                );
            } finally {
                loading.stop();
            }
        },
        async handleXoaBenXe() {
            try {
                loading.start();
                const result = await this.benDenStore.DeleteByID(
                    this.form.fields.id
                );
                if (result.status) {
                    this.showDialogDelete = false;
                    message("success", result.message);
                    this.$router.push({ name: "quan-ly-ben-den" });
                } else message("error", result.message);
            } catch (error) {
                message("error", "Xóa bến đến thất bại! Lỗi hệ thống");
            } finally {
                loading.stop();
            }
        },
    },
    created() {
        this.xacDinhChucNang();
    },
};
</script>

<template>
    <Breadcrumb :dataSource="breadcrumbItems" />
    <ElForm
        :model="form.fields"
        ref="formRef"
        class="w-[580px] bg-white mx-auto p-6 rounded-lg bd mt-6"
        label-position="top"
        size="large"
        scroll-to-error
        status-icon
        :rules="form.rules"
    >
        <span class="mb-1 text-base font-medium">Thông tin chung</span>
        <ElDivider />
        <ElRow :gutter="16">
            <ElCol :span="12">
                <ElFormItem label="Mã bến xe" prop="maBenXe">
                    <ElInput
                        v-model="form.fields.maBenXe"
                        type="number"
                        :min="0"
                        :max="1000"
                        @blur="clearValidate('maBenXe')"
                    ></ElInput> </ElFormItem
            ></ElCol>
            <ElCol :span="12">
                <ElFormItem label="Loại bến xe" prop="idLoaiBenXe">
                    <ElSelect
                        v-model="form.fields.idLoaiBenXe"
                        placeholder="Chọn loại bến xe"
                        class="w-full"
                        no-data-text="Không có dữ liệu"
                        no-match-text="Không tìm thấy"
                        default-first-option
                        filterable
                        @blur="clearValidate('idLoaiBenXe')"
                    >
                        <ElOption
                            v-for="item in danhSachLoaiBenXe"
                            :label="item.loaiBen"
                            :value="item.id"
                            :key="item.id"
                        />
                    </ElSelect>
                </ElFormItem>
            </ElCol>
        </ElRow>

        <ElFormItem label="Tên bến xe" prop="tenBenXe">
            <ElInput
                v-model="form.fields.tenBenXe"
                :maxlength="200"
                show-word-limit
                @blur="clearValidate('tenBenXe')"
            ></ElInput>
        </ElFormItem>
        <ElFormItem label="Email" prop="email">
            <ElInput
                v-model="form.fields.email"
                :maxlength="200"
                show-word-limit
            ></ElInput>
        </ElFormItem>
        <ElFormItem label="Số điện thoại" prop="soDienThoai">
            <ElInput
                v-model="form.fields.soDienThoai"
                :maxlength="13"
                show-word-limit
            ></ElInput>
        </ElFormItem>
        <span class="mt-6 mb-1 text-base font-medium">
            Thông tin địa chỉ bến xe
        </span>
        <hr class="mt-4 mb-6" />
        <ElRow :gutter="16">
            <ElCol :span="12">
                <ElFormItem label="Tỉnh/Thành phố" prop="idTinh">
                    <ElSelect
                        v-model="form.fields.idTinh"
                        placeholder="Chọn tỉnh/thành phố"
                        class="w-full"
                        no-data-text="Không có dữ liệu"
                        no-match-text="Không tìm thấy"
                        default-first-option
                        filterable
                        :onChange="handleChonTinhThanh"
                        @blur="clearValidate('idTinh')"
                    >
                        <ElOption
                            v-for="item in danhSachTinhThanh"
                            :label="item.tenTinh"
                            :value="item.id"
                            :key="item.id"
                        />
                    </ElSelect>
                </ElFormItem>
            </ElCol>
            <ElCol :span="12">
                <ElFormItem label="Quận/Huyện/Thị xã" prop="idHuyen">
                    <ElSelect
                        v-model="form.fields.idHuyen"
                        placeholder="Chọn quận huyện thị xã"
                        class="w-full"
                        no-data-text="Không có dữ liệu"
                        no-match-text="Không tìm thấy"
                        filterable
                        value-key="id"
                        :disabled="!form.fields.idTinh"
                        @blur="clearValidate('idHuyen')"
                    >
                        <ElOption
                            v-for="item in danhSachQuanHuyen"
                            :key="item.id"
                            :value="item.id"
                            :label="item.tenHuyen"
                        />
                    </ElSelect>
                </ElFormItem>
            </ElCol>
        </ElRow>
        <ElFormItem label="Địa chỉ" prop="diaChi">
            <ElInput
                v-model="form.fields.diaChi"
                :rows="3"
                type="textarea"
                :maxlength="200"
                show-word-limit
            ></ElInput>
        </ElFormItem>
        <div class="flex items-center justify-between mt-10">
            <div>
                <ElButton
                    type="danger"
                    size="default"
                    icon="delete"
                    circle
                    v-show="true"
                    @click="showDialogDelete = true"
                    v-if="chucNang == 'sua-ben-den'"
                ></ElButton>
            </div>
            <ElButton type="primary" :loading="form.loading" @click="onSubmit"
                >Lưu lại</ElButton
            >
        </div>
    </ElForm>
    <ElDialog
        v-model="showDialogDelete"
        :width="350"
        title="Xác nhận xóa"
        :append-to-body="true"
        align-center
    >
        <p>
            Bạn có chắc chắn muốn xóa bến đến này không? Dữ liệu của bến đến này
            sẽ bị xóa vĩnh viễn. Hành động này không thể được hoàn tác.
        </p>
        <template #footer>
            <div class="flex items-center justify-end">
                <ElButton @click="showDialogDelete = false">Hủy</ElButton>
                <ElButton type="danger" @click="handleXoaBenXe">
                    Xác nhận
                </ElButton>
            </div>
        </template>
    </ElDialog>
</template>

<style scoped>
>>> .ElFormItem__label {
    margin-bottom: 6px !important;
}
</style>
