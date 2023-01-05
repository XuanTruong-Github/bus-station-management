<template >
    <Breadcrumb :dataSource="breadcrumbItems" class="mb-6" />
    <el-form
        ref="phuongTienForm"
        :model="phuongTien"
        :rules="rules"
        :inline="false"
        scroll-to-error
        status-icon
        label-position="top"
        size="large"
        class="bg-white w-3/4 mx-auto p-6 rounded bd"
    >
        <div class="flex items-center justify-between mb-1">
            <span class="font-medium text-base">Thông tin xe đăng ký</span>
            <el-tooltip
                :content="phuongTien.trangThai"
                placement="right"
                v-if="chucNang == 'sua-phuong-tien'"
            >
                <el-switch
                    v-model="trangThai"
                    style="--el-switch-on-color: #13ce66"
                    size="default"
                    title="Kích hoạt"
                    @change="setTrangThai"
                />
            </el-tooltip>
        </div>
        <hr class="mt-2 mb-6" />
        <el-row :gutter="16">
            <el-col :span="12" :offset="0">
                <el-form-item label="Biển kiểm soát" prop="bienKiemSoat">
                    <el-input
                        v-model="phuongTien.bienKiemSoat"
                        :maxlength="200"
                        show-word-limit
                        placeholder="Biển kiểm soát"
                    ></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0">
                <el-form-item label="Số đăng ký xe" prop="soDangKyPhuongTien">
                    <el-input
                        v-model="phuongTien.soDangKyPhuongTien"
                        :maxlength="200"
                        show-word-limit
                        placeholder="Số đăng ký xe"
                    ></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0">
                <el-form-item label="Loại xe" prop="idLoaiPhuongTien">
                    <el-select
                        v-model="phuongTien.idLoaiPhuongTien"
                        class="w-full"
                        no-data-text="Không có dữ liệu"
                        no-match-text="Không tìm thấy"
                        default-first-option
                        filterable
                        placeholder="Chọn loại xe"
                    >
                        <el-option
                            v-for="item in phuongTienStore.danhSachLoaiPhuongTien"
                            :label="item.tenLoai"
                            :value="item.id"
                            :key="item.id"
                        />
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="16">
            <el-col :span="6" :offset="0">
                <el-form-item label="Số khung" prop="soKhung">
                    <el-input
                        v-model="phuongTien.soKhung"
                        :maxlength="200"
                        show-word-limit
                        placeholder="Số khung"
                    ></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0">
                <el-form-item label="Số máy" prop="soMay">
                    <el-input
                        v-model="phuongTien.soMay"
                        :maxlength="200"
                        show-word-limit
                        placeholder="Số máy"
                    ></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0">
                <el-form-item label="Số ghế" prop="soGhe">
                    <el-input
                        v-model="phuongTien.soGhe"
                        type="number"
                        :min="0"
                        :max="100"
                        placeholder="Số ghế"
                    ></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0">
                <el-form-item label="Số giường" prop="soGiuong">
                    <el-input
                        v-model="phuongTien.soGiuong"
                        type="number"
                        :min="0"
                        :max="15"
                        placeholder="Số giường"
                    ></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="16">
            <el-col :span="12" :offset="0">
                <el-form-item
                    label="Doanh nghiệp vận tải"
                    prop="idDoanhNghiepVanTai"
                >
                    <el-select
                        v-model="phuongTien.idDoanhNghiepVanTai"
                        class="w-full"
                        no-data-text="Không có dữ liệu"
                        no-match-text="Không tìm thấy"
                        default-first-option
                        filterable
                        placeholder="Chọn doanh nghiệp vận tải"
                    >
                        <el-option
                            v-for="item in doanhNghiepVanTaiStore.danhSachDoanhNghiepVanTai"
                            :label="item.tenDoanhNghiepVanTai"
                            :value="item.id"
                            :key="item.id"
                        />
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12" :offset="0">
                <el-form-item label="Nhà xe" prop="nhaXe">
                    <el-select
                        v-model="phuongTien.nhaXe"
                        class="w-full"
                        no-data-text="Không có dữ liệu"
                        no-match-text="Không tìm thấy"
                        filterable
                        multiple
                        :multiple-limit="5"
                        placeholder="Chọn nhà xe"
                        :disabled="phuongTien.idDoanhNghiepVanTai == null"
                    >
                        <el-option
                            v-for="item in nhaXeStore.danhSachNhaXe"
                            :label="item.tenNhaXe"
                            :value="item.id"
                            :key="item.id"
                        />
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>
        <span class="font-medium text-base block">Thông tin hạn hiệu lực</span>
        <hr class="mt-2 mb-6" />
        <el-row :gutter="16">
            <el-col :span="8" :offset="0">
                <el-form-item label="Hạn bảo hiểm" prop="hanBaoHiemXe">
                    <el-date-picker
                        v-model="phuongTien.hanBaoHiemXe"
                        type="date"
                        style="width: 100%"
                        placeholder="Hạn bảo hiểm"
                    />
                </el-form-item>
            </el-col>
            <el-col :span="8" :offset="0">
                <el-form-item label="Hạn đăng kiểm" prop="hanDangKiemXe">
                    <el-date-picker
                        v-model="phuongTien.hanDangKiemXe"
                        type="date"
                        style="width: 100%"
                        placeholder="Hạn đăng kiểm"
                    />
                </el-form-item>
            </el-col>
            <el-col :span="8" :offset="0">
                <el-form-item label="Hạn đăng ký" prop="hanDangKyXe">
                    <el-date-picker
                        v-model="phuongTien.hanDangKyXe"
                        type="date"
                        style="width: 100%"
                        placeholder="Hạn đăng ký"
                    />
                </el-form-item>
            </el-col>
        </el-row>
        <span class="font-medium text-base block">Khoang chứa hàng</span>
        <hr class="mt-2 mb-6" />
        <el-row :gutter="16">
            <el-col :span="8" :offset="0">
                <el-form-item
                    label="Chiều dài (m)"
                    prop="chieuDaiKhoangChuaHang"
                >
                    <el-input
                        v-model="phuongTien.chieuDaiKhoangChuaHang"
                        type="number"
                        :min="0"
                        :max="1000"
                        placeholder="Chiều dài"
                    ></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8" :offset="0">
                <el-form-item
                    label="Chiều rộng (m)"
                    prop="chieuRongKhoangChuaHang"
                >
                    <el-input
                        v-model="phuongTien.chieuRongKhoangChuaHang"
                        type="number"
                        :min="0"
                        :max="1000"
                        placeholder="Chiều rộng"
                    ></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8" :offset="0">
                <el-form-item
                    label="Chiều cao (m)"
                    prop="chieuCaoKhoangChuaHang"
                >
                    <el-input
                        v-model="phuongTien.chieuCaoKhoangChuaHang"
                        type="number"
                        :min="0"
                        :max="1000"
                        placeholder="Chiều cao"
                    ></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <span class="font-medium text-base block"
            >Thông tin giám sát hành trình</span
        >
        <hr class="mt-2 mb-6" />
        <el-row :gutter="16">
            <el-col :span="8" :offset="0">
                <el-form-item
                    label="Hãng giám sát hành trình"
                    prop="idHangGiamSatHanhTrinh"
                >
                    <el-select
                        v-model="phuongTien.idHangGiamSatHanhTrinh"
                        class="w-full"
                        no-data-text="Không có dữ liệu"
                        no-match-text="Không tìm thấy"
                        filterable
                        placeholder="Hãng giám sát hành trình"
                    >
                        <el-option
                            v-for="item in phuongTienStore.danhSachHangGiamSatHanhTrinh"
                            :label="item.tenHangGiamSatHanhTrinh"
                            :value="item.id"
                            :key="item.id"
                        />
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="8" :offset="0">
                <el-form-item label="Tài khoản" prop="taiKhoanGiamSatHanhTrinh">
                    <el-input
                        v-model="phuongTien.taiKhoanGiamSatHanhTrinh"
                        :maxlength="200"
                        show-word-limit
                        placeholder="Tài khoản"
                    ></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8" :offset="0">
                <el-form-item label="Mật khẩu" prop="matKhauGiamSatHanhTrinh">
                    <el-input
                        v-model="phuongTien.matKhauGiamSatHanhTrinh"
                        type="password"
                        autocomplete="off"
                        :show-password="true"
                        :maxlength="20"
                        placeholder="Mật khẩu"
                    />
                </el-form-item>
            </el-col>
        </el-row>
        <div class="flex justify-between items-center mt-4">
            <div>
                <el-button
                    type="danger"
                    size="default"
                    icon="delete"
                    circle
                    v-show="true"
                    @click="showConfirmDelete = true"
                    v-if="chucNang == 'sua-phuong-tien'"
                ></el-button>
            </div>
            <el-button type="primary" @click="onSubmit">Lưu lại</el-button>
        </div>
    </el-form>
    <el-dialog
        v-model="showConfirmDelete"
        :width="480"
        title="Xác nhận xóa"
        :append-to-body="true"
        align-center
    >
        <p>
            Bạn có chắc chắn muốn xóa thông tin về xe này không? Dữ liệu của xe
            này sẽ bị xóa vĩnh viễn. Hành động này không thể được hoàn tác.
        </p>
        <template #footer>
            <div class="flex items-center justify-end">
                <el-button @click="showConfirmDelete = false">Hủy</el-button>
                <el-button type="danger" @click="xoaPhuongTien">
                    Xác nhận
                </el-button>
            </div>
        </template>
    </el-dialog>
    <el-dialog v-model="showImage">
        <img class="w-full" :src="currentImage" alt="Ảnh phương tiện" />
    </el-dialog>
