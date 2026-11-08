<template>
  <div>
    <PageHead
      kicker="Developer Docs · 04"
      title="前端开发"
      lead="三个 Vue 端共用 TDesign 与 shared，但状态管理与业务能力各自独立；App 是原生实现，不是网页套壳。"
    />

    <DocShell>
      <DocPage>
        <section class="blk">
          <h2>四端一览</h2>
          <div class="cards">
            <article v-for="f in frontends" :key="f.name" class="card">
              <header class="card__head">
                <h3><code>{{ f.name }}</code></h3>
                <span v-if="f.port !== '—'" class="card__port">:{{ f.port }}</span>
              </header>
              <p class="card__stack">{{ f.stack }}</p>
              <p class="card__entry">入口：<code>{{ f.entry }}</code></p>
              <ul class="notes">
                <li v-for="n in f.notes" :key="n">{{ n }}</li>
              </ul>
            </article>
          </div>
        </section>

        <section class="blk">
          <h2>共享包</h2>
          <p class="lead">
            <code>shared/</code> 是三个 Vue 端与控制台组件共用的包。状态文案、颜色、标签和基础组件先查这里，
            不在页面里另写一套。
          </p>
          <ul class="notes">
            <li v-for="s in frontendShared" :key="s">{{ s }}</li>
          </ul>
        </section>

        <section class="blk">
          <h2>通用规则</h2>
          <div class="rules">
            <div v-for="r in commonRules" :key="r.rule" class="rules__row">
              <p class="rules__name">{{ r.rule }}</p>
              <p class="rules__detail">{{ r.detail }}</p>
            </div>
          </div>
        </section>

        <section class="blk">
          <h2>根 workspace 命令</h2>
          <pre class="code-block"><code>npm run dev:admin-v3        # 管理端 5174
npm run dev:user-v3-www     # 官网 5175
npm run dev:user-v4-console # 控制台 5173

npm run lint:frontends
npm run typecheck:frontends
npm run build:frontends     # 三端统一构建，附体积门禁
npm run verify:frontends    # lint + typecheck + build + 重构守卫</code></pre>
        </section>
      </DocPage>
    </DocShell>
  </div>
</template>

<script setup lang="ts">
import PageHead from '../../components/PageHead.vue'
import DocShell from '../../components/DocShell.vue'
import DocPage from '../../components/DocPage.vue'
import { frontendShared, frontends } from '../../data/devguide'

const commonRules = [
  {
    rule: '组件写法',
    detail: 'Vue 3 script setup + Composition API。布局壳层文件（layouts/blank.vue 与 keep-alive 包装器）豁免。',
  },
  {
    rule: '请求与令牌',
    detail: 'HTTP 走各端现有 src/api/* 与 request/runtime 工具，不直接创建 axios 实例；Token 与站点信息走现有 auth/runtime/store，不直接读写 localStorage 键。',
  },
  {
    rule: '请求竞态',
    detail: '列表与详情加载必须做 requestSeq 序号防护，旧响应不得覆盖新数据；懒加载标签以「加载成功」作为已加载置位条件。',
  },
  {
    rule: '状态管理',
    detail: '按端独立，不跨端合并同名 store。权限、设置、标签页、用户四类模块在管理端与控制台语义不同，不是重复代码。',
  },
  {
    rule: '文案',
    detail: '用户可见文案用简体中文；错误提示优先读取后端 message 与 data.errors，不展示英文异常或第三方原始错误。',
  },
]
</script>
