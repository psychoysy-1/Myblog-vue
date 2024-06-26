// createWebHistory用来设置不刷新浏览器就可以更换路由地址
import { useUserStore } from '@/stores'
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
        },
        {
          // 我的博客
          path: '/myBlog',
          name: 'myBlogPage',
          component: () => import('@/views/blog/MyBlogPage.vue'),
          meta: {
            title: '我的博客'
          }
        },
        {
          // 博客细节
          path: '/blogDetail',
          name: 'blogDetailPage',
          component: () => import('@/views/blog/BlogDetailPage.vue')
        },
        {
          // 照片墙
          path: '/photoWall',
          name: 'photoWallPage',
          component: () => import('@/views/photoWall/PhotoWallPage.vue'),
          meta: {
            title: '照片墙'
          }
        },
        {
          //社交大厅
          path: '/socialHall',
          name: 'socialHallPage',
          component: () => import('@/views/socialHall/SocialHallPage.vue'),
          meta: {
            title: '社交大厅'
          }
        },
        {
          // 设置
          path: '/setting',
          name: 'settingPage',
          component: () => import('@/views/setting/SettingPage.vue'),
          redirect: '/setting/baseInfo',
          children: [
            {
              // 基础信息
              path: '/setting/baseInfo',
              name: 'baseInfoPage',
              component: () => import('@/views/setting/content/BaseInfoPage.vue'),
              meta: {
                title: '基础信息'
              }
            },
            {
              // 账户设置
              path: '/setting/account',
              name: 'accountPage',
              component: () => import('@/views/setting/content/AccountPage.vue'),
              meta: {
                title: '账户设置'
              }
            },
            {
              // 邮件通知
              path: '/setting/email',
              name: 'emailPage',
              component: () => import('@/views/setting/content/EmailPage.vue'),
              meta: {
                title: '邮件通知'
              }
            },
            {
              //订阅
              path: '/setting/subscribe',
              name: 'subscribePage',
              component: () => import('@/views/setting/content/SubscribePage.vue'),
              meta: {
                title: '订阅'
              }
            }
          ]
        },
        {
          // 通知
          path: '/notice',
          name: 'noticePage',
          component: () => import('@/views/notice/NoticePage.vue'),
          meta: {
            title: '通知'
          }
        }
      ]
    }
  ]
})

router.beforeEach((to) => {
  const useStore = useUserStore()
  if (!useStore.token && to.path !== '/login') return '/login'
  document.title = to.meta.title || '我的博客'
})

// 导出router
export default router