</template>
<script>
import Breadcrumb from "@/components/breadcrumb.vue";
import useDoanhNghiepVanTaiStore from "@/stores/doanhNghiepVanTai";
import usePhuongTienStore from "@/stores/phuongTien";
import useNhaXeStore from "@/stores/nhaXe";

export default {
    components: {
        Breadcrumb,
    },
    setup() {
        const doanhNghiepVanTaiStore = useDoanhNghiepVanTaiStore();
        const phuongTienStore = usePhuongTienStore();
        const nhaXeStore = useNhaXeStore();

        doanhNghiepVanTaiStore.FindAll();
        nhaXeStore.FindAll();
        phuongTienStore.getDanhSachLoaiPhuongTien();
        phuongTienStore.getDanhSachHangGiamSatHanhTrinh();
        return { doanhNghiepVanTaiStore, phuongTienStore, nhaXeStore };
    },
    data() {
        return {
            breadcrumbItems: [
                {
                    text: "Quản lý thông tin xe",
                    path: "/quan-ly-thong-tin/phuong-tien",
                    disabled: false,
                },
                {
                    text: "Thêm phương tiện",
                    disabled: true,
                },
            ],
            phuongTien: {
                id: null,
                bienKiemSoat: null,
                idDoanhNghiepVanTai: null,
                soDangKyPhuongTien: null,
                idLoaiPhuongTien: null,
                soKhung: null,
                soMay: null,
                soGhe: null,
                soGiuong: null,
                hanBaoHiemXe: null,
                hanDangKiemXe: null,
                hanDangKyXe: null,
                nhaXe: [],
                chieuDaiKhoangChuaHang: null,
                chieuRongKhoangChuaHang: null,
                idHangGiamSatHanhTrinh: null,
                taiKhoanGiamSatHanhTrinh: null,
                matKhauGiamSatHanhTrinh: null,
                trangThai: "Đang hoạt động",
            },
            rules: {
                bienKiemSoat: [
                    {
                        required: true,
                        message: "Biểm kiểm soát không được bỏ trống!",
                        trigger: "blur",
                    },
                ],
                soDangKyPhuongTien: [
                    {
                        required: true,
                        message: "Số đăng ký xe không được bỏ trống!",
                        trigger: "blur",
                    },
                ],
                idLoaiPhuongTien: [
                    {
                        required: true,
                        message: "Loại phương tiện không được bỏ trống!",
                        trigger: "blur",
                    },
                ],
                soGhe: [
                    {
                        required: true,
                        message: "Số ghế không được bỏ trống!",
                        trigger: "blur",
                    },
                ],
                soGiuong: [
                    {
                        required: true,
                        message: "Số giường không được bỏ trống!",
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
                hanBaoHiemXe: [
                    {
                        required: true,
                        message: "Hạn bảo hiểm xe không được bỏ trống!",
                        trigger: "blur",
                    },
                ],
                hanDangKiemXe: [
                    {
                        required: true,
                        message: "Hạn đăng kiểm xe không được bỏ trống!",
                        trigger: "blur",
                    },
                ],
                hanDangKyXe: [
                    {
                        required: true,
                        message: "Hạn đăng ký xe không được bỏ trống!",
                        trigger: "blur",
                    },
                ],
            },
            idLoaiXeGiuongNam: "8a5ae9cc-54de-4d61-846b-d56c1e1edc4c",
            trangThai: true,
            showConfirmDelete: false,
            showImage: false,
            currentImage: null,
            chucNang: "them-phuong-tien",
        };
    },
    methods: {
        setTrangThai(value) {
            this.phuongTien.trangThai = value
                ? "Đang hoạt động"
                : "Ngừng hoạt động";
        },
        previewImage(file) {
            this.currentImage = file.url;
            this.showImage = true;
        },
        async themPhuongTien() {
            try {
                loading.start();
                const result = await this.phuongTienStore.Insert(
                    this.phuongTien
                );
                if (result.status) {
                    message("success", result.message);
                    this.$router.push({ name: "quan-ly-phuong-tien" });
                } else message("error", result.message);
            } catch (error) {
                console.log(error);
                message("error", "Thêm phương tiện thất bại! Lỗi hệ thống.");
            } finally {
                loading.stop();
            }
        },
        async getChiTietPhuongTien(id) {
            try {
                loading.start();
                const result = await this.phuongTienStore.FindById(id);
                if (result.status) {
                    this.phuongTien = result.data;
                    this.trangThai = result.data.trangThai == "Đang hoạt động";
                } else {
                    message("error", result.message);
                }
            } catch (error) {
                console.log(error);
                message(
                    "error",
                    "Lấy chi tiết phương tiện thất bại! Lỗi hệ thống"
                );
            } finally {
                loading.stop();
            }
        },
        async suaPhuongTien() {
            try {
                loading.start();
                const result = await this.phuongTienStore.Update(
                    this.phuongTien
                );
                if (result.status) {
                    message("success", result.message);
                    this.$router.push({ name: "quan-ly-phuong-tien" });
                } else message("error", result.message);
            } catch (error) {
                console.log(error);
                message(
                    "error",
                    "Cập nhật thông tin phương tiện thất bại! Lỗi hệ thống."
                );
            } finally {
                loading.stop();
            }
        },
        onSubmit() {
            this.$refs.phuongTienForm.validate((valid) => {
                if (valid) {
                    if (this.chucNang == "them-phuong-tien")
                        this.themPhuongTien();
                    else this.suaPhuongTien();
                } else return false;
            });
        },
        async xacDinhChucNang() {
            if (this.$route.name == "sua-phuong-tien") {
                this.chucNang = this.$route.name;
                if (this.$route?.query?.id) {
                    this.breadcrumbItems[1].text = "Sửa thông tin";
                    this.getChiTietPhuongTien(this.$route.query.id);
                } else {
                    message("error", "Vui lòng cung cấp ID phương tiện");
                }
            }
        },
        async xoaPhuongTien() {
            try {
                loading.start();
                const result = await this.phuongTienStore.DeleteById(
                    this.phuongTien.id
                );
                if (result.status) {
                    this.showConfirmDelete = false;
                    message("success", result.message);
                    this.$router.push({ name: "quan-ly-phuong-tien" });
                } else message("error", result.message);
            } catch (error) {
                message("error", "Xóa phương tiện thất bại! Lỗi hệ thống.");
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
<style scoped>
>>> .el-form-item__label {
    margin-bottom: 6px !important;
}
</style>
