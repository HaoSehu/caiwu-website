<template>
  <div>
    <PageHead
      kicker="Developer Docs · 10"
      title="Hook 开发"
      lead="Hook 是调度器留给插件的扩展点：插件实现 ScheduleHook，在清单里按钩子名注册，调度到点调用。"
    />

    <DocShell>
      <DocPage>
        <section class="blk">
          <h2>契约</h2>
          <div class="table-wrap">
            <table class="tbl tbl--tight">
              <tbody>
                <tr>
                  <td class="nowrap"><code>{{ hookContract.name }}</code></td>
                  <td><code class="sig">{{ hookContract.sig }}</code></td>
                </tr>
              </tbody>
            </table>
          </div>
          <p class="step__note">{{ hookContract.desc }}</p>
        </section>

        <section class="blk">
          <h2>钩子点</h2>
          <div class="table-wrap">
            <table class="tbl tbl--tight">
              <thead>
                <tr><th>钩子名</th><th>触发时点</th></tr>
              </thead>
              <tbody>
                <tr v-for="h in hookPoints" :key="h.name">
                  <td><code class="nowrap">{{ h.name }}</code></td>
                  <td>{{ h.when }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p class="step__note">
            <code>task.before</code>、<code>task.after</code>、<code>task.failed</code> 针对单个心跳任务；
            <code>tick.*</code> 是按固定周期触发的独立时点，不依附于某个任务。
          </p>
        </section>

        <section class="blk">
          <h2>清单注册</h2>
          <p class="lead">在插件 config.php 的 info.extra 中声明钩子与定时任务；addons 域当前只支持这两类扩展。</p>
          <pre class="code-block"><code>{{ hookManifestExample }}</code></pre>
        </section>

        <section class="blk">
          <h2>实现示例</h2>
          <pre class="code-block"><code>{{ hookContextExample }}</code></pre>
        </section>

        <section class="blk">
          <h2>约定</h2>
          <ul class="notes">
            <li v-for="n in hookNotes" :key="n">{{ n }}</li>
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
import {
  hookContextExample,
  hookContract,
  hookManifestExample,
  hookNotes,
  hookPoints,
} from '../../data/devguide'
</script>
