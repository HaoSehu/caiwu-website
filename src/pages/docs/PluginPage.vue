<template>
  <div>
    <PageHead
      kicker="Developer Docs · 05"
      title="插件开发"
      lead="七个能力域，统一放在 backend/plugins/{domain}/{slug}/。入口类只提供 execute()，由平台 adapter 转成内部契约，业务控制器不依赖插件实现类。"
    />

    <DocShell>
      <DocPage>
        <section class="blk">
          <h2>能力域映射</h2>
          <div class="table-wrap">
            <table class="tbl">
              <thead>
                <tr><th>能力域</th><th>物理目录</th><th>契约</th><th>已接入</th></tr>
              </thead>
              <tbody>
                <tr v-for="p in pluginDomains" :key="p.domain">
                  <td class="nowrap"><code>{{ p.domain }}</code></td>
                  <td><code>{{ p.dir }}</code></td>
                  <td class="muted">{{ p.contract }}</td>
                  <td>{{ p.plugins }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section class="blk">
          <h2>单插件结构</h2>
          <pre class="code-block"><code>{{ pluginStructure }}</code></pre>
        </section>

        <section class="blk">
          <h2>config.php</h2>
          <p class="lead">
            config.php 同时声明插件元信息与后台配置表单。管理端插件页按这份 schema 渲染表单与状态，
            无需另写管理页面。
          </p>
          <pre class="code-block"><code>{{ pluginConfigExample }}</code></pre>
        </section>

        <section class="blk">
          <h2>加载流程</h2>
          <div class="rules">
            <div v-for="(s, i) in loadFlow" :key="s" class="rules__row">
              <p class="rules__name num">{{ String(i + 1).padStart(2, '0') }}</p>
              <p class="rules__detail">{{ s }}</p>
            </div>
          </div>
        </section>

        <section class="blk">
          <h2>硬性约束</h2>
          <ul class="notes">
            <li v-for="r in pluginRules" :key="r">{{ r }}</li>
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
import { pluginConfigExample, pluginDomains, pluginRules, pluginStructure } from '../../data/devguide'

const loadFlow = [
  'require 前对 lib/、logic/、controller/ 与根目录 PHP 做声明类预检（token 级解析，不执行代码）。',
  '递归加载 lib/、logic/、controller/ 下的 PHP 文件。',
  '如果存在 vendor/autoload.php，加载插件自带依赖。',
  '加载插件根目录 PHP 文件，跳过 config.php。入口类必须位于插件命名空间根部。',
]
</script>

<style scoped>
.rules__name.num {
  color: var(--green-dark);
  font-family: var(--font-mono);
}
</style>
