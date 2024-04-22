<script setup></script>

<template>
  <page-container title="设置" class="container" style="background-color: #f0f0f0">
    <el-menu
      router
      class="el-menu"
      mode="horizontal"
      :style="{
        borderBottom: 'none',
        backgroundColor: '#f0f0f0',
        padding: 0
      }"
    >
      <el-menu-item
        index="/setting/baseInfo"
        class="menu-item item1"
        :class="{ 'is-active': activeIndex === '/setting/baseInfo' }"
      >
        基本信息
      </el-menu-item>
      <el-menu-item
        index="/setting/account"
        class="menu-item"
        :class="{ 'is-active': activeIndex === '/setting/account' }"
      >
        账户设置
      </el-menu-item>
      <el-menu-item
        index="/setting/email"
        class="menu-item"
        :class="{ 'is-active': activeIndex === '/setting/email' }"
      >
        邮件通知
      </el-menu-item>
    </el-menu>
  </page-container>
</template>

<style scoped>
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
