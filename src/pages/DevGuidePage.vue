<template>
  <div>
    <PageHead
      kicker="Developer Docs"
      title="开发者文档"
      lead="按开发环节组织的工程文档：从环境启动、后端分层、接口契约，到插件、数据库、部署与验证。每一条都对应仓库里的真实路径与配置。"
    />

    <DocShell>
      <DocPage>
        <section class="blk">
          <div class="intro">
            <div>
              <h2>从哪开始</h2>
              <p class="lead">
                按开发环节分为八篇：环境启动、后端分层、接口契约、前端、插件、数据库、部署与验证。
                第一次接触按 01 → 08 顺序读，查某一条约定直接从左侧目录跳转。
              </p>
            </div>
            <dl class="facts">
              <div>
                <dt>技术基线</dt>
                <dd>{{ docMeta.stack }}</dd>
              </div>
              <div>
                <dt>接口文档</dt>
                <dd><a :href="brand.apiDocs" target="_blank" rel="noreferrer noopener">caiwu-api.apifox.cn ↗</a></dd>
              </div>
              <div>
                <dt>代码仓库</dt>
                <dd><a :href="brand.repo" target="_blank" rel="noreferrer noopener">{{ brand.repoLabel }} ↗</a></dd>
              </div>
            </dl>
          </div>

          <div class="idx">
            <RouterLink v-for="d in docIndex" :key="d.to" :to="d.to" class="idx__card">
              <span class="idx__no">{{ d.kicker }}</span>
              <h3>{{ d.title }}</h3>
              <p>{{ d.desc }}</p>
              <span class="idx__more">阅读 <span aria-hidden="true">→</span></span>
            </RouterLink>
          </div>
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
                  <td class="nowrap"><code class="path">{{ row.path }}</code></td>
                  <td>{{ row.desc }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <ul class="notes">
            <li>根目录是 npm workspace，只包含三个 Vue 端与 shared；app_flutter 有自己的 pubspec.yaml，不参与根命令。</li>
            <li>docs/自动生成/ 下的文件由脚本产出，不手工编辑。</li>
          </ul>
        </section>
      </DocPage>
    </DocShell>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import PageHead from '../components/PageHead.vue'
import DocShell from '../components/DocShell.vue'
import DocPage from '../components/DocPage.vue'
import { brand } from '../data/content'
import { docIndex, docMeta, repoTree } from '../data/devguide'
</script>

<style scoped>
.intro {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 260px;
  gap: var(--s8);
  align-items: start;
}

.facts {
  margin: 0;
  border-left: 2px solid var(--divider);
  padding-left: var(--s5);
}

.facts div + div {
  margin-top: var(--s4);
}

.facts dt {
  font-size: 11.5px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--text-3);
  font-family: var(--font-mono);
}

.facts dd {
  margin: 3px 0 0;
  font-size: 13.5px;
  color: var(--text-1);
}

.idx {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--s4);
  margin-top: var(--s6);
}

.idx__card {
  display: block;
  padding: var(--s5);
  border: 1px solid var(--divider);
  border-radius: 6px;
  transition: border-color 0.22s var(--ease), transform 0.22s var(--ease),
    box-shadow 0.22s var(--ease);
}

.idx__card:hover {
  border-color: var(--green);
  transform: translateY(-2px);
  box-shadow: 0 12px 28px -20px rgba(21, 95, 62, 0.55);
}

.idx__no {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--green-dark);
}

.idx__card h3 {
  margin: 6px 0 0;
  font-size: 16px;
}

.idx__card p {
  margin-top: 6px;
  font-size: 13.5px;
  line-height: 1.75;
  color: var(--text-2);
}

.idx__more {
  display: inline-block;
  margin-top: var(--s3);
  font-size: 13px;
  color: var(--green-darker);
}

.path {
  color: var(--green-darker);
}

@media (max-width: 900px) {
  .intro {
    grid-template-columns: 1fr;
    gap: var(--s5);
  }

  .facts {
    border-left: 0;
    padding-left: 0;
    display: flex;
    flex-wrap: wrap;
    gap: var(--s4) var(--s6);
  }

  .facts div + div {
    margin-top: 0;
  }

  .idx {
    grid-template-columns: 1fr;
  }
}
</style>
