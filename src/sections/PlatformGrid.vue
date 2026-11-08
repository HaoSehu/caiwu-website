<template>
  <section id="platforms" class="section">
    <div class="wrap">
      <header class="block-head">
        <h2>四个客户端</h2>
        <p>
          共用同一套 client 接口。管理端另有独立的管理接口与权限码；App 独立构建，不并入库的 npm workspace。
        </p>
      </header>

      <div class="grid">
        <article v-for="p in platforms" :key="p.name" class="card">
          <header class="card__head">
            <h3>{{ p.name }}</h3>
            <span class="card__who">{{ p.who }}</span>
          </header>
          <p class="card__stack">{{ p.stack }}</p>
          <ul>
            <li v-for="page in p.pages" :key="page">{{ page }}</li>
          </ul>
        </article>
      </div>

      <p class="note">
        App 端的 SSH 由客户端直连，后端只通过一个接口下发连接凭据；VNC 走独立 relay 进程，与 Web 端共用同一套令牌签发规则。
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { platforms } from '../data/content'
</script>

<style scoped>
.block-head {
  padding-bottom: var(--s5);
  border-bottom: 1px solid var(--divider);
}

.grid {
  margin-top: var(--s6);
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: var(--s6);
}

.card {
  padding-top: var(--s4);
  border-top: 2px solid var(--green);
}

.card__head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--s3);
  flex-wrap: wrap;
}

.card h3 {
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 0;
}

.card__who {
  font-size: 12px;
  color: var(--text-3);
}

.card__stack {
  margin-top: 6px;
  font-size: 11.5px;
  line-height: 1.7;
  color: var(--text-3);
}

.card ul {
  margin: var(--s4) 0 0;
  padding: 0;
  list-style: none;
}

.card li {
  font-size: 13px;
  line-height: 1.75;
  color: var(--text-2);
  padding: 6px 0;
  border-bottom: 1px solid var(--divider);
}

.card li:last-child {
  border-bottom: 0;
}

.note {
  margin-top: var(--s6);
  padding-left: var(--s4);
  border-left: 2px solid var(--green);
  font-size: 13.5px;
  line-height: 1.85;
  color: var(--text-2);
}

@media (max-width: 1040px) {
  .grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 620px) {
  .grid {
    grid-template-columns: 1fr;
    gap: var(--s5);
  }
}
</style>
