<template>
  <div>
    <PageHead
      kicker="Product Capabilities"
      title="产品能力"
      lead="八个业务子域，从选品计价到账务留痕，再到运维治理。每条功能在仓库中都有对应实现，右侧列出涉及的数据表。"
    />
    <CapabilityLedger />
    <FinalCta />
  </div>
</template>

<script setup lang="ts">
import PageHead from '../components/PageHead.vue'
import CapabilityLedger from '../sections/CapabilityLedger.vue'
import FinalCta from '../sections/FinalCta.vue'
</script>
