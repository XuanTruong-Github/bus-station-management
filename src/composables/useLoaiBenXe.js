import { ref } from "vue";
import supabase from "@/plugins/supabase";
export default function () {
  const danhSachLoaiBenXe = ref([]);
  const getDanhSachLoaiBenXe = async (id) => {
    const { data, error } = await supabase.from("loaiBenXe").select();
    if (error) {
      console.log("Error: ", error);
    } else danhSachLoaiBenXe.value = data;
  };
  return { danhSachLoaiBenXe, getDanhSachLoaiBenXe };
}
