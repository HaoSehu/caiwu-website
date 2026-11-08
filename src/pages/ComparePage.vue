<template>
  <div>
    <PageHead
      kicker="Comparison"
      title="方案对比"
      lead="不评价具体商业产品，只比较结构性差异：这些差异决定了系统在出现退款、部分付款、换供应商或升级数据库时会不会出问题。"
    />

    <section class="section">
      <div class="wrap">
        <div class="matrix">
          <div class="matrix__head">
            <div class="col-dim">维度</div>
            <div class="col-caiwu">Caiwu 的做法</div>
            <div class="col-common">常见做法</div>
          </div>

          <div v-for="row in compareDimensions" :key="row.dimension" class="matrix__row">
            <div class="col-dim">
              <span class="dim">{{ row.dimension }}</span>
            </div>
            <div class="col-caiwu">
              <p>{{ row.caiwu }}</p>
            </div>
            <div class="col-common">
              <p>{{ row.common }}</p>
              <p class="why">影响：{{ row.why }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section section--soft">
      <div class="wrap">
        <header class="head head--dark">
          <h2>同一笔退款，两种处理</h2>
          <p>退款是最容易把账搞乱的场景：钱要退、服务要停、分销奖励要冲回、报表要能解释。下面是两种典型做法的差别。</p>
        </header>

        <div class="cases">
          <article class="case case--bad">
            <h3>把状态改回去</h3>
            <ol>
              <li>把订单状态改成「已退款」</li>
              <li>把账单金额改成 0</li>
              <li>删掉或改写原支付记录</li>
              <li>奖励金额手动减掉</li>
            </ol>
            <p class="case__result">结果：历史被覆盖。三个月后问「这笔钱到底退了多少」，只能靠人回忆；对账时平台记录与渠道流水对不上。</p>
          </article>

          <article class="case case--good">
            <h3>追加一条反向记录</h3>
            <ol>
              <li>原订单、账单、支付记录保持不动</li>
              <li>新增一条退款账单，关联原账单</li>
              <li>台账写一条 <code>invoice_refund</code> 事件</li>
              <li>分销写一条 <code>reward_reversed</code> 事件</li>
            </ol>
            <p class="case__result">结果：任何时点的余额都能由事件重算；退款、冲正、奖励反转各自留痕，审计链不断。</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section section--dark">
      <div class="wrap">
        <header class="head">
          <h2>三条不可让的底线</h2>
          <p>其余都可以按需裁剪，这三条一旦让步，账就再也对不上了。</p>
        </header>

        <div class="lines">
          <article v-for="(l, i) in bottomLines" :key="l.title" class="line">
            <span class="line__no num">{{ String(i + 1).padStart(2, '0') }}</span>
            <h3>{{ l.title }}</h3>
            <p>{{ l.body }}</p>
          </article>
        </div>
      </div>
    </section>

    <FinalCta />
  </div>
</template>

<script setup lang="ts">
import PageHead from '../components/PageHead.vue'
import FinalCta from '../sections/FinalCta.vue'
import { compareDimensions } from '../data/content'

const bottomLines = [
  {
    title: '支付表只记录真实入账',
    body: '余额支付、手动开服、免费订单都不产生 payments。只有这样，平台侧的支付记录才能与渠道流水逐条对齐，月度对账才不需要人工剔除噪音。',
  },
  {
    title: '历史记录只追加不修改',
    body: '冲正写反向事件，退款写新事件，奖励反转也写新事件。任何时点的余额都能由事件重算，审计链不会因为一次「修正」而断裂。',
  },
  {
    title: '资金写入必须单独授权',
    body: '订单补录、账单补录、人工充扣、人工冲正各自持有专用权限码，默认不下发任何内置角色。避免一次「给个管理权限」就顺带拿到了造账能力。',
  },
]
</script>

<style scoped>
.matrix {
  border-top: 2px solid var(--text-1);
}

.matrix__head,
.matrix__row {
  display: grid;
  grid-template-columns: 168px minmax(0, 1fr) minmax(0, 1fr);
  gap: var(--s6);
  align-items: start;
}

.matrix__head {
  padding: 12px 0;
  border-bottom: 1px solid var(--divider);
}

.matrix__head > div {
  font-size: 11.5px;
  color: var(--text-3);
}

.col-caiwu {
  color: var(--text-1);
}

.matrix__row {
  padding: var(--s4) 0;
  border-bottom: 1px solid var(--divider);
}

.dim {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-1);
}

.matrix__row p {
  font-size: 13.5px;
  line-height: 1.85;
  color: var(--text-2);
}

.col-caiwu p {
  color: var(--text-1);
  position: relative;
  padding-left: var(--s4);
}

.col-caiwu p::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.62em;
  width: 3px;
  height: 0.9em;
  border-radius: 2px;
  background: var(--green);
}

.why {
  margin-top: 6px;
  padding-top: 6px;
  border-top: 1px dashed var(--divider);
  font-size: 12.5px !important;
  color: var(--text-3) !important;
}

.head--dark h2 {
  color: var(--text-1);
}

.head--dark p {
  color: var(--text-2);
}

.cases {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--s5);
  margin-top: var(--s6);
}

.case {
  padding: var(--s5);
  border-radius: 6px;
  background: #fff;
  border: 1px solid var(--divider);
  border-top-width: 3px;
}

.case--bad {
  border-top-color: #d97757;
}

.case--good {
  border-top-color: var(--green);
}

.case h3 {
  font-size: 17px;
  font-weight: 600;
  letter-spacing: 0;
}

.case ol {
  margin: var(--s3) 0 0;
  padding-left: 20px;
  display: grid;
  gap: 6px;
}

.case li {
  font-size: 13.5px;
  line-height: 1.8;
  color: var(--text-2);
}

.case code {
  font-family: var(--font-mono);
  font-size: 11.5px;
  color: var(--green-darker);
  background: rgba(66, 184, 131, 0.12);
  border-radius: 3px;
  padding: 1px 6px;
}

.case__result {
  margin-top: var(--s4);
  padding-top: var(--s3);
  border-top: 1px dashed var(--divider);
  font-size: 13px;
  line-height: 1.85;
  color: var(--text-3);
}

.head h2 {
  font-size: clamp(24px, 2.4vw, 32px);
  letter-spacing: -0.02em;
}

.head p {
  margin-top: var(--s3);
  max-width: 70ch;
  font-size: 14.5px;
  line-height: 1.9;
  color: rgba(255, 255, 255, 0.72);
}

.lines {
  margin-top: var(--s6);
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--s6);
}

.line {
  padding-top: var(--s4);
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.line__no {
  font-size: 11.5px;
  color: var(--green-light);
}

.line h3 {
  margin-top: var(--s2);
  font-size: 17px;
  font-weight: 600;
  letter-spacing: 0;
}

.line p {
  margin-top: var(--s3);
  font-size: 13.5px;
  line-height: 1.9;
  color: rgba(255, 255, 255, 0.72);
}

@media (max-width: 980px) {
  .cases {
    grid-template-columns: 1fr;
  }

  .matrix__head {
    display: none;
  }

  .matrix__row {
    grid-template-columns: 1fr;
    gap: var(--s3);
  }

  .lines {
    grid-template-columns: 1fr;
    gap: var(--s5);
  }
}
</style>
