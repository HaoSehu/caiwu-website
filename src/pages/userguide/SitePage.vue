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

        <section class="blk">
          <h2>内容管理界面</h2>
          <DocShot src="admin-site-info-v2.webp" alt="站点设置" caption="站点设置 · 基础信息" />
          <DocShot src="admin-site-hero-v2.webp" alt="首页 Banner" caption="站点设置 · 首页 Banner" />
          <DocShot src="admin-notices-v2.webp" alt="系统公告" caption="系统公告：标题、分类、状态、属性与发布时间" />
          <DocShot src="admin-media-v2.webp" alt="媒体库" caption="媒体库：预览、文件、类型、存储区、体积与上传时间" />
          <DocShot src="www-notices-v2.webp" alt="官网公告" caption="官网门户 · 官方公告" />
        </section>
      </DocPage>
    </UserShell>
  </div>
</template>

<script setup lang="ts">
import PageHead from '../../components/PageHead.vue'
import UserShell from '../../components/UserShell.vue'
import DocPage from '../../components/DocPage.vue'
import DocShot from '../../components/DocShot.vue'
import { contentNotes, siteSettings } from '../../data/userguide'
</script>
