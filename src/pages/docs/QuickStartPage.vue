<template>
  <div>
    <PageHead
      kicker="Developer Docs · 01"
      title="快速开始"
      lead="从零到跑起来的完整路径：依赖版本、后端启动、三个前端与 App 的跑法，以及本地联调时容易踩的坑。"
    />

    <DocShell>
      <DocPage>
        <section class="blk">
          <h2>环境要求</h2>
          <div class="table-wrap">
            <table class="tbl">
              <thead>
                <tr><th>依赖</th><th>版本</th><th>用途</th></tr>
              </thead>
              <tbody>
                <tr v-for="e in quickEnv" :key="e.item">
                  <td class="nowrap">{{ e.item }}</td>
                  <td><code>{{ e.value }}</code></td>
                  <td class="muted">{{ e.note }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section class="blk">
          <h2>启动步骤</h2>
          <div v-for="s in quickSteps" :key="s.step" class="step">
            <p class="step__title">{{ s.step }}</p>
            <pre class="code-block"><code>{{ s.cmd }}</code></pre>
            <p class="step__note">{{ s.note }}</p>
          </div>
        </section>

        <section class="blk">
          <h2>本地注意事项</h2>
          <ul class="notes notes--warn">
            <li v-for="c in quickCaveats" :key="c">{{ c }}</li>
          </ul>
        </section>

        <section class="blk">
          <h2>仓库结构</h2>
          <div class="table-wrap">
            <table class="tbl">
              <thead>
                <tr><th>目录</th><th>职责</th></tr>
              </thead>
              <tbody>
                <tr v-for="row in repoTree" :key="row.path">
                  <td class="nowrap"><code>{{ row.path }}</code></td>
                  <td>{{ row.desc }}</td>
                </tr>
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
import { quickCaveats, quickEnv, quickSteps, repoTree } from '../../data/devguide'
</script>
