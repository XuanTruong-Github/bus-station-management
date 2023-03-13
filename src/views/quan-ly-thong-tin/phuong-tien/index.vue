<template>
    <Breadcrumb :dataSource="breadcrumbItems" class="mb-4" />
    <section class="flex items-center justify-between mb-4">
        <div class="flex">
            <ElButton icon="Refresh" @click="store.FindAll"> Tải lại </ElButton>
            <ElButton
                icon="Download"
                @click="exportExcel"
                :disabled="store.danhSachPhuongTien.length == 0"
            >
                Excel
            </ElButton>
        </div>
        <ElButton
            type="primary"
            @click="$router.push({ name: 'them-phuong-tien' })"
        >
            <template #icon>
                <i class="text-lg mdi mdi-plus"></i>
            </template>
            Thêm phương tiện</ElButton
        >
    </section>
    <DxDataGrid
        ref="phuongTienTable"
        class="table-page"
        :show-borders="true"
        :data-source="store.danhSachPhuongTien"
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
            caption="Biển kiểm soát"
            dataField="bienKiemSoat"
            :allowFiltering="true"
            :allowSorting="false"
            :allowHeaderFiltering="false"
            :fixed="true"
        ></DxColumn>
        <DxColumn
            caption="Loại xe"
            dataField="loaiPhuongTien.tenLoai"
            :allowFiltering="false"
            :allowSorting="false"
            :allowHeaderFiltering="true"
            :width="150"
            alignment="left"
        ></DxColumn>
        <DxColumn
            caption="Số ghế"
            dataField="soGhe"
            :allowFiltering="false"
            :allowSorting="true"
            :allowHeaderFiltering="false"
            alignment="center"
            :width="100"
        ></DxColumn>
        <DxColumn
            caption="Số giường"
            dataField="soGiuong"
            :allowFiltering="false"
            :allowSorting="true"
            :allowHeaderFiltering="false"
            alignment="center"
            :width="100"
        ></DxColumn>
        <DxColumn
            caption="Hạn bảo hiểm xe"
            dataField="hanBaoHiemXe"
            :allowFiltering="true"
            :allowSorting="true"
            :allowHeaderFiltering="false"
            alignment="left"
            :width="150"
            format="dd/MM/yyyy"
            dataType="date"
        ></DxColumn>
        <DxColumn
            caption="Hạn đăng kiểm xe"
            dataField="hanDangKiemXe"
            :allowFiltering="true"
            :allowSorting="true"
            :allowHeaderFiltering="false"
            alignment="left"
            :width="150"
            format="dd/MM/yyyy"
            dataType="date"
        ></DxColumn>
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
import usePhuongTienStore from "@/stores/phuongTien";
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
        const phuongTienTable = ref(null);
        const breadcrumbItems = ref([
            {
                text: "Quản lý thông tin xe",
                disabled: true,
            },
        ]);
        const store = usePhuongTienStore();

        const exportExcel = () => {
            loading.start();

            loading.stop();
        };
        const rowClick = ({ key }) => {
            router.push({
                name: "sua-phuong-tien",
                query: { id: key },
            });
        };
        const customSTT = (column) => {
            return store.danhSachPhuongTien.indexOf(column) + 1;
        };
        store.FindAll();
        return {
            phuongTienTable,
            breadcrumbItems,
            store,
            exportExcel,
            rowClick,
            customSTT,
        };
    },
};
</script>

<style></style>
