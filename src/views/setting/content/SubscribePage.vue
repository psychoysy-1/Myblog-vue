<script setup>
import { useUserStore } from '@/stores'
import { getFollowersArticlesService } from '@/api/notice'
import { ref } from 'vue'

const userStore = useUserStore()

// 获取关注者文章信息
const noticeForm = ref({})
const getFollowersArticles = async () => {
  const res = await getFollowersArticlesService(userStore.user._id)
  noticeForm.value = res.data.data
  console.log(noticeForm.value)
}
getFollowersArticles()
</script>

<template>
  <show-container title="我的关注" v-if="noticeForm.length">
    <div class="column">
      <img :src="`http://localhost:3000/${item.authorInfo[0].avatar}`" alt="" />
      <div class="content">
        <p>{{ item.authorInfo[0].nickname }} 发布了新的文章《{{ item.title }}》</p>
        <p>{{ item.formattedCreatedAt }}</p>
      </div>
    </div>
  </show-container>
  <p v-else>您目前没有关注任何人</p>
</template>

<style scoped>
p {
  margin-left: 15px;
  font-size: 14px;
  color: rgb(117, 115, 112);
}
</style>
