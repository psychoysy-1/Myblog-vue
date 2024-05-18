<script setup>
import { useUserStore } from '@/stores'
import { getFollowersArticlesService } from '@/api/notice'
import { ref } from 'vue'
import moment from 'moment'
import { differenceInDays } from 'date-fns'

const userStore = useUserStore()

// 获取关注者文章信息
const noticeForm = ref({
  recent: [],
  older: []
})

const getFollowersArticles = async () => {
  const res = await getFollowersArticlesService(userStore.user._id)
  const articles = res.data.data.map((article) => ({
    ...article,
    formattedCreatedAt: moment(article.createdAt).format('YYYY-MM-DD'),
    daysAgo: differenceInDays(new Date(), new Date(article.createdAt))
  }))

  // 根据时间差进行分组
  noticeForm.value = {
    recent: articles.filter((article) => article.daysAgo < 7),
    older: articles.filter((article) => article.daysAgo >= 7)
  }
}
getFollowersArticles()

const blogDetail = () => {}
</script>

<template>
  <page-container title="通知" style="background-color: #f0f0f0">
    <template v-if="noticeForm.recent.length > 0 || noticeForm.older.length > 0">
      <show-container title="近一周">
        <div class="column" v-for="item in noticeForm.recent" :key="item._id" @click="blogDetail">
          <img :src="`http://localhost:3000/${item.authorInfo[0].avatar}`" alt="" />
          <div class="content">
            <p>{{ item.authorInfo[0].nickname }} 发布了新的文章《{{ item.title }}》</p>
            <p>{{ item.formattedCreatedAt }}</p>
          </div>
        </div>
      </show-container>

      <show-container title="更早">
        <div class="column" v-for="item in noticeForm.older" :key="item._id" @click="blogDetail">
          <img :src="`http://localhost:3000/${item.authorInfo[0].avatar}`" alt="" />
          <div class="content">
            <p>{{ item.authorInfo[0].nickname }} 发布了新的文章《{{ item.title }}》</p>
            <p>{{ item.formattedCreatedAt }}</p>
          </div>
        </div>
      </show-container>
    </template>
    <template v-else>
      <p style="font-size: 14px; margin-top: 20px">你还没关注任何人或你关注的人没有发布任何文章</p>
    </template>
  </page-container>
</template>

<style scoped>
:deep(.el-card__body) {
  padding: 0;
}
.show-container {
  margin-top: 20px;
}
.column {
  display: flex;
  align-items: center;
  border-radius: 5px;
  margin: 10px 0;
  padding: 5px 0;
  transition: all 0.3s ease-in-out;
}
.column img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
  padding-left: 5px;
}
.column:hover {
  background-color: #c2bfbf;
  cursor: pointer;
}
</style>
