import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import Layout from "@/layout/Index.vue";

const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "",
        name: "Home",
        component: Home,
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue"),
  },

  {
    path: "/404",
    name: "404",
    component: () => import("@/views/404.vue"),
  },
];

export const asyncRouters: Array<RouteRecordRaw> = [
  {
    path: "/homework",
    component: Layout,
    children: [
      {
        path: "",
        name: "Homework",
        component: () => import("@/views/Homework.vue"),
      },
    ],
  },

  {
    path: "/certificate",
    component: Layout,
    children: [
      {
        path: "",
        name: "Certificate",
        component: () => import("@/views/Certificate.vue"),
      },
    ],
  },
  {
    path: "/:catchAll(.*)",
    name: "Redirect404",
    redirect: "/404",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: constantRoutes,
});

export const resetRouters = () => {
  const newRouter = createRouter({
    history: createWebHistory(),
    routes: constantRoutes,
  });
  const removeList: string[] = [];
  router.getRoutes().forEach((item) => {
    for (let i = 0; i < newRouter.getRoutes().length; i++) {
      if (item.name === newRouter.getRoutes()[i].name) {
        return;
      }
    }
    removeList.push(item.name as string);
  });
  removeList.forEach((item) => {
    router.removeRoute(item);
  });
};

export default router;
