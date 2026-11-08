<template>
  <div>
    <PageHead
      kicker="Install · 07"
      title="部署排错"
      lead="六个最常见的部署故障：每个都给出原因与具体修法。"
    />

    <SectionShell title="安装与部署" index="/install" :items="installIndex">
      <DocPage>
        <section class="blk">
          <h2>故障对照</h2>
          <div class="faq">
            <div v-for="(t, i) in troubleshootItems" :key="t.symptom" class="faq__item">
              <p class="faq__q">
                <span class="faq__no num">{{ String(i + 1).padStart(2, '0') }}</span>
                {{ t.symptom }}
              </p>
              <p class="faq__line"><strong>原因</strong>{{ t.cause }}</p>
              <p class="faq__line"><strong>处理</strong>{{ t.fix }}</p>
            </div>
          </div>
        </section>
      </DocPage>
    </SectionShell>
  </div>
</template>

<script setup lang="ts">
import PageHead from '../../components/PageHead.vue'
import SectionShell from '../../components/SectionShell.vue'
import DocPage from '../../components/DocPage.vue'
import { installIndex, troubleshootItems } from '../../data/install'
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
}

.faq__no {
  margin-right: 10px;
  font-size: 12px;
  color: var(--green-dark);
  font-weight: 400;
}

.faq__line {
  margin-top: var(--s2);
  font-size: 13.5px;
  line-height: 1.8;
  color: var(--text-2);
}

.faq__line strong {
  display: inline-block;
  min-width: 42px;
  color: var(--text-1);
  font-weight: 600;
}
</style>
