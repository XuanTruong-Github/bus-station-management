import { defineStore } from "pinia";
import supabase from "@/plugins/supabase";

export default defineStore("user", {
  state() {
    return { userInfo: null };
  },
  actions: {
    async getUserInfo(id) {
      loading.start();
      const { data, error } = await supabase
        .from("taiKhoan")
        .select("*,chucVu(tenChucVu)")
        .eq("id", id)
        .limit(1)
        .single();
      if (data && error == null) {
        this.userInfo = data;
        loading.stop();
        return {
          status: true,
          data,
        };
      } else {
        loading.stop();
        return {
          status: false,
          message: "Lấy thông tin tài khoản thất bại! Lỗi hệ thống",
        };
      }
    },
    async updateUserInfo(user) {
      const { id, hoTen, soDienThoai } = user;
      const { error } = await supabase
        .from("taiKhoan")
        .update({ hoTen, soDienThoai })
        .eq("id", id);
      if (error) {
        console.log("Error: ", error);
        return {
          status: false,
          message: "Cập nhật thông tin tài khoản thất bại! " + error.message,
        };
      } else {
        await this.getUserInfo(id);
        return {
          status: true,
          message: "Cập nhật thông tin tài khoản thành công!",
        };
      }
    },
  },
});
