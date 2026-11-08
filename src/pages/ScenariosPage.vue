<template>
  <div>
    <PageHead
      kicker="Scenarios"
      title="适用场景"
      lead="四类使用方决定系统的形状：机房、云服务商与转售商、建站与代运营团队、自建平台的研发团队。"
    />

    <section class="section">
      <div class="wrap scenarios">
        <article v-for="(s, i) in scenarios" :key="s.key" class="scenario">
          <div class="scenario__side">
            <span class="scenario__no num">{{ String(i + 1).padStart(2, '0') }}</span>
            <h2>{{ s.title }}</h2>
          </div>

          <div class="scenario__main">
            <div class="scenario__row">
              <span class="scenario__label">问题</span>
              <p>{{ s.pain }}</p>
            </div>
            <div class="scenario__row">
              <span class="scenario__label">这套系统怎么解</span>
              <p>{{ s.fit }}</p>
            </div>
            <ul>
              <li v-for="p in s.points" :key="p">{{ p }}</li>
            </ul>
          </div>
        </article>
      </div>
    </section>

    <section class="section">
      <div class="wrap">
        <header class="head">
          <h2>落地需要什么</h2>
          <p>自托管应用，不是开箱即用的托管服务。下面是最小可用配置与推荐配置。</p>
        </header>

        <div class="reqs">
          <table class="req">
            <thead>
              <tr>
                <th>组件</th>
                <th>最低</th>
                <th>推荐</th>
                <th>说明</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="r in requirements" :key="r.name">
                <td class="req__name">{{ r.name }}</td>
                <td class="num">{{ r.min }}</td>
                <td class="num">{{ r.rec }}</td>
                <td>{{ r.note }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p class="reqs__note">
          开通、备份这类长任务会独立占一组 Worker；上游与支付回调都走外网，部署机需要能访问对应网关。
        </p>
      </div>
    </section>

    <section class="section section--soft">
      <div class="wrap">
        <header class="head">
          <h2>不适合的场景</h2>
          <p>这套系统按单实例自托管设计，下面这些情况不适合直接套用。</p>
        </header>
        <ul class="nots">
          <li v-for="n in notFit" :key="n">{{ n }}</li>
        </ul>
      </div>
    </section>

    <FinalCta />
  </div>
</template>

<script setup lang="ts">
import PageHead from '../components/PageHead.vue'
import FinalCta from '../sections/FinalCta.vue'
import { scenarios } from '../data/content'

const requirements = [
  { name: 'PHP', min: '8.2', rec: '8.3', note: 'Laravel 12 运行时，需开启 pdo_mysql、redis 扩展' },
  { name: 'MySQL', min: '8.0', rec: '8.0.36', note: '表结构依赖 8.0 的窗口函数与 JSON 能力' },
  { name: 'Redis', min: '6', rec: '7', note: '缓存、分布式锁与队列互斥都依赖它' },
  { name: 'Node.js', min: '20.19', rec: '22 LTS', note: '仅构建前端时需要，运行时可不下发' },
  { name: '内存', min: '2 GB', rec: '4 GB+', note: '开通类 Worker 需要额外余量' },
  { name: '磁盘', min: '20 GB', rec: 'SSD 40 GB+', note: '数据库、日志与备份文件' },
  { name: '常驻进程', min: '1 个', rec: '1 + vnc:relay', note: 'cron 每分钟跑 schedule:run；VNC 需独立守护进程' },
]

const notFit = [
  '需要开箱即用的 SaaS 多租户平台：这套系统按单实例部署设计，不内置租户隔离。',
  '以非主机类实物商品为主的电商：商品模型围绕主机配置与计费周期，改造成本高于直接换用通用电商系统。',
  '完全不打算维护自己服务器的团队：需要自备 PHP 8.2、MySQL 8、Redis 与进程守护。',
  '需要厂商 SLA 与商业支持承诺的业务：项目以 AGPL-3.0 开源提供，支持主要来自社区。',
]
</script>

<style scoped>
.scenarios {
  display: grid;
  gap: var(--s7);
}

.scenario {
  display: grid;
  grid-template-columns: 260px minmax(0, 1fr);
  gap: var(--s7);
  padding-top: var(--s5);
  border-top: 1px solid var(--divider);
}

.scenario__no {
  font-size: 11.5px;
  color: var(--green-dark);
}

.scenario h2 {
  margin-top: var(--s2);
  font-size: 22px;
  letter-spacing: -0.01em;
}

.scenario__main {
  display: grid;
  gap: var(--s4);
}

.scenario__row {
  display: grid;
  grid-template-columns: 132px minmax(0, 1fr);
  gap: var(--s4);
  align-items: baseline;
}

.scenario__label {
  font-size: 12px;
  color: var(--text-3);
}

.scenario__row p {
  font-size: 14px;
  line-height: 1.9;
  color: var(--text-1);
}

.scenario ul {
  margin: 0;
  padding: var(--s4) 0 0;
  border-top: 1px dashed var(--divider);
  list-style: none;
  display: grid;
  gap: 7px;
}

.scenario li {
  position: relative;
  padding-left: 16px;
  font-size: 13px;
  line-height: 1.8;
  color: var(--text-2);
}

.scenario li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.7em;
  width: 6px;
  height: 1px;
  background: var(--green);
}

.head h2 {
  font-size: clamp(24px, 2.4vw, 32px);
  letter-spacing: -0.02em;
}

.head p {
  margin-top: var(--s3);
  font-size: 14.5px;
  color: var(--text-2);
}

.nots {
  margin: var(--s5) 0 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 0;
}

.nots li {
  padding: 14px 0;
  border-top: 1px solid var(--divider);
  font-size: 14px;
  line-height: 1.85;
  color: var(--text-2);
}

.req {
  width: 100%;
  border-collapse: collapse;
  margin-top: var(--s5);
}

.req th {
  text-align: left;
  font-size: 11.5px;
  font-weight: 500;
  color: var(--text-3);
  padding: 10px 12px 10px 0;
  border-bottom: 1px solid var(--divider);
}

.req td {
  font-size: 13.5px;
  color: var(--text-2);
  padding: 12px 12px 12px 0;
  border-bottom: 1px solid var(--divider);
  vertical-align: top;
  line-height: 1.75;
}

.req__name {
  font-weight: 600;
  color: var(--text-1) !important;
  white-space: nowrap;
}

.reqs__note {
  margin-top: var(--s4);
  padding-left: var(--s4);
  border-left: 2px solid var(--green);
  font-size: 13px;
  line-height: 1.85;
  color: var(--text-2);
}

@media (max-width: 900px) {
  .scenario {
    grid-template-columns: 1fr;
    gap: var(--s4);
  }

  .scenario__row {
    grid-template-columns: 1fr;
    gap: 4px;
  }
}
</style>
