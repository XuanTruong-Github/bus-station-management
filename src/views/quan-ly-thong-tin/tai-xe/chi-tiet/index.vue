<template >
    <Breadcrumb :dataSource="breadcrumbItems" class="mb-4" />
    <el-form
        ref="laiXeForm"
        :model="laiXe"
        :rules="rules"
        :inline="false"
        scroll-to-error
        status-icon
        label-position="top"
        size="large"
        class="w-[600px] bg-white mx-auto p-6 rounded-lg bd"
    >
        <div class="flex items-center justify-between mb-1">
            <span class="font-medium text-base">Thông tin chung</span>
            <el-tooltip
                :content="laiXe.trangThai"
                placement="right"
                v-if="chucNang == 'sua-tai-xe'"
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
        <hr class="mt-2 mb-4" />
        <el-form-item label="Họ tên" prop="hoTen">
            <el-input
                v-model="laiXe.hoTen"
                :maxlength="200"
                show-word-limit
                @blur="clearValidate('hoTen')"
            ></el-input>
        </el-form-item>
        <el-row :gutter="16">
            <el-col :span="12" :offset="0">
                <el-form-item label="Số CCCD/CMND" prop="soCCCD">
                    <el-input
                        v-model="laiXe.soCCCD"
                        :maxlength="200"
                        show-word-limit
                        @blur="clearValidate('soCCCD')"
                    ></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12" :offset="0">
                <el-form-item label="Số điện thoại" prop="soDienThoai">
                    <el-input
                        v-model="laiXe.soDienThoai"
                        :maxlength="13"
                        show-word-limit
                        @blur="clearValidate('soDienThoai')"
                    ></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-form-item label="Số giấy phép lái xe" prop="soGPLX">
            <el-input
                v-model="laiXe.soGPLX"
                :maxlength="200"
                show-word-limit
                @blur="clearValidate('soGPLX')"
            ></el-input>
        </el-form-item>
        <el-row :gutter="16">
            <el-col :span="12" :offset="0">
                <el-form-item
                    label="Hạn giấy phép lái xe"
                    prop="thoiGianHieuLucGPLX"
                >
                    <el-date-picker
                        v-model="laiXe.thoiGianHieuLucGPLX"
                        type="date"
                        placeholder="Chọn hạn giấy phép lái xe"
                        style="width: 100%"
                        @blur="clearValidate('thoiGianHieuLucGPLX')"
                    />
                </el-form-item>
            </el-col>
            <el-col :span="12" :offset="0">
                <el-form-item label="Hạng giấy phép lái xe" prop="idHangGPLX">
                    <el-select
                        v-model="laiXe.idHangGPLX"
                        placeholder="Chọn doanh nghiệp vận tải"
                        class="w-full"
                        no-data-text="Không có dữ liệu"
                        no-match-text="Không tìm thấy"
                        default-first-option
                        filterable
                        @blur="clearValidate('idHangGPLX')"
                    >
                        <el-option
                            v-for="item in danhSachStore.danhSachHangGPLX"
                            :label="item.hangGPLX"
                            :value="item.id"
                            :key="item.id"
                        />
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-form-item label="Nhà xe" prop="nhaXe">
            <el-select
                v-model="laiXe.nhaXe"
                placeholder="Chọn nhà xe"
                class="w-full"
                no-data-text="Không có dữ liệu"
                no-match-text="Không tìm thấy"
                filterable
                multiple
                :multiple-limit="5"
                @blur="clearValidate('nhaXe')"
            >
                <el-option
                    v-for="item in nhaXeStore.danhSachNhaXe"
                    :label="item.tenNhaXe"
                    :value="item.id"
                    :key="item.id"
                />
            </el-select>
        </el-form-item>

        <span class="font-medium text-base mt-4">Thông tin địa chỉ</span>
        <hr class="mt-2 mb-4" />

        <el-row :gutter="16">
            <el-col :span="12">
                <el-form-item label="Tỉnh/Thành phố" prop="idTinh">
                    <el-select
                        v-model="laiXe.idTinh"
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
                        v-model="laiXe.idHuyen"
                        placeholder="Chọn quận huyện thị xã"
                        class="w-full"
                        no-data-text="Không có dữ liệu"
                        no-match-text="Không tìm thấy"
                        filterable
                        value-key="id"
                        :disabled="!laiXe.idTinh"
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
                v-model="laiXe.diaChi"
                :rows="3"
                type="textarea"
                :maxlength="200"
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
                    v-if="chucNang == 'sua-lai-xe'"
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
            Bạn có chắc chắn muốn xóa lái xe này không? Dữ liệu của lái xe này
            sẽ bị xóa vĩnh viễn. Hành động này không thể được hoàn tác.
        </p>
        <template #footer>
            <div class="flex items-center justify-end">
                <el-button @click="showConfirmDelete = false">Hủy</el-button>
                <el-button type="danger" @click="xoaLaiXe">
                    Xác nhận
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>
<script>
import Breadcrumb from "@/components/breadcrumb.vue";
import useDanhSachStore from "@/stores/danhSach";
import useNhaXeStore from "@/stores/nhaXe";
import useLaiXeStore from "@/stores/laiXe";

