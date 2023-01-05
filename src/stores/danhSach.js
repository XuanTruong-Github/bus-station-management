import { defineStore } from "pinia";
import supabase from "@/plugins/supabase";

export default defineStore("danhSach", {
  state: () => ({
    danhSachTinhThanh: [],
    danhSachQuanHuyen: [],
    danhSachLoaiBenXe: [],
    danhSachChucVu: [],
    danhSachHangGPLX: [],
  }),
  actions: {
    async getDanhSachTinhThanh() {
      loading.start();
      const { data, error } = await supabase.from("tinhThanhPho").select();
      if (error) {
        console.log("Error: ", error);
        message("error", "Lấy danh sách tỉnh thành thất bại!");
      } else this.danhSachTinhThanh = data;
      loading.stop();
    },
    async getDanhSachQuanHuyen(id) {
      loading.start();
      const { data, error } = await supabase
        .from("quanHuyenThiXa")
        .select()
        .eq("idTinhThanh", id);
      if (error) {
        console.log("Error: ", error);
        message("error", "Lấy danh sách quận huyện thất bại!");
      } else this.danhSachQuanHuyen = data;
      loading.stop();
    },
    async getDanhSachLoaiBenXe() {
      loading.start();
      const { data, error } = await supabase.from("loaiBenXe").select();
      if (error) {
        console.log("Error: ", error);
        message("error", "Lấy danh sách loại bến xe thất bại!");
      } else this.danhSachLoaiBenXe = data;
      loading.stop();
    },
    async getDanhSachChucVu() {
      loading.start();
      const { data, error } = await supabase.from("chucVu").select();
      if (error) {
        console.log("Error: ", error);
        message("error", "Lấy danh sách chức vụ thất bại!");
      } else this.danhSachChucVu = data;
      loading.stop();
    },
    async getDanhSachHangGPLX() {
      loading.start();
      const { data, error } = await supabase.from("hangGPLX").select();
      if (error) {
        console.log("Error: ", error);
        message("error", "Lấy danh sách hãng giấy phép lái xe thất bại!");
      } else this.danhSachHangGPLX = data;
      loading.stop();
    },
  },
});
