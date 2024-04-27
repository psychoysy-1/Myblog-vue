<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores'
import { uploadBgService } from '@/api/user'

// 获取用户id
const userStore = useUserStore()
const _id = ref(userStore.user._id)

// 加载
// const loading = ref(false)

// 背景图片
let bgImg = ref('')
if (userStore.user.blogBackground) {
  bgImg = ref(`http://localhost:3000/${userStore.user.blogBackground}`)
}
// 创建一个文件选择器
const uploadImage = () => {
  const fileInput = document.createElement('input')
  fileInput.type = 'file'
  fileInput.accept = 'image/*'
  fileInput.addEventListener('change', handleFileUpload)
  fileInput.click()
}
const handleFileUpload = async (event) => {
  const file = event.target.files[0]
  // 上传文件
  const formData = new FormData()
  formData.append('blogBackground', file)
  formData.append('_id', _id.value)
  const res = await uploadBgService(formData)
  console.log(res)
  userStore.user.blogBackground = res.data.data.blogBackground
  if (file) {
    // 将文件转换为 base64 编码
    const reader = new FileReader()
    reader.onload = () => {
      bgImg.value = reader.result
    }
    reader.readAsDataURL(file)
  }
}

// 个性签名
const isEditing = ref(false)
const signature = ref('请填写个性签名')
const toggleEdit = () => {
  isEditing.value = !isEditing.value
}
</script>

<template>
  <!-- 背景图片区域 -->
  <div
    class="blog-background"
    @click="uploadImage"
    :style="{ border: bgImg ? 'none' : '1px dashed #000000', height: bgImg ? 'none' : '434px' }"
  >
    <img v-if="bgImg" :src="bgImg" class="full-image" />
    <div v-else class="upload">请上传你的背景图片</div>
  </div>

  <!-- 发表文章按钮 -->
  <div class="publish">
    <el-button size="large">发表文章</el-button>
  </div>

  <!-- 用户头像 -->
  <div class="user">
    <div class="user-avatar">
      <img :src="`http://localhost:3000/${userStore.user.avatar}`" />
    </div>
    <span>{{ userStore.user.nickname }}</span>
    <el-input
      v-if="isEditing"
      v-model="signature"
      @blur="toggleEdit"
      size="small"
      maxlength="20"
      placeholder="请输入个性签名"
      autofocus
    />
    <p @dblclick="toggleEdit" v-else>{{ isEditing ? signature : '请填写你的个性签名' }}</p>
  </div>
</template>

<style scoped>
/* 设置发布文章按钮 */
.publish {
  display: flex;
  justify-content: flex-end;
  margin: 5px;
}

/* 设置用户头像 */
.user {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transform: translateY(-62%);
  width: 600px;
  margin: 0 auto;
}
.user-avatar img {
  width: 120px;
  height: 120px;
  border-radius: 12px;
}
.user span {
  font-size: 26px;
  font-weight: 600;
}
.user p {
  font-size: 14px;
  font-weight: 100;
  color: rgb(104, 104, 103);
}

/* 设置顶部背景 */
.blog-background {
  height: 434px;
  overflow: hidden;
  cursor: pointer;
}
.full-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: none;
}
.upload {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
}
</style>
