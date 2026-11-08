<template>
  <div>
    <PageHead
      kicker="Developer Docs · 11"
      title="远端存储"
      lead="媒体库默认存本地，也可以切到对象存储。驱动以 addons 插件接入，统一执行六个 storage.* 动作，业务代码不感知供应商。"
    />

    <DocShell>
      <DocPage>
        <section class="blk">
          <h2>动作契约</h2>
          <div class="table-wrap">
            <table class="tbl">
              <thead>
                <tr><th>动作</th><th>职责</th></tr>
              </thead>
              <tbody>
                <tr v-for="a in storageActions" :key="a.action">
                  <td><code class="nowrap">{{ a.action }}</code></td>
                  <td>{{ a.desc }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p class="step__note">
            动作经 <code>PluginRuntimeRegistry::execute()</code> 直调插件入口类，由 <code>RemoteMediaStorage</code>
            统一封装，业务层只看到 put / get / delete / exists / url / test。
          </p>
        </section>

        <section class="blk">
          <h2>驱动解析</h2>
          <p class="lead">
            当前可用驱动 = <code>local</code> + 已启用且声明 <code>media.storage</code> 能力的 addons 插件。
            插件目录缺失、清单损坏或必填项未配置时视为不可用，图片访问自动回落本地，并在日志留下一条
            <code>[media-storage]</code> 警告。
          </p>
        </section>

        <section class="blk">
          <h2>已接入插件</h2>
          <div class="table-wrap">
            <table class="tbl">
              <thead>
                <tr><th>slug</th><th>名称</th><th>说明</th></tr>
              </thead>
              <tbody>
                <tr v-for="p in storagePlugins" :key="p.slug">
                  <td><code class="nowrap">{{ p.slug }}</code></td>
                  <td class="nowrap">{{ p.name }}</td>
                  <td>{{ p.note }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section class="blk">
          <h2>迁移与订正</h2>
          <pre class="code-block"><code>php artisan media:storage-audit              # 核对本地与远程的媒体文件一致性
php artisan media:storage-rewrite-urls       # 默认 dry-run，只打印将改写的链接
php artisan media:storage-rewrite-urls --execute</code></pre>
          <ul class="notes">
            <li v-for="n in storageNotes" :key="n">{{ n }}</li>
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
import { storageActions, storageNotes, storagePlugins } from '../../data/devguide'
</script>
