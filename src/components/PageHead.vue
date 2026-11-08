<template>
  <header class="page-head" :class="{ 'is-dark': dark }">
    <div class="wrap">
      <p class="page-head__kicker">{{ kicker }}</p>
      <h1>{{ title }}</h1>
      <p class="page-head__lead">{{ lead }}</p>
    </div>
  </header>
</template>

<script setup lang="ts">
defineProps<{
  kicker: string
  title: string
  lead: string
  dark?: boolean
}>()
</script>

<style scoped>
.page-head {
  padding-block: var(--s8) var(--s7);
  background: var(--white-soft);
  border-bottom: 1px solid var(--divider);
}

.page-head.is-dark {
  background: var(--deep-3);
  border-bottom-color: rgba(255, 255, 255, 0.1);
}

.page-head__kicker {
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.08em;
  color: var(--green-dark);
  text-transform: uppercase;
}

.page-head.is-dark .page-head__kicker {
  color: var(--green-light);
}

.page-head h1 {
  margin-top: var(--s3);
  font-size: clamp(30px, 3.6vw, 46px);
  letter-spacing: -0.025em;
  line-height: 1.2;
}

.page-head.is-dark h1 {
  color: #fff;
}

.page-head__lead {
  margin-top: var(--s4);
  max-width: 70ch;
  font-size: 16px;
  line-height: 1.9;
  color: var(--text-2);
}

.page-head.is-dark .page-head__lead {
  color: rgba(255, 255, 255, 0.78);
}

@media (max-width: 768px) {
  .page-head {
    padding-block: var(--s7) var(--s6);
  }
}
</style>
