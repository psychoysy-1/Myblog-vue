<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import * as echarts from 'echarts/core'
import { TooltipComponent, LegendComponent, GridComponent } from 'echarts/components'
import { PieChart, BarChart } from 'echarts/charts'
import { LabelLayout } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([
  TooltipComponent,
  LegendComponent,
  PieChart,
  BarChart,
  CanvasRenderer,
  LabelLayout,
  GridComponent
])

const chartContainer = ref(null)
const monthContainer = ref(null)
let pieChart = null
let barChart = null

onMounted(() => {
  // 初始化饼图
  pieChart = echarts.init(chartContainer.value)
  var pieOption = {
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

  pieOption && pieChart.setOption(pieOption)

  // 初始化柱状图
  barChart = echarts.init(monthContainer.value)
  var barOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: [
          '一月',
          '二月',
          '三月',
          '四月',
          '五月',
          '六月',
          '七月',
          '八月',
          '九月',
          '十月',
          '十一月',
          '十二月'
        ],
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '文章数量',
        type: 'bar',
        barWidth: '60%',
        data: [10, 52, 200, 334, 390, 330, 220, 150, 82, 50, 20, 5]
      }
    ]
  }

  barOption && barChart.setOption(barOption)

  // 监听窗口大小变化
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  // 销毁图表实例
  if (pieChart) {
    pieChart.dispose()
  }
  if (barChart) {
    barChart.dispose()
  }
  // 移除事件监听器
  window.removeEventListener('resize', handleResize)
})

function handleResize() {
  // 重新初始化图表
  pieChart.resize()
  barChart.resize()
}
</script>

<template>
  <div class="statistics">
    <div class="tags">
      <div class="tagStatistics" ref="chartContainer"></div>
      <span>标签统计</span>
    </div>
    <div class="month">
      <div class="monthStatistics" ref="monthContainer"></div>
      <span>各月文章数量统计</span>
    </div>
  </div>
</template>

<style scoped>
/* 全局设置 */
.statistics {
  display: flex;
  background-color: #f19797;
}

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

.month {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 900px;
  height: 350px;
  font-size: 20px;
}
.monthStatistics {
  width: 100%;
  height: 350px;
}
</style>
