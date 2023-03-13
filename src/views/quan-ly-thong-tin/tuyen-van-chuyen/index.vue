<template>
  <Breadcrumb :dataSource="breadcrumbItems" class="mb-4" />
  <section class="flex items-center justify-between mb-4">
    <div class="flex">
      <el-button icon="Refresh" @click="store.FindAll"> Tải lại </el-button>
      <el-button
        icon="Download"
        @click="exportExcel"
        :disabled="store.danhSachTuyenVanChuyen == 0"
      >
        Excel
      </el-button>
    </div>
    <el-button
      type="primary"
      @click="$router.push({ name: 'them-tuyen-van-chuyen' })"
    >
      <template #icon>
        <i class="text-lg mdi mdi-plus"></i>
      </template>
      Thêm tuyến vận chuyển</el-button
    >
  </section>
  <DxDataGrid
    ref="tuyenVanChuyenTable"
    class="table-page"
    :show-borders="true"
    :data-source="store.danhSachTuyenVanChuyen"
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
      caption="Mã tuyến"
      dataField="maTuyen"
      :allowFiltering="true"
      :allowSorting="false"
      :allowHeaderFiltering="false"
      :fixed="true"
    ></DxColumn>
    <DxColumn
      caption="Tên tuyến"
      dataField="hanhTrinhChay"
      :allowFiltering="true"
      :allowSorting="false"
      :allowHeaderFiltering="false"
      alignment="left"
    ></DxColumn>
    <DxColumn
      caption="Loại tuyến"
      dataField="loaiTuyenVanChuyen.loaiTuyen"
      :allowFiltering="false"
      :allowSorting="false"
      :allowHeaderFiltering="true"
      alignment="left"
    ></DxColumn>
    <DxColumn
      caption="Bến đi"
      dataField="benDi.tenBenXe"
      :allowFiltering="true"
      :allowSorting="false"
      :allowHeaderFiltering="true"
      alignment="left"
    ></DxColumn>
    <DxColumn
      caption="Bến đến"
      dataField="benDen.tenBenXe"
      :allowFiltering="true"
      :allowSorting="false"
      :allowHeaderFiltering="true"
      alignment="left"
    ></DxColumn>
    <DxColumn
      caption="Cự ly (km)"
      dataField="cuLy"
      :allowFiltering="true"
      :allowSorting="false"
      :allowHeaderFiltering="false"
      alignment="right"
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
import useTuyenVanChuyenStore from "@/stores/tuyenVanChuyen";

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
    const tuyenVanChuyenTable = ref(null);
    const breadcrumbItems = ref([
      {
        text: "Quản lý tuyến vận chuyển",
        disabled: true,
      },
    ]);
    const store = useTuyenVanChuyenStore();
    const exportExcel = () => {
      loading.start();

      loading.stop();
    };
    const rowClick = ({ key }) => {
      router.push({
        name: "sua-tuyen-van-chuyen",
        query: { id: key },
      });
    };
    const customSTT = (column) => {
      return store.danhSachTuyenVanChuyen.indexOf(column) + 1;
    };
    store.FindAll();
    return {
      breadcrumbItems,
      exportExcel,
      rowClick,
      store,
      customSTT,
      tuyenVanChuyenTable,
    };
  },
};
</script>

<style></style>
