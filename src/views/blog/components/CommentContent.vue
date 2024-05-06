<script setup>
import { Delete } from '@element-plus/icons-vue'
import { commentDeleteService } from '@/api/comment'
import { ElMessage } from 'element-plus'

// 获取评论数据
const comment = defineProps({
  comment: {
    type: Object,
    required: true
  }
})

// 格式化时间
const formatDate = (dateString) => {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')
  return `发布于 ${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

// 删除评论
const deleteComment = async () => {
  await commentDeleteService(comment.comment._id)
  ElMessage.success('评论删除成功')
  emit('deleteComment')
}

// 通知父组件删除完成重新拉取评论列表
const emit = defineEmits(['deleteComment'])
</script>

<template>
  <div class="comment-content">
    <div class="introduce">
      <div class="avatar">
        <img
          v-if="comment.comment.author"
          :src="`http://localhost:3000/${comment.comment.author.avatar}`"
        />
        <img v-else src="@/assets/default.png" alt="" />
      </div>
      <div class="name-time">
        <div class="name" v-if="comment.comment.author">{{ comment.comment.author.nickname }}</div>
        <div class="time" v-else>匿名用户</div>
        <div class="time">{{ formatDate(comment.comment.createdAt) }}</div>
      </div>
    </div>
    <div class="content">
      <el-text>{{ comment.comment.content }}</el-text>
    </div>

    <!-- 删除按钮 -->
    <div class="delete">
      <el-button circle type="danger" @click="deleteComment">
        <el-icon><Delete /></el-icon>
      </el-button>
    </div>
  </div>
</template>

<style scoped>
/* 删除按钮 */
.delete {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0;
  transition: opacity 0.8s ease;
}
.comment-content:hover .delete {
  opacity: 1;
}

/* 评论内容 */
.content {
  margin-top: 10px;
}

/* 用户区域 */
.comment-content {
  width: 95%;
  height: 100px;
  background-color: white;
  border-radius: 10px;
  margin: 10px 0;
  padding: 20px;
  position: relative;
  overflow: hidden;
}
/* 遮罩层 */
.comment-content::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.comment-content:hover::before {
  opacity: 1;
}

.introduce {
  display: flex;
}
.introduce img {
  width: 40px;
  border-radius: 50%;
  margin-right: 20px;
}
.name-time {
  font-size: 14px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
