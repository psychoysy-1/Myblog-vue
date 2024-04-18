// createWebHistory用来设置不刷新浏览器就可以更换路由地址
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      // 登录页面
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/LoginPage.vue')
    }
  ]
})

// 导出router
export default router
