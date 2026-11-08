<template>
  <div>
    <PageHead
      kicker="Developer Docs · 06"
      title="数据库与迁移"
      lead="订单、账单、支付三张核心表各管一件事；迁移只新增，升级只有一个入口。这是账能对上、审计链不断的数据前提。"
    />

    <DocShell>
      <DocPage>
        <section class="blk">
          <h2>核心表职责</h2>
          <div class="table-wrap">
            <table class="tbl">
              <thead>
                <tr><th>表</th><th>角色</th><th>边界</th></tr>
              </thead>
              <tbody>
                <tr v-for="t in dbCoreTables" :key="t.table">
                  <td class="nowrap"><code class="tbl-name">{{ t.table }}</code></td>
                  <td class="nowrap">{{ t.role }}</td>
                  <td>{{ t.detail }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <ul class="notes">
            <li>三类记录通过 ID 互联；详情页只保留必要的追溯引用，不内联不属于自身职责的冗余字段。</li>
            <li>订单、账单、支付的状态枚举统一来自 <code>shared/statusConfig.ts</code>，前端状态展示优先复用共享能力。</li>
          </ul>
        </section>

        <section class="blk">
          <h2>迁移与升级规则</h2>
          <div class="rules">
            <div v-for="r in dbRules" :key="r.rule" class="rules__row">
              <p class="rules__name">{{ r.rule }}</p>
              <p class="rules__detail">{{ r.detail }}</p>
            </div>
          </div>
        </section>

        <section class="blk">
          <h2>升级命令</h2>
          <pre class="code-block"><code>{{ dbUpgradeSteps }}</code></pre>
          <ul class="notes">
            <li>升级失败不会推进版本，重跑即可；生产执行前会强制全库备份。</li>
            <li>首次部署新环境使用 schema baseline（scripts/install_db.py），其后只用 db:upgrade。</li>
            <li>历史迁移已归档到 database/_archive/migrations/，不再逐个执行。</li>
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
import { dbCoreTables, dbRules, dbUpgradeSteps } from '../../data/devguide'
</script>

<style scoped>
.tbl-name {
  color: var(--green-darker);
}
</style>
