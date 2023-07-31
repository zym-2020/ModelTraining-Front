import { createApp } from "vue";
import App from "./App.vue";

import router from "./router";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import ElementPlus from "element-plus";
import * as Icons from "@element-plus/icons";
import "@/assets/iconfont/iconfont.css";
import "@/assets/iconfont/iconfont.js";
import "element-plus/dist/index.css";
import { createPinia } from "pinia";
import "@/permission";

const pinia = createPinia();
const app = createApp(App);
app.use(ElementPlus, {
  locale: zhCn,
});
Object.keys(Icons).forEach((key) => {
  app.component(key, Icons[key as keyof typeof Icons]);
});
app.use(router);
app.use(pinia);
app.mount("#app");
