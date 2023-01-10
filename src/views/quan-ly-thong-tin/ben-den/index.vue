<template>
    <Breadcrumb :dataSource="breadcrumbItems" />
    <section class="flex items-center justify-between my-4">
        <div class="flex">
            <el-button icon="Refresh" @click="store.FindAll">
                Tải lại
            </el-button>
            <el-button icon="Download" @click="exportExcel"> Excel </el-button>
        </div>
        <el-button
            type="primary"
            @click="$router.push({ name: 'them-ben-den' })"
        >
            <template #icon>
                <i class="mdi mdi-plus text-lg"></i>
            </template>
            Thêm bến đến</el-button
        >
    </section>
    <DxDataGrid
        ref="benDenTable"
        class="table-page"
        :show-borders="true"
        :data-source="store.danhSachBenXe"
        :remote-operations="true"
        :allow-column-resizing="true"
        :column-auto-width="true"
        :showRowLines="true"
        :showColumnLines="true"
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
            caption="Mã bến xe"
            dataField="maBenXe"
            :allowHeaderFiltering="false"
            :allowFiltering="true"
            :allowSorting="true"
            alignment="center"
            :width="100"
            :fixed="true"
        ></DxColumn>
        <DxColumn
            dataField="tenBenXe"
            caption="Tên bến xe"
            alignment="left"
            :allowHeaderFiltering="false"
            :allowSorting="false"
            :width="300"
        ></DxColumn>

        <DxColumn
            dataField="tinhThanhPho.tenTinh"
            :allowSorting="true"
            caption="Tỉnh thành"
            alignment="left"
            :width="200"
        ></DxColumn>
        <DxColumn
            dataField="loaiBenXe.loaiBen"
            :allowSorting="true"
            caption="Loại bến"
            alignment="left"
            :width="120"
        ></DxColumn>
        <DxColumn
            caption="Email"
            dataField="email"
            :allowSorting="false"
            :allowHeaderFiltering="false"
            alignment="left"
            :width="300"
        ></DxColumn>
        <DxColumn
            caption="Địa chỉ"
            dataField="diaChi"
            :allowHeaderFiltering="false"
            :allowSorting="false"
            alignment="left"
            :minWidth="300"
            :calculate-cell-value="customDiaChi"
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
    DxColumn,
    DxPager,
} from "devextreme-vue/data-grid";
import { ref } from "vue";
import { useRouter } from "vue-router";
import useBenXeStore from "@/stores/benXe";

export default {
    components: {
        Breadcrumb,
        DxDataGrid,
        DxPaging,
        DxScrolling,
        DxColumnFixing,
        DxHeaderFilter,
        DxFilterRow,
        DxColumn,
        DxPager,
    },
    setup() {
        const router = useRouter();
        const benDenTable = ref(null);
        const breadcrumbItems = [
            {
                text: "Quản lý bến đến",
                disabled: true,
            },
        ];
        const store = useBenXeStore();
        const customSTT = (column) => {
            return store.danhSachBenXe.indexOf(column) + 1;
        };
        const customDiaChi = ({ diaChi, quanHuyenThiXa }) => {
            if (diaChi && quanHuyenThiXa) {
                return `${diaChi}, ${quanHuyenThiXa?.tenHuyen}`;
            } else if (diaChi == null && quanHuyenThiXa) {
                return quanHuyenThiXa.tenHuyen;
            } else return "";
        };
        const rowClick = ({ key }) => {
            router.push({ name: "sua-ben-den", query: { id: key } });
        };
        const exportExcel = () => {
            loading.start();
            const init = {
                Element: benDenTable.value.instance,
                FileName: "Danh-Sach-Ben-Den",
                WorkSheet: "Danh sách bến đến",
            };
            helpers.excel(init).Export();
            loading.stop();
        };

        store.FindAll();
        return {
            breadcrumbItems,
            exportExcel,
            benDenTable,
            store,
            customSTT,
            customDiaChi,
            rowClick,
        };
    },
};
</script>
