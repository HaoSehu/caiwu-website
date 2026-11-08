<template>
  <header class="nav" :class="{ 'is-solid': pinned || menuOpen }">
    <div class="wrap nav__inner">
      <RouterLink class="nav__brand" to="/" aria-label="回到首页" @click="closeMenu">
        <svg viewBox="0 0 32 32" width="24" height="24" fill="none" aria-hidden="true">
          <path d="M24.4 4H30L16 28.2 2 4h10.6L16 9.6 22.6 4h1.8Z" fill="#42b883" />
        </svg>
        <span class="nav__title">Caiwu</span>
        <span class="nav__sep" aria-hidden="true">/</span>
        <span class="nav__sub">{{ brand.name }}</span>
      </RouterLink>

      <nav class="nav__links" aria-label="页面导航">
        <RouterLink
          v-for="item in nav"
          :key="item.id"
          :to="item.to"
          :class="{ 'is-active': route.path === item.to }"
        >{{ item.label }}</RouterLink>
      </nav>

      <div class="nav__right">
        <a class="nav__link" :href="brand.apiDocs" target="_blank" rel="noreferrer noopener">接口文档</a>
        <a class="nav__repo" :href="brand.repo" target="_blank" rel="noreferrer noopener" aria-label="GitHub 仓库">
          <svg viewBox="0 0 16 16" width="15" height="15" fill="currentColor" aria-hidden="true">
            <path d="M8 0A8 8 0 0 0 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38v-1.35c-2.23.48-2.7-1.07-2.7-1.07-.36-.93-.89-1.18-.89-1.18-.73-.5.06-.49.06-.49.8.06 1.23.83 1.23.83.71 1.22 1.87.87 2.33.66.07-.52.28-.87.5-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.58.83-2.14-.09-.2-.36-1.01.08-2.1 0 0 .67-.21 2.19.82a7.6 7.6 0 0 1 4 0c1.52-1.03 2.19-.82 2.19-.82.44 1.09.17 1.9.08 2.1.52.56.83 1.27.83 2.14 0 3.07-1.86 3.75-3.64 3.95.29.25.54.73.54 1.48v2.2c0 .21.15.46.55.38A8 8 0 0 0 16 8a8 8 0 0 0-8-8z" />
          </svg>
        </a>

        <button
          class="nav__toggle"
          type="button"
          :aria-expanded="menuOpen"
          aria-controls="nav-menu"
          :aria-label="menuOpen ? '关闭菜单' : '打开菜单'"
          @click="menuOpen = !menuOpen"
        >
          <span class="nav__toggle-bars" :class="{ 'is-open': menuOpen }" aria-hidden="true">
            <i></i><i></i><i></i>
          </span>
        </button>
      </div>
    </div>

    <Transition name="menu">
      <div v-if="menuOpen" id="nav-menu" class="nav__menu">
        <nav class="wrap nav__menu-inner" aria-label="移动端页面导航">
          <RouterLink
            v-for="item in nav"
            :key="item.id"
            :to="item.to"
            :class="{ 'is-active': route.path === item.to }"
            @click="closeMenu"
          >
            {{ item.label }}
          </RouterLink>
          <a :href="brand.apiDocs" target="_blank" rel="noreferrer noopener" @click="closeMenu">
            接口文档<span class="nav__ext" aria-hidden="true">↗</span>
          </a>
          <a :href="brand.repo" target="_blank" rel="noreferrer noopener" @click="closeMenu">
            GitHub 仓库<span class="nav__ext" aria-hidden="true">↗</span>
          </a>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { brand, nav } from '../data/content'

const route = useRoute()

const pinned = ref(false)
const menuOpen = ref(false)

function closeMenu() {
  menuOpen.value = false
}

function onScroll() {
  pinned.value = window.scrollY > 4
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && menuOpen.value) closeMenu()
}

// 桌面宽度下抽屉若仍打开（如旋转屏幕），收起，避免遮挡内容
const desktop = window.matchMedia('(min-width: 961px)')
function onBreakpoint(e: MediaQueryListEvent) {
  if (e.matches) closeMenu()
}

// 抽屉打开时锁住背景滚动
watch(menuOpen, (open) => {
  document.documentElement.style.overflow = open ? 'hidden' : ''
})

watch(() => route.fullPath, closeMenu)

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKeydown)
  desktop.addEventListener('change', onBreakpoint)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKeydown)
  desktop.removeEventListener('change', onBreakpoint)
  document.documentElement.style.overflow = ''
})
</script>

<style scoped>
.nav {
  position: sticky;
  top: 0;
  z-index: 60;
  height: 56px;
  /* 首屏为深色渐变，导航条本身用深色底并与之衔接；滚动后切成白底 */
  background: #1f2d3d;
  backdrop-filter: none;
  border-bottom: 1px solid transparent;
  transition: background-color 0.3s var(--ease), border-color 0.3s var(--ease);
}

.nav.is-solid {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: saturate(160%) blur(12px);
  border-bottom-color: var(--divider);
}

