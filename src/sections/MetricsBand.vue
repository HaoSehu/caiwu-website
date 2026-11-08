<template>
  <section class="section section--dark metrics">
    <div class="wrap">
      <h2>规模与复杂度</h2>
      <p class="metrics__lead">
        全部可在仓库中直接统计：路由按文件逐条计数，服务域按 app/Services 的目录划分，
        权限码取自 AdminPermissions 的常量，插件按 plugins/{domain}/{slug} 的目录数计。
      </p>

      <div class="metrics__grid">
        <div v-for="m in metrics" :key="m.label" class="metric">
          <strong class="num">{{ m.value }}</strong>
          <span class="metric__label">{{ m.label }}</span>
          <span class="metric__detail">{{ m.detail }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { metrics } from '../data/content'
</script>

<style scoped>
.metrics h2 {
  font-size: clamp(24px, 2.4vw, 32px);
  letter-spacing: -0.02em;
}

.metrics__lead {
  margin-top: var(--s3);
  max-width: 70ch;
  font-size: 14.5px;
  line-height: 1.9;
  color: rgba(255, 255, 255, 0.72);
}

.metrics__grid {
  margin-top: var(--s6);
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  border-top: 1px solid rgba(255, 255, 255, 0.12);
}

.metric {
  padding: var(--s5) var(--s5) var(--s5) 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: grid;
  gap: 3px;
}

.metric:not(:nth-child(3n)) {
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  padding-left: var(--s5);
}

.metric strong {
  font-size: 44px;
  font-weight: 600;
  line-height: 1;
  color: var(--green-light);
  letter-spacing: -0.02em;
}

.metric__label {
  margin-top: 8px;
  font-size: 14px;
  color: #fff;
}

.metric__detail {
  font-size: 12.5px;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.55);
}

@media (max-width: 900px) {
  .metrics__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .metric:not(:nth-child(3n)) {
    border-right: 0;
    padding-left: 0;
  }

  .metric:nth-child(odd) {
    border-right: 1px solid rgba(255, 255, 255, 0.1);
    padding-right: var(--s4);
  }

  .metric:nth-child(even) {
    padding-left: var(--s4);
  }
}

@media (max-width: 560px) {
  .metric strong {
    font-size: 34px;
  }
}
</style>
