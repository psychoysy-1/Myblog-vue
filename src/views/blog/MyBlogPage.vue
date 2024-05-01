<script setup>
import { ref, nextTick, computed } from 'vue'
import { useUserStore } from '@/stores'
import { uploadBgService, userUpdateService } from '@/api/user'
import PublishBlog from './components/PublishEdit.vue'
import { Edit, Search, Expand, Fold } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import BlogContent from './components/BlogContent.vue'
import { blogGetListService, blogGetFilterService } from '@/api/blog'

// 获取用户id
const userStore = useUserStore()
const _id = ref(userStore.user._id)
const nickname = userStore.user.nickname

// 加载
// const loading = ref(false)

// 背景图片
let bgImg = ref('')
if (userStore.user.blogBackground) {
  bgImg = ref(`http://localhost:3000${userStore.user.blogBackground}`)
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
  ElMessage.success('上传成功')
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
const signatureRef = ref('')
const signature = ref(userStore.user.signature || '请填写你的个性签名')
// 切换状态并重新获取焦点
const toggleEdit = async () => {
  isEditing.value = !isEditing.value
  if (isEditing.value) {
    nextTick(() => {
      signatureRef.value.focus()
    })
  }
}
// 更新签名
const saveData = async () => {
  toggleEdit()
  if (signature.value.trim() === '') {
    ElMessage.error('签名不能为空')
    return
  } else if (signature.value.trim() === userStore.user.signature) {
    ElMessage.warning('请修改你的签名')
    return
  }
  const formData = new FormData()
  formData.append('_id', _id.value)
  formData.append('signature', signature.value)
  await userUpdateService(formData)
  // 重新渲染
  await userStore.getUser()
  ElMessage.success('修改签名成功')
}

// 发布博客 的按钮颜色
const color = ref('#24BA88')
color.value = localStorage.getItem('color')
const BtnColorChange = () => {
  localStorage.setItem('color', color.value)
}
const blogDrawer = ref()
const publish = () => {
  blogDrawer.value.open()
}

// 排序按钮
const isSort = ref(false)
const toggleSort = () => {
  isSort.value = !isSort.value
  articles.value = articles.value.reverse()
}

// 计算属性
const selectedYear = computed({
  get() {
    return BlogFormData.value.year
  },
  set(value) {
    BlogFormData.value.year = value ? value.slice(0, 4) : ''
  }
})

// 清除筛选
const clear = () => {
  BlogFormData.value.tag = ''
  BlogFormData.value.year = ''
  BlogFormData.value.search = ''
  reGet()
}

// 博客渲染
const articles = ref([])

// 获取标签和年份
const tagsAndYears = ref({
  tags: [],
  years: []
})

// 获取博客列表 加载动画
const loading = ref(false)
const BlogFormData = ref({
  author: _id.value,
  tag: '',
  year: '',
  search: ''
})

// 获取
const getArticles = async () => {
  loading.value = true
  const res1 = await blogGetListService(BlogFormData.value) //获取博客
  articles.value = res1.data.articles.reverse()
  const res2 = await blogGetFilterService(_id.value) //获取标签和年份
  tagsAndYears.value.tags = res2.data.data.tags
  tagsAndYears.value.years = res2.data.data.years
  loading.value = false
}
getArticles()

// 发布博客后重新拉取并渲染
const reGet = () => {
  getArticles()
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

  <!-- 发布博客按钮 -->
  <div class="publish">
    <el-color-picker v-model="color" size="large" @change="BtnColorChange" />
    <el-button size="large" type="primary" @click="publish" :icon="Edit" :color="color"
      >发布博客</el-button
    >
  </div>

  <!-- 发布博客抽屉 -->
  <publish-blog ref="blogDrawer" @published="reGet"></publish-blog>

  <!-- 用户头像及签名 -->
  <div class="user">
    <div class="user-avatar">
      <img :src="`http://localhost:3000/${userStore.user.avatar}`" />
    </div>
    <span>{{ userStore.user.nickname }}</span>
    <el-input
      v-if="isEditing"
      ref="signatureRef"
      v-model="signature"
      @blur="saveData"
      size="small"
      maxlength="20"
      placeholder="请输入个性签名"
      autofocus
    />
    <p @dblclick="toggleEdit" v-else>{{ signature }}</p>
  </div>

  <!-- 筛选区域 -->
  <div class="filter">
    <div class="filterIntro">
      <span>{{ nickname }}的{{ isSort ? '最新' : '最旧' }}帖子</span>
    </div>
    <div class="filterArea">
      <el-select
        placeholder="帖子类型"
        class="type"
        size="large"
        v-model="BlogFormData.tag"
        @change="reGet"
      >
        <el-option
          v-for="(item, index) in tagsAndYears.tags"
          :key="index"
          :value="item"
        ></el-option>
      </el-select>
      <el-select placeholder="日期" size="large" v-model="selectedYear" @change="reGet">
        <el-option
          v-for="(item, index) in tagsAndYears.years"
          :key="index"
          :value="item"
        ></el-option>
      </el-select>
      <el-button size="large" @click="toggleSort">
        <div class="icon-wrapper">
          <el-icon v-if="isSort" size="large"><Expand /></el-icon>
          <el-icon v-else size="large"><Fold /></el-icon>
        </div>
      </el-button>
      <el-input
        placeholder="搜索帖子标题"
        :prefix-icon="Search"
        size="large"
        v-model="BlogFormData.search"
        @keyup.enter="reGet"
        @blur="reGet"
      ></el-input>
      <el-button size="large" @click="clear">清除筛选</el-button>
    </div>
  </div>

  <!-- 博客列表 -->
  <div class="blogList" v-loading="loading">
    <blog-content v-for="article in articles" :key="article._id" :article="article"></blog-content>
  </div>
</template>

<style scoped>
/* 博客内容区域 */
.blogList {
  width: 900px;
  margin: 0 auto 40px;
}
.blog-content {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.3);
  margin: 0 auto 20px;
}

/* 筛选区域 */
.filter {
  border-top: 1px solid #c0c0c0;
  padding-top: 20px;
  transform: translateY(-35%);
}
.filter .filterIntro {
  width: 900px;
  margin: 10px auto 0;
  font-size: 26px;
  font-weight: 600;
  display: flex;
  align-items: center;
}
.filterArea {
  width: 900px;
  display: flex;
  margin: 0 auto;
  padding-top: 20px;
}
.el-select,
.el-input,
.el-button {
  margin: 0 5px;
}
.el-input {
  width: 1800px;
}

/* 旋转筛选按钮 */
.icon-wrapper {
  transform: rotate(90deg); /* 旋转90度 */
}

/* 设置发布文章按钮 */
.publish {
  display: flex;
  justify-content: flex-end;
  margin: 10px;
}

/* 设置用户头像 */
.user {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 400px;
  margin: 0 auto;
  transform: translateY(-70%);
}
.user-avatar img {
  width: 120px;
  height: 120px;
  border-radius: 12px;
  pointer-events: none;
}
.user span {
  font-size: 26px;
  font-weight: 600;
}
.user p {
  font-size: 14px;
  font-weight: 100;
  color: rgb(104, 104, 103);
  cursor: pointer;
}
.user .el-input {
  width: 300px;
}

/* 设置顶部背景 */
.blog-background {
  height: 414px;
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