.nav__inner {
  height: 100%;
  display: flex;
  align-items: center;
  gap: var(--s5);
}

.nav__brand {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: none;
  min-width: 0;
}

.nav__title {
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  letter-spacing: 0.01em;
  transition: color 0.3s var(--ease);
}

.nav__sep,
.nav__sub {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
  transition: color 0.3s var(--ease);
}

.nav.is-solid .nav__title {
  color: var(--text-1);
}

.nav.is-solid .nav__sep,
.nav.is-solid .nav__sub {
  color: var(--text-3);
}

.nav__links {
  display: flex;
  gap: var(--s5);
  margin-left: auto;
}

.nav__links a {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.78);
  transition: color 0.2s var(--ease);
}

.nav__links a:hover {
  color: #fff;
}

.nav__links a.is-active {
  color: #fff;
  box-shadow: inset 0 -2px 0 var(--green);
}

.nav.is-solid .nav__links a {
  color: var(--text-2);
}

.nav.is-solid .nav__links a:hover {
  color: var(--green-darker);
}

.nav.is-solid .nav__links a.is-active {
  color: var(--green-darker);
  box-shadow: inset 0 -2px 0 var(--green);
}

.nav__right {
  display: flex;
  align-items: center;
  gap: var(--s4);
  flex: none;
}

.nav__link {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.78);
  transition: color 0.2s var(--ease);
}

.nav__link:hover {
  color: #fff;
}

.nav.is-solid .nav__link {
  color: var(--text-2);
}

.nav.is-solid .nav__link:hover {
  color: var(--green-darker);
}

.nav__repo {
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  color: rgba(255, 255, 255, 0.78);
  transition: color 0.2s var(--ease), background-color 0.2s var(--ease);
}

.nav__repo:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.12);
}

.nav.is-solid .nav__repo {
  color: var(--text-2);
}

.nav.is-solid .nav__repo:hover {
  color: var(--text-1);
  background: var(--white-mute);
}

/* 汉堡按钮：仅在 ≤960px 出现 */
.nav__toggle {
  display: none;
  place-items: center;
  width: 40px;
  height: 40px;
  margin-right: -8px;
  border-radius: 8px;
  color: #fff;
  transition: background-color 0.2s var(--ease);
}

.nav__toggle:hover {
  background: rgba(255, 255, 255, 0.12);
}

.nav.is-solid .nav__toggle {
  color: var(--text-1);
}

.nav.is-solid .nav__toggle:hover {
  background: var(--white-mute);
}

.nav__toggle-bars {
  position: relative;
  display: block;
  width: 20px;
  height: 14px;
}

.nav__toggle-bars i {
  position: absolute;
  left: 0;
  width: 20px;
  height: 2px;
  border-radius: 2px;
  background: currentColor;
  transition: transform 0.28s var(--ease), opacity 0.18s var(--ease), top 0.28s var(--ease);
}

.nav__toggle-bars i:nth-child(1) {
  top: 0;
}

.nav__toggle-bars i:nth-child(2) {
  top: 6px;
}

.nav__toggle-bars i:nth-child(3) {
  top: 12px;
}

.nav__toggle-bars.is-open i:nth-child(1) {
  top: 6px;
  transform: rotate(45deg);
}

.nav__toggle-bars.is-open i:nth-child(2) {
  opacity: 0;
}

.nav__toggle-bars.is-open i:nth-child(3) {
  top: 6px;
  transform: rotate(-45deg);
}

/* 抽屉面板 */
.nav__menu {
  position: absolute;
  inset: 56px 0 auto;
  max-height: calc(100dvh - 56px);
  overflow-y: auto;
  overscroll-behavior: contain;
  background: var(--white);
  border-bottom: 1px solid var(--divider);
  box-shadow: 0 18px 40px rgba(33, 53, 71, 0.12);
}

.nav__menu-inner {
  display: flex;
  flex-direction: column;
  padding-block: var(--s3) var(--s5);
}

.nav__menu-inner a {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 14px var(--s2);
  font-size: 16px;
  color: var(--text-1);
  border-bottom: 1px solid var(--divider);
  -webkit-tap-highlight-color: transparent;
}

.nav__menu-inner a:last-child {
  border-bottom: 0;
}

.nav__menu-inner a.is-active {
  color: var(--green-darker);
  font-weight: 600;
  box-shadow: inset 3px 0 0 var(--green);
  padding-left: var(--s4);
}

.nav__ext {
  font-size: 13px;
  color: var(--text-3);
}

.menu-enter-active,
.menu-leave-active {
  transition: opacity 0.2s var(--ease), transform 0.24s var(--ease);
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@media (max-width: 960px) {
  .nav__links {
    display: none;
  }

  .nav__right {
    margin-left: auto;
  }

  .nav__toggle {
    display: grid;
  }

  .nav__sub,
  .nav__sep {
    display: none;
  }
}

@media (max-width: 560px) {
  .nav__link {
    display: none;
  }
}
</style>
