import { defineStore } from "pinia";
import supabase from "@/plugins/supabase";
export default defineStore("phuongTien", {
  state: () => ({
    danhSachLoaiPhuongTien: [],
    danhSachHangGiamSatHanhTrinh: [],
    danhSachPhuongTien: [],
  }),
  actions: {
    async getDanhSachLoaiPhuongTien() {
      loading.start();
      const { data, error } = await supabase.from("loaiPhuongTien").select();
      if (error) {
        console.log("Error: ", error);
        message("error", "Lấy danh sách loại phương tiện thất bại!");
      } else this.danhSachLoaiPhuongTien = data;
      loading.stop();
    },
    async getDanhSachHangGiamSatHanhTrinh() {
      loading.start();
      const { data, error } = await supabase
        .from("hangGiamSatHanhTrinh")
        .select();
      if (error) {
        console.log("Error: ", error);
        message("error", "Lấy danh sách hãng giám sát hành trình thất bại!");
      } else this.danhSachHangGiamSatHanhTrinh = data;
      loading.stop();
    },
    async FindAll() {
      loading.start();
      const { data, error } = await supabase
        .from("phuongTien")
        .select(
          "id,bienKiemSoat,loaiPhuongTien(tenLoai),soGhe,soGiuong,hanBaoHiemXe,hanDangKiemXe,trangThai"
        );
      if (error) {
        console.log("Error: ", error);
        loading.stop();
        message("error", "Lấy danh sách nhà xe thất bại! lỗi hệ thống");
      } else {
        this.danhSachPhuongTien = data;
        loading.stop();
      }
    },
    async FindById(id) {
      const { data, error } = await supabase
        .from("phuongTien")
        .select()
        .eq("id", id)
        .limit(1)
        .single();
      if (error) {
        console.log("Error: ", error);
        return {
          status: false,
          message: "Lấy chi tiết phương tiện thất bại! Lỗi hệ thống",
        };
      } else {
        return {
          status: true,
          data,
        };
      }
    },
    async Insert(phuongTien) {
      const payload = {
        bienKiemSoat: phuongTien.bienKiemSoat,
        idDoanhNghiepVanTai: phuongTien.idDoanhNghiepVanTai,
        soDangKyPhuongTien: phuongTien.soDangKyPhuongTien,
        idLoaiPhuongTien: phuongTien.idLoaiPhuongTien,
        soKhung: phuongTien.soKhung,
        soMay: phuongTien.soMay,
        soGhe: phuongTien.soGhe,
        soGiuong: phuongTien.soGiuong,
        hanBaoHiemXe: phuongTien.hanBaoHiemXe,
        hanDangKiemXe: phuongTien.hanDangKiemXe,
        hanDangKyXe: phuongTien.hanDangKyXe,
        nhaXe: phuongTien.nhaXe,
        chieuDaiKhoangChuaHang: phuongTien.chieuDaiKhoangChuaHang,
        chieuRongKhoangChuaHang: phuongTien.chieuRongKhoangChuaHang,
        idHangGiamSatHanhTrinh: phuongTien.idHangGiamSatHanhTrinh,
        taiKhoanGiamSatHanhTrinh: phuongTien.taiKhoanGiamSatHanhTrinh,
        matKhauGiamSatHanhTrinh: phuongTien.matKhauGiamSatHanhTrinh,
        trangThai: phuongTien.trangThai,
      };
      const { error } = await supabase.from("phuongTien").insert([payload]);
      if (error) {
        console.log("Error: ", error);
        return {
          status: false,
          message:
            "Thêm phương tiện thất bại! Biển kiểm soát đã tồn tại trong hệ thống.",
        };
      } else {
        return {
          status: true,
          message: "Thêm phương tiện thành công",
        };
      }
    },
    async Update(phuongTien) {
      const payload = {
        bienKiemSoat: phuongTien.bienKiemSoat,
        idDoanhNghiepVanTai: phuongTien.idDoanhNghiepVanTai,
        soDangKyPhuongTien: phuongTien.soDangKyPhuongTien,
        idLoaiPhuongTien: phuongTien.idLoaiPhuongTien,
        soKhung: phuongTien.soKhung,
        soMay: phuongTien.soMay,
        soGhe: phuongTien.soGhe,
        soGiuong: phuongTien.soGiuong,
        hanBaoHiemXe: phuongTien.hanBaoHiemXe,
        hanDangKiemXe: phuongTien.hanDangKiemXe,
        hanDangKyXe: phuongTien.hanDangKyXe,
        nhaXe: phuongTien.nhaXe,
        chieuDaiKhoangChuaHang: phuongTien.chieuDaiKhoangChuaHang,
        chieuRongKhoangChuaHang: phuongTien.chieuRongKhoangChuaHang,
        idHangGiamSatHanhTrinh: phuongTien.idHangGiamSatHanhTrinh,
        taiKhoanGiamSatHanhTrinh: phuongTien.taiKhoanGiamSatHanhTrinh,
        matKhauGiamSatHanhTrinh: phuongTien.matKhauGiamSatHanhTrinh,
        trangThai: phuongTien.trangThai,
      };
      const { error } = await supabase
        .from("phuongTien")
        .update(payload)
        .eq("id", phuongTien.id);
      if (error) {
        console.log("Error: ", error);
        return {
          status: false,
          message:
            "Cập nhật thông tin phương tiện thất bại! Biển kiểm soát đã tồn tại trong hệ thống.",
        };
      } else {
        return {
          status: true,
          message: "Cập nhật thông tin phương tiện thành công",
        };
      }
    },
    async DeleteById(id) {
      const { error } = await supabase.from("phuongTien").delete().eq("id", id);
      if (error) {
        console.log("Error: ", error);
        return {
          status: false,
          message: "Xóa phương tiện thất bại! Lỗi hệ thống",
        };
      } else {
        return {
          status: true,
          message: "Xóa phương tiện thành công",
        };
      }
    },
  },
});
