import { defineStore } from "pinia";
import supabase from "@/plugins/supabase";
export default defineStore("laiXe", {
  state: () => ({
    danhSachLaiXe: [],
  }),
  actions: {
    async FindAll() {
      loading.start();
      const { data, error } = await supabase
        .from("laiXe")
        .select("id,hoTen,soCCCD,soGPLX,hangGPLX(tenHangGPLX),soDienThoai");
      if (error) {
        console.log("Error: ", error);
        message("error", "Lấy danh sách lái xe thất bại! lỗi hệ thống");
      } else {
        this.danhSachLaiXe = data;
      }
      loading.stop();
    },
    async FindByID(id) {
      const { data: laiXe, error } = await supabase
        .from("laiXe")
        .select()
        .eq("id", id)
        .limit(1)
        .single();
      if (error) {
        console.log("Error: ", error);
        return {
          status: false,
          message: "Lấy chi tiết lái xe thất bại! Lỗi hệ thống",
        };
      } else {
        return {
          status: true,
          data: laiXe,
        };
      }
    },
    async Insert(laiXe) {
      const payload = {
        soCCCD: laiXe.soCCCD,
        hoTen: laiXe.hoTen,
        soDienThoai: laiXe.soDienThoai,
        soGPLX: laiXe.soGPLX,
        idHangGPLX: laiXe.idHangGPLX,
        thoiGianHieuLucGPLX: laiXe.thoiGianHieuLucGPLX,
        nhaXe: laiXe.nhaXe,
        idTinh: laiXe.idTinh,
        idHuyen: laiXe.idHuyen,
        diaChi: laiXe.diaChi,
      };
      const { error } = await supabase.from("laiXe").insert([payload]);
      if (error) {
        console.log("Error: ", error);
        return {
          status: false,
          message:
            "Thêm lái xe thất bại! Số CCCD/CMND đã tồn tại trong hệ thống",
        };
      } else {
        return {
          status: true,
          message: "Thêm lái xe thành công",
        };
      }
    },
    async Update(laiXe) {
      const payload = {
        soCCCD: laiXe.soCCCD,
        hoTen: laiXe.hoTen,
        soDienThoai: laiXe.soDienThoai,
        soGPLX: laiXe.soGPLX,
        idHangGPLX: laiXe.idHangGPLX,
        thoiGianHieuLucGPLX: laiXe.thoiGianHieuLucGPLX,
        nhaXe: laiXe.nhaXe,
        idTinh: laiXe.idTinh,
        idHuyen: laiXe.idHuyen,
        diaChi: laiXe.diaChi,
      };
      const { error } = await supabase
        .from("laiXe")
        .update(payload)
        .eq("id", laiXe.id);
      if (error) {
        console.log("Error: ", error);
        return {
          status: false,
          message:
            "Cập nhật thông tin lái xe thất bại! Số CCCD/CMND đã tồn tại trong hệ thống.",
        };
      } else {
        return {
          status: true,
          message: "Cập nhật thông tin lái xe thành công",
        };
      }
    },
    async DeleteByID(id) {
      const { error } = await supabase.from("laiXe").delete().eq("id", id);
      if (error) {
        console.log("Error: ", error);
        return {
          status: false,
          message: "Xóa lái xe thất bại! Lỗi hệ thống",
        };
      } else {
        return {
          status: true,
          message: "Xóa lái xe thành công",
        };
      }
    },
  },
});
