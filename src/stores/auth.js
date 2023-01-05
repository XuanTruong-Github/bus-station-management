import { defineStore } from "pinia";
import supabase from "@/plugins/supabase";
import useUserStore from "./user";
export default defineStore("auth", {
  state: () => ({ session: null }),
  actions: {
    async login(payload) {
      const { data, error } = await supabase.auth.signInWithPassword(payload);
      if (error) {
        return {
          status: false,
          message:
            error.status == 400
              ? "Tên tài khoản hoặc mật khẩu không chính xác!"
              : "Server đang gặp lỗi!",
        };
      } else if (data) {
        this.session = data.session;
        await useUserStore().getUserInfo(data.session.user.id);
        return {
          status: true,
          message: "Success",
        };
      }
    },
    async forgotPassword(payload) {
      const host = import.meta.env.VITE_HOST;
      const { error } = await supabase.auth.resetPasswordForEmail(payload, {
        redirectTo: host + "/change-password",
      });
      if (error) {
        console.log("Error:", error);
        return {
          status: false,
          message:
            "Địa chỉ email này chưa được đăng ký tài khoản, vui lòng liên hệ với người quản trị viên!",
        };
      } else {
        return {
          status: true,
          message: "Đã gửi yêu cầu",
        };
      }
    },
    async changePassword(password) {
      const { error } = await supabase.auth.updateUser({
        password,
      });
      if (error) {
        console.log("Error: ", error);
        return {
          status: false,
          message: "Thay đổi mật khẩu thất bại! Lỗi hệ thống",
        };
      } else {
        return {
          status: true,
          message: "Cập nhật mật khẩu thành công",
        };
      }
    },
    getSession() {
      supabase.auth.getSession().then(async ({ data }) => {
        this.session = data.session;
        if (this.session) {
          const { id } = this.session?.user;
          await useUserStore().getUserInfo(id);
        }
      });
    },
    isAuth() {
      return this.session != null;
    },
    async logOut() {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.log("Error Logout: ", error.status);
        return {
          status: false,
          message:
            error.status == 400 ? "Đã xảy ra lỗi!" : "Lỗi từ phía máy chủ!",
        };
      } else {
        this.session = null;
        useUserStore.userInfo = null;
        return {
          status: true,
        };
      }
    },
  },
});
