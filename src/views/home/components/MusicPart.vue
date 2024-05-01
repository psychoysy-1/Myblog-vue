<script setup>
import { ArrowRightBold, ArrowLeftBold, VideoPause, VideoPlay } from '@element-plus/icons-vue'
import { ref } from 'vue'

// 播放器音乐
// const musicList = ref([
//   {
//     img: '@/assets/musicImg/1.jpg',
//     title: 'love yourslf',
//     author: 'Justin Bieber',
//     src: '@/assets/music/1.ogg'
//   },
//   {
//     img: '@/assets/musicImg/2.jpg',
//     title: 'Peaches',
//     author: 'Justin Bieber',
//     src: '@/assets/music/2.ogg'
//   },
//   {
//     img: '@/assets/musicImg/3.jpg',
//     title: '人鱼的眼泪',
//     author: 'EXO',
//     src: '@/assets/music/3.mp3'
//   },
//   {
//     img: '@/assets/musicImg/4.jpg',
//     title: 'STAY',
//     author: 'Justin Bieber',
//     src: '@/assets/music/4.mp3'
//   },
//   {
//     img: '@/assets/musicImg/5.jpg',
//     title: '我落泪情绪零碎',
//     author: '周杰伦',
//     src: '@/assets/music/5.mp3'
//   }
// ])

// 播放音乐
const isPlaying = ref(false)
const togglePlay = () => {
  isPlaying.value = !isPlaying.value
  const audioEl = document.querySelector('audio')
  const imgEl = document.querySelector('.music img')
  if (isPlaying.value) {
    audioEl.play()
    imgEl.classList.add('rotating')
  } else {
    audioEl.pause()
    imgEl.classList.remove('rotating')
  }
}
</script>

<template>
  <div class="music-component">
    <div class="music">
      <img src="@/assets/musicImg/1.jpg" alt="" />
      <audio controls style="display: none" loop>
        <source src="@/assets/music/1.ogg" type="audio/mpeg" />
      </audio>
      <div class="describe">
        <span>love yourslf</span>
        <span>Justin Bieber</span>
      </div>
      <div class="button">
        <el-button circle size="large">
          <el-icon>
            <ArrowLeftBold />
          </el-icon>
        </el-button>
        <el-button v-if="isPlaying" circle size="large" @click="togglePlay">
          <el-icon>
            <VideoPause />
          </el-icon>
        </el-button>
        <el-button v-else circle size="large" @click="togglePlay">
          <el-icon>
            <VideoPlay />
          </el-icon>
        </el-button>
        <el-button circle size="large">
          <el-icon>
            <ArrowRightBold />
          </el-icon>
        </el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.music-component {
  width: 16vw;
  height: 49vh;
  border-radius: 8px;
  background-color: #6449dd;
}

/* 配置无法选中,完善用户体验 */
.music,
.describe {
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}
.music img {
  pointer-events: none;
}

.music {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  animation: rotateToBack 1s ease-in-out forwards;
  transform-origin: center center;
  margin: 0 30px;
}
.describe {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.describe span:first-child {
  font-size: 1.5rem;
  font-weight: bold;
}

/* 播放器图片 */
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.music img {
  width: 8vw;
  border-radius: 50%;
  border: 30px solid black;
  margin-top: 45px;
  animation: rotate 15s linear infinite paused;
}
.music img.rotating {
  animation-play-state: running;
}

.music .button {
  margin-bottom: 20px;
}
</style>
