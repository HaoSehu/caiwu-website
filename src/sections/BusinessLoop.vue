<template>
  <section id="loop" class="section section--soft">
    <div class="wrap loop">
      <div class="loop__copy block-head">
        <h2>从下单到入账，六步</h2>
        <p>
          这是一笔真实交易的完整路径。每一步都有对应的数据对象与写入时机，
          失败点也都明确：支付校验、开通重试、对账标记。
        </p>

        <ol class="steps">
          <li v-for="(s, i) in flow" :key="s.label">
            <button type="button" class="steps__btn" :class="{ 'is-active': active === i }" @click="active = i">
              <span class="steps__no num">{{ String(i + 1).padStart(2, '0') }}</span>
              <span class="steps__label">{{ s.label }}</span>
              <span class="steps__detail">{{ s.detail }}</span>
            </button>
          </li>
        </ol>
      </div>

      <div class="loop__code">
        <div class="code">
          <div class="code__tabs">
            <span class="code__tab is-active">flow.php</span>
            <span class="code__tab">objects</span>
          </div>
          <pre><code><span v-for="(line, i) in lines" :key="i" :class="line.cls">{{ line.text }}
</span></code></pre>
        </div>

        <div class="objects">
          <div v-for="o in objects" :key="o.table" class="object">
            <code>{{ o.table }}</code>
            <span>{{ o.rule }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { flow, objects } from '../data/content'

const active = ref(0)

const lines = [
  { text: '// 一笔订单从创建到入账', cls: 'c' },
  { text: 'checkout   → orders        // 冻结配置与价格快照', cls: '' },
  { text: 'bill       → invoices      // 生成应付账单与行项目', cls: '' },
  { text: 'pay        → payments      // 回调验签后幂等入账', cls: '' },
  { text: 'provision  → service       // 下发上游，失败进重试', cls: '' },
  { text: 'renew      → invoices      // 续费、升级、流量包', cls: '' },
  { text: 'ledger     → finance_ledger// 按事件类型留痕', cls: '' },
  { text: '// 余额支付不落 payments；退款写反向事件', cls: 'c' },
]
</script>

<style scoped>
.loop {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: var(--s8);
  align-items: start;
}

.steps {
  list-style: none;
  margin: var(--s5) 0 0;
  padding: 0;
  border-left: 2px solid var(--divider);
}

.steps__btn {
  display: grid;
  grid-template-columns: 34px 96px minmax(0, 1fr);
  gap: var(--s3);
  align-items: baseline;
  width: 100%;
  text-align: left;
  padding: 13px var(--s4);
  border-left: 2px solid transparent;
  margin-left: -2px;
  transition: background-color 0.2s var(--ease), border-color 0.2s var(--ease);
}

.steps__btn:hover {
  background: rgba(66, 184, 131, 0.05);
}

.steps__btn.is-active {
  border-left-color: var(--green);
  background: rgba(66, 184, 131, 0.07);
}

.steps__no {
  font-size: 11.5px;
  color: var(--text-3);
}

.steps__label {
  font-size: 14.5px;
  font-weight: 600;
  color: var(--text-1);
}

.steps__detail {
  font-size: 13px;
  line-height: 1.75;
  color: var(--text-2);
}

.loop__code {
  position: sticky;
  top: 88px;
}

.objects {
  margin-top: var(--s5);
}

.object {
  display: grid;
  grid-template-columns: 132px minmax(0, 1fr);
  gap: var(--s3);
  padding: 10px 0;
  border-bottom: 1px solid var(--divider);
  align-items: baseline;
}

.object code {
  font-size: 11.5px;
  color: var(--green-darker);
  background: rgba(66, 184, 131, 0.12);
  border-radius: 3px;
  padding: 2px 8px;
  justify-self: start;
}

.object span {
  font-size: 12.5px;
  line-height: 1.7;
  color: var(--text-2);
}

.c {
  color: #7f8c98;
}

@media (max-width: 980px) {
  .loop {
    grid-template-columns: 1fr;
    gap: var(--s6);
  }

  .loop__code {
    position: static;
  }
}

@media (max-width: 620px) {
  .steps__btn {
    grid-template-columns: 26px minmax(0, 1fr);
    row-gap: 4px;
  }

  .steps__detail {
    grid-column: 2;
  }

  .object {
    grid-template-columns: 1fr;
    gap: 5px;
  }
}
</style>
