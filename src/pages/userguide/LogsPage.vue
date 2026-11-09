<template>
  <div>
    <PageHead
      kicker="User Guide · 09"
      title="日志与排查"
      lead="七类日志覆盖后台操作、接口、支付回调、短信邮件与调度运行。日志保留完整报文，联调时先看网关日志。"
    />

    <UserShell>
      <DocPage>
        <section class="blk">
          <h2>日志分类</h2>
          <div class="table-wrap">
            <table class="tbl">
              <thead>
                <tr><th>类别</th><th>用途</th></tr>
              </thead>
              <tbody>
                <tr v-for="l in logCategories" :key="l.name">
                  <td class="nowrap">{{ l.name }}</td>
                  <td>{{ l.note }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section class="blk">
          <h2>注意事项</h2>
          <ul class="notes">
            <li v-for="n in logNotes" :key="n">{{ n }}</li>
          </ul>
        </section>

        <section class="blk">
          <h2>日志界面</h2>
          <DocShot src="admin-logs-gateway.webp" alt="网关日志" caption="网关日志：网关、业务 key、操作、商户单号、交易号、Trace ID 与结果" />
          <DocShot src="admin-logs-sms.webp" alt="短信日志" caption="短信日志：接收信息、模板编号、内容摘要、状态与错误信息" />
          <DocShot src="admin-logs-tasks.webp" alt="自动任务" caption="自动任务日志：任务、状态、级别、耗时与摘要" />
          <DocShot src="admin-schedules.webp" alt="定时任务" caption="定时任务：任务名称、刷新周期、最后执行、状态与下次执行" />
        </section>
      </DocPage>
    </UserShell>
  </div>
</template>

<script setup lang="ts">
import PageHead from '../../components/PageHead.vue'
import UserShell from '../../components/UserShell.vue'
import DocPage from '../../components/DocPage.vue'
import DocShot from '../../components/DocShot.vue'
import { logCategories, logNotes } from '../../data/userguide'
</script>
