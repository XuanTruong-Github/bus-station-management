import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "./configs/styles";
import { locale, loadMessages } from "devextreme/localization";
import vn from "./locales/vn.json";
import vi from "element-plus/dist/locale/vi.mjs";
import loading from "./plugins/loading";
import message from "@/plugins/message";
import helpers from "./utils/helpers";

function bootstrap(app) {
  window.loading = loading;
  window.message = message;
  window.helpers = helpers;
  locale("vi");
  loadMessages(vn);
  app.use(ElementPlus, {
    locale: vi,
  });
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
  }
  app.use(createPinia());
  app.use(router);
  console.log(import.meta.env.VITE_BASE);
  app.mount("#app");
}
bootstrap(createApp(App));
