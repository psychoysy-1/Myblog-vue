<script setup>
import { ref, onMounted } from 'vue'
import { LocationFilled, Odometer, WindPower } from '@element-plus/icons-vue'

// 定义 API 请求地址和参数
const apiUrl = 'https://restapi.amap.com/v3/weather/weatherInfo'
const params = {
  key: '977bc4713b3aa33278388e7f6c746c03', // 替换成你的 API key
  city: '210212', //
  extensions: 'base', // 返回实况天气和预报天气
  output: 'JSON' // 返回 JSON 格式
}

// 构建完整的 API 请求 URL
const queryParams = new URLSearchParams(params).toString()
const requestUrl = `${apiUrl}?${queryParams}`

const weather = ref({})

onMounted(async () => {
  const response = await fetch(requestUrl)
  const data = await response.json()
  console.log(data.lives[0])
  weather.value = data.lives[0]
})
</script>

<template>
  <div class="weather" v-if="weather.city">
    <div class="address">
      <el-icon><LocationFilled /></el-icon>
      <span>{{ weather.province }}省 {{ weather.city }}</span>
    </div>
    <div class="main">
      <span>{{ weather.temperature }}°C</span>
      <span>{{ weather.weather }}</span>
    </div>
    <div class="humidityAndWindpower">
      <div class="humidity">
        <div class="icon">
          <el-icon size="40"><Odometer /></el-icon>
        </div>
        <div class="text">
          <span>{{ weather.humidity }}%</span>
          <span>湿度</span>
        </div>
      </div>
      <div class="windpower">
        <div class="icon">
          <el-icon size="40"><WindPower /></el-icon>
        </div>
        <div class="text">
          <span>{{ weather.windpower }}Km/h</span>
          <span>风力</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.weather {
  width: 16vw;
  height: 49vh;
  background-image: url('@/assets/warm-bg.jpg');
  padding: 1rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

/* 顶部 */
.address {
  width: 100%;
  font-size: 20px;
  font-weight: bold;
}
/* 中间温度和天气 */
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: bold;
}
.main span:first-child {
  font-size: 70px;
  font-family: 'Times New Roman', Times, serif;
  margin-bottom: 10px;
}
.main span:last-child {
  font-size: 25px;
}

/* 底部 */
.humidityAndWindpower {
  display: flex;
  color: rgb(0, 0, 0);
  display: flex;
  justify-content: space-between;
}
.humidity,
.windpower {
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon {
  margin: 0 10px;
}

.text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.text span {
  font-size: 14px;
}
</style>
