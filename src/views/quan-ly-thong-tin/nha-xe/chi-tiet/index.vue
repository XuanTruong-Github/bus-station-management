<template>
    <Breadcrumb :dataSource="breadcrumbItems" class="mb-4" />
    <el-form
        ref="nhaXeForm"
        :model="nhaXe"
        :rules="rules"
        :inline="false"
        scroll-to-error
        status-icon
        label-position="top"
        size="large"
        class="w-[600px] bg-white mx-auto p-6 rounded-lg bd"
    >
        <div class=" mb-1">
            <span class="font-medium text-base">Thông tin nhà xe</span>
        
        </div>
        <hr class="mt-2 mb-4" />
        <el-form-item label="Tên nhà xe" prop="tenNhaXe">
            <el-input
                v-model="nhaXe.tenNhaXe"
                :maxlength="200"
                show-word-limit
                @blur="clearValidate('tenNhaXe')"
            ></el-input>
        </el-form-item>
        <el-form-item label="Người đại diện" prop="tenNguoiDaiDien">
            <el-input
                v-model="nhaXe.tenNguoiDaiDien"
                :maxlength="200"
                show-word-limit
                @blur="clearValidate('tenNguoiDaiDien')"
            ></el-input>
        </el-form-item>

        <el-row gutter="16">
            <el-col :span="12"
                ><el-form-item label="Email" prop="email">
                    <el-input
                        v-model="nhaXe.email"
                        :maxlength="200"
                        show-word-limit
                        @blur="clearValidate('email')"
                    ></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="Số điện thoại" prop="soDienThoai">
                    <el-input
                        v-model="nhaXe.soDienThoai"
                        :maxlength="13"
                        show-word-limit
                        @blur="clearValidate('soDienThoai')"
                    ></el-input> </el-form-item
            ></el-col>
        </el-row>
        <el-form-item label="Doanh nghiệp vận tải" prop="idDoanhNghiepVanTai">
            <el-select
                v-model="nhaXe.idDoanhNghiepVanTai"
                placeholder="Chọn doanh nghiệp vận tải"
                class="w-full"
                no-data-text="Không có dữ liệu"
                no-match-text="Không tìm thấy"
                default-first-option
                filterable
                @blur="clearValidate('idDoanhNghiepVanTai')"
            >
                <el-option
                    v-for="item in doanhNghiepVanTaiStore.danhSachDoanhNghiepVanTai"
                    :label="item.tenDoanhNghiepVanTai"
                    :value="item.id"
                    :key="item.id"
                />
            </el-select>
        </el-form-item>
        <el-form-item label="Địa chỉ" prop="diaChi">
            <el-input
                v-model="nhaXe.diaChi"
                :rows="3"
                type="textarea"
                :maxlength="300"
                show-word-limit
            ></el-input>
        </el-form-item>
        <div class="flex justify-between items-center mt-10">
            <div>
                <el-button
                    type="danger"
                    size="default"
                    icon="delete"
                    circle
                    v-show="true"
                    @click="showConfirmDelete = true"
                    v-if="chucNang == 'sua-nha-xe'"
                ></el-button>
            </div>
            <el-button type="primary" @click="onSubmit">Lưu lại</el-button>
        </div>
    </el-form>
    <el-dialog
        v-model="showConfirmDelete"
        :width="470"
        title="Xác nhận xóa"
        :append-to-body="true"
        align-center
    >
        <p>
            Bạn có chắc chắn muốn xóa nhà xe này không? Dữ liệu của nhà xe này
            sẽ bị xóa vĩnh viễn. Hành động này không thể được hoàn tác.
        </p>
        <template #footer>
            <div class="flex items-center justify-end">
                <el-button @click="showConfirmDelete = false">Hủy</el-button>
                <el-button type="danger" @click="xoaNhaXe">
                    Xác nhận
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script>
import Breadcrumb from "@/components/breadcrumb.vue";
import useDoanhNghiepVanTaiStore from "@/stores/doanhNghiepVanTai";
import useNhaXeStore from "@/stores/nhaXe";
export default {
    components: { Breadcrumb },
    setup() {
        const nhaXestore = useNhaXeStore();
        const doanhNghiepVanTaiStore = useDoanhNghiepVanTaiStore();
        doanhNghiepVanTaiStore.FindAll();
        return { doanhNghiepVanTaiStore, nhaXestore };
    },
    data() {
        return {
            breadcrumbItems: [
                {
                    text: "Quản lý nhà xe",
                    path: "/quan-ly-thong-tin/nha-xe",
                    disabled: false,
                },
                {
                    text: "Thêm nhà xe",
                    disabled: true,
                },
            ],
            nhaXe: {
                id: null,
                tenNhaXe: null,
                email: null,
                soDienThoai: null,
                tenNguoiDaiDien: null,
                diaChi: null,
                idDoanhNghiepVanTai: null,
                trangThai: "Đang hoạt động",
            },
            rules: {
                tenNhaXe: [
                    {
                        required: true,
                        message: "Tên nhà xe không được bỏ trống!",
                        trigger: "blur",
                    },
                ],
                tenNguoiDaiDien: [
                    {
                        required: true,
                        message: "Tên người đại diện không được bỏ trống!",
                        trigger: "blur",
                    },
                ],
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
                soDienThoai: [
                    {
                        required: true,
                        message: "Số điện thoại không được bỏ trống!",
                        trigger: "blur",
                    },
                ],
                idDoanhNghiepVanTai: [
                    {
                        required: true,
                        message: "Doanh nghiệp vận tải không được bỏ trống!",
                        trigger: "blur",
                    },
                ],
            },
            trangThai: true,
            showConfirmDelete: false,
            chucNang: "them-nha-xe",
        };
    },
    methods: {
        setTrangThai(value) {
            this.nhaXe.trangThai = value ? "Đang hoạt động" : "Ngừng hoạt động";
        },

        async themNhaXe() {
            try {
                loading.start();
                const result = await this.nhaXestore.Insert(this.nhaXe);
                if (result.status) {
                    message("success", result.message);
                    this.$router.push({ name: "quan-ly-nha-xe" });
                } else message("error", result.message);
            } catch (error) {
                console.log(error);
                message("error", "Thêm nhà xe thất bại! Lỗi hệ thống.");
            } finally {
                loading.stop();
            }
        },
        async getChiTietNhaXe(id) {
            try {
                loading.start();
                const result = await this.nhaXestore.FindByID(id);
                if (result.status) {
                    this.nhaXe = result.data;
                    this.trangThai = result.data.trangThai == "Đang hoạt động";
                } else {
                    message("error", result.message);
                }
            } catch (error) {
                console.log(error);
                message("error", "Lấy chi tiết bến đến thất bại! Lỗi hệ thống");
            } finally {
                loading.stop();
            }
        },
        async suaNhaXe() {
            try {
                loading.start();
                const result = await this.nhaXestore.Update(this.nhaXe);
                if (result.status) {
                    message("success", result.message);
                    this.$router.push({ name: "quan-ly-nha-xe" });
                } else message("error", result.message);
            } catch (error) {
                console.log(error);
                message(
                    "error",
                    "Cập nhật thông tin nhà xe thất bại! Lỗi hệ thống."
                );
            } finally {
                loading.stop();
            }
        },
        clearValidate(prop) {
            this.$refs.nhaXeForm.clearValidate(prop);
        },
        onSubmit() {
            this.$refs.nhaXeForm.validate((valid) => {
                if (valid) {
                    if (this.chucNang == "them-nha-xe") this.themNhaXe();
                    else this.suaNhaXe();
                } else return false;
            });
        },
        async xacDinhChucNang() {
            if (this.$route.name == "sua-nha-xe") {
                this.chucNang = this.$route.name;
                if (this.$route?.query?.id) {
                    this.breadcrumbItems[1].text = "Sửa thông tin";
                    this.getChiTietNhaXe(this.$route.query.id);
                } else {
                    message("error", "Vui lòng cung cấp ID nhà xe");
                }
            }
        },
        async xoaNhaXe() {
            try {
                loading.start();
                const result = await this.nhaXestore.DeleteByID(this.nhaXe.id);
                if (result.status) {
                    this.showConfirmDelete = false;
                    message("success", result.message);
                    this.$router.push({ name: "quan-ly-nha-xe" });
                } else message("error", result.message);
            } catch (error) {
                message("error", "Xóa nhà xe thất bại! Lỗi hệ thống.");
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