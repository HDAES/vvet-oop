import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'admin',
    redirect: '/example',
    component: () => import('../component/admin.vue'),
    children: [{
      path: ':catchAll(.*)',
      component: () => import('@/ErrorPage.vue'),
    }],
  },
]

// 创建路由
const router = createRouter({
  history: createWebHistory(),
  routes,
})
export default router
