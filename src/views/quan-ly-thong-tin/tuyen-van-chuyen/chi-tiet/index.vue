<template >
    <Breadcrumb :dataSource="breadcrumbItems" class="mb-4" />
    <el-form
        ref="tuyenVanChuyenForm"
        :model="tuyenVanChuyen"
        :rules="rules"
        :inline="false"
        :scroll-to-error="true"
        status-icon
        label-position="top"
        size="large"
        class="w-2/4 min-w-[700px] bg-white mx-auto p-6 rounded-lg bd"
    >
        <div class="flex items-center justify-between mb-1">
            <span class="font-medium text-base"
                >Thông tin tuyến vận chuyển</span
            >
        </div>
        <hr class="mb-6 mt-4" />
        <ElRow gutter="16">
            <ElCol :span="12">
                <el-form-item label="Tỉnh đi" prop="idTinhDi">
                    <ElSelect
                        v-model="tuyenVanChuyen.idTinhDi"
                        placeholder="Chọn tỉnh đi"
                        class="w-full"
                        no-data-text="Không có dữ liệu"
                        no-match-text="Không tìm thấy"
                        default-first-option
                        filterable
                        :onChange="handleChonTinhDi"
                        @blur="clearValidate('idTinhDi')"
                    >
                        <ElOption
                            v-for="item in danhSachStore.danhSachTinhThanh"
                            :label="item.tenTinh"
                            :value="item.id"
                            :key="item.id"
                        />
                    </ElSelect>
                </el-form-item>
            </ElCol>
            <ElCol :span="12"
                ><el-form-item label="Bến đi" prop="idBenDi">
                    <ElSelect
                        v-model="tuyenVanChuyen.idBenDi"
                        placeholder="Chọn bến đi"
                        class="w-full"
                        no-data-text="Không có dữ liệu"
                        no-match-text="Không tìm thấy"
                        default-first-option
                        filterable
                        :disabled="tuyenVanChuyen.idTinhDi == null"
                        @blur="clearValidate('idBenDi')"
                    >
                        <ElOption
                            v-for="item in danhSachBenDi"
                            :label="item.tenBenXe"
                            :value="item.id"
                            :key="item.id"
                        />
                    </ElSelect>
                </el-form-item>
            </ElCol>
        </ElRow>
        <ElRow gutter="16">
            <ElCol :span="12">
                <el-form-item label="Tỉnh đến" prop="idTinhDen">
                    <ElSelect
                        v-model="tuyenVanChuyen.idTinhDen"
                        placeholder="Chọn tỉnh đến"
                        class="w-full"
                        no-data-text="Không có dữ liệu"
                        no-match-text="Không tìm thấy"
                        default-first-option
                        filterable
                        :onChange="handleChonTinhDen"
                        @blur="clearValidate('idTinhDen')"
                    >
                        <ElOption
                            v-for="item in danhSachStore.danhSachTinhThanh"
                            :label="item.tenTinh"
                            :value="item.id"
                            :key="item.id"
                        />
                    </ElSelect>
                </el-form-item>
            </ElCol>
            <ElCol :span="12"
                ><el-form-item label="Bến đến" prop="idBenDen">
                    <ElSelect
                        v-model="tuyenVanChuyen.idBenDen"
                        placeholder="Chọn bến đến"
                        class="w-full"
                        no-data-text="Không có dữ liệu"
                        no-match-text="Không tìm thấy"
                        default-first-option
                        filterable
                        :disabled="tuyenVanChuyen.idTinhDen == null"
                        @change="handleTaoMaTuyen"
                        @blur="clearValidate('idBenDen')"
                    >
                        <ElOption
                            v-for="item in danhSachBenDen"
                            :label="item.tenBenXe"
                            :value="item.id"
                            :key="item.id"
                        />
                    </ElSelect>
                </el-form-item>
            </ElCol>
        </ElRow>
        <ElRow gutter="16">
            <ElCol :span="12">
                <el-form-item label="Mã tuyến" prop="maTuyen">
                    <ElInput
                        v-model="tuyenVanChuyen.maTuyen"
                        :maxlength="200"
                        readonly
                        @blur="clearValidate('maTuyen')"
                    ></ElInput>
                </el-form-item>
            </ElCol>
            <ElCol :span="12">
                <el-form-item label="Loại tuyến" prop="idLoaiTuyen">
                    <ElSelect
                        v-model="tuyenVanChuyen.idLoaiTuyen"
                        placeholder="Chọn loại tuyến"
                        class="w-full"
                        no-data-text="Không có dữ liệu"
                        no-match-text="Không tìm thấy"
                        default-first-option
                        filterable
                        @blur="clearValidate('idLoaiTuyen')"
                    >
                        <ElOption
                            v-for="item in tuyenVanChuyenStore.danhSachLoaiTuyenVanChuyen"
                            :label="item.loaiTuyen"
                            :value="item.id"
                            :key="item.id"
                        />
                    </ElSelect>
                </el-form-item>
            </ElCol>
        </ElRow>
        <el-form-item label="Hành trình chạy" prop="hanhTrinhChay">
            <ElInput
                v-model="tuyenVanChuyen.hanhTrinhChay"
                :maxlength="400"
                show-word-limit
                @blur="clearValidate('hanhTrinhChay')"
            ></ElInput>
        </el-form-item>
        <ElRow :gutter="16">
            <ElCol :span="12" :offset="0">
                <el-form-item label="Nhà xe" prop="nhaXe">
                    <ElSelect
                        v-model="tuyenVanChuyen.nhaXe"
                        class="w-full"
                        no-data-text="Không có dữ liệu"
                        no-match-text="Không tìm thấy"
                        filterable
                        multiple
                        :multiple-limit="2"
                        placeholder="Chọn nhà xe"
                        @blur="clearValidate('nhaXe')"
                    >
                        <ElOption
                            v-for="item in nhaXeStore.danhSachNhaXe"
                            :label="item.tenNhaXe"
                            :value="item.id"
                            :key="item.id"
                        />
                    </ElSelect>
                </el-form-item>
            </ElCol>
            <ElCol :span="12" :offset="0">
                <el-form-item label="Cự ly (km)" prop="cuLy">
                    <ElInput
                        v-model="tuyenVanChuyen.cuLy"
                        type="number"
                        :min="0"
                        :max="2000"
                        @blur="clearValidate('cuLy')"
                    ></ElInput>
                </el-form-item>
            </ElCol>
        </ElRow>

        <ElRow :gutter="16">
            <ElCol :span="12" :offset="0">
                <DxDataGrid
                    class="table-page"
                    :show-borders="true"
                    :showColumnLines="false"
                    :data-source="tuyenVanChuyen.danhSachThoiGianXuatBen"
                    :column-auto-width="true"
                    keyExpr="id"
                    :height="236"
                >
                    <DxEditing
                        :allow-updating="true"
                        :allow-adding="true"
                        :allow-deleting="true"
                        :select-text-on-edit-start="true"
                        mode="cell"
                    />
                    <DxPaging :enabled="false" />
                    <DxColumn
                        :allowSorting="true"
                        data-field="gioXuatBen"
                        :caption="`Giờ xuất bến theo biểu đồ giờ (${tuyenVanChuyen.danhSachThoiGianXuatBen.length})`"
                        alignment="left"
                        data-type="datetime"
                        format="HH:mm"
                        :editorOptions="{
                            displayFormat: 'HH:mm',
                            type: 'time',
                        }"
                    >
                        <DxRequiredRule
                            message="Giờ xuất bến không được bỏ trống!"
                        />
                    </DxColumn>
                </DxDataGrid>
            </ElCol>
            <ElCol :span="12" :offset="0">
                <DxDataGrid
                    class="table-page"
                    :show-borders="true"
                    :showColumnLines="false"
                    :data-source="tuyenVanChuyen.danhSachDiemDungNghi"
                    keyExpr="id"
                    :height="236"
                >
                    <DxEditing
                        :allow-updating="true"
                        :allow-adding="true"
                        :allow-deleting="true"
                        :select-text-on-edit-start="true"
                        mode="cell"
                    />
                    <DxPaging :enabled="false" />

                    <DxColumn
                        :allowSorting="true"
                        data-field="diemDung"
                        :caption="`Điểm trả khách theo chiều đi (${tuyenVanChuyen.danhSachDiemDungNghi.length})`"
                        alignment="left"
                    >
                        <DxRequiredRule
                            message="Điểm trả khách không được bỏ trống!"
                        />
                        <DxStringLengthRule
                            :max="512"
                            message="Điểm trả khách không được vượt quá 512 ký tự!"
                        />
                    </DxColumn>
                </DxDataGrid>
            </ElCol>
        </ElRow>
        <div class="flex justify-between items-center mt-10">
            <div>
                <ElButton
                    type="danger"
                    size="default"
                    icon="delete"
                    circle
                    v-show="true"
                    @click="showConfirmDelete = true"
                    v-if="chucNang == 'sua-tuyen-van-chuyen'"
                ></ElButton>
            </div>
            <ElButton type="primary" @click="onSubmit">Lưu lại</ElButton>
        </div>
    </el-form>
    <ElDialog
        v-model="showConfirmDelete"
        :width="524"
        title="Xác nhận xóa"
        :append-to-body="true"
        align-center
    >
        <p>
            Bạn có chắc chắn muốn xóa thông tin về tuyến vận chuyển này không?
            Dữ liệu của tuyến vận chuyển này sẽ bị xóa vĩnh viễn. Hành động này
            không thể được hoàn tác.
        </p>
        <template #footer>
            <div class="flex items-center justify-end">
                <ElButton @click="showConfirmDelete = false">Hủy</ElButton>
                <ElButton type="danger" @click="xoaTuyenVanChuyen">
                    Xác nhận
                </ElButton>
            </div>
        </template>
    </ElDialog>
