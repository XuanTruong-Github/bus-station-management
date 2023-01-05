import { defineStore } from "pinia";
import supabase from "@/plugins/supabase";
export default defineStore("tuyenVanChuyen", {
  state: () => ({
    danhSachLoaiTuyenVanChuyen: [],
    danhSachTuyenVanChuyen: [],
  }),
  actions: {
    async getDanhSachLoaiTuyen() {
      loading.start();
      const { data, error } = await supabase
        .from("loaiTuyenVanChuyen")
        .select();
      if (error) {
        console.log("Error: ", error);
        loading.stop();
        message(
          "error",
          "Lấy danh sách loại tuyến vận chuyển thất bại! lỗi hệ thống"
        );
      } else {
        this.danhSachLoaiTuyenVanChuyen = data;
        loading.stop();
      }
    },
    async FindAll() {
      loading.start();
      const { data, error } = await supabase
        .from("tuyenVanChuyen")
        .select(
          "id,maTuyen,hanhTrinhChay,loaiTuyenVanChuyen(loaiTuyen),benDi:tuyenVanChuyen_idBenDi_fkey(tenBenXe),benDen:tuyenVanChuyen_idBenDen_fkey(tenBenXe),cuLy,trangThai"
        );
      if (error) {
        console.log("Error: ", error);
        loading.stop();
        message(
          "error",
          "Lấy danh sách tuyến vận chuyển thất bại! lỗi hệ thống"
        );
      } else {
        this.danhSachTuyenVanChuyen = data;
        loading.stop();
      }
    },
    async FindById(id) {
      const { data, error } = await supabase
        .from("tuyenVanChuyen")
        .select()
        .eq("id", id)
        .limit(1)
        .single();
      if (error) {
        console.log("Error: ", error);
        return {
          status: false,
          message: "Lấy chi tiết tuyến vận chuyển thất bại! Lỗi hệ thống",
        };
      } else {
        return {
          status: true,
          data,
        };
      }
    },
    async Insert(tuyenVanChuyen) {
      const payload = {
        maTuyen: tuyenVanChuyen.maTuyen,
        idLoaiTuyen: tuyenVanChuyen.idLoaiTuyen,
        idTinhDi: tuyenVanChuyen.idTinhDi,
        idBenDi: tuyenVanChuyen.idBenDi,
        idTinhDen: tuyenVanChuyen.idTinhDen,
        idBenDen: tuyenVanChuyen.idBenDen,
        nhaXe: tuyenVanChuyen.nhaXe,
        hanhTrinhChay: tuyenVanChuyen.hanhTrinhChay,
        cuLy: tuyenVanChuyen.cuLy,
        danhSachThoiGianXuatBen: tuyenVanChuyen.danhSachThoiGianXuatBen,
        danhSachDiemDungNghi: tuyenVanChuyen.danhSachDiemDungNghi,
        trangThai: tuyenVanChuyen.trangThai,
      };
      const { error } = await supabase.from("tuyenVanChuyen").insert([payload]);
      if (error) {
        console.log("Error: ", error);
        return {
          status: false,
          message:
            "Thêm tuyến vận chuyển thất bại! Mã tuyến đã tồn tại trong hệ thống.",
        };
      } else {
        return {
          status: true,
          message: "Thêm tuyến vận chuyển thành công",
        };
      }
    },
    async Update(tuyenVanChuyen) {
      const payload = {
        maTuyen: tuyenVanChuyen.maTuyen,
        idLoaiTuyen: tuyenVanChuyen.idLoaiTuyen,
        idTinhDi: tuyenVanChuyen.idTinhDi,
        idBenDi: tuyenVanChuyen.idBenDi,
        idTinhDen: tuyenVanChuyen.idTinhDen,
        idBenDen: tuyenVanChuyen.idBenDen,
        nhaXe: tuyenVanChuyen.nhaXe,
        hanhTrinhChay: tuyenVanChuyen.hanhTrinhChay,
        cuLy: tuyenVanChuyen.cuLy,
        danhSachThoiGianXuatBen: tuyenVanChuyen.danhSachThoiGianXuatBen,
        danhSachDiemDungNghi: tuyenVanChuyen.danhSachDiemDungNghi,
        trangThai: tuyenVanChuyen.trangThai,
      };
      const { error } = await supabase
        .from("tuyenVanChuyen")
        .update(payload)
        .eq("id", tuyenVanChuyen.id);
      if (error) {
        console.log("Error: ", error);
        return {
          status: false,
          message:
            "Cập nhật thông tin tuyến vận chuyển thất bại! Mã tuyến đã tồn tại trong hệ thống.",
        };
      } else {
        return {
          status: true,
          message: "Cập nhật thông tin tuyến vận chuyển thành công",
        };
      }
    },
    async DeleteByID(id) {
      const { error } = await supabase
        .from("tuyenVanChuyen")
        .delete()
        .eq("id", id);
      if (error) {
        console.log("Error: ", error);
        return {
          status: false,
          message: "Xóa tuyến vận chuyển thất bại! Lỗi hệ thống",
        };
      } else {
        return {
          status: true,
          message: "Xóa tuyến vận chuyển thành công",
        };
      }
    },
  },
});
