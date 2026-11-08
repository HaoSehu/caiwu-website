<template>
  <figure class="shot">
    <a :href="`/shots/${src}`" target="_blank" rel="noreferrer noopener" class="shot__link">
      <img :src="`/shots/${src}`" :alt="alt" loading="lazy" decoding="async" />
    </a>
    <figcaption>
      <span class="shot__caption">{{ caption }}</span>
      <span class="shot__hint">点击查看大图</span>
    </figcaption>
  </figure>
</template>

<script setup lang="ts">
defineProps<{
  src: string
  alt: string
  caption: string
}>()
</script>

<style scoped>
.shot {
  margin: var(--s5) 0 0;
}

.shot__link {
  display: block;
  border: 1px solid var(--divider);
  border-radius: 6px;
  overflow: hidden;
  background: var(--white-soft);
  transition: border-color 0.2s var(--ease), box-shadow 0.2s var(--ease);
}

.shot__link:hover {
  border-color: var(--green);
  box-shadow: 0 10px 30px -22px rgba(21, 95, 62, 0.6);
}

.shot img {
  display: block;
  width: 100%;
  height: auto;
}

figcaption {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--s3);
  margin-top: 8px;
  font-size: 12.5px;
  line-height: 1.7;
  color: var(--text-3);
}

.shot__caption {
  color: var(--text-2);
}

.shot__hint {
  flex: none;
  font-family: var(--font-mono);
  font-size: 11px;
}

@media (max-width: 560px) {
  .shot__hint {
    display: none;
  }
}
</style>
