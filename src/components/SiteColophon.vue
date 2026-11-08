<template>
  <footer class="foot">
    <div class="wrap">
      <div class="foot__grid">
        <div class="foot__brand">
          <div class="foot__mark">
            <svg viewBox="0 0 32 32" width="24" height="24" fill="none" aria-hidden="true">
              <path d="M24.4 4H30L16 28.2 2 4h10.6L16 9.6 22.6 4h1.8Z" fill="#42b883" />
            </svg>
            <strong>Caiwu</strong>
          </div>
          <p>{{ brand.tagline }}</p>
          <p class="foot__license">{{ brand.license }}</p>
        </div>

        <nav class="foot__cols" aria-label="页脚导航">
          <div v-for="col in columns" :key="col.title" class="foot__col">
            <h4>{{ col.title }}</h4>
            <a v-for="link in col.links" :key="link.label" :href="link.href">{{ link.label }}</a>
          </div>
        </nav>
      </div>

      <div class="foot__base">
        <span>本站为 {{ brand.product }} 的介绍站点，内容以实际运行版本为准。</span>
        <span class="num">{{ brand.domain }}</span>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { brand, nav } from '../data/content'

const columns = [
  {
    title: '本站',
    links: nav.map((item) => ({ label: item.label, href: `#${item.id}` })),
  },
  {
    title: '文档',
    links: [
      { label: '接口文档', href: brand.apiDocs },
      { label: '架构说明', href: `${brand.repo}/blob/main/docs/ARCHITECTURE.md` },
      { label: '后端约束', href: `${brand.repo}/blob/main/docs/BACKEND.md` },
      { label: '前端约束', href: `${brand.repo}/blob/main/docs/FRONTEND.md` },
    ],
  },
  {
    title: '社区',
    links: [
      { label: 'GitHub 仓库', href: brand.repo },
      { label: '开发者 QQ 群', href: 'https://qm.qq.com/q/se4JU0fz7U' },
      { label: '问题反馈', href: `${brand.repo}/issues` },
    ],
  },
]
</script>

<style scoped>
.foot {
  background: var(--deep-3);
  color: rgba(255, 255, 255, 0.68);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding-top: var(--s7);
}

.foot__grid {
  display: grid;
  grid-template-columns: minmax(0, 300px) minmax(0, 1fr);
  gap: var(--s8);
  padding-bottom: var(--s7);
}

.foot__mark {
  display: flex;
  align-items: center;
  gap: 9px;
}

.foot__mark strong {
  font-size: 17px;
  font-weight: 600;
  color: #fff;
}

.foot__brand p {
  margin-top: var(--s3);
  font-size: 13px;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.55);
}

.foot__license {
  font-family: var(--font-mono);
  font-size: 11.5px !important;
  color: rgba(255, 255, 255, 0.4) !important;
}

.foot__cols {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--s6);
}

.foot__col h4 {
  font-size: 12.5px;
  font-weight: 600;
  color: #fff;
  letter-spacing: 0;
  margin-bottom: var(--s3);
}

.foot__col a {
  display: block;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.62);
  padding-block: 4px;
  transition: color 0.2s var(--ease);
}

.foot__col a:hover {
  color: #fff;
}

.foot__base {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-block: var(--s5);
  display: flex;
  justify-content: space-between;
  gap: var(--s4);
  font-size: 12px;
  color: rgba(255, 255, 255, 0.4);
}

@media (max-width: 900px) {
  .foot__grid {
    grid-template-columns: 1fr;
    gap: var(--s6);
  }

  .foot__cols {
    gap: var(--s5);
  }

  .foot__base {
    flex-direction: column;
  }
}

@media (max-width: 620px) {
  .foot__cols {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--s5);
  }
}
</style>
