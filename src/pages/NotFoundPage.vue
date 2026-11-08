<template>
  <div>
    <PageHead
      kicker="404"
      title="页面不存在"
      lead="这个地址没有对应的页面。可能是链接过期，或者路径拼错了。"
    />

    <section class="section">
      <div class="wrap">
        <div class="links">
          <RouterLink v-for="l in links" :key="l.to" :to="l.to" class="link-card">
            <strong>{{ l.title }}</strong>
            <span>{{ l.desc }}</span>
          </RouterLink>
        </div>
      </div>
    </section>

    <FinalCta />
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import PageHead from '../components/PageHead.vue'
import FinalCta from '../sections/FinalCta.vue'

const links = [
  { to: '/', title: '概览', desc: '系统整体介绍与业务闭环' },
  { to: '/features', title: '产品能力', desc: '八个业务子域的功能清单' },
  { to: '/userguide', title: '使用文档', desc: '管理员与客户的日常操作' },
  { to: '/install', title: '安装与部署', desc: '从空服务器装起来' },
  { to: '/devguide', title: '开发者文档', desc: '接口、插件与前端工程约束' },
]
</script>

<style scoped>
.links {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--s4);
}

.link-card {
  display: grid;
  gap: 6px;
  padding: var(--s5);
  border: 1px solid var(--divider);
  border-radius: 6px;
  transition: border-color 0.2s var(--ease), transform 0.2s var(--ease);
}

.link-card:hover {
  border-color: var(--green);
  transform: translateY(-2px);
}

.link-card strong {
  font-size: 15px;
}

.link-card span {
  font-size: 13px;
  line-height: 1.7;
  color: var(--text-2);
}

@media (max-width: 900px) {
  .links {
    grid-template-columns: 1fr;
  }
}
</style>
