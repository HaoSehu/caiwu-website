<template>
  <section class="section">
    <div class="wrap shell">
      <aside class="shell__side">
        <p class="shell__title">使用文档</p>
        <nav aria-label="使用文档导航">
          <RouterLink to="/userguide" class="shell__home" :class="{ 'is-active': route.path === '/userguide' }">
            文档目录
          </RouterLink>
          <RouterLink
            v-for="item in userguideIndex"
            :key="item.to"
            :to="item.to"
            :class="{ 'is-active': route.path === item.to }"
          >
            {{ item.title }}
          </RouterLink>
        </nav>
      </aside>

      <div class="shell__main">
        <slot />

        <nav class="pager" aria-label="上一篇下一篇">
          <RouterLink v-if="prev" :to="prev.to" class="pager__link pager__link--prev">
            <span class="pager__dir">上一篇</span>
            <span class="pager__name">{{ prev.title }}</span>
          </RouterLink>
          <span v-else />
          <RouterLink v-if="next" :to="next.to" class="pager__link pager__link--next">
            <span class="pager__dir">下一篇</span>
            <span class="pager__name">{{ next.title }}</span>
          </RouterLink>
        </nav>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { userguideIndex } from '../data/userguide'

const route = useRoute()

const currentIndex = computed(() => userguideIndex.findIndex((d) => d.to === route.path))
const prev = computed(() => (currentIndex.value > 0 ? userguideIndex[currentIndex.value - 1] : null))
const next = computed(() =>
  currentIndex.value >= 0 && currentIndex.value < userguideIndex.length - 1
    ? userguideIndex[currentIndex.value + 1]
    : null,
)
</script>

<style scoped>
.shell {
  display: grid;
  grid-template-columns: 200px minmax(0, 1fr);
  gap: var(--s8);
  align-items: start;
}

.shell__side {
  position: sticky;
  top: 76px;
  border-left: 2px solid var(--divider);
  padding-left: var(--s4);
  max-height: calc(100dvh - 96px);
  overflow-y: auto;
}

.shell__title {
  font-size: 12px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-3);
  font-family: var(--font-mono);
  margin-bottom: var(--s3);
}

.shell__side nav {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.shell__side a {
  display: block;
  padding: 6px 0;
  font-size: 13.5px;
  color: var(--text-2);
  transition: color 0.2s var(--ease);
}

.shell__side a:hover {
  color: var(--green-darker);
}

.shell__side a.is-active {
  color: var(--green-darker);
  font-weight: 600;
  box-shadow: inset 2px 0 0 var(--green);
  margin-left: -18px;
  padding-left: 16px;
}

.shell__home {
  margin-bottom: var(--s2);
  padding-bottom: var(--s2) !important;
  border-bottom: 1px solid var(--divider);
}

.shell__main {
  min-width: 0;
}

.pager {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--s4);
  margin-top: var(--s6);
  padding-top: var(--s5);
  border-top: 1px solid var(--divider);
}

.pager__link {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px var(--s4);
  border: 1px solid var(--divider);
  border-radius: 6px;
  transition: border-color 0.2s var(--ease);
}

.pager__link:hover {
  border-color: var(--green);
}

.pager__link--next {
  text-align: right;
  grid-column: 2;
}

.pager__dir {
  font-size: 11.5px;
  color: var(--text-3);
}

.pager__name {
  font-size: 14px;
  color: var(--text-1);
}

@media (max-width: 900px) {
  .shell {
    grid-template-columns: 1fr;
    gap: var(--s5);
  }

  .shell__side {
    position: static;
    border-left: 0;
    border-bottom: 1px solid var(--divider);
    padding-left: 0;
    padding-bottom: var(--s4);
    max-height: none;
  }

  .shell__side nav {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 2px 16px;
  }

  .shell__side a.is-active {
    margin-left: 0;
    padding-left: 0;
    box-shadow: inset 0 -2px 0 var(--green);
  }

  .shell__home {
    border-bottom: 0;
    margin-bottom: 0;
    padding-bottom: 6px !important;
  }
}
</style>
