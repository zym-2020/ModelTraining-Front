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
        component: () => import('@/views/Homework.vue'),
        children:[
          {
            path:'',
            name: 'WangEditor1',
            component: () => import('@/layout/components/wangEditor.vue')
          }
        ]
      }
    ]
  },
  {
    path: '/apply',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Apply',
        component: () => import('@/views/ApplyHomework.vue'),
        children:[
          {
            path:'',
            name: 'WangEditor2',
            component: () => import('@/layout/components/wangEditor.vue')
          }
        ]
      }
    ]
  },
  {
    path: '/develp',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Develp',
        component: () => import('@/views/DevelopHomework.vue'),
        children:[
          {
            path:'',
            name: 'WangEditor3',
            component: () => import('@/layout/components/wangEditor.vue')
          }
        ]
      }
    ]
  },
  {
    path: '/certificate',
    component: Layout,
    children: [
      {
        path: '',
        name: 'certificate',
        component: () => import('@/views/Certificate.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
