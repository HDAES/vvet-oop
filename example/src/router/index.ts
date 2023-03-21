import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: '示例',
    component: () => import('@@/views/index/index.vue'),
  },
  {
    path: '/table',
    name: '表格',
    component: () => import('@@/views/table/index.vue'),
  },
]

// 创建路由
const router = createRouter({
  history: createWebHistory(),
  routes,
})
export default router
