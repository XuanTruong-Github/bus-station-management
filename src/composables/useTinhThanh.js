import { ref } from "vue";
import supabase from "@/plugins/supabase";

export default function () {
  const danhSachTinhThanh = ref([]);
  const getDanhSachTinhThanh = async () => {
    const { data, error } = await supabase.from("tinhThanhPho").select();
    if (error) {
      console.log("Error: ", error);
      message("error", "Lấy danh sách tỉnh thành thất bại!");
    } else danhSachTinhThanh.value = data;
  };
  return {
    danhSachTinhThanh,
    getDanhSachTinhThanh,
  };
}
