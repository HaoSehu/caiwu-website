<template>
  <div>
    <PageHead
      kicker="Install · 02"
      title="站点与域名"
      lead="四个站点、两套伪静态、一条可信代理配置。伪静态写错会让 SPA 刷新 404 或回调收不到。"
    />

    <SectionShell title="安装与部署" index="/install" :items="installIndex">
      <DocPage>
        <section class="blk">
          <h2>创建四个站点</h2>
          <div class="table-wrap">
            <table class="tbl">
              <thead>
                <tr><th>站点</th><th>域名</th><th>根目录</th><th>运行环境</th></tr>
              </thead>
              <tbody>
                <tr v-for="s in siteTable" :key="s.site">
                  <td class="nowrap"><strong>{{ s.site }}</strong></td>
                  <td class="nowrap"><code>{{ s.domain }}</code></td>
                  <td><code>{{ s.root }}</code></td>
                  <td class="nowrap muted">{{ s.runtime }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <ul class="notes">
            <li v-for="r in siteRules" :key="r">{{ r }}</li>
          </ul>
        </section>

        <section class="blk">
          <h2>API 站点伪静态</h2>
          <pre class="code-block"><code>{{ apiRewrite }}</code></pre>
        </section>

        <section class="blk">
          <h2>三个前端站点伪静态</h2>
          <pre class="code-block"><code>{{ spaRewrite }}</code></pre>
        </section>

        <section class="blk">
          <h2>可信代理（必须配置）</h2>
          <p class="lead">{{ trustedProxy.why }}</p>
          <ul class="notes notes--warn">
            <li v-for="e in trustedProxy.effects" :key="e">{{ e }}</li>
          </ul>
          <pre class="code-block"><code>{{ trustedProxy.env }}</code></pre>
          <p class="step__note">{{ trustedProxy.verify }}</p>
          <ul class="notes">
            <li>{{ trustedProxy.caution }}</li>
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
import { apiRewrite, installIndex, siteRules, siteTable, spaRewrite, trustedProxy } from '../../data/install'
</script>
