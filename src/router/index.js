// createWebHistory用来设置不刷新浏览器就可以更换路由地址
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      // 登录页面
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/LoginPage.vue'),
      meta: {
        title: '登录页面'
      }
    },
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/layout/LayoutPage.vue'),
      redirect: '/home',
      children: [
        {
          // 首页
          path: '/home',
          name: 'homePage',
          component: () => import('@/views/home/HomePage.vue'),
          meta: {
            title: '首页'
          }
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || '我的博客'
  next()
})

// 导出router
export default router
