<script setup>
import ColumnSlot from './components/ColumnSlot.vue'
</script>

<template>
  <show-container title="一般">
    <column-slot :content="'产品更新和社区公告'" />
    <column-slot :content="'会员简报'" />
    <column-slot :content="'当有人对您的博客留言时'" />
  </show-container>
</template>
