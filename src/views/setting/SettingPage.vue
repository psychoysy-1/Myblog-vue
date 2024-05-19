<script setup>
import { useThemeStore } from '@/stores'
import { ref, watch } from 'vue'

// 主题色
const themeStore = useThemeStore()
const theme = ref(themeStore.theme)
watch(
  () => themeStore.theme,
  (newTheme) => {
    theme.value = newTheme
  }
)
</script>

<template>
  <page-container title="设置" class="container">
    <el-menu
      router
      class="el-menu"
      mode="horizontal"
      default-active="/setting/baseInfo"
      :style="{
        borderBottom: 'none',
        backgroundColor: '#f0f0f0',
        padding: 0
      }"
      :class="theme"
    >
      <el-menu-item index="/setting/baseInfo" class="menu-item"> 基本信息 </el-menu-item>
      <el-menu-item index="/setting/account" class="menu-item"> 账户设置 </el-menu-item>
      <el-menu-item index="/setting/email" class="menu-item"> 邮件通知 </el-menu-item>
      <el-menu-item index="/setting/subscribe" class="menu-item"> 我的关注 </el-menu-item>
    </el-menu>
    <!-- 下面内容 -->
    <router-view></router-view>
  </page-container>
</template>

<style scoped>
.el-menu.dark {
  background-color: #131312 !important;
}
.el-menu.dark li {
  color: #fff;
}

:deep(.el-card__body) {
  padding: 0;
}
.menu-item {
  background-color: transparent !important;
}

.menu-item.is-active {
  border-bottom: none !important;
  color: #409eff !important;
}

.menu-item:not(.is-active) {
  border-bottom: none !important;
}
</style>
