<template>
  <div>
    <PageHead
      kicker="Developer Docs · 07"
      title="部署与运维"
      lead="单台宝塔服务器承载四端：三个前端站点各自发布静态产物，后端走 PHP-FPM，调度交给每分钟一次的 schedule:run，VNC Relay 独立常驻。"
    />

    <DocShell>
      <DocPage>
        <section class="blk">
          <h2>生产拓扑</h2>
          <pre class="code-block"><code>{{ deployTopology }}</code></pre>
          <ul class="notes">
            <li>四端各自独立宝塔站点，前端直接访问 API 域名，Nginx 不反代 API。</li>
            <li>没有常驻 Queue Worker：每分钟的 schedule:run 并行启动四组 Worker，空闲约 50 秒后退出。</li>
            <li>新购与续费支付后在回调内同步履约；同步失败才回退 provision 队列重试。</li>
          </ul>
        </section>

        <section class="blk">
          <h2>发布流程</h2>
          <div v-for="s in deploySteps" :key="s.step" class="step">
            <p class="step__title">{{ s.step }}</p>
            <pre class="code-block"><code>{{ s.cmd }}</code></pre>
            <p class="step__note">{{ s.note }}</p>
          </div>
        </section>

        <section class="blk">
          <h2>环境变量关键项</h2>
          <div class="table-wrap">
            <table class="tbl">
              <thead>
                <tr><th>变量</th><th>生产取值</th><th>说明</th></tr>
              </thead>
              <tbody>
                <tr v-for="e in deployEnvKeys" :key="e.key">
                  <td><code>{{ e.key }}</code></td>
                  <td class="nowrap">{{ e.value }}</td>
                  <td class="muted">{{ e.note }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section class="blk">
          <h2>队列分组</h2>
          <div class="table-wrap">
            <table class="tbl">
              <thead>
                <tr><th>队列组</th><th>环境变量</th><th>承载任务</th><th>说明</th></tr>
              </thead>
              <tbody>
                <tr v-for="q in queueGroups" :key="q.name">
                  <td class="nowrap"><code>{{ q.name }}</code></td>
                  <td><code>{{ q.env }}</code></td>
                  <td>{{ q.jobs }}</td>
                  <td class="muted">{{ q.timeout }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <ul class="notes">
            <li v-for="n in queueNotes" :key="n">{{ n }}</li>
          </ul>
        </section>

        <section class="blk">
          <h2>监控端点</h2>
          <div class="table-wrap">
            <table class="tbl tbl--tight">
              <thead>
                <tr><th>端点</th><th>用途</th></tr>
              </thead>
              <tbody>
                <tr v-for="e in opsEndpoints" :key="e.path">
                  <td class="nowrap"><code>{{ e.path }}</code></td>
                  <td>{{ e.desc }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p class="lead">另有 backend/storage/logs/laravel.log、宝塔监控面板与管理端日志页。</p>
        </section>

        <section class="blk">
          <h2>备份</h2>
          <ul class="notes">
            <li v-for="b in opsBackup" :key="b">{{ b }}</li>
          </ul>
        </section>

        <section class="blk">
          <h2>回滚</h2>
          <ul class="notes">
            <li v-for="r in opsRollback" :key="r">{{ r }}</li>
          </ul>
        </section>
      </DocPage>
    </DocShell>
  </div>
</template>

<script setup lang="ts">
import PageHead from '../../components/PageHead.vue'
import DocShell from '../../components/DocShell.vue'
import DocPage from '../../components/DocPage.vue'
import {
  deployEnvKeys,
  deploySteps,
  deployTopology,
  opsBackup,
  opsEndpoints,
  opsRollback,
  queueGroups,
  queueNotes,
} from '../../data/devguide'
</script>
