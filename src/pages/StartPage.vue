<template>
  <div>
    <PageHead
      kicker="Get Started"
      title="开源上手"
      lead="AGPL-3.0 开源。需要 PHP 8.2+、MySQL 8、Redis 6+ 与 Node 20+；App 端另需 Flutter SDK。下面是到跑起来的最短路径。"
    />

    <section class="section">
      <div class="wrap">
        <ol class="steps">
          <li v-for="(s, i) in startSteps" :key="s.step" class="step">
            <div class="step__no num">{{ String(i + 1).padStart(2, '0') }}</div>
            <div class="step__body">
              <h3>{{ s.step }}</h3>
              <p>{{ s.note }}</p>
              <div class="cmd">
                <code>{{ s.cmd }}</code>
              </div>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <section class="section section--soft">
      <div class="wrap">
        <header class="head">
          <h2>各端验证</h2>
          <p>改动后先跑受影响范围的验证；全部完成后跑覆盖本次变更的完整验证。</p>
        </header>

        <div class="verify">
          <div v-for="v in verifyCommands" :key="v.scope" class="verify__row">
            <code class="verify__scope">{{ v.scope }}</code>
            <code class="verify__cmd">{{ v.cmd }}</code>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="wrap">
        <AboutOpenSource />
      </div>
    </section>

    <FinalCta />
  </div>
</template>

<script setup lang="ts">
import PageHead from '../components/PageHead.vue'
import AboutOpenSource from '../sections/AboutOpenSource.vue'
import FinalCta from '../sections/FinalCta.vue'
import { startSteps, verifyCommands } from '../data/content'
</script>

<style scoped>
.steps {
  list-style: none;
  margin: 0;
  padding: 0;
  border-top: 2px solid var(--text-1);
}

.step {
  display: grid;
  grid-template-columns: 72px minmax(0, 1fr);
  gap: var(--s5);
  padding: var(--s5) 0;
  border-bottom: 1px solid var(--divider);
}

.step__no {
  font-size: 12px;
  color: var(--green-dark);
  padding-top: 4px;
}

.step h3 {
  font-size: 17px;
  font-weight: 600;
  letter-spacing: 0;
}

.step p {
  margin-top: 5px;
  font-size: 13.5px;
  line-height: 1.8;
  color: var(--text-2);
}

.cmd {
  margin-top: var(--s3);
  background: var(--code-bg);
  border-radius: 6px;
  padding: 12px var(--s4);
  overflow-x: auto;
}

.cmd code {
  font-family: var(--font-mono);
  font-size: 12.5px;
  color: #c8f7e0;
  white-space: nowrap;
}

.head h2 {
  font-size: clamp(24px, 2.4vw, 32px);
  letter-spacing: -0.02em;
}

.head p {
  margin-top: var(--s3);
  font-size: 14.5px;
  color: var(--text-2);
}

.verify {
  margin-top: var(--s5);
  border-top: 1px solid var(--divider);
}

.verify__row {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  gap: var(--s4);
  align-items: baseline;
  padding: 12px 0;
  border-bottom: 1px solid var(--divider);
}

.verify__scope {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-1);
}

.verify__cmd {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-2);
  word-break: break-word;
}

@media (max-width: 768px) {
  .step {
    grid-template-columns: 40px minmax(0, 1fr);
    gap: var(--s3);
  }

  .verify__row {
    grid-template-columns: 1fr;
    gap: 4px;
  }
}
</style>
