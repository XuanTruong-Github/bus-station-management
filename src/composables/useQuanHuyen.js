import { ref } from "vue";
import supabase from "@/plugins/supabase";
export default function () {
  const danhSachQuanHuyen = ref([]);
  const getDanhSachQuanHuyen = async (id) => {
    const { data, error } = await supabase
      .from("quanHuyenThiXa")
      .select()
      .eq("idTinhThanh", id);
    if (error) {
      console.log("Error: ", error);
    } else danhSachQuanHuyen.value = data;
  };
  return { danhSachQuanHuyen, getDanhSachQuanHuyen };
}
