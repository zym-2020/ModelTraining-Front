import { defineStore } from "pinia";
import { ref } from "vue";
import { RouteRecordRaw } from "vue-router";
import { getUserInfo } from "@/api/request";

import router, { resetRouters } from "@/router";

export const usePermissionStore = defineStore("permission", () => {
  const email = ref("");
  const name = ref("");
  const dynamicRouters = ref<RouteRecordRaw[]>([]);

  const generateRouters = (asyncRouters: RouteRecordRaw[]) => {
    dynamicRouters.value = [...asyncRouters];
  };

  const logout = () => {
    email.value = "";
    name.value = "";
    dynamicRouters.value = [];
    localStorage.removeItem("model-token");
    resetRouters();
    router.push({ path: "/login" });
  };

  const setUserInfo = async () => {
    const res = await getUserInfo();
    if (res && res.code === 0) {
      email.value = res.data.email;
      name.value = res.data.name;
    } else logout();
  };

  return {
    email,
    name,
    generateRouters,
    logout,
    setUserInfo,
  };
});
