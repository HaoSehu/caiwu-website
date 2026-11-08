<template>
  <div>
    <PageHead
      kicker="User Guide · 06"
      title="营销与分销"
      lead="优惠券、会员折扣、推广大使与返佣提现：奖励以实收为基数，退款会触发反转。"
    />

    <UserShell>
      <DocPage>
        <section class="blk">
          <h2>营销工具</h2>
          <div class="table-wrap">
            <table class="tbl">
              <thead>
                <tr><th>工具</th><th>说明</th></tr>
              </thead>
              <tbody>
                <tr v-for="c in couponTypes" :key="c.type">
                  <td class="nowrap">{{ c.type }}</td>
                  <td>{{ c.note }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section class="blk">
          <h2>分销链路</h2>
          <div class="rules">
            <div v-for="(s, i) in referralFlow" :key="s.step" class="rules__row">
              <p class="rules__name"><span class="no">{{ String(i + 1).padStart(2, '0') }}</span>{{ s.step }}</p>
              <p class="rules__detail">{{ s.detail }}</p>
            </div>
          </div>
        </section>

        <section class="blk">
          <h2>规则</h2>
          <ul class="notes notes--warn">
            <li v-for="r in marketingRules" :key="r">{{ r }}</li>
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
import { couponTypes, marketingRules, referralFlow } from '../../data/userguide'
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
