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

        <section class="blk">
          <h2>日常界面</h2>
          <DocShot src="admin-orders.webp" alt="全部订单" caption="财务管理 · 全部订单：按新购、续费、附加配置切换，支持搜索与日期筛选" />
          <DocShot src="admin-invoices.webp" alt="账单管理" caption="财务管理 · 账单管理：待支付、已支付、部分已付、已取消、已退款五态" />
          <DocShot src="admin-services.webp" alt="服务列表" caption="服务与工单 · 服务管理：实例状态、到期时间与续费" />
          <DocShot src="admin-tickets.webp" alt="工单列表" caption="服务与工单 · 工单管理：开启、客户回复、员工回复、已关闭" />
          <DocShot src="admin-users.webp" alt="用户列表" caption="用户管理 · 用户列表：余额、等级与注册时间" />
          <DocShot src="admin-logs-gateway.webp" alt="网关日志" caption="日志中心 · 网关日志：支付回调与上游调用的请求、应答与 Trace ID" />
        </section>
      </DocPage>
    </SectionShell>
  </div>
</template>

<script setup lang="ts">
import PageHead from '../../components/PageHead.vue'
import SectionShell from '../../components/SectionShell.vue'
import DocPage from '../../components/DocPage.vue'
import DocShot from '../../components/DocShot.vue'
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
