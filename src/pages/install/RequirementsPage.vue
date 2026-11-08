<template>
  <div>
    <PageHead
      kicker="Install · 01"
      title="环境与宝塔"
      lead="服务器与面板准备、运行环境版本、PHP 扩展与禁用函数。这一步做错，后面所有步骤都会以奇怪的方式失败。"
    />

    <SectionShell title="安装与部署" index="/install" :items="installIndex">
      <DocPage>
        <section class="blk">
          <h2>环境要求</h2>
          <div class="table-wrap">
            <table class="tbl">
              <thead>
                <tr><th>项</th><th>要求</th><th>说明</th></tr>
              </thead>
              <tbody>
                <tr v-for="s in serverSpecs" :key="s.item">
                  <td class="nowrap">{{ s.item }}</td>
                  <td>{{ s.value }}</td>
                  <td class="muted">{{ s.note }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p class="step__note">在宝塔「软件商店」安装 Nginx、MySQL 8、Redis 与 Node.js 版本管理器；PHP 装 8.2 或 8.3。</p>
        </section>

        <section class="blk">
          <h2>PHP 扩展</h2>
          <div class="table-wrap">
            <table class="tbl">
              <thead>
                <tr><th>扩展</th><th>必要性</th><th>用途</th></tr>
              </thead>
              <tbody>
                <tr v-for="e in phpExtensions" :key="e.name">
                  <td><code class="nowrap">{{ e.name }}</code></td>
                  <td class="nowrap">{{ e.need }}</td>
                  <td>{{ e.note }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <ul class="notes">
            <li v-for="b in phpBuiltin" :key="b">{{ b }}</li>
          </ul>
        </section>

        <section class="blk">
          <h2>禁用函数</h2>
          <p class="lead">
            宝塔 → 软件商店 → PHP → 设置 → 禁用函数。只删两项，其余全部保留，不要清空整个列表。
          </p>
          <div class="table-wrap">
            <table class="tbl">
              <thead>
                <tr><th>函数</th><th>处理</th><th>原因</th></tr>
              </thead>
              <tbody>
                <tr v-for="f in disabledFunctions" :key="f.name">
                  <td><code class="nowrap">{{ f.name }}</code></td>
                  <td class="nowrap">{{ f.action }}</td>
                  <td>{{ f.why }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <ul class="notes">
            <li v-for="k in disabledKeep" :key="k">{{ k }}</li>
          </ul>
        </section>

        <section class="blk">
          <h2>验证</h2>
          <pre class="code-block"><code>{{ disabledVerify }}</code></pre>
          <ul class="notes notes--warn">
            <li v-for="n in disabledNotes" :key="n">{{ n }}</li>
          </ul>
        </section>

        <section class="blk">
          <h2>DNS 与网络</h2>
          <ul class="notes">
            <li v-for="d in dnsAndNetwork" :key="d">{{ d }}</li>
          </ul>
        </section>
      </DocPage>
    </SectionShell>
  </div>
</template>

<script setup lang="ts">
import PageHead from '../../components/PageHead.vue'
import SectionShell from '../../components/SectionShell.vue'
import DocPage from '../../components/DocPage.vue'
import {
  disabledFunctions,
  disabledKeep,
  disabledNotes,
  disabledVerify,
  dnsAndNetwork,
  installIndex,
  phpBuiltin,
  phpExtensions,
  serverSpecs,
} from '../../data/install'
</script>
