<script setup>
import { ref } from 'vue'
import BlogContent from '@/components/BlogContent.vue'
import { blogGetAllService } from '@/api/blog'

// 博客渲染
const articles = ref([])
const loading = ref(false)

// 获取
const getArticles = async () => {
  loading.value = true
  const res = await blogGetAllService() //获取博客
  articles.value = res.data.articles
  loading.value = false
}
getArticles()
</script>

<template>
  <div class="socialHall">
    <h1>社交大厅</h1>
    <div class="blogList" v-loading="loading">
      <blog-content
        v-for="article in articles"
        :key="article._id"
        :article="article"
      ></blog-content>
    </div>
  </div>
</template>

<style scoped>
.socialHall {
  width: 900px;
  margin: 40px auto;
}
h1 {
  margin-bottom: 20px;
  font-size: 34px;
}
.blog-content {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.3);
  margin: 0 auto 20px;
}
.dark {
  background-color: #282523;
}
</style>
