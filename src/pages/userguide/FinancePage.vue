<template>
  <div>
    <PageHead
      kicker="User Guide · 04"
      title="订单、账单与账务"
      lead="订单、账单、支付、台账四类记录各管一件事，以 ID 互联。分清它们的边界，对账就不会乱。"
    />

    <UserShell>
      <DocPage>
        <section class="blk">
          <h2>四类记录的边界</h2>
          <div class="table-wrap">
            <table class="tbl">
              <thead>
                <tr><th>对象</th><th>角色</th><th>核心字段</th></tr>
              </thead>
              <tbody>
                <tr v-for="o in orderVsInvoice" :key="o.object">
                  <td class="nowrap"><strong>{{ o.object }}</strong></td>
                  <td class="nowrap muted">{{ o.role }}</td>
                  <td class="muted">{{ o.fields }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <ul class="notes">
            <li v-for="o in orderVsInvoice" :key="o.object + '-n'">{{ o.object }}：{{ o.note }}</li>
          </ul>
        </section>

        <section class="blk">
          <h2>订单状态</h2>
          <div class="table-wrap">
            <table class="tbl tbl--tight">
              <thead>
                <tr><th>状态</th><th>含义</th></tr>
              </thead>
              <tbody>
                <tr v-for="s in orderStatuses" :key="s.status">
                  <td class="nowrap">{{ s.status }}</td>
                  <td>{{ s.note }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section class="blk">
          <h2>账单状态</h2>
          <div class="table-wrap">
            <table class="tbl tbl--tight">
              <thead>
                <tr><th>状态</th><th>含义</th></tr>
              </thead>
              <tbody>
                <tr v-for="s in invoiceStatuses" :key="s.status">
                  <td class="nowrap">{{ s.status }}</td>
                  <td>{{ s.note }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section class="blk">
          <h2>退款</h2>
          <ol class="notes">
            <li v-for="r in refundFlow" :key="r">{{ r }}</li>
          </ol>
        </section>

        <section class="blk">
          <h2>台账事件</h2>
          <div class="tags">
            <span v-for="e in ledgerEvents" :key="e" class="tag">{{ e }}</span>
          </div>
          <ul class="notes">
            <li v-for="r in ledgerRules" :key="r">{{ r }}</li>
          </ul>
        </section>

        <section class="blk">
          <h2>财务界面</h2>
          <DocShot src="admin-orders.webp" alt="全部订单" caption="全部订单：订单号、用户、产品/服务、类型、计费周期、实付金额与状态" />
          <DocShot src="admin-invoices.webp" alt="账单管理" caption="账单管理：账单号、账单项目、类型、计费周期与实付金额" />
          <DocShot src="admin-recharges.webp" alt="充值记录" caption="充值记录：支付单号、渠道、关联账单、金额、到账与状态" />
          <DocShot src="admin-referral.webp" alt="推广概览" caption="推广概览：累计销售额、奖励与提现汇总" />
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
import {
  invoiceStatuses,
  ledgerEvents,
  ledgerRules,
  orderStatuses,
  orderVsInvoice,
  refundFlow,
} from '../../data/userguide'
</script>
