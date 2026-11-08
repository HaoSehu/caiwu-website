<template>
  <div>
    <PageHead
      kicker="Developer Docs · 02"
      title="后端开发"
      lead="控制器薄层，业务进 Service，第三方调用进插件层。分层、目录与代码边界都写在这里。"
    />

    <DocShell>
      <DocPage>
        <section class="blk">
          <h2>规模概览</h2>
          <div class="metrics">
            <div v-for="m in backendMetrics" :key="m.label" class="metric">
              <strong>{{ m.value }}</strong>
              <span>{{ m.label }}</span>
              <p class="metric-detail">{{ m.detail }}</p>
            </div>
          </div>
        </section>

        <section class="blk">
          <h2>分层与职责</h2>
          <p class="lead">一次请求从路由进来，按下面的顺序经过固定几层。每一层能做什么、不能做什么都有明确约束。</p>
          <div class="table-wrap">
            <table class="tbl">
              <thead>
                <tr><th>层</th><th>目录</th><th>职责</th></tr>
              </thead>
              <tbody>
                <tr v-for="l in backendLayers" :key="l.layer">
                  <td class="nowrap">{{ l.layer }}</td>
                  <td><code>{{ l.path }}</code></td>
                  <td>{{ l.rule }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section class="blk">
          <h2>业务服务域</h2>
          <p class="lead">app/Services 下按领域收敛，共 {{ serviceDomains.length }} 个：</p>
          <div class="tags">
            <code v-for="d in serviceDomains" :key="d" class="tag">{{ d }}</code>
          </div>
        </section>

        <section class="blk">
          <h2>代码边界</h2>
          <ul class="notes">
            <li v-for="r in backendRules" :key="r">{{ r }}</li>
          </ul>
        </section>

        <section class="blk">
          <h2>权限码</h2>
          <p class="lead">
            管理端权限码集中在 <code>app/Support/AdminPermissions.php</code>，共 67 个常量。
            资金写入类（订单补录、账单补录、冲正）是独立权限码，默认不下发任何内置角色，避免随
            <code>order.manage</code> 之类的通用权限静默提权。
          </p>
          <pre class="code-block"><code>public const ORDER_MANUAL_ENTRY  = 'order.manual_entry';
public const INVOICE_MANUAL_ENTRY = 'invoice.manual_entry';</code></pre>
        </section>
      </DocPage>
    </DocShell>
  </div>
</template>

<script setup lang="ts">
import PageHead from '../../components/PageHead.vue'
import DocShell from '../../components/DocShell.vue'
import DocPage from '../../components/DocPage.vue'
import { backendLayers, backendMetrics, backendRules, serviceDomains } from '../../data/devguide'
</script>

<style scoped>
.metric-detail {
  margin-top: 3px;
  font-size: 11.5px;
  color: var(--text-3);
  line-height: 1.6;
}
</style>
