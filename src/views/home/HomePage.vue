<script setup>
import MusicComponent from './components/MusicPart.vue'
import ClockComponent from './components/EarthPart.vue'
import NeonComponent from './components/NeonPart.vue'
import StatisticsPart from './components/StatisticsPart.vue'
</script>

<template>
  <div class="homePage">
    <div class="top">
      <MusicComponent class="component1" />
      <NeonComponent class="component4" />
      <div class="component1">图像</div>
    </div>
    <div class="bottom">
      <ClockComponent class="component2" />
      <StatisticsPart class="component3" />
    </div>
  </div>
</template>

<style scoped>
.homePage {
  display: flex;
  flex-direction: column;
  height: 93vh;
  margin: 27px 40px;
  justify-content: space-between; /* 上下元素垂直方向均匀分布 */
}
.top,
.bottom {
  display: flex;
  justify-content: space-between; /* 横向元素水平方向均匀分布 */
}

/* 组件1 */
.component1 {
  width: 16vw;
  height: 49vh;
  min-width: 220px;
  min-height: 350px;
  border-radius: 8px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
  transition: transform 0.6s ease;
}
.component1:hover,
.component2:hover,
.component3:hover,
.component4:hover {
  transform: translate(-7px, -7px);
}

.component2 {
  width: 18.5vw;
  height: 18.5vw;
  min-width: 260px;
  min-height: 260px;
  border-radius: 10px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
  transition: transform 0.6s ease;
}

.component3 {
  width: 61.5vw;
  height: 18.5vw;
  border-radius: 10px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
  transition: transform 0.6s ease;
}

.component4 {
  width: 47vw;
  height: 49vh;
  border-radius: 10px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
  transition: transform 0.6s ease;
}
</style>
