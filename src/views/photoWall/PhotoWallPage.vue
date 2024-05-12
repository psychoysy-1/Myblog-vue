<script setup>
import { ref } from 'vue'
import { getPhotoWallService } from '@/api/photoWall'
import { useUserStore } from '@/stores'

// 获取用户id
const userStore = useUserStore()
const _id = ref(userStore.user._id)

// 随机旋转角度
const rotations = ref([])
const randomRotate = () => {
  photo.value.forEach((_, index) => {
    const randomAngle = Math.floor(Math.random() * 21) - 10 // 随机角度在 -10 到 10 度之间
    rotations.value[index] = randomAngle
  })
}
const loading = ref(false)

// 获取图片地址并存入photo
const photo = ref([])
const getPhotoWall = async () => {
  loading.value = true
  const res = await getPhotoWallService(_id.value)
  photo.value = res.data.data
  randomRotate()
  loading.value = false
}
getPhotoWall()
</script>

<template>
  <div class="photowall" v-loading="loading" v-if="photo.length">
    <div class="image-container" v-for="(item, index) in photo" :key="index">
      <img
        :src="`http://localhost:3000${item}`"
        class="ima"
        :id="index + 1"
        :style="{ transform: `rotate(${rotations[index]}deg)` }"
      />
    </div>
  </div>
  <div v-else class="no-photo">
    <h2>暂无发布的博客照片</h2>
  </div>
</template>

<style scoped>
.no-photo {
  text-align: center;
  margin-top: 50px;
}
.photowall {
  background-color: #e7e7e7;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 20px;
}

.image-container {
  margin: 30px;
}

.ima {
  width: 250px !important;
  max-height: 350px !important;
  object-fit: cover; /* 设置图片显示模式为裁剪,保持宽高比 */
  object-position: center; /* 设置图片在容器中的对齐位置 */
  padding: 18px;
  background-color: #ffffff;
  transition: transform 0.8s;
  -webkit-transition: -webkit-transform 0.8s;
  -moz-transition: -moz-transform 0.8s;
  -ms-transition: -ms-transform 0.8s;
  -o-transition: -o-transform 0.8s;
  -webkit-transform: transform 0.8s;
  -moz-transform: transform 0.8s;
  -ms-transform: transform 0.8s;
  -o-transform: transform 0.8s;
  transform: transform 0.8s;
}

.ima:hover {
  transform: scale(1.5) rotate(0deg) !important;
}
</style>
