<template>
  <section class="cta">
    <div class="cta__bg" aria-hidden="true"></div>
    <div class="wrap cta__inner">
      <h2>现在就开始</h2>
      <p>读源码、翻接口文档，或者直接进群问。</p>
      <div class="cta__actions">
        <RouterLink class="btn btn--green" to="/demo">先试试预览</RouterLink>
        <a class="btn btn--ghost-dark" :href="brand.repo" target="_blank" rel="noreferrer noopener">GitHub 仓库</a>
        <a class="btn btn--ghost-dark" href="https://qm.qq.com/q/se4JU0fz7U" target="_blank" rel="noreferrer noopener">
          QQ 群 994857138
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { brand } from '../data/content'
</script>

<style scoped>
.cta {
  position: relative;
  overflow: hidden;
  background: var(--deep-3);
  color: #fff;
  padding-block: var(--s9);
  text-align: center;
}

.cta__bg {
  position: absolute;
  inset: 0;
  background: radial-gradient(80% 120% at 50% 0%, rgba(66, 184, 131, 0.42) 0%, rgba(66, 184, 131, 0) 62%);
}

.cta__inner {
  position: relative;
}

.cta h2 {
  font-size: clamp(26px, 3vw, 40px);
  color: #fff;
  letter-spacing: -0.02em;
}

.cta p {
  margin-top: var(--s3);
  font-size: 15px;
  color: rgba(255, 255, 255, 0.72);
}

.cta__actions {
  margin-top: var(--s6);
  display: flex;
  justify-content: center;
  gap: var(--s3);
  flex-wrap: wrap;
}
</style>
