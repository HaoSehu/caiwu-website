<template>
  <div>
    <PageHead
      kicker="Developer Docs · 07"
      title="邮件接口"
      lead="邮件以驱动接入，当前有单账号 SMTP、多 SMTP 轮询与 Demo 三个插件。业务代码经 MailDriverManager 取驱动，不直接连 SMTP。"
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
                <tr v-for="m in mailDriverContract" :key="m.method">
                  <td><code class="nowrap">{{ m.method }}</code></td>
                  <td>{{ m.desc }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section class="blk">
          <h2>已接入插件</h2>
          <div class="table-wrap">
            <table class="tbl">
              <thead>
                <tr><th>slug</th><th>名称</th><th>capabilities</th><th>说明</th></tr>
              </thead>
              <tbody>
                <tr v-for="p in mailPlugins" :key="p.slug">
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
            <li v-for="n in mailNotes" :key="n">{{ n }}</li>
          </ul>
        </section>

        <section class="blk">
          <h2>驱动绑定</h2>
          <p class="lead">插件清单声明 <code>driver_binding</code> 后，平台自动把它注册为可选驱动；启用哪个由设置项决定。</p>
          <pre class="code-block"><code>'extra' => [
    'driver_binding' => [
        'binding_key' => 'mail_driver',
        'provider_key' => 'multi_smtp_round_robin',
    ],
],</code></pre>
        </section>
      </DocPage>
    </DocShell>
  </div>
</template>

<script setup lang="ts">
import PageHead from '../../components/PageHead.vue'
import DocShell from '../../components/DocShell.vue'
import DocPage from '../../components/DocPage.vue'
import { mailDriverContract, mailNotes, mailPlugins } from '../../data/devguide'
</script>
