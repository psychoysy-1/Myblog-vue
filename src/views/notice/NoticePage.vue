<script setup>
import { useUserStore } from '@/stores'
const userStore = useUserStore()
</script>

<template>
  <page-container title="通知" style="background-color: #f0f0f0">
    <show-container title="早些时候">
      <div class="column">
        <img :src="`http://localhost:3000/${userStore.user.avatar}`" alt="" />
        <div class="content">
          <p>{{ userStore.user.nickname }} 发布了新的文章《abc》</p>
          <p>2024-04-24</p>
        </div>
      </div>
      <div class="column">
        <img :src="`http://localhost:3000/${userStore.user.avatar}`" alt="" />
        <div class="content">
          <p>{{ userStore.user.nickname }} 发布了新的文章《def》</p>
          <p>2024-04-24</p>
        </div>
      </div>
    </show-container>
  </page-container>
</template>

<style scoped>
:deep(.el-card__body) {
  padding: 0;
}
.show-container {
  margin-top: 20px;
}
.column {
  display: flex;
  align-items: center;
  border-radius: 5px;
  margin: 10px 0;
  padding: 5px 0;
}
.column img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
  padding-left: 5px;
}
.column:hover {
  background-color: #c2bfbf;
  cursor: pointer;
}
</style>
