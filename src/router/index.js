import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 一级路由 -》 登陆 和 布局架子
    { path: '/login', component: () => import('@/views/login/LoginPage.vue') },
    {
      path: '/',
      component: () => import('@/views/layout/LayoutPage.vue'),
      redirect: '/index',
      // 二级路由
      children: [
        {
          path: '/index',
          component: () => import('@/views/index/IndexPage.vue')
        },
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
          path: '/users/info',
          component: () => import('@/views/users/UsersInfoPage.vue')
        },
        {
          path: '/users/repassword',
          component: () => import('@/views/users/UsersRepasswordPage.vue')
        },
        {
          path: '/users/avatar',
          component: () => import('@/views/users/UsersAvatarPage.vue')
        }
      ]
    }
  ]
})

// 登录访问拦截
router.beforeEach((to) => {
  const userStore = useUserStore()
  if (!userStore.token && to.path !== '/login') {
    return '/login'
  }
  return
})
export default router
