<template>
  <div class="docpage">
    <slot />
  </div>
</template>

<script setup lang="ts">
// 文档页排版容器：代码块、表格、列表、卡片与规则行统一样式。
// 跨组件的元素选择器写在 docpage.css（全局），避免每个文档页重复一遍。
import './docpage.css'
</script>
