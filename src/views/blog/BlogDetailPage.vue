<script setup>
import { ref, computed } from 'vue'
import { useUserStore, useBlogStore } from '@/stores'
import { useRouter } from 'vue-router'
import { blogDeleteService } from '@/api/blog'
import { commentCreateService, commentListService } from '@/api/comment'
import CommentContent from './components/CommentContent.vue'

const router = useRouter()
const userStore = useUserStore()
const blogStore = useBlogStore()

// 获取颜色
const color = localStorage.getItem('color')

// 获取文章详情
const blogDetail = ref(blogStore.blogContent)

// 计算发布时间
const publishedAt = computed(() => {
  const createdAt = new Date(blogDetail.value.createdAt)
  const now = new Date()
  const diff = now.getTime() - createdAt.getTime()
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const months = Math.floor(days / 30)
  const years = Math.floor(days / 365)

  if (years > 0) {
    return `${years}年前`
  } else if (months > 0) {
    return `${months}月前`
  } else if (days > 0) {
    return `${days}天前`
  } else if (hours > 0) {
    return `${hours}小时前`
  } else if (minutes > 0) {
    return `${minutes}分钟前`
  } else {
    return `刚刚`
  }
})

// 删除文章
const blogDelete = () => {
  ElMessageBox.confirm('你确认要删除这个博客吗?', '警告', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    blogDeleteService(blogDetail.value._id)
    ElMessage.success('删除成功')
    router.back()
  })
}

// 发表评论
const textarea = ref('')
const commentCreate = async () => {
  if (textarea.value.trim() === '') {
    ElMessage.error('评论内容不能为空')
    return
  }
  const data = {
    article_id: blogDetail.value._id,
    content: textarea.value,
    uid: userStore.user._id
  }
  await commentCreateService(data)
  ElMessage.success('评论成功')
  textarea.value = ''
  getCommentList()
  blogDetail.value.commentCount++
}

// 获取评论列表
const commentList = ref([])
const getCommentList = async () => {
  const res = await commentListService(blogDetail.value._id)
  commentList.value = res.data.data
  commentList.value.reverse()
}
getCommentList()

// 删除评论后重新获取评论列表
const reGet = () => {
  blogDetail.value.commentCount--
  getCommentList()
}

// 返回首页
const goBack = () => {
  router.back()
}
</script>

<template>
  <!-- 背景图片区域 -->
  <div class="blog-background">
    <img :src="`http://localhost:3000${userStore.user.blogBackground}`" class="full-image" />
  </div>

  <!-- 按钮区域 -->
  <div class="button">
    <el-button :style="{ background: color }" size="large" @click="goBack">返回博客列表</el-button>
    <el-button :style="{ background: color }" size="large" @click="blogDelete">删除文章</el-button>
  </div>

  <!-- 用户头像及签名 -->
  <div class="user">
    <div class="user-avatar">
      <img :src="`http://localhost:3000/${userStore.user.avatar}`" />
    </div>
    <span>{{ userStore.user.nickname }}</span>
    <p>{{ userStore.user.signature }}</p>
  </div>

  <!-- 文章详情 -->
  <div class="blogDetail">
    <el-header>
      <h2>{{ blogDetail.title }}</h2>
      <div class="publishTime">
        <span>发布于{{ publishedAt }}</span>
        <span>{{ blogDetail.views }}次阅读</span>
      </div>
    </el-header>
    <el-main>
      <!-- 轮播图 -->
      <el-carousel :interval="4000" height="600px" pause-on-hover>
        <el-carousel-item v-for="(item, index) in blogDetail.imageUrl" :key="index">
          <img :src="`http://localhost:3000${item}`" alt="" />
        </el-carousel-item>
      </el-carousel>
      <!-- 文本内容 -->
      <div class="content">
        <span v-html="blogDetail.content"></span>
      </div>
      <!-- 评论区 -->
      <div class="comment">
        <div class="commentHead">
          <span>Comments({{ blogDetail.commentCount }})</span>
        </div>
        <div class="publishComment">
          <el-input
            v-model="textarea"
            style="width: 820px"
            :rows="8"
            type="textarea"
            placeholder="发表你的评论吧..."
          />
          <el-button type="info" @click="commentCreate">发布评论</el-button>
        </div>

        <!-- 评论列表 -->
        <div class="commentList">
          <comment-content
            v-for="item in commentList"
            :key="item._id"
            :comment="item"
            @deleteComment="reGet"
          ></comment-content>
        </div>
      </div>
    </el-main>
  </div>
</template>

<style>
/* 发表评论 */
.publishComment {
  width: 95%;
  margin: 20px 0;
  background-color: white;
  height: 220px;
  padding: 20px;
  border-radius: 10px;
}
.publishComment .el-button {
  margin-top: 10px;
}

/* 设置详情样式 */
.blogDetail {
  border-top: 1px solid #c0c0c0;
  transform: translateY(-36px);
}
.el-header,
.el-main {
  width: 900px;
  margin: 0px auto;
}

/* 按钮样式 */
.el-button:hover {
  color: black;
}

/* 评论区域 */
.comment {
  margin: 20px 0;
  overflow: hidden;
}
.comment .commentHead {
  margin-top: 15px;
  color: #7d7d7d;
  font-weight: 600;
}
.comment .commentHead span {
  border-bottom: 1px solid #c0c0c0;
}

/* 文本区域 */
.content {
  font-size: 18px;
}

/* 轮播图 */
.el-carousel {
  margin: 40px 0;
}
.el-carousel__item {
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  pointer-events: none;
}
.el-carousel__item img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  pointer-events: none;
}

/* 按钮区域 */
.button {
  display: flex;
  justify-content: space-between;
  margin: 10px;
}

/* 头部 */
.el-header {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.el-header h2 {
  margin: 20px 0 10px;
  font-size: 25px;
  font-weight: 300;
}
.el-header .publishTime {
  font-size: 12px;
  color: #888;
  font-weight: var(--global-font-weight);
}
.el-header .publishTime :first-child {
  margin-right: 4px;
}

/* 设置顶部背景 */
.blog-background {
  height: 414px;
  overflow: hidden;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  pointer-events: none;
}
.full-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: none;
}

/* 设置用户头像 */
.user {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 400px;
  margin: 0 auto;
  transform: translateY(-63%);
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
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
}
</style>
