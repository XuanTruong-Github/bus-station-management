<template>
    <Breadcrumb :dataSource="breadcrumbItems" class="mb-4" />
    <el-form
        ref="doanhNghiepVanTaiForm"
        :model="doanhNghiepVanTai"
        :rules="rules"
        :inline="false"
        scroll-to-error
        status-icon
        label-position="top"
        size="large"
        class="w-[650px] bg-white mx-auto p-6 rounded-lg bd"
    >
        <div class="mb-1">
            <span class="font-medium text-base">Thông tin chung</span>
        </div>
        <hr class="mt-2 mb-4" />
        <el-form-item
            label="Tên doanh nghiệp vận tải"
            prop="tenDoanhNghiepVanTai"
        >
            <el-input
                v-model="doanhNghiepVanTai.tenDoanhNghiepVanTai"
                :maxlength="200"
                show-word-limit
                @blur="clearValidate('tenDoanhNghiepVanTai')"
            ></el-input>
        </el-form-item>
        <el-form-item label="Mã số thuế" prop="maSoThue">
            <el-input
                v-model="doanhNghiepVanTai.maSoThue"
                :maxlength="13"
                show-word-limit
                @blur="clearValidate('maSoThue')"
            ></el-input>
        </el-form-item>
        <el-form-item label="Số giấy phép kinh doanh" prop="soGPKD">
            <el-input
                v-model="doanhNghiepVanTai.soGPKD"
                :maxlength="20"
                show-word-limit
                @blur="clearValidate('soGPKD')"
            ></el-input>
        </el-form-item>
        <el-row>
            <el-col :span="12" class="pr-2">
                <el-form-item
                    label="Ngày cấp giấy phép kinh doanh"
                    prop="ngayCapGPKD"
                >
                    <el-date-picker
                        v-model="doanhNghiepVanTai.ngayCapGPKD"
                        type="date"
                        format="DD/MM/YYYY"
                        placeholder="Ngày / Tháng / Năm"
                        style="width: 100%"
                        @blur="clearValidate('ngayCapGPKD')"
                    />
                </el-form-item>
            </el-col>
            <el-col :span="12" class="pl-2">
                <el-form-item
                    label="Nơi cấp giấy phép kinh doanh"
                    prop="noiCapGPKD"
                >
                    <el-input
                        v-model="doanhNghiepVanTai.noiCapGPKD"
                        :maxlength="200"
                        show-word-limit
                        @blur="clearValidate('noiCapGPKD')"
                    ></el-input> </el-form-item
            ></el-col>
        </el-row>
        <el-row>
            <el-col :span="12" class="pr-2">
                <el-form-item label="Người đại diện" prop="tenNguoiDaiDien">
                    <el-input
                        v-model="doanhNghiepVanTai.tenNguoiDaiDien"
                        :maxlength="200"
                        show-word-limit
                        @blur="clearValidate('tenNguoiDaiDien')"
                    >
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12" class="pl-2">
                <el-form-item label="Chức vụ" prop="idChucVuNguoiDaiDien">
                    <el-select
                        v-model="doanhNghiepVanTai.idChucVuNguoiDaiDien"
                        class="w-full"
                        placeholder="Chọn chức vụ"
                        no-data-text="Không có dữ liệu"
                    >
                        <el-option
                            v-for="item in danhSachStore.danhSachChucVu"
                            :label="item.tenChucVu"
                            :value="item.id"
                            :key="item.id"
                        />
                    </el-select> </el-form-item
            ></el-col>
        </el-row>
        <el-row>
            <el-col :span="12" class="pr-2"
                ><el-form-item label="Email" prop="email">
                    <el-input
                        v-model="doanhNghiepVanTai.email"
                        :maxlength="200"
                        show-word-limit
                        @blur="clearValidate('email')"
                    ></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12" class="pl-2">
                <el-form-item label="Số điện thoại" prop="soDienThoai">
                    <el-input
                        v-model="doanhNghiepVanTai.soDienThoai"
                        :maxlength="13"
                        show-word-limit
                        @blur="clearValidate('soDienThoai')"
                    ></el-input> </el-form-item
            ></el-col>
        </el-row>
        <h4 class="mb-1 mt-4 font-medium text-base">Thông tin địa chỉ</h4>
        <hr class="mb-6 mt-2" />
        <el-row :gutter="16">
            <el-col :span="12">
                <el-form-item label="Tỉnh/Thành phố" prop="idTinh">
                    <el-select
                        v-model="doanhNghiepVanTai.idTinh"
                        placeholder="Chọn tỉnh/thành phố"
                        class="w-full"
                        no-data-text="Không có dữ liệu"
                        no-match-text="Không tìm thấy"
                        default-first-option
                        filterable
                        :onChange="handleChonTinhThanh"
                        @blur="clearValidate('idTinh')"
                    >
                        <el-option
                            v-for="item in danhSachStore.danhSachTinhThanh"
                            :label="item.tenTinh"
                            :value="item.id"
                            :key="item.id"
                        />
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="Quận/Huyện/Thị xã" prop="idHuyen">
                    <el-select
                        v-model="doanhNghiepVanTai.idHuyen"
                        placeholder="Chọn quận huyện thị xã"
                        class="w-full"
                        no-data-text="Không có dữ liệu"
                        no-match-text="Không tìm thấy"
                        filterable
                        value-key="id"
                        :disabled="!doanhNghiepVanTai.idTinh"
                        @blur="clearValidate('idHuyen')"
                    >
                        <el-option
                            v-for="item in danhSachStore.danhSachQuanHuyen"
                            :key="item.id"
                            :value="item.id"
                            :label="item.tenHuyen"
                        />
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-form-item label="Địa chỉ" prop="diaChi">
            <el-input
                v-model="doanhNghiepVanTai.diaChi"
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
                    v-if="chucNang == 'sua-doanh-nghiep-van-tai'"
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
            Bạn có chắc chắn muốn xóa doanh nghiệp vận tải này không? Dữ liệu
            của doanh nghiệp này sẽ bị xóa vĩnh viễn. Hành động này không thể
            được hoàn tác.
        </p>
        <template #footer>
            <div class="flex items-center justify-end">
                <el-button @click="showConfirmDelete = false">Hủy</el-button>
                <el-button type="danger" @click="xoaDoanhNghiepVanTai">
                    Xác nhận
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script>
import Breadcrumb from "@/components/breadcrumb.vue";
import useDanhSachStore from "@/stores/danhSach";
import useDoanhNghiepVanTaiStore from "@/stores/doanhNghiepVanTai";

