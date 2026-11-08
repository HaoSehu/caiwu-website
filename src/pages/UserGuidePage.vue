<template>
  <div>
    <PageHead
      kicker="User Guide"
      title="使用文档"
      lead="面向平台管理员、财务、客服与客户的完整操作说明：从商品配置与下单支付，到账务、服务、营销、站点与系统设置。"
    />

    <UserShell>
      <DocPage>
        <section class="blk">
          <h2>阅读方式</h2>
          <p class="lead">
            管理员按 01 → 09 顺序读完即可覆盖日常运营；只查某个操作，从左侧目录直接跳转，每页底部有上一篇与下一篇。
          </p>

          <div class="roles">
            <div v-for="r in roleHints" :key="r.role" class="role">
              <h3>{{ r.role }}</h3>
              <p>{{ r.desc }}</p>
            </div>
          </div>

          <div class="idx">
            <RouterLink v-for="d in userguideIndex" :key="d.to" :to="d.to" class="idx__card">
              <span class="idx__no">{{ d.kicker }}</span>
              <h3>{{ d.title }}</h3>
              <p>{{ d.desc }}</p>
              <span class="idx__more">阅读 <span aria-hidden="true">→</span></span>
            </RouterLink>
          </div>
        </section>

        <section class="blk">
          <h2>四个入口</h2>
          <div class="table-wrap">
            <table class="tbl">
              <thead>
                <tr><th>入口</th><th>面向</th><th>能做什么</th></tr>
              </thead>
              <tbody>
                <tr v-for="e in entryPoints" :key="e.name">
                  <td class="nowrap"><strong>{{ e.name }}</strong></td>
                  <td class="nowrap muted">{{ e.who }}</td>
                  <td>{{ e.desc }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </DocPage>
    </UserShell>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import PageHead from '../components/PageHead.vue'
import UserShell from '../components/UserShell.vue'
import DocPage from '../components/DocPage.vue'
import { entryPoints, userguideIndex } from '../data/userguide'

const roleHints = [
  { role: '平台管理员', desc: '先读 01 与 08：入口、账号准备、权限与账户策略。' },
  { role: '财务', desc: '重点读 04：订单、账单、退款、台账与分销结算。' },
  { role: '客服 / 运维', desc: '重点读 05 与 09：服务实例操作、工单流转与日志排查。' },
  { role: '客户', desc: '读 03 与 05：如何下单支付、如何管理自己的服务。' },
]
</script>

<style scoped>
.roles {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: var(--s5);
  margin-top: var(--s5);
}

.role {
  border-top: 2px solid var(--green);
  padding-top: var(--s3);
}

.role h3 {
  margin: 0;
  font-size: 14px;
}

.role p {
  margin-top: 6px;
  font-size: 13px;
  line-height: 1.75;
  color: var(--text-2);
}

.idx {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--s4);
  margin-top: var(--s6);
}

.idx__card {
  display: block;
  padding: var(--s5);
  border: 1px solid var(--divider);
  border-radius: 6px;
  transition: border-color 0.22s var(--ease), transform 0.22s var(--ease),
    box-shadow 0.22s var(--ease);
}

.idx__card:hover {
  border-color: var(--green);
  transform: translateY(-2px);
  box-shadow: 0 12px 28px -20px rgba(21, 95, 62, 0.55);
}

.idx__no {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--green-dark);
}

.idx__card h3 {
  margin: 6px 0 0;
  font-size: 16px;
}

.idx__card p {
  margin-top: 6px;
  font-size: 13.5px;
  line-height: 1.75;
  color: var(--text-2);
}

.idx__more {
  display: inline-block;
  margin-top: var(--s3);
  font-size: 13px;
  color: var(--green-darker);
}

@media (max-width: 1040px) {
  .roles {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 900px) {
  .idx {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .roles {
    grid-template-columns: 1fr;
  }
}
</style>
