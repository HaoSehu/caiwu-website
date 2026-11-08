<template>
  <div>
    <PageHead
      kicker="User Guide · 02"
      title="商品与定价"
      lead="商品分三层：业务类型 → 一级分组 → 产品。配置与价格在下单瞬间冻结，后续调价不影响已生成的订单与账单。"
    />

    <UserShell>
      <DocPage>
        <section class="blk">
          <h2>三层分类</h2>
          <div class="rules">
            <div v-for="s in catalogSteps" :key="s.step" class="rules__row">
              <p class="rules__name">{{ s.step }}</p>
              <p class="rules__detail">{{ s.detail }}</p>
            </div>
          </div>
        </section>

        <section class="blk">
          <h2>产品字段</h2>
          <div class="table-wrap">
            <table class="tbl">
              <thead>
                <tr><th>字段</th><th>说明</th></tr>
              </thead>
              <tbody>
                <tr v-for="f in catalogFields" :key="f.field">
                  <td class="nowrap">{{ f.field }}</td>
                  <td>{{ f.note }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section class="blk">
          <h2>相关目录</h2>
          <ul class="notes">
            <li v-for="r in catalogRelated" :key="r">{{ r }}</li>
          </ul>
        </section>

        <section class="blk">
          <h2>规则</h2>
          <ul class="notes notes--warn">
            <li v-for="r in catalogRules" :key="r">{{ r }}</li>
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
import { catalogFields, catalogRelated, catalogRules, catalogSteps } from '../../data/userguide'
</script>
