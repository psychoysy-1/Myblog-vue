<script setup>
import { useThemeStore } from '@/stores'
import { ref, watch } from 'vue'

defineProps({
  title: {
    required: true,
    type: String
  }
})

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
  <!-- 设置里的展示块 -->
  <el-card class="show-container" shadow="never" :class="theme">
    <template #header>
      <div class="header">
        <span>{{ title }}</span>
      </div>
    </template>
    <!-- 内容插槽 -->
    <slot></slot>
  </el-card>
</template>

<style scoped>
/* 主题色设置 */
.dark {
  background-color: #282523;
  color: rgb(255, 255, 255);
}

.show-container {
  width: 624px;
  border-radius: 10px;
  padding: 0 24px 24px 24px;
  margin-bottom: 20px;
}
.header {
  height: 55px;
  margin-left: -15px;
}
.header span {
  font-size: 20px;
  font-weight: bold;
}
</style>
