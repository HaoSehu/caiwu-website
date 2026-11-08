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
      </DocPage>
    </UserShell>
  </div>
</template>

<script setup lang="ts">
import PageHead from '../../components/PageHead.vue'
import UserShell from '../../components/UserShell.vue'
import DocPage from '../../components/DocPage.vue'
import { logCategories, logNotes } from '../../data/userguide'
</script>
