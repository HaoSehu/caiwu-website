<template>
  <div>
    <PageHead
      kicker="User Guide · 07"
      title="站点与内容"
      lead="站点信息、首页 Banner、公告、帮助中心与媒体库，改动立即生效。"
    />

    <UserShell>
      <DocPage>
        <section class="blk">
          <h2>可配置项</h2>
          <div class="table-wrap">
            <table class="tbl">
              <thead>
                <tr><th>项</th><th>说明</th></tr>
              </thead>
              <tbody>
                <tr v-for="s in siteSettings" :key="s.item">
                  <td class="nowrap">{{ s.item }}</td>
                  <td>{{ s.note }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section class="blk">
          <h2>注意事项</h2>
          <ul class="notes">
            <li v-for="n in contentNotes" :key="n">{{ n }}</li>
          </ul>
        </section>
      </DocPage>
    </UserShell>
  </div>
</template>

<script setup lang="ts">
import PageHead from '../../components/PageHead.vue'
import UserShell from '../../components/UserShell.vue'
import DocPage from '../../components/DocPage.vue'
import { contentNotes, siteSettings } from '../../data/userguide'
</script>
