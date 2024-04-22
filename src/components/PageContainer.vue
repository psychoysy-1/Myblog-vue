<script setup>
defineProps({
  title: {
    required: true,
    type: String
  }
})
</script>

<template>
  <el-card class="page-container">
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
  margin-top: 10px;
  font-weight: 400;
}
:deep(.el-card__header) {
  border-bottom: none;
  padding: 30px 0 0 10px;
}
</style>
