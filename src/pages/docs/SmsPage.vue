<template>
  <div>
    <PageHead
      kicker="Developer Docs · 08"
      title="短信接口"
      lead="短信以驱动接入，验证码与通知短信分开两个方法。模板语法差异留在插件里，系统层只传用途与变量。"
    />

    <DocShell>
      <DocPage>
        <section class="blk">
          <h2>驱动契约</h2>
          <div class="table-wrap">
            <table class="tbl">
              <thead>
                <tr><th>方法</th><th>职责</th></tr>
              </thead>
              <tbody>
                <tr v-for="m in smsDriverContract" :key="m.method">
                  <td><code class="nowrap">{{ m.method }}</code></td>
                  <td>{{ m.desc }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section class="blk">
          <h2>可选：验证码模板</h2>
          <p class="lead">
            驱动实现 <code>{{ smsTemplateContract.name }}</code> 后，验证码文案由驱动按用途返回，系统不再为每家服务商写分支。
          </p>
          <pre class="code-block"><code>{{ smsTemplateContract.method }}</code></pre>
          <p class="step__note">{{ smsTemplateContract.desc }}</p>
        </section>

        <section class="blk">
          <h2>已接入插件</h2>
          <div class="table-wrap">
            <table class="tbl">
              <thead>
                <tr><th>slug</th><th>名称</th><th>capabilities</th><th>说明</th></tr>
              </thead>
              <tbody>
                <tr v-for="p in smsPlugins" :key="p.slug">
                  <td><code class="nowrap">{{ p.slug }}</code></td>
                  <td class="nowrap">{{ p.name }}</td>
                  <td class="muted">{{ p.caps }}</td>
                  <td>{{ p.note }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section class="blk">
          <h2>实现要点</h2>
          <ul class="notes">
            <li v-for="n in smsNotes" :key="n">{{ n }}</li>
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
import { smsDriverContract, smsNotes, smsPlugins, smsTemplateContract } from '../../data/devguide'
</script>
