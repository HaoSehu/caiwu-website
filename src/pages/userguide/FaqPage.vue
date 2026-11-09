<template>
  <div>
    <PageHead
      kicker="User Guide · 10"
      title="常见问题"
      lead="九个高频现象与处理入口。每条都指向具体的数据对象与日志，不靠猜。"
    />

    <UserShell>
      <DocPage>
        <section class="blk">
          <h2>问题与处理</h2>
          <div class="faq">
            <div v-for="(f, i) in faqItems" :key="f.q" class="faq__item">
              <p class="faq__q">
                <span class="faq__no num">{{ String(i + 1).padStart(2, '0') }}</span>
                {{ f.q }}
              </p>
              <p class="faq__a">{{ f.a }}</p>
            </div>
          </div>
        </section>

        <section class="blk">
          <h2>排查时打开的位置</h2>
          <DocShot src="admin-logs-gateway.webp" alt="网关日志" caption="支付与上游问题：先看网关日志的网关、操作、单号与结果" />
          <DocShot src="admin-services.webp" alt="服务列表" caption="服务不开通：看服务列表的状态与开通时间" />
          <DocShot src="admin-logs-sms.webp" alt="短信日志" caption="收不到验证码：先确认短信日志的模板、状态与错误信息" />
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
import { faqItems } from '../../data/userguide'
</script>

<style scoped>
.faq {
  margin-top: var(--s4);
  border-top: 1px solid var(--divider);
}

.faq__item {
  padding-block: var(--s4);
  border-bottom: 1px solid var(--divider);
}

.faq__q {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-1);
}

.faq__no {
  margin-right: 10px;
  font-size: 12px;
  color: var(--green-dark);
  font-weight: 400;
}

.faq__a {
  margin-top: var(--s2);
  font-size: 13.5px;
  line-height: 1.85;
  color: var(--text-2);
  max-width: 78ch;
}
</style>
