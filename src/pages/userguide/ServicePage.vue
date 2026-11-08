<template>
  <div>
    <PageHead
      kicker="User Guide · 05"
      title="服务与工单"
      lead="服务实例的状态与可执行动作受三层门禁约束；工单是售后留痕的主通道。"
    />

    <UserShell>
      <DocPage>
        <section class="blk">
          <h2>服务状态</h2>
          <div class="table-wrap">
            <table class="tbl">
              <thead>
                <tr><th>状态</th><th>含义</th></tr>
              </thead>
              <tbody>
                <tr v-for="s in serviceStatuses" :key="s.status">
                  <td class="nowrap">{{ s.status }}</td>
                  <td>{{ s.note }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section class="blk">
          <h2>控制台动作</h2>
          <div class="table-wrap">
            <table class="tbl">
              <thead>
                <tr><th>动作</th><th>说明</th></tr>
              </thead>
              <tbody>
                <tr v-for="a in consoleActions" :key="a.action">
                  <td class="nowrap">{{ a.action }}</td>
                  <td>{{ a.note }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section class="blk">
          <h2>工单流转</h2>
          <div class="rules">
            <div v-for="t in ticketFlow" :key="t.status" class="rules__row">
              <p class="rules__name">{{ t.status }}</p>
              <p class="rules__detail">{{ t.note }}</p>
            </div>
          </div>
          <ul class="notes">
            <li v-for="n in ticketNotes" :key="n">{{ n }}</li>
          </ul>
        </section>

        <section class="blk">
          <h2>服务与工单界面</h2>
          <DocShot src="admin-services.webp" alt="服务列表" caption="服务管理 · 服务实例：实例编号、用户、产品、状态与到期时间" />
          <DocShot src="admin-tickets.webp" alt="工单列表" caption="服务与工单 · 工单管理：按部门、优先级与状态筛选" />
          <DocShot src="www-help.webp" alt="帮助中心" caption="官网门户 · 帮助中心：客户自助查找购买、支付、续费与实例管理指引" />
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
import { consoleActions, serviceStatuses, ticketFlow, ticketNotes } from '../../data/userguide'
</script>
