<script setup>
// import { ref } from 'vue'
import { useUserStore } from '@/stores'

const userStore = useUserStore()
</script>

<template>
  <!-- 背景图片区域 -->
  <div class="blog-background">
    <img :src="`http://localhost:3000${userStore.user.blogBackground}`" class="full-image" />
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
      <h2>标题</h2>
      <div class="publishTime">
        <span>发布于1天前</span>
        <span>11323次阅读</span>
      </div>
    </el-header>
    <el-main>
      <!-- 轮播图 -->
      <el-carousel :interval="4000" motion-blur height="600px">
        <el-carousel-item v-for="item in 6" :key="item">
          <img src="@/assets/wechat.jpg" alt="" />
        </el-carousel-item>
      </el-carousel>
      <!-- 文本内容 -->
      <div class="content">
        <el-text
          >jfaldskjgfldsagjadslgjasdlgfaslgfjdsalgajsdfalsjflasdfjsaldglgfaslgfjdsalgajsdfalsjflasdfjsaldglgfaslgfjdsalgajsdfalsjflasdfjsaldglgfaslgfjdsalgajsdfalsjflasdfjsaldgfjalsdfjgasldfjgasldfjgasldfjgasldfjgasldfjgasldfjgasldfjgas</el-text
        >
      </div>
      <!-- 评论区 -->
      <div class="comment"></div>
    </el-main>
  </div>
</template>

<style>
/* 设置详情样式 */
.blogDetail {
  border-top: 1px solid #c0c0c0;
  margin-top: 16px;
}
.el-header,
.el-main {
  width: 900px;
  margin: 0px auto;
}
/* 轮播图 */
.el-carousel {
  margin: 40px 0;
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
  transform: translateY(-40%);
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
