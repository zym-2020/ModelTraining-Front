import router, { asyncRouters, resetRouters } from "./router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { usePermissionStore } from "@/store/permission-store";
import { getToken } from "./utils/common";

let permissionStore: any = null;

NProgress.configure({ showSpinner: false });
router.beforeEach(async (to, form, next) => {
  NProgress.start();
  if (permissionStore === null) permissionStore = usePermissionStore()
  if (getToken()) {
    
    if (permissionStore.email === "") {
      await permissionStore.setUserInfo();
      permissionStore.generateRouters(asyncRouters);
      resetRouters();
      asyncRouters.forEach((item) => {
        router.addRoute(item);
      });
      next({ ...to, replace: true });
    } else {
      if (to.path === "/login") {
        next({ path: "/" });
      } else next();
    }
  } else {
    if (to.path === "/login" || to.path === "/") {
      next();
    } else {
      next("/login");
    }
  }
  NProgress.done();
});
