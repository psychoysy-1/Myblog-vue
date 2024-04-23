<script setup>
import { ref } from 'vue'
import { Check, Close } from '@element-plus/icons-vue'
const isChecked = ref(true)
// 接收数据
defineProps({
  content: {
    required: true,
    type: String
  }
})
</script>

<template>
  <div class="column-slot">
    <span>{{ content }}</span>
    <el-button
      :type="isChecked ? 'success' : 'danger'"
      :icon="isChecked ? Check : Close"
      circle
      @click="isChecked = !isChecked"
    />
  </div>
</template>

<style scoped>
.column-slot {
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
  border-bottom: 1px solid #dfdede;
}
</style>
