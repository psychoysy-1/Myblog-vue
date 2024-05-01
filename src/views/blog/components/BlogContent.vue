<script setup>
import { View, ChatRound, Files, Clock } from '@element-plus/icons-vue'

// 获取文章数据
defineProps({
  article: {
    type: Object,
    required: true
  }
})
// 获取主题色
const color = localStorage.getItem('color')

// 格式化日期
const formatDate = (dateString) => {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${year}年${month}月${day}日`
}
</script>

<template>
  <div class="blog-content">
    <div class="left">
      <img v-if="article.imageUrl" :src="`http://localhost:3000${article.imageUrl[0]}`" alt="" />
      <img v-else src="@/assets/default.png" alt="" />
    </div>
    <div class="right">
      <div class="tag">
        <div class="custom-tag">
          <el-icon class="icon"><Clock /></el-icon>
          <span>{{ formatDate(article.createdAt) }}</span>
        </div>
      </div>
      <div class="title">
        <el-text truncated>{{ article.title }}</el-text>
      </div>
      <div class="introduce">
        <div class="author box">
          <img
            v-if="article.author && article.author.avatar"
            :src="`http://localhost:3000/${article.author.avatar}`"
            alt="Author Avatar"
          />
          <el-text>111</el-text>
        </div>
        <div class="views box">
          <el-icon><View /></el-icon>
          <el-text>{{ article.views }}热度</el-text>
        </div>
        <div class="comment box">
          <el-icon><ChatRound /></el-icon>
          <el-text> {{ article.commentCount }}条评论 </el-text>
        </div>
        <div class="tagName box">
          <el-icon><Files /></el-icon>
          <el-text v-if="article.tags">{{ article.tags[0] }}</el-text>
        </div>
      </div>
      <div class="content">
        <el-text line-clamp="5">
          <div v-html="article.content"></div>
        </el-text>
      </div>
    </div>
  </div>
</template>

<style scoped>
.blog-content {
  width: 900px;
  height: 300px;
  display: flex;
  overflow: hidden;
}
/* 右侧设置 */
.right {
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 460px;
}
.tag,
.title,
.introduce {
  margin-bottom: 20px;
}

/* 时间标签 */
.tag .custom-tag {
  display: inline-flex;
  align-items: center;
  height: 32px;
  padding: 0 12px;
  border-radius: 4px;
  font-size: 14px;
  line-height: 1;
  border: 1px solid #d6d6d6;
}
.tag .custom-tag .icon {
  margin-right: 4px;
}

/* 标题 */
.title .el-text {
  font-size: 24px;
  font-weight: 600;
  transition: color 1s;
}
.title .el-text:hover {
  color: v-bind(color);
  cursor: default;
}

/* 作者、浏览量、评论、标签 */
.introduce {
  display: flex;
  align-items: center;
}
.introduce img {
  width: 20px;
  border-radius: 50%;
}
.introduce .box {
  margin-right: 10px;
  display: flex;
  align-items: center;
}
.introduce .author .el-text,
.introduce .views .el-text,
.introduce .comment .el-text,
.introduce .tagName .el-text {
  transition: color 1s;
  margin-left: 2px;
}
.introduce .author :hover,
.introduce .comment :hover,
.introduce .tagName :hover {
  cursor: pointer;
  color: v-bind(color);
}

/* 内容区域 */
.content {
  height: 100px;
}

/* 左侧图片设置 */
.left {
  width: 400px;
  height: 300px;
  overflow: hidden;
}
.blog-content .left img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}
.blog-content .left img:hover {
  transform: scale(1.1);
}
</style>
