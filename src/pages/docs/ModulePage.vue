<template>
  <div>
    <PageHead
      kicker="Developer Docs · 12"
      title="模块开发"
      lead="一个模块就是一个服务域：app/Services 下设目录，目录内只处理本域对象，跨域走对方公开方法。"
    />

    <DocShell>
      <DocPage>
        <section class="blk">
          <h2>现有模块</h2>
          <div class="table-wrap">
            <table class="tbl">
              <thead>
                <tr><th>模块</th><th>目录</th><th>职责</th></tr>
              </thead>
              <tbody>
                <tr v-for="m in moduleDomains" :key="m.name">
                  <td class="nowrap"><code>{{ m.name }}</code></td>
                  <td><code>{{ m.dir }}</code></td>
                  <td class="muted">{{ m.note }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section class="blk">
          <h2>新建模块</h2>
          <p class="lead">在 app/Services 下建目录，对外暴露一个入口 Service；控制器只薄层调用它。</p>
          <pre class="code-block"><code>{{ moduleSkeleton }}</code></pre>
        </section>

        <section class="blk">
          <h2>边界规则</h2>
          <ul class="notes">
            <li v-for="r in moduleRules" :key="r">{{ r }}</li>
          </ul>
        </section>

        <section class="blk">
          <h2>资金模块特别说明</h2>
          <p class="lead">
            Finance 按资金流拆分，不设万能入口。充值、消费-余额、消费-在线、消费-混合、冲正退款各自独立；
            网关回调与轮询的入账事务统一收敛到结算 Service，余额、台账与单据各有唯一写口。
          </p>
          <div class="table-wrap">
            <table class="tbl tbl--tight">
              <thead>
                <tr><th>职责</th><th>唯一入口</th></tr>
              </thead>
              <tbody>
                <tr><td>余额变动</td><td><code>Finance/Core/AccountService</code></td></tr>
                <tr><td>台账写入</td><td><code>Finance/Core/FinanceLedgerService</code></td></tr>
                <tr><td>单据生成</td><td><code>Finance/Core/FinanceDocumentService</code></td></tr>
                <tr><td>网关回调 / 轮询入账事务</td><td><code>InvoiceSettlementService</code></td></tr>
                <tr><td>支付成功编排</td><td><code>InvoicePaidOrchestrator</code></td></tr>
              </tbody>
            </table>
          </div>
        </section>
      </DocPage>
    </DocShell>
  </div>
</template>

<script setup lang="ts">
import PageHead from '../../components/PageHead.vue'
import DocShell from '../../components/DocShell.vue'
import DocPage from '../../components/DocPage.vue'
import { moduleDomains, moduleRules, moduleSkeleton } from '../../data/devguide'
</script>
