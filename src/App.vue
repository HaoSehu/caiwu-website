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
  install: '安装与部署 · Caiwu 业务财务系统',
  'install-requirements': '环境与宝塔 · 安装与部署',
  'install-sites': '站点与域名 · 安装与部署',
  'install-backend': '后端部署 · 安装与部署',
  'install-frontend': '前端构建 · 安装与部署',
  'install-schedule': '定时任务与进程 · 安装与部署',
  'install-firstrun': '上线后的首批配置 · 安装与部署',
  'install-troubleshoot': '部署排错 · 安装与部署',
  'install-checklist': '上线检查清单 · 安装与部署',
  beginner: '新手引导 · Caiwu 业务财务系统',
  'beginner-onboarding': '新手引导 · 新手引导',
  'beginner-settings': '系统设置 · 新手引导',
  'beginner-daily': '运营日常 · 新手引导',
  userguide: '使用文档 · Caiwu 业务财务系统',
  'userguide-start': '开始使用 · 使用文档',
  'userguide-catalog': '商品与定价 · 使用文档',
  'userguide-order': '下单与支付 · 使用文档',
  'userguide-finance': '订单、账单与账务 · 使用文档',
  'userguide-service': '服务与工单 · 使用文档',
  'userguide-marketing': '营销与分销 · 使用文档',
  'userguide-site': '站点与内容 · 使用文档',
  'userguide-system': '系统设置与权限 · 使用文档',
  'userguide-logs': '日志与排查 · 使用文档',
  'userguide-faq': '常见问题 · 使用文档',
  devguide: '开发者文档 · Caiwu 业务财务系统',
  'devguide-quickstart': '快速开始 · 开发者文档',
  'devguide-backend': '后端开发 · 开发者文档',
  'devguide-api': '接口开发 · 开发者文档',
  'devguide-frontend': '前端开发 · 开发者文档',
  'devguide-plugin': '插件开发 · 开发者文档',
  'devguide-payment': '支付接口 · 开发者文档',
  'devguide-mail': '邮件接口 · 开发者文档',
  'devguide-sms': '短信接口 · 开发者文档',
  'devguide-captcha': '验证码接口 · 开发者文档',
  'devguide-hook': 'Hook 开发 · 开发者文档',
  'devguide-storage': '远端存储 · 开发者文档',
  'devguide-module': '模块开发 · 开发者文档',
  'devguide-standards': '开发规范 · 开发者文档',
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
