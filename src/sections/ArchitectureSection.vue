<template>
  <section id="tech" class="section section--dark">
    <div class="wrap">
      <header class="block-head">
        <h2>技术实现</h2>
        <p>
          Laravel 12 + MySQL 8 + Redis。接口命名、鉴权链、响应结构、限流、队列与调度各自有固定的落地方式，
          下面按主题列出具体配置。
        </p>
      </header>

      <div class="tech">
        <div class="tech__specs">
          <div v-for="row in techRows" :key="row.topic" class="spec">
            <h3>{{ row.topic }}</h3>
            <code>{{ row.spec }}</code>
            <p>{{ row.note }}</p>
          </div>
        </div>

        <aside class="stack">
          <div v-for="layer in layers" :key="layer.name" class="stack__row">
            <span class="stack__name">{{ layer.name }}</span>
            <span class="stack__items num">{{ layer.items }}</span>
          </div>
        </aside>
      </div>

      <div class="objects">
        <h3 class="objects__title">四类核心记录</h3>
        <div class="objects__grid">
          <div v-for="o in objects" :key="o.table" class="object">
            <code>{{ o.table }}</code>
            <strong>{{ o.name }}</strong>
            <p>{{ o.rule }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { objects, techRows } from '../data/content'

const layers = [
  { name: '运行时', items: 'PHP 8.2+ · Laravel 12 · Sanctum Token' },
  { name: '存储', items: 'MySQL 8 · Redis 缓存与分布式锁' },
  { name: '队列', items: 'provision / business / automation / backup' },
  { name: '进程', items: 'schedule:run · queue:drain · vnc:relay' },
  { name: '前端', items: 'Vue 3 · Vite · TDesign Vue Next / Flutter · TDesign' },
]
</script>

<style scoped>
.block-head {
  padding-bottom: var(--s5);
  border-bottom: 1px solid var(--divider-dark);
}

.tech {
  margin-top: var(--s6);
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 300px);
  gap: var(--s8);
  align-items: start;
}

.tech__specs {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--s5) var(--s7);
}

.spec {
  padding-bottom: var(--s4);
  border-bottom: 1px solid var(--divider-dark);
}

.spec h3 {
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0;
  color: #fff;
}

.spec code {
  display: block;
  margin-top: 6px;
  font-family: var(--font-mono);
  font-size: 11.5px;
  line-height: 1.75;
  color: var(--green-light);
  word-break: break-word;
}

.spec p {
  margin-top: 6px;
  font-size: 12.5px;
  line-height: 1.8;
  color: var(--text-inv-2);
}

.stack {
  border-top: 1px solid var(--divider-dark);
}

.stack__row {
  display: grid;
  grid-template-columns: 52px minmax(0, 1fr);
  gap: var(--s3);
  padding: 11px 0;
  border-bottom: 1px solid var(--divider-dark);
}

.stack__name {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
}

.stack__items {
  font-size: 11.5px;
  line-height: 1.8;
  color: var(--text-inv-2);
  word-break: break-word;
}

.objects {
  margin-top: var(--s8);
  padding-top: var(--s6);
  border-top: 1px solid var(--divider-dark);
}

.objects__title {
  font-size: 18px;
  letter-spacing: 0;
  color: #fff;
}

.objects__grid {
  margin-top: var(--s4);
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: var(--s5);
}

.object code {
  font-size: 11.5px;
  color: var(--green-light);
}

.object strong {
  display: block;
  margin-top: 6px;
  font-size: 15px;
  color: #fff;
  font-weight: 600;
}

.object p {
  margin-top: 6px;
  font-size: 12.5px;
  line-height: 1.8;
  color: var(--text-inv-2);
}

@media (max-width: 1040px) {
  .tech {
    grid-template-columns: 1fr;
    gap: var(--s6);
  }

  .objects__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 720px) {
  .tech__specs {
    grid-template-columns: 1fr;
  }

  .objects__grid {
    grid-template-columns: 1fr;
  }
}
</style>
