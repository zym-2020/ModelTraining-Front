import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Layout from '@/layout/Index.vue'
import Login from '@/views/Login.vue'
import Homework from '@/views/Homework.vue'
import P404 from '@/views/404.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/modelTrainingCourse/submission',
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
    path: '/modelTrainingCourse/submission/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/modelTrainingCourse/submission/homework',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Homework',
        component: Homework,
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
        component: () => import('@/views/ApplyHomework.vue')
      }
    ]
  },
  // {
  //   path: '/develp',
  //   component: Layout,
  //   children: [
  //     {
  //       path: '',
  //       name: 'Develp',
  //       component: () => import('@/views/DevelopHomework.vue'),
  //       children:[
  //         {
  //           path:'',
  //           name: 'WangEditor3',
  //           component: () => import('@/layout/components/wangEditor.vue')
  //         }
  //       ]
  //     }
  //   ]
  // },
  {
    path: '/modelTrainingCourse/submission/certificate',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Certificate',
        component: () => import('@/views/Certificate.vue')
      }
    ]
  },
  {
    path: '/modelTrainingCourse/submission/404',
    name: '404',
    component: P404
  },
  {
    path: "/:catchAll(.*)",
    name: 'Redirect404',
    redirect: '/modelTrainingCourse/submission/404'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
