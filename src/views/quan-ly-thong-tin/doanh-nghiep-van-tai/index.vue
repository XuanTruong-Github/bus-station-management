<template>
    <Breadcrumb :dataSource="breadcrumbItems" class="mb-4" />
    <section class="flex items-center justify-between mb-4">
        <div class="flex">
            <el-button icon="Refresh" @click="store.FindAll">
                Tải lại
            </el-button>
            <el-button
                icon="Download"
                @click="exportExcel"
                :disabled="!store.danhSachDoanhNghiepVanTai.length"
            >
                Excel
            </el-button>
        </div>
        <el-button
            type="primary"
            @click="$router.push({ name: 'them-doanh-nghiep-van-tai' })"
        >
            <template #icon>
                <i class="mdi mdi-plus text-lg"></i>
            </template>
            Thêm doanh nghiệp vận tải</el-button
        >
    </section>
    <DxDataGrid
        ref="doanhNghiepVanTaiTable"
        class="table-page"
        :show-borders="true"
        :data-source="store.danhSachDoanhNghiepVanTai"
        :remote-operations="true"
        :allow-column-resizing="true"
        :column-auto-width="true"
        :showRowLines="true"
        :hover-state-enabled="true"
        :rowAlternationEnabled="true"
        :loadPanel="{ showIndicator: false, showPane: false, text: '' }"
        height="calc(100vh - 118px)"
        key-expr="id"
        width="100%"
        no-data-text="Không có dữ liệu!"
        :onRowDblClick="rowClick"
    >
        <DxPaging :page-size="30" />
        <DxScrolling mode="standard" row-rendering-mode="standard" />
        <DxColumnFixing :enabled="true" />
        <DxHeaderFilter :visible="true" />
        <DxFilterRow :visible="true" apply-filter="auto" />

        <DxPager
            :visible="true"
            allowed-page-sizes="auto"
            :show-navigation-buttons="true"
        />
        <DxColumn
            caption="STT"
            dataField="stt"
            :allowFiltering="false"
            :allowSorting="false"
            :allowHeaderFiltering="false"
            :fixed="true"
            :width="70"
            alignment="center"
            :calculateCellValue="customSTT"
        ></DxColumn>
        <DxColumn
            caption="Tên doanh nghiệp vận tải"
            dataField="tenDoanhNghiepVanTai"
            :allowFiltering="true"
            :allowHeaderFiltering="false"
            :allowSorting="false"
            alignment="left"
            :width="250"
            :fixed="true"
        ></DxColumn>
        <DxColumn
            caption="Mã số thuế"
            dataField="maSoThue"
            :allowSorting="false"
            :allowFiltering="true"
            :allowHeaderFiltering="false"
            alignment="left"
            :width="180"
        ></DxColumn>
        <DxColumn
            caption="Người đại diện"
            dataField="tenNguoiDaiDien"
            :allowSorting="false"
            :allowHeaderFiltering="false"
            alignment="left"
        ></DxColumn>
        <DxColumn
            caption="Địa chỉ"
            dataField="diaChi"
            :allowSorting="false"
            :allowHeaderFiltering="false"
            alignment="left"
            :minWidth="300"
            :calculate-cell-value="customDiaChi"
        ></DxColumn>
        <DxColumn
            caption="Số xe"
            dataField="soXe"
            :allowSorting="true"
            :allowHeaderFiltering="false"
            alignment="left"
            :width="100"
        ></DxColumn>
        <DxColumn
            caption="Điện thoại"
            dataField="soDienThoai"
            :allowSorting="false"
            alignment="left"
            :allowHeaderFiltering="false"
            :width="150"
        ></DxColumn>

        <DxColumn
            caption="Trạng thái"
            dataField="trangThai"
            :allowSorting="false"
            :allowFiltering="false"
            :allowHeaderFiltering="true"
            alignment="left"
            :fixed="true"
            fixedPosition="right"
            cellTemplate="trangThai"
            :width="150"
        ></DxColumn>
        <template #trangThai="{ data: { data } }">
            <span
                :class="
                    data.trangThai == 'Đang hoạt động'
                        ? 'text-green-500'
                        : 'text-red-500'
                "
                >{{ data.trangThai }}</span
            >
        </template>
    </DxDataGrid>
</template>
<script>
import Breadcrumb from "@/components/breadcrumb.vue";
import {
    DxDataGrid,
    DxPaging,
    DxScrolling,
    DxColumnFixing,
    DxHeaderFilter,
    DxFilterRow,
    DxPager,
    DxColumn,
} from "devextreme-vue/data-grid";
import { ref } from "vue";
import { useRouter } from "vue-router";
import useDoanhNghiepVanTaiStore from "@/stores/doanhNghiepVanTai";
export default {
    components: {
        Breadcrumb,
        DxDataGrid,
        DxPaging,
        DxScrolling,
        DxColumnFixing,
        DxHeaderFilter,
        DxFilterRow,
        DxPager,
        DxColumn,
    },
    setup() {
        const router = useRouter();
        const store = useDoanhNghiepVanTaiStore();
        const doanhNghiepVanTaiTable = ref(null);
        const breadcrumbItems = ref([
            {
                text: "Quản lý doanh nghiệp vận tải",
                disabled: true,
            },
        ]);
        const customSTT = (column) => {
            return store.danhSachDoanhNghiepVanTai.indexOf(column) + 1;
        };
        const customDiaChi = ({ diaChi, quanHuyenThiXa, tinhThanhPho }) => {
            if (diaChi && quanHuyenThiXa && tinhThanhPho)
                return `${diaChi}, ${quanHuyenThiXa?.tenHuyen}, ${tinhThanhPho?.tenTinh}`;
            else if (diaChi == null && quanHuyenThiXa && tinhThanhPho)
                return `${quanHuyenThiXa?.tenHuyen}, ${tinhThanhPho?.tenTinh}`;
            else return "";
        };
        const exportExcel = () => {
            loading.start();
            const init = {
                Element: doanhNghiepVanTaiTable.value.instance,
                FileName: "Danh-Sach-Doanh-Nghiep-Van-Tai",
                WorkSheet: "Danh sách doanh nghiệp vận tải",
            };
            helpers.excel(init).Export();
            loading.stop();
        };

        const rowClick = ({ key }) => {
            router.push({
                name: "sua-doanh-nghiep-van-tai",
                query: { id: key },
            });
        };
        store.FindAll();
        return {
            breadcrumbItems,
            store,
            doanhNghiepVanTaiTable,
            customSTT,
            customDiaChi,
            exportExcel,
            rowClick,
        };
    },
};
</script>
