<template>
    <Breadcrumb :dataSource="breadcrumbItems" />
    <el-form
        :model="benDen"
        ref="benDenForm"
        class="w-[580px] bg-white mx-auto p-6 rounded-lg bd mt-6"
        label-position="top"
        size="large"
        scroll-to-error
        status-icon
        :rules="rules"
    >
        <div class="flex items-center justify-between mb-1">
            <span class="font-medium text-base">Thông tin chung</span>
            <el-tooltip
                :content="benDen.trangThai"
                placement="right"
                v-if="chucNang == 'sua-ben-den'"
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
        <hr class="my-4" />
        <el-row :gutter="16">
            <el-col :span="12">
                <el-form-item label="Mã bến xe" prop="maBenXe">
                    <el-input
                        v-model="benDen.maBenXe"
                        type="number"
                        :min="0"
                        :max="1000"
                        @blur="clearValidate('maBenXe')"
                    ></el-input> </el-form-item
            ></el-col>
            <el-col :span="12">
                <el-form-item label="Loại bến xe" prop="idLoaiBenXe">
                    <el-select
                        v-model="benDen.idLoaiBenXe"
                        placeholder="Chọn loại bến xe"
                        class="w-full"
                        no-data-text="Không có dữ liệu"
                        no-match-text="Không tìm thấy"
                        default-first-option
                        filterable
                        @blur="clearValidate('idLoaiBenXe')"
                    >
                        <el-option
                            v-for="item in danhSachStore.danhSachLoaiBenXe"
                            :label="item.loaiBen"
                            :value="item.id"
                            :key="item.id"
                        />
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>

        <el-form-item label="Tên bến xe" prop="tenBenXe">
            <el-input
                v-model="benDen.tenBenXe"
                :maxlength="200"
                show-word-limit
                @blur="clearValidate('tenBenXe')"
            ></el-input>
        </el-form-item>
        <el-row :gutter="16">
            <el-col :span="12"
                ><el-form-item label="Email" prop="email">
                    <el-input
                        v-model="benDen.email"
                        :maxlength="200"
                        show-word-limit
                    ></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="Số điện thoại" prop="soDienThoai">
                    <el-input
                        v-model="benDen.soDienThoai"
                        :maxlength="13"
                        show-word-limit
                    ></el-input> </el-form-item
            ></el-col>
        </el-row>
        <span class="mb-1 mt-6 font-medium text-base">
            Thông tin địa chỉ bến xe
        </span>
        <hr class="mb-6 mt-4" />
        <el-row :gutter="16">
            <el-col :span="12">
                <el-form-item label="Tỉnh/Thành phố" prop="idTinh">
                    <el-select
                        v-model="benDen.idTinh"
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
                        v-model="benDen.idHuyen"
                        placeholder="Chọn quận huyện thị xã"
                        class="w-full"
                        no-data-text="Không có dữ liệu"
                        no-match-text="Không tìm thấy"
                        filterable
                        value-key="id"
                        :disabled="!benDen.idTinh"
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
                v-model="benDen.diaChi"
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
                    @click="showDialogDelete = true"
                    v-if="chucNang == 'sua-ben-den'"
                ></el-button>
            </div>
            <el-button type="primary" @click="onSubmit">Lưu lại</el-button>
        </div>
    </el-form>
    <el-dialog
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
                <el-button @click="showDialogDelete = false">Hủy</el-button>
                <el-button type="danger" @click="handleXoaBenXe">
                    Xác nhận
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>
<script>
import Breadcrumb from "@/components/breadcrumb.vue";
import useDanhSachStore from "@/stores/danhSach";
import useBenXeStore from "@/stores/benXe";

export default {
    components: {
        Breadcrumb,
    },
    setup() {
        const benDenStore = useBenXeStore();
        const danhSachStore = useDanhSachStore();
        danhSachStore.getDanhSachTinhThanh();
        danhSachStore.getDanhSachLoaiBenXe();
        return {
            benDenStore,
            danhSachStore,
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
            benDen: {
                id: null,
                maBenXe: null,
                tenBenXe: null,
                idLoaiBenXe: null,
                email: null,
                soDienThoai: null,
                idTinh: null,
                idHuyen: null,
                diaChi: null,
                trangThai: "Đang hoạt động",
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
            showDialogDelete: false,
            chucNang: "tao-ben-den",
            trangThai: true,
        };
    },
    methods: {
        handleChonTinhThanh(id) {
            this.benDen.idHuyen = null;
            this.danhSachStore.getDanhSachQuanHuyen(id);
        },
        setTrangThai(value) {
            this.benDen.trangThai = value
                ? "Đang hoạt động"
                : "Ngừng hoạt động";
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
            this.$refs.benDenForm.clearValidate(prop);
        },
        onSubmit() {
            this.$refs.benDenForm.validate((valid) => {
                if (valid) {
                    if (this.chucNang == "tao-ben-den") this.themBenDen();
                    else if (this.chucNang == "sua-ben-den") this.suaBenDen();
                } else return;
            });
        },
        async getChiTietBenDen(id) {
            try {
                loading.start();
                const result = await this.benDenStore.FindByID(id);
                if (result.status) {
                    this.benDen = result.data;
                    this.trangThai = result.data.trangThai == "Đang hoạt động";
                    await this.danhSachStore.getDanhSachQuanHuyen(
                        result.data.idTinh
                    );
                } else message("error", result.message);
            } catch (error) {
                console.log(error);
                message("error", "Lấy chi tiết bến đến thất bại! Lỗi hệ thống");
            } finally {
                loading.stop();
            }
        },
        async themBenDen() {
            try {
                loading.start();
                const result = await this.benDenStore.Insert(this.benDen);
                if (result.status) {
                    message("success", result.message);
                    this.$router.push({ name: "quan-ly-ben-den" });
                } else message("error", result.message);
            } catch (error) {
                console.log(error);
                message("error", "Thêm bến đến thất bại! Lỗi hệ thống");
            } finally {
                loading.stop();
            }
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
                    this.benDen.id
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
<style scoped>
>>> .el-form-item__label {
    margin-bottom: 6px !important;
}
</style>
