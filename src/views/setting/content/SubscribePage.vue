<script setup>
import { useUserStore } from '@/stores'
import { getFollowersArticlesService } from '@/api/notice'
import { ref } from 'vue'
import { cancelFollowService } from '@/api/user'

const userStore = useUserStore()

// 获取关注者文章信息
const noticeForm = ref({})
const getFollowersArticles = async () => {
  const res = await getFollowersArticlesService(userStore.user._id)
  noticeForm.value = res.data.data
}
getFollowersArticles()

// 取消关注
const canceledFollow = async (followerId, followeeId) => {
  ElMessageBox.confirm('你确定要取消关注吗?', '警告', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    await cancelFollowService(followerId, followeeId)
    ElMessage.success('取消关注成功')
    getFollowersArticles()
  })
}
</script>

<template>
  <show-container title="我的关注" v-if="noticeForm.length">
    <div class="column" v-for="(item, index) in noticeForm" :key="index">
      <div class="content-wrapper">
        <img :src="`http://localhost:3000/${item.authorInfo[0].avatar}`" alt="" />
        <div class="content">
          <p>{{ item.authorInfo[0].nickname }}</p>
        </div>
      </div>
      <div class="button">
        <el-button @click="canceledFollow(userStore.user._id, item.authorInfo[0]._id)"
          >取消关注</el-button
        >
      </div>
    </div>
  </show-container>
  <p v-else style="margin-left: 15px; font-size: 14px; color: rgb(117, 115, 112)">
    您目前没有关注任何人
  </p>
</template>

<style scoped>
.column {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
  margin: 10px 0;
  padding: 5px 0;
}

.content-wrapper {
  display: flex;
  align-items: center;
}

.content p {
  font-size: 17px;
}

.column img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  padding-left: 5px;
  margin-right: 15px;
}

.button {
  margin-right: 10px;
}
</style>