export default {
    components: {
        Breadcrumb,
    },
    setup() {
        const danhSachStore = useDanhSachStore();
        const doanhNghiepVanTaiStore = useDoanhNghiepVanTaiStore();
        danhSachStore.getDanhSachTinhThanh();
        danhSachStore.getDanhSachChucVu();
        return {
            danhSachStore,
            doanhNghiepVanTaiStore,
        };
    },
    data() {
        return {
            breadcrumbItems: [
                {
                    text: "Quản lý doanh nghiệp vận tải",
                    path: "/quan-ly-thong-tin/doanh-nghiep-van-tai",
                    disabled: false,
                },
                {
                    text: "Tạo mới",
                    disabled: true,
                },
            ],
            doanhNghiepVanTai: {
                id: null,
                tenDoanhNghiepVanTai: null,
                maSoThue: null,
                soGPKD: null,
                ngayCapGPKD: null,
                noiCapGPKD: null,
                tenNguoiDaiDien: null,
                idChucVuNguoiDaiDien: null,
                email: null,
                soDienThoai: null,
                idTinh: null,
                idHuyen: null,
                diaChi: null,
                trangThai: "Đang hoạt động",
            },
            rules: {
                tenDoanhNghiepVanTai: [
                    {
                        required: true,
                        message:
                            "Tên doanh nghiệp vận tải không được bỏ trống!",
                        trigger: "blur",
                    },
                ],
                maSoThue: [
                    {
                        required: true,
                        message: "Mã số thuế không được bỏ trống!",
                        trigger: "blur",
                    },
                ],
                soGPKD: [
                    {
                        required: true,
                        message: "Số giấy phép kinh doanh không được bỏ trống!",
                        trigger: "blur",
                    },
                ],
                ngayCapGPKD: [
                    {
                        required: true,
                        message:
                            "Ngày cấp giấy phép kinh doanh không được bỏ trống!",
                        trigger: "blur",
                    },
                ],
                noiCapGPKD: [
                    {
                        required: true,
                        message:
                            "Nơi cấp giấy phép kinh doanh không được bỏ trống!",
                        trigger: "blur",
                    },
                ],
                tenNguoiDaiDien: [
                    {
                        required: true,
                        message:
                            "Tên người đại diện doanh nghiệp không được bỏ trống!",
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
                idTinh: [
                    {
                        required: true,
                        message: "Tỉnh/Thành phố không được bỏ trống!",
                        trigger: "blur",
                    },
                ],
                idHuyen: [
                    {
                        required: true,
                        message: "Quận/Huyện/Thị xã không được bỏ trống!",
                        trigger: "blur",
                    },
                ],
            },
            showConfirmDelete: false,
            chucNang: "them-doanh-nghiep-van-tai",
            trangThai: true,
        };
    },
    methods: {
        setTrangThai(value) {
            this.doanhNghiepVanTai.trangThai = value
                ? "Đang hoạt động"
                : "Ngừng hoạt động";
        },
        handleChonTinhThanh(id) {
            loading.start();
            this.doanhNghiepVanTai.idHuyen = null;
            this.danhSachStore.getDanhSachQuanHuyen(id);
            loading.stop();
        },
        clearValidate(prop) {
            this.$refs.doanhNghiepVanTaiForm.clearValidate(prop);
        },
        async themDoanhNghiepVanTai() {
            try {
                loading.start();
                const result = await this.doanhNghiepVanTaiStore.Insert(
                    this.doanhNghiepVanTai
                );
                if (result.status) {
                    message("success", result.message);
                    this.$router.push({ name: "quan-ly-doanh-nghiep-van-tai" });
                } else message("error", result.message);
            } catch (error) {
                console.log(error);
                message(
                    "error",
                    "Thêm doanh nghiệp vận tải thất bại! Lỗi hệ thống."
                );
            } finally {
                loading.stop();
            }
        },
        async getChiTietDoanhNghiepVanTai() {
            try {
                loading.start();
                const result = await this.doanhNghiepVanTaiStore.FindByID(
                    this.doanhNghiepVanTai.id
                );
                if (result.status) {
                    await this.danhSachStore.getDanhSachQuanHuyen(
                        result.data.idTinh
                    );
                    this.doanhNghiepVanTai = result.data;
                    this.trangThai = result.data.trangThai == "Đang hoạt động";
                } else {
                    message("error", result.message);
                }
            } catch (error) {
                console.log(error);
                message(
                    "error",
                    "Lấy chi tiết doanh nghiệp vận tải thất bại! Lỗi hệ thống"
                );
            } finally {
                loading.stop();
            }
        },
        async suaDoanhNghiepVanTai() {
            try {
                loading.start();
                const result = await this.doanhNghiepVanTaiStore.Update(
                    this.doanhNghiepVanTai
                );
                if (result.status) {
                    message("success", result.message);
                    this.$router.push({ name: "quan-ly-doanh-nghiep-van-tai" });
                } else message("error", result.message);
            } catch (error) {
                console.log(error);
                message(
                    "error",
                    "Cập nhật thông tin doanh nghiệp vận tải thất bại! Lỗi hệ thống."
                );
            } finally {
                loading.stop();
            }
        },
        async xoaDoanhNghiepVanTai() {
            try {
                loading.start();
                const result = await this.doanhNghiepVanTaiStore.DeleteByID(
                    this.doanhNghiepVanTai.id
                );
                if (result.status) {
                    this.showConfirmDelete = false;
                    message("success", result.message);
                    this.$router.push({ name: "quan-ly-doanh-nghiep-van-tai" });
                } else message("error", result.message);
            } catch (error) {
                message(
                    "error",
                    "Xóa doanh nghiệp vận tải thất bại! Lỗi hệ thống."
                );
            } finally {
                loading.stop();
            }
        },
        async xacDinhChucNang() {
            if (this.$route.name == "sua-doanh-nghiep-van-tai") {
                this.chucNang = "sua-doanh-nghiep-van-tai";
                if (this.$route.query?.id) {
                    this.doanhNghiepVanTai.id = this.$route.query.id;
                    this.breadcrumbItems[1].text = "Sửa thông tin";
                    this.getChiTietDoanhNghiepVanTai(this.$route.query.id);
                } else
                    message(
                        "error",
                        "Vui lòng truyền ID doanh nghiệp vận tải!"
                    );
            }
        },
        onSubmit() {
            this.$refs.doanhNghiepVanTaiForm.validate((valid) => {
                if (valid) {
                    if (this.chucNang == "them-doanh-nghiep-van-tai")
                        this.themDoanhNghiepVanTai();
                    else this.suaDoanhNghiepVanTai();
                } else return false;
            });
        },
    },
    created() {
        this.xacDinhChucNang();
    },
};
</script>

<style scoped>
>>> .el-form-item__label {
    margin-bottom: 6px !important;
}
</style>
