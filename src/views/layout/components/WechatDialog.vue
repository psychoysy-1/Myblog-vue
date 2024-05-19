<script setup>
import { ref } from 'vue'

const visible = ref(false)
const showWechat = (value) => {
  console.log(value)
  visible.value = value
}

defineExpose({
  showWechat
})
</script>

<template>
  <!-- 弹窗 -->
  <el-dialog v-model="visible" style="width: 440px">
    <div class="box">
      <div class="logo">
        <img src="@/assets/logo.png" />
      </div>
      <div class="wechat">
        <img src="@/assets/wechat.jpg" />
      </div>
      <span>扫一扫获取</span>
    </div>
  </el-dialog>
</template>

<style scoped>
.box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.wechat {
  margin: 20px 0;
}
.wechat img {
  width: 350px;
}
.box span {
  font-size: 18px;
  font-weight: 600;
  margin: 20px 0;
}
</style>
