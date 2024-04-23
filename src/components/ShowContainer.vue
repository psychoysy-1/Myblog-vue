<script setup>
defineProps({
  title: {
    required: true,
    type: String
  }
})
</script>

<template>
  <!-- 设置里的展示块 -->
  <el-card class="show-container" shadow="never">
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
