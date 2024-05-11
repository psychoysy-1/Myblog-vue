<script setup>
import {
  Tools,
  Management,
  BellFilled,
  List,
  MoreFilled,
  PictureFilled,
  Iphone
} from '@element-plus/icons-vue'
import { ref } from 'vue'
import { useUserStore, useThemeStore } from '@/stores'
import { useRouter } from 'vue-router'
import WechatDialog from './components/WechatDialog.vue'

const userStore = useUserStore()
const themeStore = useThemeStore()
const router = useRouter()
const dialog = ref()
const isCollapse = ref(false)

// 设置用户区域弹框隐藏显示
const showOptionsBox = ref(false)
const changeOptionsBox = () => {
  showOptionsBox.value = !showOptionsBox.value
}

// 显示微信弹窗
const showWechatDialog = () => {
  dialog.value.showWechat(true)
}

// 退出登录
const logout = async () => {
  userStore.removeToken()
  userStore.removeUser()
  router.push('/login')
}

// 导航条滑入动画
const isAsideShow = ref(false)
setInterval(() => {
  isAsideShow.value = true
}, 20)

const theme = ref(themeStore.theme)

const changeTheme = (newTheme) => {
  theme.value = newTheme
  themeStore.setTheme(newTheme)
}
</script>

<template>
  <el-container class="layout-container">
    <!-- 导航条设置 -->
    <el-aside width="248px">
      <el-menu class="el-menu" :collapse="isCollapse" router :class="theme">
        <!-- 图标和首页 -->
        <div class="el-aside-home">
          <el-link href="/home" :underline="false">
            <img src="@/assets/logo.png" alt="" />
            <span>My Blog</span>
          </el-link>
        </div>

        <!-- 菜单 -->
        <el-menu-item index="/myBlog" :class="{ show: isAsideShow }">
          <template #title>
            <el-icon><Management /></el-icon>
            <span>我的博客</span>
          </template>
        </el-menu-item>
        <el-menu-item index="1" :class="{ show: isAsideShow }" class="delay2">
          <el-icon><List /></el-icon>
          <template #title>社交大厅</template>
        </el-menu-item>
        <el-menu-item index="/photoWall" :class="{ show: isAsideShow }" class="delay3">
          <el-icon><PictureFilled /></el-icon>
          <template #title>照片墙</template>
        </el-menu-item>
        <el-menu-item index="/notice" :class="{ show: isAsideShow }" class="delay4">
          <el-icon><BellFilled /></el-icon>
          <template #title>通知</template>
        </el-menu-item>
        <el-menu-item index="/setting" :class="{ show: isAsideShow }" class="delay5">
          <el-icon><Tools /></el-icon>
          <template #title>设置</template>
        </el-menu-item>

        <!-- 用户内容 -->
        <div class="user-info-module">
          <div class="user-info">
            <img
              v-if="userStore.user.avatar"
              class="avatar"
              :src="`http://localhost:3000/${userStore.user.avatar}`"
            />
            <img v-else src="@/assets/default.png" class="avatar" />
            <div class="name">{{ userStore.user.nickname || userStore.user.username }}</div>
          </div>
          <div class="more-options">
            <div class="user-set" @click="changeOptionsBox">
              <el-icon><MoreFilled /></el-icon>
            </div>
          </div>
        </div>

        <!-- 赞助作者弹窗 -->
        <div class="getMobile" @click="showWechatDialog">
          <el-icon color="black"><Iphone /></el-icon>
          <div class="get-mobile-text">赞助作者</div>
        </div>
        <!-- 弹窗 -->
        <wechat-dialog ref="dialog"></wechat-dialog>

        <!-- 用户设置 -->
        <div class="options-box" v-show="showOptionsBox">
          <div class="theme-module">
            <span>主题设置:</span>
            <div class="change-theme">
              <el-button @click="changeTheme('light')">浅色</el-button>
              <el-button type="info" @click="changeTheme('dark')">深色</el-button>
            </div>
          </div>
          <div class="divider"></div>
          <el-link><span>新闻</span></el-link>
          <el-link><span>帮助中心</span></el-link>
          <el-link><span>使用条款</span></el-link>
          <el-link><span>隐私政策</span></el-link>
          <el-link><span>社区政策</span></el-link>
          <div class="divider"></div>
          <button class="logout-btn" @click="logout">
            <span>退出登录</span>
          </button>
        </div>
      </el-menu>
    </el-aside>
    <el-main :class="theme">
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<!-- 全局样式 -->
<style>
* {
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
  color: inherit;
}
</style>

