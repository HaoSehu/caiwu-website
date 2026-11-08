<template>
  <div>
    <PageHead
      kicker="Install · 06"
      title="上线后的首批配置"
      lead="站点能打开不等于能用。按下面的顺序把业务跑通：站点信息 → 外部能力 → 商品 → 人员 → 账户策略。"
    />

    <SectionShell title="安装与部署" index="/install" :items="installIndex">
      <DocPage>
        <section class="blk">
          <h2>配置顺序</h2>
          <div class="table-wrap">
            <table class="tbl">
              <thead>
                <tr><th>步骤</th><th>位置</th><th>要做什么</th></tr>
              </thead>
              <tbody>
                <tr v-for="(s, i) in firstRunOrder" :key="s.step">
                  <td class="nowrap"><span class="no">{{ String(i + 1).padStart(2, '0') }}</span>{{ s.step }}</td>
                  <td class="muted"><code>{{ s.where }}</code></td>
                  <td>{{ s.detail }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section class="blk">
          <h2>先验证再放量</h2>
          <ul class="notes notes--warn">
            <li>每个外部能力配好后立刻做一次真实测试：小额支付、给自己发一条验证码、发一封测试邮件。</li>
            <li>用测试账号走完选配 → 下单 → 支付 → 开通，再开给真实客户。</li>
            <li>权限配好后，用员工账号登录确认菜单与按钮是否与预期一致。</li>
          </ul>
        </section>
      </DocPage>
    </SectionShell>
  </div>
</template>

<script setup lang="ts">
import PageHead from '../../components/PageHead.vue'
import SectionShell from '../../components/SectionShell.vue'
import DocPage from '../../components/DocPage.vue'
import { firstRunOrder, installIndex } from '../../data/install'
</script>

<style scoped>
.no {
  display: inline-block;
  margin-right: 8px;
  font-family: var(--font-mono);
  font-weight: 400;
  color: var(--green-dark);
}</style>
