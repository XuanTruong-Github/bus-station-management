<template>
  <Breadcrumb :dataSource="breadcrumbItems" class="mb-4" />
  <section class="flex items-center justify-between mb-4">
    <div class="flex">
      <el-button icon="Refresh" @click="laiXeStore.FindAll">
        Tải lại
      </el-button>
      <el-button
        icon="Download"
        @click="exportExcel"
        :disabled="laiXeStore.danhSachLaiXe.length == 0"
      >
        Excel
      </el-button>
    </div>
    <el-button type="primary" @click="$router.push({ name: 'them-tai-xe' })">
      <template #icon>
        <i class="text-lg mdi mdi-plus"></i>
      </template>
      Thêm lái xe</el-button
    >
  </section>
  <DxDataGrid
    ref="laiXeTable"
    class="table-page"
    :show-borders="true"
    :data-source="laiXeStore.danhSachLaiXe"
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
      caption="Họ tên"
      dataField="hoTen"
      :allowFiltering="true"
      :allowHeaderFiltering="false"
      :allowSorting="true"
      :fixed="true"
      :minWidth="250"
    ></DxColumn>
    <DxColumn
      caption="Số CCCD/CMND"
      dataField="soCCCD"
      :allowFiltering="true"
      :allowHeaderFiltering="false"
      :allowSorting="false"
      alignment="left"
      :width="170"
    ></DxColumn>
    <DxColumn
      caption="Số giấy phép lái xe"
      dataField="soGPLX"
      :allowFiltering="true"
      :allowHeaderFiltering="false"
      :allowSorting="false"
      alignment="left"
      :width="200"
    ></DxColumn>
    <DxColumn
      caption="Hạng giấy phép lái xe"
      dataField="hangGPLX.tenHangGPLX"
      :allowFiltering="false"
      :allowHeaderFiltering="true"
      :allowSorting="false"
      alignment="center"
      :width="190"
    ></DxColumn>
    <DxColumn
      caption="Số điện thoại"
      dataField="soDienThoai"
      :allowFiltering="true"
      :allowHeaderFiltering="false"
      :allowSorting="false"
      :minWidth="150"
      alignment="left"
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
import useLaiXeStore from "@/stores/laiXe";

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
        text: "Quản lý thông tin tài xế",
        disabled: true,
      },
    ]);
    const laiXeTable = ref(null);
    const laiXeStore = useLaiXeStore();

    const customSTT = (column) => {
      return laiXeStore.danhSachLaiXe.indexOf(column) + 1;
    };
    const exportExcel = () => {
      loading.start();

      loading.stop();
    };
    const rowClick = ({ key }) => {
      router.push({
        name: "sua-tai-xe",
        query: { id: key },
      });
    };
    laiXeStore.FindAll();
    return {
      breadcrumbItems,
      laiXeTable,
      laiXeStore,
      customSTT,
      exportExcel,
      rowClick,
    };
  },
};
</script>
