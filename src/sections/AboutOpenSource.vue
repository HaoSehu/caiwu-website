<template>
  <section id="open" class="section section--soft">
    <div class="wrap">
      <header class="block-head">
        <h2>开源与入口</h2>
        <p>
          {{ brand.product }}以 {{ brand.license }} 开源。接口文档、代码仓库与开发者交流群都在下面，可以直接拿去核验前面提到的每一条。
        </p>
      </header>

      <div class="entries">
        <a
          v-for="r in resources"
          :key="r.label"
          class="entry"
          :href="r.href"
          target="_blank"
          rel="noreferrer noopener"
        >
          <span class="entry__label">{{ r.label }}</span>
          <strong class="entry__value">{{ r.value }}</strong>
          <span class="entry__desc">{{ r.desc }}</span>
          <span class="entry__arrow num" aria-hidden="true">↗</span>
        </a>
      </div>

      <div class="docs-list">
        <h3>仓库文档</h3>
        <div class="docs-list__grid">
          <a v-for="doc in docs" :key="doc.label" :href="doc.href" target="_blank" rel="noreferrer noopener">
            <strong>{{ doc.label }}</strong>
            <span>{{ doc.desc }}</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { brand, resources } from '../data/content'

const base = `${brand.repo}/blob/main`

const docs = [
  { label: 'ARCHITECTURE', desc: '运行中的系统结构、路由分工与部署方式', href: `${base}/docs/ARCHITECTURE.md` },
  { label: 'BACKEND', desc: '后端分层与依赖边界约束', href: `${base}/docs/BACKEND.md` },
  { label: 'FRONTEND', desc: '四个前端与共享包的工程约束', href: `${base}/docs/FRONTEND.md` },
  { label: 'DATABASE', desc: '表结构快照与迁移规则', href: `${base}/docs/DATABASE.md` },
  { label: 'DESIGN', desc: '设计令牌、组件映射与无障碍要求', href: `${base}/docs/DESIGN.md` },
  { label: 'AGENTS', desc: '项目规则总入口：边界、验证与文档维护', href: `${brand.repo}/blob/main/AGENTS.md` },
]
</script>

<style scoped>
.block-head {
  padding-bottom: var(--s5);
  border-bottom: 1px solid var(--divider);
}

.entries {
  margin-top: var(--s6);
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--s5);
}

.entry {
  position: relative;
  display: grid;
  gap: 5px;
  padding: var(--s5);
  background: #fff;
  border: 1px solid var(--divider);
  border-radius: 6px;
  transition: border-color 0.25s var(--ease), transform 0.25s var(--ease),
    box-shadow 0.25s var(--ease);
}

.entry:hover {
  border-color: var(--green);
  transform: translateY(-2px);
  box-shadow: 0 10px 26px -18px rgba(21, 95, 62, 0.5);
}

.entry__label {
  font-size: 12px;
  color: var(--text-3);
}

.entry__value {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-1);
  word-break: break-all;
}

.entry__desc {
  font-size: 12.5px;
  line-height: 1.75;
  color: var(--text-2);
}

.entry__arrow {
  position: absolute;
  top: var(--s4);
  right: var(--s4);
  font-size: 13px;
  color: var(--text-3);
  transition: color 0.2s var(--ease), transform 0.2s var(--ease);
}

.entry:hover .entry__arrow {
  color: var(--green-dark);
  transform: translate(2px, -2px);
}

.docs-list {
  margin-top: var(--s7);
  padding-top: var(--s5);
  border-top: 1px solid var(--divider);
}

.docs-list h3 {
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0;
}

.docs-list__grid {
  margin-top: var(--s3);
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0 var(--s7);
}

.docs-list__grid a {
  display: grid;
  gap: 2px;
  padding: 11px 0;
  border-bottom: 1px solid var(--divider);
  transition: color 0.2s var(--ease);
}

.docs-list__grid a:hover strong {
  color: var(--green-dark);
}

.docs-list__grid strong {
  font-family: var(--font-mono);
  font-size: 12.5px;
  font-weight: 600;
  color: var(--text-1);
  transition: color 0.2s var(--ease);
}

.docs-list__grid span {
  font-size: 12.5px;
  color: var(--text-2);
  line-height: 1.7;
}

@media (max-width: 980px) {
  .entries {
    grid-template-columns: 1fr;
  }

  .docs-list__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 620px) {
  .docs-list__grid {
    grid-template-columns: 1fr;
  }
}
</style>
