<template>
  <div>
    <PageHead
      kicker="Developer Docs · 08"
      title="测试与验证"
      lead="改动后先跑受影响的范围，全部完成后跑覆盖本次变更的完整验证。构建带体积门禁，超出即失败。"
    />

    <DocShell>
      <DocPage>
        <section class="blk">
          <h2>各端验证命令</h2>
          <div class="table-wrap">
            <table class="tbl">
              <thead>
                <tr><th>范围</th><th>命令</th><th>备注</th></tr>
              </thead>
              <tbody>
                <tr v-for="v in verifySteps" :key="v.scope">
                  <td class="nowrap"><code>{{ v.scope }}</code></td>
                  <td><code class="cmd">{{ v.cmd }}</code></td>
                  <td class="muted">{{ v.note }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section class="blk">
          <h2>根 workspace 命令</h2>
          <pre class="code-block"><code>{{ verifyRootCommands }}</code></pre>
        </section>

        <section class="blk">
          <h2>体积门禁</h2>
          <p class="lead">构建脚本检查首屏与分片体积，超出即失败。改动构建配置或增删依赖后必须跑整包构建。</p>
          <div class="table-wrap">
            <table class="tbl tbl--tight">
              <thead>
                <tr><th>范围</th><th>预算</th></tr>
              </thead>
              <tbody>
                <tr v-for="b in sizeBudgets" :key="b.scope">
                  <td>{{ b.scope }}</td>
                  <td><code>{{ b.budget }}</code></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section class="blk">
          <h2>测试分层</h2>
          <div class="rules">
            <div v-for="t in testLayers" :key="t.layer" class="rules__row">
              <p class="rules__name">{{ t.layer }}</p>
              <p class="rules__detail">{{ t.detail }}</p>
            </div>
          </div>
          <ul class="notes">
            <li>后端测试分三个 suite：<code>tests/Unit</code>、<code>tests/Feature</code> 与 <code>plugins</code>。</li>
            <li>前端 e2e 产物（dist-e2e/、test-results/、playwright-report/）一律不入库。</li>
          </ul>
        </section>

        <section class="blk">
          <h2>提交前检查</h2>
          <div class="rules">
            <div v-for="r in hardRules" :key="r.area" class="rules__row">
              <p class="rules__name">{{ r.area }}</p>
              <p class="rules__detail">{{ r.rule }}</p>
            </div>
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
import {
  hardRules,
  sizeBudgets,
  testLayers,
  verifyRootCommands,
  verifySteps,
} from '../../data/devguide'
</script>

<style scoped>
.cmd {
  word-break: break-all;
}
</style>