</template>
<script>
import Breadcrumb from "@/components/breadcrumb.vue";
import useDanhSachStore from "@/stores/danhSach";
import useBenXeStore from "@/stores/benXe";
import useTuyenVanChuyenStore from "@/stores/tuyenVanChuyen";
import useNhaXeStore from "@/stores/nhaXe";
import {
    DxDataGrid,
    DxColumn,
    DxEditing,
    DxPaging,
    DxRequiredRule,
    DxStringLengthRule,
} from "devextreme-vue/data-grid";
export default {
    components: {
        Breadcrumb,
        DxDataGrid,
        DxColumn,
        DxEditing,
        DxPaging,
        DxRequiredRule,
        DxStringLengthRule,
    },
    setup() {
        const danhSachStore = useDanhSachStore();
        const benXeStore = useBenXeStore();
        const tuyenVanChuyenStore = useTuyenVanChuyenStore();
        const nhaXeStore = useNhaXeStore();
        danhSachStore.getDanhSachTinhThanh();
        tuyenVanChuyenStore.getDanhSachLoaiTuyen();
        nhaXeStore.FindAll();
        return { danhSachStore, benXeStore, tuyenVanChuyenStore, nhaXeStore };
    },
    data() {
        return {
            breadcrumbItems: [
                {
                    text: "Quản lý tuyến vận chuyển",
                    path: "/quan-ly-thong-tin/tuyen-van-chuyen",
                    disabled: false,
                },
                {
                    text: "Thêm tuyến vận chuyển",
                    disabled: true,
                },
            ],
            tuyenVanChuyen: {
                id: null,
                idTinhDi: null,
                idBenDi: null,
                idTinhDen: null,
                idBenDen: null,
                idLoaiTuyen: null,
                maTuyen: null,
                hanhTrinhChay: null,
                nhaXe: [],
                cuLy: null,
                danhSachThoiGianXuatBen: [],
                danhSachDiemDungNghi: [],
                trangThai: "Đang hoạt động",
            },
            rules: {
                idTinhDi: [
                    {
                        required: true,
                        message: "Tỉnh đi không được bỏ trống!",
                        trigger: "blur",
                    },
                ],
                idBenDi: [
                    {
                        required: true,
                        message: "Bến đi không được bỏ trống!",
                        trigger: "blur",
                    },
                    {
                        validator: (rule, value, callback) => {
                            if (value == this.tuyenVanChuyen.idBenDen) {
                                callback(
                                    new Error(
                                        "Bến đi không được trùng với bến đến"
                                    )
                                );
                            } else callback();
                        },
                        trigger: "blur",
                    },
                ],
                idTinhDen: [
                    {
                        required: true,
                        message: "Tỉnh đến không được bỏ trống!",
                        trigger: "blur",
                    },
                ],
                idBenDen: [
                    {
                        required: true,
                        message: "Bến đến không được bỏ trống!",
                        trigger: "blur",
                    },
                    {
                        validator: (rule, value, callback) => {
                            if (value === this.tuyenVanChuyen.idBenDi) {
                                callback(
                                    new Error(
                                        "Bến đến không được trùng với bến đi"
                                    )
                                );
                            } else callback();
                        },
                        trigger: "blur",
                    },
                ],
                idLoaiTuyen: [
                    {
                        required: true,
                        message: "Loại tuyến không được bỏ trống!",
                        trigger: "blur",
                    },
                ],
                hanhTrinhChay: [
                    {
                        required: true,
                        message: "Hành trình chạy không được bỏ trống!",
                        trigger: "blur",
                    },
                ],
                cuLy: [
                    {
                        required: true,
                        message: "Cự ly không được bỏ trống!",
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
            },
            danhSachBenDi: [],
            danhSachBenDen: [],
            trangThai: true,
            showConfirmDelete: false,
            chucNang: "them-tuyen-van-chuyen",
        };
    },
    methods: {
        async handleChonTinhDi(id) {
            try {
                loading.start();
                this.tuyenVanChuyen.maTuyen = null;
                this.tuyenVanChuyen.idBenDi = null;
                const result = await this.benXeStore.FindAllByIdTinhThanh(id);
                if (result.status) {
                    this.danhSachBenDi = result.data;
                }
            } catch (error) {
                console.log(error);
            } finally {
                loading.stop();
            }
        },
        async handleChonTinhDen(id) {
            try {
                loading.start();
                this.tuyenVanChuyen.maTuyen = null;
                this.tuyenVanChuyen.idBenDen = null;
                const result = await this.benXeStore.FindAllByIdTinhThanh(id);
                if (result.status) {
                    this.danhSachBenDen = result.data;
                }
            } catch (error) {
                console.log(error);
            } finally {
                loading.stop();
            }
        },
        handleTaoMaTuyen() {
            const maTinhDi = this.danhSachStore.danhSachTinhThanh.find(
                (item) => item.id == this.tuyenVanChuyen.idTinhDi
            ).maTinh;
            const maTinhDen = this.danhSachStore.danhSachTinhThanh.find(
                (item) => item.id == this.tuyenVanChuyen.idTinhDen
            ).maTinh;
            const maBenDi = this.danhSachBenDi.find(
                (item) => item.id == this.tuyenVanChuyen.idBenDi
            ).maBenXe;
            const maBenDen = this.danhSachBenDen.find(
                (item) => item.id == this.tuyenVanChuyen.idBenDen
            ).maBenXe;
            if (maTinhDi > maTinhDen) {
                this.tuyenVanChuyen.maTuyen = `${maTinhDen}${maTinhDi}.${maBenDen}${maBenDi}`;
            } else if (maTinhDi == maTinhDen) {
                const temp =
                    maBenDi > maBenDen
                        ? `${maBenDen}${maBenDi}`
                        : `${maBenDi}${maBenDen}`;
                this.tuyenVanChuyen.maTuyen = `${maTinhDi}${maTinhDen}.${temp}`;
            } else {
                this.tuyenVanChuyen.maTuyen = `${maTinhDi}${maTinhDen}.${maBenDi}${maBenDen}`;
            }
        },
        setTrangThai(value) {
            this.tuyenVanChuyen.trangThai = value
                ? "Đang hoạt động"
                : "Ngừng hoạt động";
        },
        clearValidate(prop) {
            this.$refs.tuyenVanChuyenForm.clearValidate(prop);
        },
        async themTuyenVanChuyen() {
            try {
                loading.start();
                const result = await this.tuyenVanChuyenStore.Insert(
                    this.tuyenVanChuyen
                );
                if (result.status) {
                    message("success", result.message);
                    this.$router.push({ name: "quan-ly-tuyen-van-chuyen" });
                } else message("error", result.message);
            } catch (error) {
                console.log(error);
                message(
                    "error",
                    "Thêm tuyến vận chuyển thất bại! Lỗi hệ thống."
                );
            } finally {
                loading.stop();
            }
        },
        async getChiTietTuyenVanChuyen(id) {
            try {
                loading.start();
                const result = await this.tuyenVanChuyenStore.FindById(id);
                if (result.status && result.data) {
                    const { data: danhSachbenDi } =
                        await this.benXeStore.FindAllByIdTinhThanh(
                            result.data.idTinhDi
                        );
                    const { data: danhSachBenDen } =
                        await this.benXeStore.FindAllByIdTinhThanh(
                            result.data.idTinhDen
                        );
                    this.danhSachBenDi = danhSachbenDi;
                    this.danhSachBenDen = danhSachBenDen;
                    const danhSachThoiGianXuatBen =
                        result.data.danhSachThoiGianXuatBen.map((item) =>
                            JSON.parse(item)
                        );
                    const danhSachDiemDungNghi =
                        result.data.danhSachDiemDungNghi.map((item) =>
                            JSON.parse(item)
                        );

                    this.tuyenVanChuyen = {
                        ...result.data,
                        danhSachThoiGianXuatBen,
                        danhSachDiemDungNghi,
                    };
                    this.trangThai = result.data.trangThai == "Đang hoạt động";
                } else {
                    message("error", result.message);
                }
            } catch (error) {
                console.log(error);
                message(
                    "error",
                    "Lấy chi tiết tuyến vận chuyển thất bại! Lỗi hệ thống"
                );
            } finally {
                loading.stop();
            }
        },
        async suaTuyenVanChuyen() {
            try {
                loading.start();
                const result = await this.tuyenVanChuyenStore.Update(
                    this.tuyenVanChuyen
                );
                if (result.status) {
                    message("success", result.message);
                    this.$router.push({ name: "quan-ly-tuyen-van-chuyen" });
                } else message("error", result.message);
            } catch (error) {
                console.log(error);
                message(
                    "error",
                    "Cập nhật thông tin tuyến vận chuyển thất bại! Lỗi hệ thống."
                );
            } finally {
                loading.stop();
            }
        },
        onSubmit() {
            this.$refs.tuyenVanChuyenForm.validate((valid) => {
                if (valid) {
                    if (this.tuyenVanChuyen.danhSachThoiGianXuatBen.length) {
                        if (this.chucNang == "them-tuyen-van-chuyen")
                            this.themTuyenVanChuyen();
                        else this.suaTuyenVanChuyen();
                    } else {
                        message(
                            "error",
                            "Vui lòng thiết lập thời gian xuất bến!"
                        );
                    }
                } else return false;
            });
        },
        async xacDinhChucNang() {
            if (this.$route.name == "sua-tuyen-van-chuyen") {
                this.chucNang = this.$route.name;
                if (this.$route?.query?.id) {
                    this.breadcrumbItems[1].text = "Sửa thông tin";
                    this.getChiTietTuyenVanChuyen(this.$route.query.id);
                } else {
                    message("error", "Vui lòng cung cấp ID tuyến vận chuyển");
                }
            }
        },
        async xoaTuyenVanChuyen() {
            try {
                loading.start();
                const result = await this.tuyenVanChuyenStore.DeleteByID(
                    this.tuyenVanChuyen.id
                );
                if (result.status) {
                    this.showConfirmDelete = false;
                    message("success", result.message);
                    this.$router.push({ name: "quan-ly-tuyen-van-chuyen" });
                } else message("error", result.message);
            } catch (error) {
                message(
                    "error",
                    "Xóa tuyến vận chuyển thất bại! Lỗi hệ thống."
                );
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
</style>
<style lang="scss" scoped>
:deep(.el-form-item__label) {
    margin-bottom: 6px !important;
}
:deep(.dx-datagrid-addrow-button) {
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 99;
}
:deep(.dx-datagrid-header-panel) {
    height: 12px;
}
</style>