<script setup>
import { useThemeStore } from '@/stores'
import { ref, watch } from 'vue'

defineProps({
  title: {
    required: true,
    type: String
  }
})

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
  <el-card class="page-container" :class="theme" style="background-color: #f0f0f0">
    <template #header>
      <div class="card-header">
        <span>{{ title }}</span>
      </div>
    </template>
    <!-- 内容插槽 -->
    <slot></slot>
  </el-card>
</template>

<style scoped>
/* 主题色设置 */
.el-card.dark {
  background-color: #131312 !important;
}
.page-container {
  min-height: 100%;
  width: 728px;
  padding: 0 40px;
  box-sizing: border-box;
  margin: 0 auto;
  border: none;
  box-shadow: none;
  background-color: #fff;
}
.card-header {
  font-size: 33px;
  font-weight: 400;
}
:deep(.el-card__header) {
  border-bottom: none;
  padding: 30px 0 0 14px;
}
</style>
