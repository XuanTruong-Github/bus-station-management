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
                :disabled="store.danhSachNhaXe.length == 0"
            >
                Excel
            </el-button>
        </div>
        <el-button
            type="primary"
            @click="$router.push({ name: 'them-nha-xe' })"
        >
            <template #icon>
                <i class="mdi mdi-plus text-lg"></i>
            </template>
            Thêm nhà xe</el-button
        >
    </section>
    <DxDataGrid
        ref="nhaXeTable"
        class="table-page"
        :show-borders="true"
        :data-source="store.danhSachNhaXe"
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
            caption="Tên nhà xe"
            dataField="tenNhaXe"
            :allowFiltering="true"
            :allowSorting="false"
            :allowHeaderFiltering="false"
            :fixed="true"
            :minWidth="300"
        ></DxColumn>
        <DxColumn
            caption="Số điện thoại"
            dataField="soDienThoai"
            :allowFiltering="true"
            :allowSorting="false"
            :allowHeaderFiltering="false"
            :minWidth="150"
            alignment="left"
        ></DxColumn>
        <DxColumn
            caption="Địa chỉ"
            dataField="diaChi"
            :allowFiltering="true"
            :allowSorting="false"
            :allowHeaderFiltering="false"
            alignment="left"
            :minWidth="300"
        ></DxColumn>
        <DxColumn
            caption="Email"
            dataField="email"
            :allowFiltering="true"
            :allowSorting="false"
            :allowHeaderFiltering="false"
            alignment="left"
            :width="250"
        ></DxColumn>
        <DxColumn
            caption="Trạng thái"
            dataField="trangThai"
            :allowFiltering="false"
            :allowSorting="false"
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
import useNhaXeStore from "@/stores/nhaXe";

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
        const breadcrumbItems = ref([
            {
                text: "Quản lý thông tin nhà xe",
                disabled: true,
            },
        ]);
        const nhaXeTable = ref(null);
        const store = useNhaXeStore();

        const customSTT = (column) => {
            return store.danhSachNhaXe.indexOf(column) + 1;
        };
        const exportExcel = () => {
            loading.start();
            const init = {
                Element: nhaXeTable.value.instance,
                FileName: "Danh-Sach-Nha-Xe",
                WorkSheet: "Danh sách nhà xe",
            };
            helpers.excel(init).Export();
            loading.stop();
        };
        const rowClick = ({ key }) => {
            router.push({
                name: "sua-nha-xe",
                query: { id: key },
            });
        };
        store.FindAll();
        return {
            breadcrumbItems,
            nhaXeTable,
            customSTT,
            exportExcel,
            rowClick,
            store,
        };
    },
};
</script>

