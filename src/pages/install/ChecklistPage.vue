<template>
  <div>
    <PageHead
      kicker="Install · 08"
      title="上线检查清单"
      lead="逐项核对，每一条都对应一个具体的失败场景。全部打勾再对外公布地址。"
    />

    <SectionShell title="安装与部署" index="/install" :items="installIndex">
      <DocPage>
        <section class="blk">
          <h2>清单</h2>
          <div class="check-list">
            <div v-for="(c, i) in launchChecklist" :key="c.item" class="check">
              <span class="check__no num">{{ String(i + 1).padStart(2, '0') }}</span>
              <span class="check__area">{{ c.area }}</span>
              <span class="check__text">{{ c.item }}</span>
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
import { installIndex, launchChecklist } from '../../data/install'
</script>

<style scoped>
.check-list {
  margin-top: var(--s4);
  border-top: 1px solid var(--divider);
}

.check {
  display: grid;
  grid-template-columns: 36px 72px minmax(0, 1fr);
  gap: var(--s3);
  padding-block: 11px;
  border-bottom: 1px solid var(--divider);
  font-size: 13.5px;
}

.check__no {
  color: var(--green-dark);
  font-size: 12px;
}

.check__area {
  color: var(--text-3);
  font-size: 12.5px;
}

.check__text {
  color: var(--text-1);
}

@media (max-width: 560px) {
  .check {
    grid-template-columns: 32px minmax(0, 1fr);
  }

  .check__area {
    display: none;
  }
}
</style>
