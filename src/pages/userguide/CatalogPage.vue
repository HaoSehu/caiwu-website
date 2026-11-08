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

        <section class="blk">
          <h2>商品管理界面</h2>
          <DocShot src="admin-products.webp" alt="商品目录" caption="商品目录：左侧分类树，右侧商品列表，新建商品与二级分组在顶部" />
          <DocShot src="admin-specs.webp" alt="规格管理" caption="规格管理：CPU 与内存的组合模板，供产品配置引用" />
          <DocShot src="admin-cpu-models.webp" alt="CPU 型号管理" caption="CPU 型号管理：独立维护，避免各产品重复填写" />
          <DocShot src="admin-product-suppliers.webp" alt="上游供应" caption="上游供应：绑定供应商后可批量同步价格与库存" />
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
import { catalogFields, catalogRelated, catalogRules, catalogSteps } from '../../data/userguide'
</script>
