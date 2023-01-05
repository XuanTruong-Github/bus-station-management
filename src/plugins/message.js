import { ElMessage } from "element-plus";
export default (type = "error", message = "Message null!") =>
  ElMessage({
    showClose: true,
    message,
    type,
  });
