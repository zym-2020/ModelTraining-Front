import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Layout from '@/layout/Index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Home',
        component: Home
      }
    ]
  },
  {
    path: '/about',
    component: Layout,
    children: [
      {
        path: '',
        name: 'About',
        component: () => import("@/views/About.vue")
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import("@/views/Login.vue")
  },
  {
    path: '/homework',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Homework',
        component: () => import('@/views/Homework.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
