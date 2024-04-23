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
  <el-card class="show-container">
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
  width: 648px;
  border-radius: 8px;
}
.header {
  height: 55px;
}
.header span {
  font-size: 20px;
  font-weight: bold;
}
</style>
