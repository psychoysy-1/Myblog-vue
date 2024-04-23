<script setup>
import { ref } from 'vue'

// 设置国家列表
const value = ref('')
const countrys = ref([
  '中国',
  '美国',
  '英国',
  '日本',
  '韩国',
  '俄罗斯',
  '印度',
  '老挝',
  '缅甸',
  '越南',
  '泰国',
  '澳大利亚',
  '新西兰',
  '加拿大'
])
// const form = ref({
//   name: '',
//   email: ''
// })
</script>

<template>
  <show-container title="个人资料信息">
    <el-form class="form-container">
      <el-form-item>
        <div class="avatar-upload">
          <span>个人资料</span>
          <div class="avatar-container">
            <img src="@/assets/default.png" alt="" />
            <el-button type="info" plain>上传照片</el-button>
          </div>
        </div>
      </el-form-item>
      <el-form-item>
        <div class="input-item">
          <span>个人昵称</span>
          <el-input placeholder="请输入昵称" size="large"></el-input>
        </div>
      </el-form-item>
      <el-form-item>
        <div class="input-item">
          <span>邮箱</span>
          <el-input placeholder="请输入邮箱" size="large"></el-input>
        </div>
      </el-form-item>
      <el-form-item>
        <div class="input-item">
          <span>居住国家/地区</span>
          <el-select v-model="value" placeholder="请选择你的国家" size="large">
            <el-option v-for="item in countrys" :key="item" :label="item" :value="item" />
          </el-select>
        </div>
      </el-form-item>
    </el-form>
    <el-button type="info">保存</el-button>
  </show-container>
</template>

<style scoped>
/* 个人资料样式设置 */
.avatar-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
}
.avatar-container img {
  width: 48px;
  margin-right: 8px;
}
/* 输入框样式设置 */
.input-item {
  height: 70px;
  width: 400px;
}
.form-container {
  margin-bottom: 40px;
}
</style>
