<template>
  <div>
    <PageHead
      kicker="Beginner · 03"
      title="运营日常"
      lead="任务与日志、自动化、用户、业务、商品、基础功能、日常问题与隐私服务——后台每天真正要看的几块。"
    />

    <SectionShell title="新手引导" index="/beginner" :items="beginnerIndex">
      <DocPage>
        <section class="blk">
          <h2>任务与日志</h2>
          <div class="table-wrap">
            <table class="tbl">
              <thead>
                <tr><th>项</th><th>说明</th></tr>
              </thead>
              <tbody>
                <tr v-for="t in taskAndLogs" :key="t.item">
                  <td class="nowrap">{{ t.item }}</td>
                  <td>{{ t.note }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section class="blk">
          <h2>用户管理</h2>
          <div class="table-wrap">
            <table class="tbl">
              <thead>
                <tr><th>区域</th><th>说明</th></tr>
              </thead>
              <tbody>
                <tr v-for="u in userManagement" :key="u.area">
                  <td class="nowrap">{{ u.area }}</td>
                  <td>{{ u.note }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section class="blk">
          <h2>业务管理</h2>
          <div class="table-wrap">
            <table class="tbl">
              <thead>
                <tr><th>区域</th><th>说明</th></tr>
              </thead>
              <tbody>
                <tr v-for="b in businessManagement" :key="b.area">
                  <td class="nowrap">{{ b.area }}</td>
                  <td>{{ b.note }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section class="blk">
          <h2>商品与插件管理</h2>
          <div class="table-wrap">
            <table class="tbl">
              <thead>
                <tr><th>区域</th><th>说明</th></tr>
              </thead>
              <tbody>
                <tr v-for="p in productManagement" :key="p.area">
                  <td class="nowrap">{{ p.area }}</td>
                  <td>{{ p.note }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section class="blk">
          <h2>基础功能</h2>
          <div class="table-wrap">
            <table class="tbl">
              <thead>
                <tr><th>功能</th><th>说明</th></tr>
              </thead>
              <tbody>
                <tr v-for="f in basicFeatures" :key="f.area">
                  <td class="nowrap">{{ f.area }}</td>
                  <td>{{ f.note }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section class="blk">
          <h2>日常问题</h2>
          <div class="table-wrap">
            <table class="tbl">
              <thead>
                <tr><th>现象</th><th>处理</th></tr>
              </thead>
              <tbody>
                <tr v-for="d in dailyIssues" :key="d.issue">
                  <td class="nowrap">{{ d.issue }}</td>
                  <td>{{ d.action }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section class="blk">
          <h2>隐私服务</h2>
          <div class="table-wrap">
            <table class="tbl">
              <thead>
                <tr><th>项</th><th>说明</th></tr>
              </thead>
              <tbody>
                <tr v-for="p in privacySettings" :key="p.area">
                  <td class="nowrap">{{ p.area }}</td>
                  <td>{{ p.note }}</td>
                </tr>
              </tbody>
            </table>
          </div>
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
  basicFeatures,
  beginnerIndex,
  businessManagement,
  dailyIssues,
  privacySettings,
  productManagement,
  taskAndLogs,
  userManagement,
} from '../../data/beginner'
</script>
