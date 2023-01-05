import { ElLoading } from "element-plus";
const TIME_OUT = 30000;
let loading = null;
let checkTimeOut = null;
export default {
  start: () => {
    loading = ElLoading.service({
      lock: true,
      text: "Đang tải",
      background: "rgba(255, 255, 255, 0.8)",
    });
    checkTimeOut = setTimeout(() => {
      clearTimeout(checkTimeOut);
      loading.close();
    }, TIME_OUT);
  },
  stop: () => {
    clearTimeout(checkTimeOut);
    loading.close();
  },
};
