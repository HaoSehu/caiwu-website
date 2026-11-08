<template>
  <div>
    <PageHead
      kicker="Install · 03"
      title="后端部署"
      lead="代码、.env、依赖、数据库、权限与缓存。数据库有两条互斥路径，用错会污染生产库。"
    />

    <SectionShell title="安装与部署" index="/install" :items="installIndex">
      <DocPage>
        <section class="blk">
          <h2>部署步骤</h2>
          <div v-for="s in backendDeploySteps" :key="s.step" class="step">
            <p class="step__title">{{ s.step }}</p>
            <pre class="code-block"><code>{{ s.cmd }}</code></pre>
            <p class="step__note">{{ s.note }}</p>
          </div>
        </section>

        <section class="blk">
          <h2>.env 关键项</h2>
          <pre class="code-block"><code>{{ backendEnv }}</code></pre>
          <ul class="notes notes--warn">
            <li v-for="n in backendEnvNotes" :key="n">{{ n }}</li>
          </ul>
        </section>

        <section class="blk">
          <h2>两条数据库路径</h2>
          <ul class="notes">
            <li v-for="r in dbPathRules" :key="r">{{ r }}</li>
          </ul>
        </section>
      </DocPage>
    </SectionShell>
  </div>
</template>

<script setup lang="ts">
import PageHead from '../../components/PageHead.vue'
import SectionShell from '../../components/SectionShell.vue'
import DocPage from '../../components/DocPage.vue'
import {
  backendDeploySteps,
  backendEnv,
  backendEnvNotes,
  dbPathRules,
  installIndex,
} from '../../data/install'
</script>