export default {
    components: {
        Breadcrumb,
    },
    setup() {
        const danhSachStore = useDanhSachStore();
        const nhaXeStore = useNhaXeStore();
        const laiXeStore = useLaiXeStore();

        danhSachStore.getDanhSachHangGPLX();
        danhSachStore.getDanhSachTinhThanh();
        nhaXeStore.FindAll();
        return { danhSachStore, nhaXeStore, laiXeStore };
    },
    data() {
        return {
            breadcrumbItems: [
                {
                    text: "Quản lý tài xế",
                    path: "/quan-ly-thong-tin/tai-xe",
                    disabled: false,
                },
                {
                    text: "Thêm tài xế",
                    disabled: true,
                },
            ],
            laiXe: {
                id: null,
                soCCCD: null,
                hoTen: null,
                soDienThoai: null,
                soGPLX: null,
                idHangGPLX: null,
                thoiGianHieuLucGPLX: null,
                nhaXe: [],
                idTinh: null,
                idHuyen: null,
                diaChi: null,
                trangThai: "Đang hoạt động",
            },
            rules: {
                soCCCD: [
                    {
                        required: true,
                        message: "Số CCCD/CMND không được bỏ trống!",
                        trigger: "blur",
                    },
                ],
                hoTen: [
                    {
                        required: true,
                        message: "Họ tên không được bỏ trống!",
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
                soGPLX: [
                    {
                        required: true,
                        message: "Số giấy phép lái xe không được bỏ trống!",
                        trigger: "blur",
                    },
                ],
                idHangGPLX: [
                    {
                        required: true,
                        message: "Hạng giấy phép lái xe không được bỏ trống!",
                        trigger: "blur",
                    },
                ],
                thoiGianHieuLucGPLX: [
                    {
                        required: true,
                        message: "Hạn giấy phép lái xe không được bỏ trống!",
                        trigger: "blur",
                    },
                ],
                nhaXe: [
                    {
                        required: true,
                        message: "Vui lòng chọn ít nhất một nhà xe!",
                        trigger: "blur",
                    },
                ],

                idTinh: [
                    {
                        required: true,
                        message: "Tỉnh/Thành Phố không được bỏ trống!",
                        trigger: "blur",
                    },
                ],
                idHuyen: [
                    {
                        required: true,
                        message: "Quận/Huyện/Thị trấn không được bỏ trống!",
                        trigger: "blur",
                    },
                ],
            },
            trangThai: true,
            showConfirmDelete: false,
            chucNang: "them-tai-xe",
        };
    },
    methods: {
        setTrangThai(value) {
            this.laiXe.trangThai = value ? "Đang hoạt động" : "Ngừng hoạt động";
        },
        handleChonTinhThanh(id) {
            this.laiXe.idHuyen = null;
            this.danhSachStore.getDanhSachQuanHuyen(id);
        },
        async getChiTietLaiXe(id) {
            try {
                loading.start();
                const result = await this.laiXeStore.FindByID(id);
                if (result.status) {
                    this.danhSachStore.getDanhSachQuanHuyen(result.data.idTinh);
                    this.danhSachStore.getDanhSachHangGPLX();
                    this.laiXe = result.data;
                    this.trangThai = result.data.trangThai == "Đang hoạt động";
                } else message("error", result.message);
            } catch (error) {
                console.log(error);
                message("error", "Lấy chi tiết tài xế thất bại! Lỗi hệ thống");
            } finally {
                loading.stop();
            }
        },
        xacDinhChucNang() {
            if (this.$route.name == "sua-tai-xe") {
                this.chucNang = "sua-tai-xe";
                if (this.$route.query?.id) {
                    this.breadcrumbItems[1].text = "Sửa thông tin tài xế";
                    this.getChiTietLaiXe(this.$route.query.id);
                } else message("error", "Vui lòng truyền ID bến xe!");
            }
        },
        clearValidate(prop) {
            this.$refs.laiXeForm.clearValidate(prop);
        },
        onSubmit() {
            this.$refs.laiXeForm.validate((valid) => {
                if (valid) {
                    if (this.chucNang == "them-tai-xe") this.themLaiXe();
                    else if (this.chucNang == "sua-tai-xe") this.suaLaiXe();
                } else return;
            });
        },
        async themLaiXe() {
            try {
                loading.start();
                const result = await this.laiXeStore.Insert(this.laiXe);
                if (result.status) {
                    message("success", result.message);
                    this.$router.push({ name: "quan-ly-tai-xe" });
                } else message("error", result.message);
            } catch (error) {
                console.log(error);
                message("error", "Thêm tài xế thất bại! Lỗi hệ thống");
            } finally {
                loading.stop();
            }
        },
        async suaLaiXe() {
            try {
                loading.start();
                const result = await this.laiXeStore.Update(this.laiXe);
                if (result.status) {
                    message("success", result.message);
                    this.$router.push({ name: "quan-ly-tai-xe" });
                } else message("error", result.message);
            } catch (error) {
                console.log(error);
                message(
                    "error",
                    "Cập nhật thông tin tài xế thất bại, lỗi hệ thống! "
                );
            } finally {
                loading.stop();
            }
        },
        async xoaLaiXe() {
            try {
                loading.start();
                const result = await this.laiXeStore.DeleteByID(this.laiXe.id);
                if (result.status) {
                    this.showDialogDelete = false;
                    message("success", result.message);
                    this.$router.push({ name: "quan-ly-tai-xe" });
                } else message("error", result.message);
            } catch (error) {
                message("error", "Xóa tài xế thất bại! Lỗi hệ thống");
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