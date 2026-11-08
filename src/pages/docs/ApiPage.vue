<template>
  <div>
    <PageHead
      kicker="Developer Docs · 03"
      title="接口开发"
      lead="三套命名空间、统一响应外层、业务码区间、分页口径与限流阈值。写新接口前先对照这一页，再去看 Apifox 上的现状。"
    />

    <DocShell>
      <DocPage>
        <section class="blk">
          <h2>命名空间与鉴权</h2>
          <div class="table-wrap">
            <table class="tbl">
              <thead>
                <tr><th>命名空间</th><th>鉴权</th><th>说明</th></tr>
              </thead>
              <tbody>
                <tr v-for="n in apiNamespaces" :key="n.ns">
                  <td class="nowrap"><code>{{ n.ns }}</code></td>
                  <td class="auth">{{ n.auth }}</td>
                  <td class="muted">{{ n.note }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <ul class="notes">
            <li>旧接口 /api/admin/*、/api/client/*、/api/site/* 已删除，不保留任何兼容层。</li>
            <li>管理端与用户端都通过 <code>Authorization: Bearer &lt;token&gt;</code> 传令牌。</li>
          </ul>
        </section>

        <section class="blk">
          <h2>统一响应</h2>
          <p class="lead">除文件流、受控资源预览与 WebSocket，所有 JSON 接口都返回同一外层结构。</p>
          <div class="code-grid">
            <div>
              <p class="code-label">成功</p>
              <pre class="code-block"><code>{{ apiResponse.success }}</code></pre>
            </div>
            <div>
              <p class="code-label">分页</p>
              <pre class="code-block"><code>{{ apiResponse.paging }}</code></pre>
            </div>
            <div>
              <p class="code-label">校验失败</p>
              <pre class="code-block"><code>{{ apiResponse.validation }}</code></pre>
            </div>
          </div>
        </section>

        <section class="blk">
          <h2>业务码</h2>
          <div class="table-wrap">
            <table class="tbl tbl--tight">
              <thead>
                <tr><th>code</th><th>含义</th></tr>
              </thead>
              <tbody>
                <tr v-for="e in apiErrorCodes" :key="e.code">
                  <td class="nowrap"><code>{{ e.code }}</code></td>
                  <td>{{ e.meaning }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section class="blk">
          <h2>限流</h2>
          <div class="table-wrap">
            <table class="tbl">
              <thead>
                <tr><th>范围</th><th>阈值</th><th>分桶键</th></tr>
              </thead>
              <tbody>
                <tr v-for="t in apiThrottle" :key="t.scope">
                  <td class="nowrap">{{ t.scope }}</td>
                  <td>{{ t.limit }}</td>
                  <td class="muted">{{ t.key }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section class="blk">
          <h2>硬性口径</h2>
          <ul class="notes">
            <li v-for="r in apiRules" :key="r">{{ r }}</li>
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
import { apiErrorCodes, apiNamespaces, apiResponse, apiRules, apiThrottle } from '../../data/devguide'
</script>

<style scoped>
.auth {
  font-size: 12.5px;
  color: var(--text-2);
}
</style>
