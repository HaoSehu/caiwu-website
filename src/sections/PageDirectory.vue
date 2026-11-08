<template>
  <section class="section">
    <div class="wrap">
      <h2 class="dir__title">深入了解</h2>
      <div class="dir">
        <RouterLink v-for="page in pages" :key="page.to" :to="page.to" class="card">
          <span class="card__kicker">{{ page.kicker }}</span>
          <h3>{{ page.title }}</h3>
          <p>{{ page.desc }}</p>
          <span class="card__more">阅读 <span aria-hidden="true">→</span></span>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

const pages = [
  {
    to: '/features',
    kicker: '01',
    title: '产品能力',
    desc: '八个业务子域的功能清单与涉及的数据表：商品、订单、开通、管控、财务、分销、工单、治理。',
  },
  {
    to: '/architecture',
    kicker: '02',
    title: '技术架构',
    desc: '分层、鉴权链、响应规范、队列拓扑、插件边界与数据升级，以及六个实现细节的展开。',
  },
  {
    to: '/devguide',
    kicker: '03',
    title: '开发者指南',
    desc: '仓库结构、本地启动、后端分层、接口契约、四端前端、插件开发、队列调度与验证命令。',
  },
  {
    to: '/demo',
    kicker: '04',
    title: '实时预览',
    desc: '直接嵌入真实前端构建产物：管理后台、用户控制台与官网门户，可点击但无后端。',
  },
  {
    to: '/compare',
    kicker: '05',
    title: '方案对比',
    desc: '对象边界、资金记录、删除语义、权限模型等八个维度上的设计取舍，与另一条常见实现路径对照。',
  },
  {
    to: '/scenarios',
    kicker: '06',
    title: '适用场景',
    desc: '中小 IDC、云服务商与转售商、建站代运营团队、自建平台的研发团队。',
  },
  {
    to: '/start',
    kicker: '07',
    title: '开源上手',
    desc: '从克隆到跑起来的最短路径，各端验证命令，以及仓库文档索引。',
  },
]
</script>

<style scoped>
.dir__title {
  font-size: clamp(24px, 2.4vw, 32px);
  letter-spacing: -0.02em;
  padding-bottom: var(--s4);
  border-bottom: 1px solid var(--divider);
}

.dir {
  margin-top: var(--s5);
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--s5);
}

.card {
  display: grid;
  gap: 8px;
  align-content: start;
  padding: var(--s5);
  border: 1px solid var(--divider);
  border-radius: 6px;
  transition: border-color 0.25s var(--ease), transform 0.25s var(--ease),
    box-shadow 0.25s var(--ease);
}

.card:hover {
  border-color: var(--green);
  transform: translateY(-2px);
  box-shadow: 0 12px 28px -20px rgba(21, 95, 62, 0.55);
}

.card__kicker {
  font-family: var(--font-mono);
  font-size: 11.5px;
  color: var(--green-dark);
}

.card h3 {
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 0;
}

.card p {
  font-size: 13.5px;
  line-height: 1.8;
  color: var(--text-2);
}

.card__more {
  margin-top: var(--s2);
  font-size: 12.5px;
  color: var(--green-dark);
}

@media (max-width: 980px) {
  .dir {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 620px) {
  .dir {
    grid-template-columns: 1fr;
  }
}
</style>
