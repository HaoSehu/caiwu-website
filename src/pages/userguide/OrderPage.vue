<template>
  <div>
    <PageHead
      kicker="User Guide · 03"
      title="下单与支付"
      lead="客户从产品目录选配到完成支付的完整路径；支付方式、状态含义与支付后没反应的排查入口。"
    />

    <UserShell>
      <DocPage>
        <section class="blk">
          <h2>购买流程</h2>
          <div class="rules">
            <div v-for="(s, i) in purchaseFlow" :key="s.step" class="rules__row">
              <p class="rules__name"><span class="no">{{ String(i + 1).padStart(2, '0') }}</span>{{ s.step }}</p>
              <p class="rules__detail">{{ s.detail }}</p>
            </div>
          </div>
        </section>

        <section class="blk">
          <h2>支付方式</h2>
          <div class="table-wrap">
            <table class="tbl">
              <thead>
                <tr><th>方式</th><th>说明</th></tr>
              </thead>
              <tbody>
                <tr v-for="m in paymentMethods" :key="m.name">
                  <td class="nowrap">{{ m.name }}</td>
                  <td>{{ m.note }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section class="blk">
          <h2>状态含义</h2>
          <div class="table-wrap">
            <table class="tbl tbl--tight">
              <thead>
                <tr><th>状态</th><th>含义</th></tr>
              </thead>
              <tbody>
                <tr v-for="s in paymentStatuses" :key="s.status">
                  <td class="nowrap">{{ s.status }}</td>
                  <td>{{ s.note }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section class="blk">
          <h2>支付没反应时</h2>
          <ul class="notes notes--warn">
            <li v-for="t in payTroubleshooting" :key="t">{{ t }}</li>
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
import { paymentMethods, paymentStatuses, payTroubleshooting, purchaseFlow } from '../../data/userguide'
</script>

<style scoped>
.no {
  display: inline-block;
  margin-right: 8px;
  font-family: var(--font-mono);
  font-weight: 400;
  color: var(--green-dark);
}
</style>
