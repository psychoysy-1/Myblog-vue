<script setup>
import { ref, onMounted } from 'vue'

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
    <div class="time">更新时间: {{ weather.reporttime }}</div>
    <div class="main">{{ weather.weather }}</div>
    <div class="humidityAndWindpower">
      湿度: {{ weather.humidity }}%, 风力: {{ weather.windpower }}
    </div>
  </div>
</template>

<style scoped>
.weather {
  width: 16vw;
  height: 49vh;
  background: linear-gradient(to bottom right, #9adaaf, #bf96da);
  padding: 1rem;
  box-sizing: border-box;
}

.time,
.main,
.humidityAndWindpower {
  color: white;
  font-weight: bold;
  margin-bottom: 0.5rem;
}
</style>
