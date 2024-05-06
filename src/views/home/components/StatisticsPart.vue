<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import * as echarts from 'echarts/core'
import { TooltipComponent, LegendComponent } from 'echarts/components'
import { PieChart } from 'echarts/charts'
import { LabelLayout } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([TooltipComponent, LegendComponent, PieChart, CanvasRenderer, LabelLayout])

const chartContainer = ref(null)
let myChart = null

onMounted(() => {
  // 初始化图表
  myChart = echarts.init(chartContainer.value)
  var option = {
    tooltip: {
      trigger: 'axis'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '80%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 30,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 1048, name: '美女' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 1484, name: 'Union Ads' },
          { value: 2300, name: 'Video Ads' }
        ]
      }
    ]
  }

  option && myChart.setOption(option)

  // 监听窗口大小变化
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  // 销毁图表实例
  if (myChart) {
    myChart.dispose()
  }
  // 移除事件监听器
  window.removeEventListener('resize', handleResize)
})

function handleResize() {
  // 重新初始化图表
  myChart.resize()
}
</script>

<template>
  <div class="statistics">
    <div class="tags">
      <div class="tagStatistics" ref="chartContainer"></div>
      <span>标签统计</span>
    </div>
    <div>aaa</div>
  </div>
</template>

<style scoped>
.tags {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 350px;
  height: 350px;
  font-size: 20px;
}
.tagStatistics {
  width: 350px;
  height: 350px;
}
</style>
