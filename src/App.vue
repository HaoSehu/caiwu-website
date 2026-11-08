<template>
  <SiteMasthead />
  <main>
    <RouterView v-slot="{ Component }">
      <Transition name="page" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </main>
  <SiteColophon />
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import SiteMasthead from './components/SiteMasthead.vue'
import SiteColophon from './components/SiteColophon.vue'

const route = useRoute()

const titles: Record<string, string> = {
  home: 'Caiwu 业务财务系统 · 创欧云',
  features: '产品能力 · Caiwu 业务财务系统',
  architecture: '技术架构 · Caiwu 业务财务系统',
  devguide: '开发者文档 · Caiwu 业务财务系统',
  'devguide-quickstart': '快速开始 · 开发者文档',
  'devguide-backend': '后端开发 · 开发者文档',
  'devguide-api': '接口开发 · 开发者文档',
  'devguide-frontend': '前端开发 · 开发者文档',
  'devguide-plugin': '插件开发 · 开发者文档',
  'devguide-database': '数据库与迁移 · 开发者文档',
  'devguide-deploy': '部署与运维 · 开发者文档',
  'devguide-verify': '测试与验证 · 开发者文档',
  demo: '实时预览 · Caiwu 业务财务系统',
  compare: '方案对比 · Caiwu 业务财务系统',
  scenarios: '适用场景 · Caiwu 业务财务系统',
  start: '开源上手 · Caiwu 业务财务系统',
}

watch(
  () => route.name,
  (name) => {
    document.title = titles[String(name)] ?? titles.home
  },
  { immediate: true },
)
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.18s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
