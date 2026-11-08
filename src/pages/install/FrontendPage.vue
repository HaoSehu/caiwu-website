<template>
  <div>
    <PageHead
      kicker="Install · 04"
      title="前端构建"
      lead="三个前端各自读取目录下的 .env 生成独立 dist；构建时写错 API 地址，站点会整体连不上后端。"
    />

    <SectionShell title="安装与部署" index="/install" :items="installIndex">
      <DocPage>
        <section class="blk">
          <h2>各端的构建变量</h2>
          <div class="table-wrap">
            <table class="tbl">
              <thead>
                <tr><th>目录</th><th>关键变量</th></tr>
              </thead>
              <tbody>
                <tr v-for="f in frontendEnvTable" :key="f.dir">
                  <td><code class="nowrap">{{ f.dir }}</code></td>
                  <td class="muted">{{ f.vars }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section class="blk">
          <h2>构建命令</h2>
          <pre class="code-block"><code>{{ frontendBuild }}</code></pre>
          <ul class="notes">
            <li v-for="n in frontendNotes" :key="n">{{ n }}</li>
          </ul>
        </section>

        <section class="blk">
          <h2>发布</h2>
          <p class="lead">
            三个 dist 目录分别对应三个宝塔站点的根目录，复制或软链过去即可。
            浏览器直接访问 API 域名，前端 Nginx 不反代 API。
          </p>
        </section>
      </DocPage>
    </SectionShell>
  </div>
</template>

<script setup lang="ts">
import PageHead from '../../components/PageHead.vue'
import SectionShell from '../../components/SectionShell.vue'
import DocPage from '../../components/DocPage.vue'
import { frontendBuild, frontendEnvTable, frontendNotes, installIndex } from '../../data/install'
</script>
