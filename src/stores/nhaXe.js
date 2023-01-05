import { defineStore } from "pinia";
import supabase from "@/plugins/supabase";
export default defineStore("nhaXe", {
  state: () => ({
    danhSachNhaXe: [],
  }),
  actions: {
    async FindAll() {
      loading.start();
      const { data, error } = await supabase
        .from("nhaXe")
        .select("id,tenNhaXe,soDienThoai,diaChi,email,trangThai");
      if (error) {
        console.log("Error: ", error);
        loading.stop();
        message("error", "Lấy danh sách nhà xe thất bại! lỗi hệ thống");
      } else {
        this.danhSachNhaXe = data;
        loading.stop();
      }
    },
    async FindByID(id) {
      const { data, error } = await supabase
        .from("nhaXe")
        .select()
        .eq("id", id)
        .limit(1)
        .single();
      if (error) {
        console.log("Error: ", error);
        return {
          status: false,
          message: "Lấy chi tiết nhà xe thất bại! Lỗi hệ thống",
        };
      } else {
        return {
          status: true,
          data,
        };
      }
    },
    async Insert(nhaXe) {
      const payload = {
        tenNhaXe: nhaXe.tenNhaXe,
        email: nhaXe.email,
        soDienThoai: nhaXe.soDienThoai,
        tenNguoiDaiDien: nhaXe.tenNguoiDaiDien,
        diaChi: nhaXe.diaChi,
        idDoanhNghiepVanTai: nhaXe.idDoanhNghiepVanTai,
        trangThai: nhaXe.trangThai,
      };
      const { error } = await supabase.from("nhaXe").insert([payload]);
      if (error) {
        console.log("Error: ", error);
        return {
          status: false,
          message: "Thêm nhà xe thất bại! Mã số thuế đã tồn tại trong hệ thống",
        };
      } else {
        return {
          status: true,
          message: "Thêm nhà xe thành công",
        };
      }
    },
    async Update(nhaXe) {
      const payload = {
        tenNhaXe: nhaXe.tenNhaXe,
        email: nhaXe.email,
        soDienThoai: nhaXe.soDienThoai,
        tenNguoiDaiDien: nhaXe.tenNguoiDaiDien,
        diaChi: nhaXe.diaChi,
        idDoanhNghiepVanTai: nhaXe.idDoanhNghiepVanTai,
        trangThai: nhaXe.trangThai,
      };
      const { error } = await supabase
        .from("nhaXe")
        .update(payload)
        .eq("id", nhaXe.id);
      if (error) {
        console.log("Error: ", error);
        return {
          status: false,
          message:
            "Cập nhật thông tin nhà xe thất bại! Tên nhà xe đã tồn tại trong hệ thống.",
        };
      } else {
        return {
          status: true,
          message: "Cập nhật thông tin nhà xe thành công",
        };
      }
    },
    async DeleteByID(id) {
      const { error } = await supabase.from("nhaXe").delete().eq("id", id);
      if (error) {
        console.log("Error: ", error);
        return {
          status: false,
          message: "Xóa nhà xe thất bại! Lỗi hệ thống",
        };
      } else {
        return {
          status: true,
          message: "Xóa nhà xe thành công",
        };
      }
    },
  },
});
