<template>
  <div>
    <PageHead
      kicker="Developer Docs · 06"
      title="支付接口"
      lead="支付渠道以插件接入，业务层只依赖 PaymentGatewayInterface。预下单、回调入账、查单补偿三条链路各自有固定入口。"
    />

    <DocShell>
      <DocPage>
        <section class="blk">
          <h2>网关契约</h2>
          <p class="lead">
            所有支付插件都实现 <code>PaymentGatewayInterface</code>，平台通过 <code>PluginPaymentGateway</code>
            adapter 调用。业务代码只依赖这组方法，不感知具体渠道。
          </p>
          <div class="table-wrap">
            <table class="tbl">
              <thead>
                <tr><th>方法</th><th>职责</th></tr>
              </thead>
              <tbody>
                <tr v-for="m in payGatewayMethods" :key="m.method">
                  <td><code class="nowrap">{{ m.method }}</code></td>
                  <td>{{ m.desc }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section class="blk">
          <h2>数据对象</h2>
          <div class="table-wrap">
            <table class="tbl">
              <thead>
                <tr><th>类</th><th>字段</th></tr>
              </thead>
              <tbody>
                <tr v-for="d in payDataObjects" :key="d.name">
                  <td><code class="nowrap">{{ d.name }}</code></td>
                  <td class="muted">{{ d.fields }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section class="blk">
          <h2>三条链路</h2>
          <div class="rules">
            <div v-for="f in payFlow" :key="f.step" class="rules__row">
              <p class="rules__name">{{ f.step }}</p>
              <p class="rules__detail">{{ f.detail }}</p>
            </div>
          </div>
        </section>

        <section class="blk">
          <h2>插件入口</h2>
          <p class="lead">入口类只提供 <code>execute()</code>，按动作分发到具体实现，不直接实现平台契约。</p>
          <pre class="code-block"><code>{{ payPluginExample }}</code></pre>
        </section>

        <section class="blk">
          <h2>硬性规则</h2>
          <ul class="notes">
            <li v-for="r in payRules" :key="r">{{ r }}</li>
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
import { payDataObjects, payFlow, payGatewayMethods, payPluginExample, payRules } from '../../data/devguide'
</script>
