<template>
  <section class="section features">
    <div class="wrap">
      <div class="feature-grid">
        <article v-for="f in features" :key="f.title" class="feature">
          <h2>{{ f.title }}</h2>
          <p>{{ f.body }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const features = [
  {
    title: '账目清楚',
    body: '订单、账单、支付三张表各管一件事，以 ID 互联。余额支付不落支付表，退款走独立流程并写台账，每一笔钱都能追到源头。',
  },
  {
    title: '边界清楚',
    body: '控制器只做薄层，第三方能力全部收敛到插件层。支付、短信、实名、验证码、邮件与上游服务器可整体替换，业务代码不感知实现。',
  },
  {
    title: '跑得住',
    body: '开通类长任务独占一组队列，超时 1200 秒也不阻塞业务与通知；四组 Worker 各自持锁，另有探针检测残锁。',
  },
]
</script>

<style scoped>
.features {
  padding-block: var(--s9);
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--s7) var(--s8);
}

.feature h2 {
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 0;
  color: var(--text-1);
  padding-bottom: var(--s3);
  border-bottom: 1px solid var(--divider);
}

.feature p {
  margin-top: var(--s3);
  font-size: 14.5px;
  line-height: 1.9;
  color: var(--text-2);
}

@media (max-width: 900px) {
  .feature-grid {
    grid-template-columns: 1fr;
    gap: var(--s6);
  }
}
</style>
