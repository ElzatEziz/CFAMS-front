import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 一级路由 -》 登陆 和 布局架子
    { path: '/login', component: () => import('@/views/login/LoginPage.vue') },
    {
      path: '/',
      component: () => import('@/views/layout/LayoutPage.vue'),
      redirect: '/assets/manage',
      // 二级路由
      children: [
        {
          path: '/assets/manage',
          component: () => import('@/views/assets/AssetsManagePage.vue')
        },
        {
          path: '/disposals/manage',
          component: () => import('@/views/disposals/DisposalsPage.vue')
        },
        {
          path: '/inventory/manage',
          component: () => import('@/views/inventory/InventoryPage.vue')
        },
        {
          path: '/maintenance/manage',
          component: () => import('@/views/maintenance/MaintenancePage.vue')
        },
        {
          path: '/reports/report',
          component: () => import('@/views/reports/ReportsPage.vue')
        },
        {
          path: '/users/profile',
          component: () => import('@/views/users/UsersPage.vue')
        }
      ]
    }
  ]
})

export default router
