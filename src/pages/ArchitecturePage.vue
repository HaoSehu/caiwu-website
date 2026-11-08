<template>
  <div>
    <PageHead
      kicker="Architecture"
      title="技术架构"
      lead="Laravel 12 + MySQL 8 + Redis，四组队列与独立 relay 进程；前端 Vue 3 + Vite + TDesign，App 为 Flutter。下面这些规则都在代码里执行。"
    />
    <ArchitectureSection />

    <section class="section section--soft">
      <div class="wrap">
        <header class="head">
          <h2>六个实现细节</h2>
          <p>挑六个容易做错、也最能体现这套系统设计取向的地方展开：每一处都写了为什么这样做。</p>
        </header>

        <div class="dives">
          <article v-for="d in deepDives" :key="d.title" class="dive">
            <h3>{{ d.title }}</h3>
            <p>{{ d.body }}</p>
            <div class="tags">
              <code v-for="t in d.tags" :key="t">{{ t }}</code>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="wrap">
        <header class="head">
          <h2>部署形态</h2>
          <p>生产入口为 PHP-FPM 指向 backend/public；调度由系统 cron 每分钟触发，前台静态按站点分别发布。</p>
        </header>

        <div class="code">
          <div class="code__tabs">
            <span class="code__tab is-active">生产进程</span>
          </div>
          <pre><code>{{ deploy }}</code></pre>
        </div>

        <div class="verify">
          <h3>变更后的最小验证</h3>
          <div v-for="v in verifyCommands" :key="v.scope" class="verify__row">
            <code class="verify__scope">{{ v.scope }}</code>
            <code class="verify__cmd">{{ v.cmd }}</code>
          </div>
        </div>
      </div>
    </section>

    <FinalCta />
  </div>
</template>

<script setup lang="ts">
import PageHead from '../components/PageHead.vue'
import ArchitectureSection from '../sections/ArchitectureSection.vue'
import FinalCta from '../sections/FinalCta.vue'
import { deepDives, verifyCommands } from '../data/content'

const deploy = `# 每分钟由 cron 触发
* * * * * php artisan schedule:run
   ├─ scheduler:heartbeat      心跳与定时任务派发
   ├─ queue:drain              后台拉起四组 Worker
   ├─ scheduler:liveness       存活探针（与心跳解耦）
   ├─ coupon:dispatch-due-campaigns
   └─ messages:dispatch        消息补投

# 独立进程，由进程管理器守护
php artisan vnc:relay           VNC 中转 :8100 /ws/vnc

# 队列分组（一个队列只归一个 Worker）
provision   → 开通类长任务，timeout 可达 1200s
business    → referral, notification, coupon, default
automation  → 定时自动化
backup      → 数据库与文件备份`
</script>

<style scoped>
.head {
  padding-bottom: var(--s5);
  border-bottom: 1px solid var(--divider);
}

.head h2 {
  font-size: clamp(24px, 2.4vw, 32px);
  letter-spacing: -0.02em;
}

.head p {
  margin-top: var(--s3);
  max-width: 70ch;
  font-size: 14.5px;
  line-height: 1.9;
  color: var(--text-2);
}

.dives {
  margin-top: var(--s6);
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--s6) var(--s8);
}

.dive {
  padding-top: var(--s4);
  border-top: 2px solid var(--green);
}

.dive h3 {
  font-size: 17px;
  font-weight: 600;
  letter-spacing: 0;
}

.dive p {
  margin-top: var(--s3);
  font-size: 13.5px;
  line-height: 1.95;
  color: var(--text-2);
}

.tags {
  margin-top: var(--s3);
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tags code {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--green-darker);
  background: rgba(66, 184, 131, 0.12);
  border-radius: 3px;
  padding: 2px 8px;
}

.verify {
  margin-top: var(--s6);
}

.verify h3 {
  font-size: 17px;
  font-weight: 600;
  letter-spacing: 0;
  margin-bottom: var(--s3);
}

.verify__row {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  gap: var(--s4);
  align-items: baseline;
  padding: 11px 0;
  border-top: 1px solid var(--divider);
}

.verify__scope {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-1);
}

.verify__cmd {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-2);
  word-break: break-word;
}

@media (max-width: 900px) {
  .dives {
    grid-template-columns: 1fr;
    gap: var(--s5);
  }

  .verify__row {
    grid-template-columns: 1fr;
    gap: 4px;
  }
}
</style>
