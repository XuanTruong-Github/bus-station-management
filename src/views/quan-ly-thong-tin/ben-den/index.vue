<template>
    <Breadcrumb :dataSource="breadcrumbItems" />
    <section class="flex items-center justify-between mb-6">
        <h3 class="uppercase">Danh sách bến đến</h3>
        <div class="">
            <ElButton icon="Refresh" @click="getData"> Tải lại </ElButton>
            <ElButton
                type="primary"
                @click="$router.push({ name: 'them-ben-den' })"
            >
                <template #icon>
                    <i class="text-lg mdi mdi-plus"></i>
                </template>
                Thêm bến đến</ElButton
            >
        </div>
    </section>

    <ElForm
        label-position="top"
        size="large"
        :model="filters"
        scroll-to-error
        class="px-4 pt-4 mb-6 bg-white border border-borderColor rounded"
    >
        <ElRow :gutter="16">
            <ElCol :sm="16" :md="10"
                ><ElFormItem label="Tìm kiếm bến đến" prop="tenBenXe">
                    <ElInput
                        v-model="filters.tenBenXe"
                        :maxlength="200"
                        placeholder="Bến xe Mỹ Đình, Yên Nghĩa, Giáp Bát..."
                    >
                        <template #prefix>
                            <ElIcon class="el-input__icon"><search /></ElIcon>
                        </template>
                    </ElInput>
                </ElFormItem>
            </ElCol>
            <ElCol :sm="8" :md="3" :lg="4">
                <ElFormItem label="Mã bến xe" prop="maBenXe">
                    <ElInput
                        v-model="filters.maBenXe"
                        type="number"
                        :min="0"
                        :max="1000"
                        placeholder="10"
                    >
                        <template #prefix>
                            <ElIcon class="el-input__icon"><search /></ElIcon>
                        </template>
                    </ElInput>
                </ElFormItem>
            </ElCol>
            <ElCol :sm="12" :md="5" :lg="4">
                <ElFormItem label="Loại bến xe" prop="loaiBenXe">
                    <ElSelect
                        placeholder="Chọn loại bến xe"
                        class="w-full"
                        no-data-text="Không có dữ liệu"
                        no-match-text="Không tìm thấy"
                        default-first-option
                        filterable
                        v-model="filters.loaiBenXe"
                    >
                        <ElOption
                            v-for="item in danhSachStore.danhSachLoaiBenXe"
                            :label="item.loaiBen"
                            :value="item.id"
                            :key="item.id"
                        />
                    </ElSelect>
                </ElFormItem>
            </ElCol>
            <ElCol :sm="12" :md="6">
                <ElFormItem label="Tỉnh thành" prop="idLoaiBenXe">
                    <ElSelect
                        placeholder="Chọn tỉnh/thành phố"
                        class="w-full"
                        no-data-text="Không có dữ liệu"
                        no-match-text="Không tìm thấy"
                        default-first-option
                        filterable
                        v-model="filters.tinhThanh"
                    >
                        <ElOption
                            v-for="item in danhSachStore.danhSachTinhThanh"
                            :label="item.tenTinh"
                            :value="item.id"
                            :key="item.id"
                        />
                    </ElSelect>
                </ElFormItem>
            </ElCol>
        </ElRow>
    </ElForm>

    <ElTable
        :data="table.records"
        :load="table.loading"
        style="width: 100%"
        :lazy="true"
        border
        row-key="id"
        empty-text="Không có bến đến nào!"
        @row-dblclick="rowClick"
    >
        <ElTableColumn
            label="STT"
            type="index"
            align="center"
            :width="70"
            fixed
            :index="(index) => index + 1"
        />
        <ElTableColumn
            label="Mã bến xe"
            prop="maBenXe"
            align="center"
            :width="100"
            fixed
        />
        <ElTableColumn label="Tên bến xe" prop="tenBenXe" :width="300" />
        <ElTableColumn
            label="Tỉnh thành"
            prop="tinhThanhPho.tenTinh"
            :width="200"
        />
        <ElTableColumn
            label="Loại bến"
            prop="loaiBenXe.loaiBen"
            align="center"
            :width="120"
        />
        <ElTableColumn label="Email" prop="email" :width="300" />
        <ElTableColumn label="Địa chỉ" prop="diaChi">
            <template #default="{ row }">{{ customDiaChi(row) }}</template>
        </ElTableColumn>
    </ElTable>
    <div
        class="flex items-center justify-between p-4 mt-4 bg-white border border-borderColor rounded"
        v-if="table.pagination.total"
    >
        <ElButton icon="Download" @click="exportExcel"
            >Xuất File Excel
        </ElButton>
        <ElPagination
            layout="prev, pager, next"
            :page-size="table.pagination.limit"
            :total="table.pagination.total"
            @current-change="setPage"
        />
    </div>
</template>
<script>
import Breadcrumb from "@/components/breadcrumb.vue";
import supabase from "@/plugins/supabase";
import useDanhSachStore from "@/stores/danhSach";

export default {
    components: {
        Breadcrumb,
    },
    setup() {
        const danhSachStore = useDanhSachStore();
        danhSachStore.getDanhSachTinhThanh();
        danhSachStore.getDanhSachLoaiBenXe();
        return {
            danhSachStore,
        };
    },
    data() {
        return {
            breadcrumbItems: [
                {
                    text: "Quản lý bến đến",
                    disabled: true,
                },
            ],
            table: {
                loading: false,
                records: [],
                pagination: {
                    limit: 20,
                    page: 1,
                    total: 0,
                },
            },
            filters: {
                tenBenXe: "",
                maBenXe: "",
                loaiBenXe: "",
                tinhThanh: "",
            },
        };
    },
    methods: {
        customDiaChi({ diaChi, quanHuyenThiXa }) {
            if (diaChi && quanHuyenThiXa) {
                return `${diaChi}, ${quanHuyenThiXa?.tenHuyen}`;
            } else if (diaChi == null && quanHuyenThiXa) {
                return quanHuyenThiXa.tenHuyen;
            } else return "";
        },
        rowClick({ id }) {
            this.$router.push({ name: "sua-ben-den", query: { id } });
        },
        setPage(page) {
            this.table.pagination.page = page;
            this.getData();
        },
        exportExcel() {
            loading.start();
            loading.stop();
        },
        async getData() {
            loading.start();
            const query =
                "*,loaiBenXe(loaiBen),tinhThanhPho(tenTinh),quanHuyenThiXa(tenHuyen)";
            const { from, to } = helpers.getPagination(
                this.table.pagination.page,
                this.table.pagination.limit
            );
            const { data, error, count } = await supabase
                .from("benXe")
                .select(query, { count: "exact" })
                .range(from, to);
            if (error) {
                console.log("Error: ", error);
                message("error", "Lấy danh sách bến xe thất bại! Lỗi hệ thống");
            } else {
                this.table.records = data;
                this.table.pagination.total = count;
            }
            loading.stop();
        },
    },
    created() {
        this.getData();
    },
};
</script>
<style scoped>
>>> .el-form-item__label {
    font-weight: 600;
}
</style>
