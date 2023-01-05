import { defineStore } from "pinia";
import supabase from "@/plugins/supabase";
export default defineStore("doanhNghiepVanTai", {
  state: () => ({
    danhSachDoanhNghiepVanTai: [],
  }),
  actions: {
    async FindAll() {
      loading.start();
      const { data, error } = await supabase
        .from("doanhNghiepVanTai")
        .select(
          "id,tenDoanhNghiepVanTai,maSoThue,tenNguoiDaiDien,diaChi,tinhThanhPho(tenTinh),quanHuyenThiXa(tenHuyen),soDienThoai,trangThai"
        );
      if (error) {
        console.log(error);
        message(
          "error",
          "Lấy danh sách doanh nghiệp vận tải thất bại! Lỗi hệ thống"
        );
      } else {
        this.danhSachDoanhNghiepVanTai = data;
      }
      loading.stop();
    },
    async FindByID(id) {
      const { data, error } = await supabase
        .from("doanhNghiepVanTai")
        .select()
        .eq("id", id)
        .limit(1)
        .single();
      if (error) {
        console.log("Error: ", error);
        return {
          status: false,
          message: "Lấy chi tiết bến đến thất bại! Lỗi hệ thống",
        };
      } else {
        return {
          status: true,
          data,
        };
      }
    },
    async Insert(doanhNghiepVanTai) {
      const payload = {
        tenDoanhNghiepVanTai: doanhNghiepVanTai.tenDoanhNghiepVanTai,
        maSoThue: doanhNghiepVanTai.maSoThue,
        soGPKD: doanhNghiepVanTai.soGPKD,
        ngayCapGPKD: doanhNghiepVanTai.ngayCapGPKD,
        noiCapGPKD: doanhNghiepVanTai.noiCapGPKD,
        tenNguoiDaiDien: doanhNghiepVanTai.tenNguoiDaiDien,
        idChucVuNguoiDaiDien: doanhNghiepVanTai.idChucVuNguoiDaiDien,
        email: doanhNghiepVanTai.email,
        soDienThoai: doanhNghiepVanTai.soDienThoai,
        idTinh: doanhNghiepVanTai.idTinh,
        idHuyen: doanhNghiepVanTai.idHuyen,
        diaChi: doanhNghiepVanTai.diaChi,
      };
      const { error } = await supabase
        .from("doanhNghiepVanTai")
        .insert([payload]);
      if (error) {
        console.log("Error: ", error);
        return {
          status: false,
          message:
            "Thêm doanh nghiệp vận tải thất bại! Mã số thuế đã tồn tại trong hệ thống",
        };
      } else {
        return {
          status: true,
          message: "Thêm doanh nghiệp vận tải thành công",
        };
      }
    },
    async Update(doanhNghiepVanTai) {
      const payload = {
        tenDoanhNghiepVanTai: doanhNghiepVanTai.tenDoanhNghiepVanTai,
        maSoThue: doanhNghiepVanTai.maSoThue,
        soGPKD: doanhNghiepVanTai.soGPKD,
        ngayCapGPKD: doanhNghiepVanTai.ngayCapGPKD,
        noiCapGPKD: doanhNghiepVanTai.noiCapGPKD,
        tenNguoiDaiDien: doanhNghiepVanTai.tenNguoiDaiDien,
        idChucVuNguoiDaiDien: doanhNghiepVanTai.idChucVuNguoiDaiDien,
        email: doanhNghiepVanTai.email,
        soDienThoai: doanhNghiepVanTai.soDienThoai,
        idTinh: doanhNghiepVanTai.idTinh,
        idHuyen: doanhNghiepVanTai.idHuyen,
        diaChi: doanhNghiepVanTai.diaChi,
        trangThai: doanhNghiepVanTai.trangThai,
      };
      const { error } = await supabase
        .from("doanhNghiepVanTai")
        .update(payload)
        .eq("id", doanhNghiepVanTai.id);
      if (error) {
        console.log("Error: ", error);
        return {
          status: false,
          message:
            "Cập nhật thông tin doanh nghiệp vận tải thất bại! Mã số thuế đã tồn tại trong hệ thống.",
        };
      } else {
        return {
          status: true,
          message: "Cập nhật thông tin doanh nghiệp vận tải thành công",
        };
      }
    },
    async DeleteByID(id) {
      const { error } = await supabase
        .from("doanhNghiepVanTai")
        .delete()
        .eq("id", id);
      if (error) {
        console.log("Error: ", error);
        return {
          status: false,
          message: "Xóa doanh nghiệp vận tải thất bại! Lỗi hệ thống",
        };
      } else {
        return {
          status: true,
          message: "Xóa doanh nghiệp vận tải thành công",
        };
      }
    },
  },
});