<style scoped lang="scss">
// 主题设置
.dark {
  background-color: #282523;
}
.el-main.dark {
  background-color: #131312;
}

// 获取应用
.getMobile {
  position: absolute;
  bottom: 75px;
  left: 11px;
  width: 224px;
  height: 40px;
  border: 1px solid #cbced4;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-weight: bold;
  .get-mobile-text {
    margin-left: 10px;
    font-size: 14px;
  }
}

/* 设置的弹窗 */
.options-box {
  position: absolute;
  bottom: 65px;
  left: 12px;
  right: 0;
  background-color: #fff;
  width: 224px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 8px 0;
  z-index: 1; /* 确保弹框在用户信息模块上方 */

  .el-link.is-underline:hover::after,
  .el-link:hover {
    border-color: transparent; /* 去掉悬浮时的下划线 */
  }
}

// 主题模块
.theme-module {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 9px 16px;
  font-size: 14px;
  font-family: 'Helvetica Neue';
  color: #606266;

  > span {
    margin-bottom: 8px;
  }

  .change-theme {
    margin-top: 8px;
    display: flex;
    width: 100%;

    .el-button {
      flex: 1;
      margin-left: 8px;

      &:first-child {
        margin-left: 0;

        &:hover {
          background-color: #f5f5f5; /* 修改左边按钮悬浮时的背景颜色 */
        }
      }
    }
  }
}

.logout-btn,
.options-box .el-link {
  &:hover {
    background-color: #f5f5f5;
  }
}

.divider {
  height: 1px;
  background-color: #e6e6e6;
  margin: 8px 0;
}

.logout-btn {
  width: 100%;
  border: none;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 9px 16px;
  cursor: pointer;
  font-size: 14px;
  font-family: 'Helvetica Neue';
  color: #606266;
}

.options-box .el-link {
  height: 35px;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 9px 16px;
  cursor: pointer;
  font-size: 14px;
  font-family: 'Helvetica Neue';
  color: #606266;
}

/* 用户区域设置 */
.user-info-module {
  height: 50px;
  position: absolute;
  bottom: 8px;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  flex-grow: 1;

  .user-info {
    display: flex;
    align-items: center;
    padding: 15px;
    cursor: pointer;

    &:hover {
      background-color: #e8e8e8;
      border-radius: 40px;
    }

    .avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      margin-right: 12px;
    }

    .name {
      font-size: 16px;
      font-weight: bold;
    }
  }

  .more-options {
    cursor: pointer;
  }

  .user-set {
    color: #909399;
    font-size: 20px;
    padding: 10px;
    margin-top: 7px;
    margin-right: 12px;
  }
}

/* 设置菜单栏样式 */
.el-menu-item {
  margin: 10px 10px;
  border-radius: 10px; /* 设置圆角半径 */
  transition: all 0.8s ease-in-out;
  transform: translateX(-100%);

  &.is-active {
    background-color: #e8e8e8; /* 设置背景颜色 */
    color: black; /* 设置字体颜色 */
  }

  &:hover {
    background-color: #e8e8e8; /* 设置鼠标移上去的背景颜色 */
  }
}
.el-menu-item.show {
  transform: translateX(0);
}
.delay2 {
  transition-delay: 60ms;
}
.delay3 {
  transition-delay: 120ms;
}
.delay4 {
  transition-delay: 180ms;
}
.delay5 {
  transition-delay: 240ms;
}

/* 导航条设置 */
.layout-container {
  height: 100vh;
  margin: 0;
  padding: 0;
}

.el-menu:not(.el-menu--collapse) {
  width: 100%;
  height: 100vh;
}

// 设置导航条位置
.el-aside {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 1000;
  height: 100%;
  overflow-y: hidden;
  overflow-x: hidden;
}

// 设置路由出口位置
.el-main {
  height: auto;
  margin-left: 248px;
  background-color: #f0f0f0;
  padding: 0;
}

/* 设置顶部我的博客logo */
.el-aside-home {
  height: 68px;

  .el-link {
    text-decoration: none;
    color: inherit;
    display: block;
    height: 100%;
    display: flex;
    align-items: center;

    span {
      font-size: 20px;
      font-weight: bold;
      padding-left: 10px;
    }
  }
}
</style>
