<script setup>
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import 'echarts-gl'
import earthBg from '@/assets/earthBg.jpg'

const worldBox = ref(null)

onMounted(async () => {
  world_fun()
})

const world_fun = () => {
  var BlChart = echarts.init(worldBox.value)
  var option = {
    globe: {
      baseTexture: earthBg,
      shading: 'color',
      zoom: 2,
      viewControl: {
        autoRotate: true,
        autoRotateSpeed: 5,
        autoRotateAfterStill: 2,
        rotateSensitivity: 2,
        targetCoord: [116.46, 39.92],
        maxDistance: 400,
        minDistance: 200
      }
    }
  }
  BlChart.setOption(option)
  window.onresize = () => {
    BlChart.resize()
  }
}
</script>

<template>
  <div class="worldBox" ref="worldBox"></div>
</template>

<style scoped>
.worldBox {
  width: 18.5vw;
  height: 18.5vw;
  background-color: rgb(175, 35, 77);
}
</style>
