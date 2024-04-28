<script setup>
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import 'echarts-gl'
import earthBg from '@/assets/earthBg.jpg' //导入背景纹理

const worldBox = ref(null)

onMounted(async () => {
  world_fun()
})

const world_fun = () => {
  var BlChart = echarts.init(worldBox.value)
  var option = {
    globe: {
      baseTexture: earthBg, // 地球表面覆盖的图片
      shading: 'color', // 地球中三维图形的着色效果
      zoom: 2,
      viewControl: {
        autoRotate: true, // 自动旋转
        autoRotateSpeed: 5, //物体自转的速度,单位为角度 / 秒，默认为10也就是36秒转一圈。
        autoRotateAfterStill: 2, // 在鼠标静止操作后恢复自动旋转的时间间隔,默认 3s
        rotateSensitivity: 2, // 旋转操作的灵敏度，值越大越灵敏.设置为0后无法旋转。[1, 0]只能横向旋转.[0, 1]只能纵向旋转
        targetCoord: [116.46, 39.92], // 定位到北京
        maxDistance: 400,
        minDistance: 200
      }
    },
    series: [
      {
        name: 'lines3D',
        type: 'lines3D',
        coordinateSystem: 'globe',
        effect: {
          show: true
        },
        blendMode: 'lighter',
        lineStyle: {
          color: '#fff',
          width: 1
        },
        data: [],
        silent: false
      }
    ]
  }
  // 随机数据 i控制线数量
  for (let i = 0; i < 30; i++) {
    option.series[0].data = option.series[0].data.concat(randomData())
  }
  BlChart.setOption(option)
  window.onresize = () => {
    BlChart.resize()
  }
}

// 随机生成起始及终点经纬度坐标
const randomData = (numOrigins) => {
  const data = []
  // 定义中国的经纬度范围
  const chinaBounds = {
    minLon: 73.66, // 中国最西端的经度
    maxLon: 135.05, // 中国最东端的经度
    minLat: 18.16, // 中国最南端的纬度
    maxLat: 53.55 // 中国最北端的纬度
  }

  // 生成多个随机起点
  for (let i = 0; i < numOrigins; i++) {
    // 起点经纬度（在中国境内随机生成）
    let longitude = chinaBounds.minLon + Math.random() * (chinaBounds.maxLon - chinaBounds.minLon)
    let latitude = chinaBounds.minLat + Math.random() * (chinaBounds.maxLat - chinaBounds.minLat)

    // 随机终点经纬度（全球范围内）
    let longitude2 = Math.random() * 360 - 180
    let latitude2 = Math.random() * 180 - 90

    // 将起点和终点添加到数据集中
    data.push({
      coords: [
        [longitude, latitude],
        [longitude2, latitude2]
      ],
      value: (Math.random() * 3000).toFixed(2)
    })
  }

  return data
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
