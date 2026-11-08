<template>
  <section id="overview" class="hero">
    <div class="hero__bg" aria-hidden="true"></div>

    <div class="wrap hero__inner">
      <h1>
        <span class="hero__name">Caiwu</span>
        <br />
        业务财务系统
      </h1>

      <p class="hero__lead">
        面向 IDC 与云服务商的业务与财务经营系统。<br class="hide-sm" />
        商品、订单、账单、支付、开通、台账在同一条链路上。
      </p>

      <div class="hero__actions">
        <a class="btn btn--green" href="#capabilities">开始了解</a>
        <RouterLink class="btn btn--ghost-dark" to="/demo">实时预览</RouterLink>
      </div>

      <p class="hero__note">
        AGPL-3.0 开源 ·
        <a :href="brand.repo" target="_blank" rel="noreferrer noopener">{{ brand.repoLabel }}</a>
      </p>
    </div>

    <div class="hero__stats wrap">
      <div v-for="fact in heroFacts" :key="fact.label">
        <strong class="num">{{ fact.value }}</strong>
        <span>{{ fact.label }}</span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { brand, heroFacts } from '../data/content'
</script>

<style scoped>
.hero {
  position: relative;
  overflow: hidden;
  background: var(--deep-3);
  color: #fff;
  padding-block: var(--s10) 0;
}

/* Vue 官网首页的双色渐变：从深绿过渡到品牌绿 */
.hero__bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(120% 80% at 50% -10%, rgba(66, 184, 131, 0.55) 0%, rgba(66, 184, 131, 0) 62%),
    linear-gradient(180deg, #1f2d3d 0%, #223245 46%, #2b3d50 100%);
  pointer-events: none;
}

.hero__bg::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.055) 1px, transparent 0);
  background-size: 22px 22px;
  mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0) 78%);
}

.hero__inner {
  position: relative;
  text-align: center;
  max-width: 900px;
}

.hero h1 {
  font-size: clamp(38px, 6vw, 76px);
  line-height: 1.16;
  letter-spacing: -0.03em;
  color: #fff;
  font-weight: 600;
}

.hero__name {
  background: linear-gradient(95deg, #42d392 0%, #42b883 52%, #35eb9a 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

.hero__lead {
  margin: var(--s5) auto 0;
  max-width: 640px;
  font-size: 17px;
  line-height: 1.9;
  color: rgba(255, 255, 255, 0.82);
}

.hero__actions {
  margin-top: var(--s6);
  display: flex;
  justify-content: center;
  gap: var(--s3);
  flex-wrap: wrap;
}

.hero__note {
  margin-top: var(--s5);
  font-size: 13px;
  color: rgba(255, 255, 255, 0.55);
}

.hero__note a {
  color: rgba(255, 255, 255, 0.82);
  border-bottom: 1px solid rgba(255, 255, 255, 0.28);
  transition: color 0.2s var(--ease), border-color 0.2s var(--ease);
}

.hero__note a:hover {
  color: #fff;
  border-bottom-color: #fff;
}

.hero__stats {
  position: relative;
  margin-top: var(--s8);
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  border-top: 1px solid rgba(255, 255, 255, 0.14);
}

.hero__stats > div {
  padding: var(--s5) var(--s4);
  display: flex;
  flex-direction: column;
  gap: 4px;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
}

.hero__stats > div:last-child {
  border-right: 0;
}

.hero__stats strong {
  font-size: 30px;
  font-weight: 600;
  color: #fff;
  line-height: 1.1;
}

.hero__stats span {
  font-size: 12.5px;
  color: rgba(255, 255, 255, 0.58);
}

@media (max-width: 768px) {
  .hero {
    padding-block: var(--s8) 0;
  }

  .hide-sm {
    display: none;
  }

  .hero__stats {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    margin-top: var(--s7);
  }

  .hero__stats > div:nth-child(2n) {
    border-right: 0;
  }

  .hero__stats > div:nth-child(-n + 2) {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
}
</style>
