<script setup>
import { ArrowRightBold, ArrowLeftBold, VideoPause, VideoPlay } from '@element-plus/icons-vue'
import { ref, watch } from 'vue'
// 图片引入
import img1 from '@/assets/musicImg/1.jpg'
import img2 from '@/assets/musicImg/2.jpg'
import img3 from '@/assets/musicImg/3.jpg'
import img4 from '@/assets/musicImg/4.jpg'
import img5 from '@/assets/musicImg/5.jpg'
// 音乐引入
import music1 from '@/assets/music/1.ogg'
import music2 from '@/assets/music/2.ogg'
import music3 from '@/assets/music/3.mp3'
import music4 from '@/assets/music/4.mp3'
import music5 from '@/assets/music/5.mp3'

// 播放器音乐
const musicList = ref([
  {
    img: img1,
    title: 'love yourslf',
    author: 'Justin Bieber',
    src: music1
  },
  {
    img: img2,
    title: 'Peaches',
    author: 'Justin Bieber',
    src: music2
  },
  {
    img: img3,
    title: '人鱼的眼泪',
    author: 'EXO',
    src: music3
  },
  {
    img: img4,
    title: 'STAY',
    author: 'Justin Bieber',
    src: music4
  },
  {
    img: img5,
    title: '我落泪情绪零碎',
    author: '周杰伦',
    src: music5
  }
])

const currentIndex = ref(0)
const isPlaying = ref(false)
let audioEl = null

watch(currentIndex, () => {
  updateAudioSrc()
})

const togglePlay = () => {
  isPlaying.value = !isPlaying.value
  const imgEl = document.querySelector('.music img')
  if (isPlaying.value) {
    audioEl.play()
    imgEl.classList.add('rotating')
  } else {
    audioEl.pause()
    imgEl.classList.remove('rotating')
  }
}

const changeCurrentSong = (index) => {
  currentIndex.value = (index + musicList.value.length) % musicList.value.length
}

const updateAudioSrc = () => {
  audioEl = document.querySelector('audio')
  audioEl.src = musicList.value[currentIndex.value].src
  togglePlay()
}
</script>

<template>
  <div class="music-component">
    <div class="music">
      <img :src="musicList[currentIndex].img" alt="" />
      <audio controls style="display: none" loop>
        <source :src="musicList[currentIndex].src" type="audio/mpeg" />
      </audio>
      <div class="describe">
        <span>{{ musicList[currentIndex].title }}</span>
        <span>{{ musicList[currentIndex].author }}</span>
      </div>
      <div class="button">
        <el-button circle size="large" @click="changeCurrentSong(currentIndex - 1)">
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
        <el-button circle size="large" @click="changeCurrentSong(currentIndex + 1)">
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
