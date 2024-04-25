<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores'
import { userUpdateService } from '@/api/user'

// 设置国家列表
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

// 基于store的数据,初始化imgUrl的值
const userStore = useUserStore()
const avatar = ref(userStore.user.avatar)
const _id = ref(userStore.user._id)
const nickname = ref(userStore.user.nickname)
const email = ref(userStore.user.email)
const country = ref(userStore.user.country)

// 设置初始头像显示
const imageUrl = ref('')
if (avatar.value) {
  imageUrl.value = `http://localhost:3000/${userStore.user.avatar}`
}

// 上传图片
const uploadRef = ref()
// 加载中
const loading = ref(false)
// 提供变量做base64预览图片地址

// 设置表单
const form = ref({
  _id: _id.value,
  nickname: nickname.value,
  email: email.value,
  country: country.value,
  avatar: avatar.value
})

// 上传图片时候的回调函数
const OnSelectFile = (uploadFile) => {
  form.value.avatar = uploadFile.raw
  const reader = new FileReader()
  reader.onload = () => {
    imageUrl.value = reader.result
  }
  reader.readAsDataURL(uploadFile.raw)
}

// 多次上传文件进行提示
const handleExceed = () => {
  ElMessage.error('只能上传一个文件')
}

// 邮箱格式校验
const rules = ref({
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
  ]
})

// 提交
const handleSave = async () => {
  loading.value = true
  const formData = new FormData()
  Object.keys(form.value).forEach((key) => {
    formData.append(key, form.value[key])
  })
  await userUpdateService(formData)
  // 重新渲染
  await userStore.getUser()
  // 提示成功
  ElMessage.success('更新成功')
  loading.value = false
}
</script>

<template>
  <show-container title="个人资料信息" v-loading="loading">
    <el-form class="form-container" :model="form" :rules="rules">
      <el-form-item>
        <div class="avatar-upload">
          <span>个人资料</span>
          <el-upload
            class="avatar-container"
            ref="uploadRef"
            :auto-upload="false"
            :on-change="OnSelectFile"
            :on-exceed="handleExceed"
            :limit="1"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <img v-else src="@/assets/default.png" />
            <el-button type="info" plain>上传照片</el-button>
          </el-upload>
        </div>
      </el-form-item>
      <el-form-item>
        <div class="input-item">
          <span>个人昵称</span>
          <el-input v-model="form.nickname" placeholder="请输入昵称" size="large"></el-input>
        </div>
      </el-form-item>
      <el-form-item prop="email">
        <div class="input-item">
          <span>邮箱</span>
          <el-input v-model="form.email" placeholder="请输入邮箱" size="large"></el-input>
        </div>
      </el-form-item>
      <el-form-item>
        <div class="input-item">
          <span>居住国家/地区</span>
          <el-select v-model="form.country" placeholder="请选择你的国家" size="large">
            <el-option v-for="item in countrys" :key="item" :label="item" :value="item" />
          </el-select>
        </div>
      </el-form-item>
    </el-form>
    <el-button type="info" @click="handleSave">保存</el-button>
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
.avatar {
  border-radius: 50%;
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
