<template>
  <div>
    <PageHead
      kicker="Install · 05"
      title="定时任务与进程"
      lead="一条每分钟的计划任务撑起全部调度与队列，一个常驻进程负责 VNC。两者都必须写 PHP 绝对路径。"
    />

    <SectionShell title="安装与部署" index="/install" :items="installIndex">
      <DocPage>
        <section class="blk">
          <h2>计划任务</h2>
          <pre class="code-block"><code>{{ cronConfig }}</code></pre>
          <ul class="notes notes--warn">
            <li v-for="n in cronNotes" :key="n">{{ n }}</li>
          </ul>
        </section>

        <section class="blk">
          <h2>VNC Relay 守护</h2>
          <pre class="code-block"><code>{{ relayConfig }}</code></pre>
          <p class="step__note">只在使用 VNC 远程控制时需要；确认 127.0.0.1:8100 在监听后再上线。</p>
        </section>

        <section class="blk">
          <h2>这个心跳做了什么</h2>
          <pre class="code-block"><code>schedule:run
   ├─ scheduler:heartbeat      心跳与定时任务派发
   ├─ queue:drain              后台拉起四组 Worker
   ├─ scheduler:liveness       存活探针（与心跳解耦）
   ├─ coupon:dispatch-due-campaigns
   └─ messages:dispatch        消息补投</code></pre>
          <div class="table-wrap">
            <table class="tbl tbl--tight">
              <thead>
                <tr><th>队列组</th><th>承载</th></tr>
              </thead>
              <tbody>
                <tr><td><code>provision</code></td><td>上游开通与续费，长任务，超时 1200s</td></tr>
                <tr><td><code>referral,notification,coupon,default</code></td><td>常规业务</td></tr>
                <tr><td><code>automation</code></td><td>调度触发的自动化</td></tr>
                <tr><td><code>backup</code></td><td>数据库备份，超时 900s</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section class="blk">
          <h2>在后台看调度是否在跑</h2>
          <p class="lead">日志中心 → 定时任务列出每个任务的名次、刷新周期、最后执行与下次执行时间。</p>
          <DocShot
            src="admin-schedules.webp"
            alt="定时任务列表"
            caption="日志中心 · 定时任务：最后执行与下次执行时间对齐，说明心跳正常"
          />
          <p class="lead" style="margin-top: var(--s5)">自动任务日志记录每次执行的耗时与结果；失败会有明确的错误摘要。</p>
          <DocShot
            src="admin-logs-tasks.webp"
            alt="自动任务日志"
            caption="日志中心 · 自动任务：每次心跳、队列认领与任务执行的耗时与摘要"
          />
        </section>
      </DocPage>
    </SectionShell>
  </div>
</template>

<script setup lang="ts">
import PageHead from '../../components/PageHead.vue'
import SectionShell from '../../components/SectionShell.vue'
import DocPage from '../../components/DocPage.vue'
import DocShot from '../../components/DocShot.vue'
import { cronConfig, cronNotes, installIndex, relayConfig } from '../../data/install'
</script>
