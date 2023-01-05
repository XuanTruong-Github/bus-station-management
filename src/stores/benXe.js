import { defineStore } from "pinia";
import supabase from "@/plugins/supabase";
export default defineStore("benXe", {
  state: () => ({
    danhSachBenXe: [],
  }),
  actions: {
    async FindAll() {
      loading.start();
      const query =
        "*,loaiBenXe(loaiBen),tinhThanhPho(tenTinh),quanHuyenThiXa(tenHuyen)";
      const { data, error } = await supabase.from("benXe").select(query);
      if (error) {
        console.log("Error: ", error);
        loading.stop();
        return {
          status: false,
          message: "Lấy danh sách bến xe thất bại! Lỗi hệ thống",
        };
      } else {
        this.danhSachBenXe = data;
        loading.stop();
        return {
          status: true,
        };
      }
    },
    async FindAllByIdTinhThanh(id) {
      loading.start();
      const query = "id,maBenXe,tenBenXe";
      const { data, error } = await supabase
        .from("benXe")
        .select(query)
        .eq("idTinh", id);
      if (error) {
        console.log("Error: ", error);
        loading.stop();
        return {
          status: false,
          message: "Lấy danh sách bến xe thất bại! Lỗi hệ thống",
        };
      } else {
        loading.stop();
        return {
          status: true,
          data,
        };
      }
    },
    async Insert(benXe) {
      const payload = {
        maBenXe: benXe.maBenXe,
        tenBenXe: benXe.tenBenXe,
        idLoaiBenXe: benXe.idLoaiBenXe,
        soDienThoai: benXe.soDienThoai,
        email: benXe.email,
        idTinh: benXe.idTinh,
        idHuyen: benXe.idHuyen,
        diaChi: benXe.diaChi,
        trangThai: benXe.trangThai,
      };
      const { error } = await supabase.from("benXe").insert([payload]);
      if (error) {
        console.log("Error: ", error);
        return {
          status: false,
          message: "Thêm bến xe thất bại! Mã bến xe đã tồn tại trong hệ thống.",
        };
      } else {
        return {
          status: true,
          message: "Thêm bến xe thành công",
        };
      }
    },
    async Update(benXe) {
      const payload = {
        maBenXe: benXe.maBenXe,
        tenBenXe: benXe.tenBenXe,
        idLoaiBenXe: benXe.idLoaiBenXe,
        soDienThoai: benXe.soDienThoai,
        email: benXe.email,
        idTinh: benXe.idTinh,
        idHuyen: benXe.idHuyen,
        diaChi: benXe.diaChi,
        trangThai: benXe.trangThai,
      };
      const { error } = await supabase
        .from("benXe")
        .update(payload)
        .eq("id", benXe.id);
      if (error) {
        console.log("Error: ", error);
        return {
          status: false,
          message:
            "Cập nhật thông tin bến xe thất bại! Mã bến xe đã tồn tại trong hệ thống",
        };
      } else {
        return {
          status: true,
          message: "Cập nhật thông tin bến xe thành công",
        };
      }
    },
    async DeleteByID(id) {
      const { error } = await supabase.from("benXe").delete().eq("id", id);
      if (error) {
        console.log("Error: ", error);
        return {
          status: false,
          message: "Xóa bến xe thất bại! Lỗi hệ thống",
        };
      } else {
        return {
          status: true,
          message: "Xóa bến xe thành công",
        };
      }
    },
    async FindByID(id) {
      const { data, error } = await supabase
        .from("benXe")
        .select()
        .eq("id", id)
        .limit(1)
        .single();
      if (error) {
        console.log("Error: ", error);
        return {
          status: false,
          message: "Lấy chi tiết bến xe thất bại! Lỗi hệ thống",
        };
      } else {
        return {
          status: true,
          data,
        };
      }
    },
  },
});
