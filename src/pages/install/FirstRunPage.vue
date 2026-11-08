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

        <section class="blk">
          <h2>配置所在的页面</h2>
          <DocShot
            src="admin-site-info.webp"
            alt="站点设置"
            caption="站点内容 · 站点设置：站点名称、Logo、备案号与联系方式"
          />
          <DocShot
            src="admin-plugins-payment.webp"
            alt="支付渠道插件"
            caption="系统设置 · 集成插件 · 支付渠道：已启用与已安装的插件分状态展示，管理与检测在同一张卡片上"
          />
          <DocShot
            src="admin-plugins-sms.webp"
            alt="短信发送插件"
            caption="系统设置 · 集成插件 · 短信发送：签名、模板与验证码限流都在插件配置里"
          />
          <DocShot
            src="admin-plugins-mail.webp"
            alt="邮件发送插件"
            caption="系统设置 · 集成插件 · 邮件发送：SMTP 与多 SMTP 轮询"
          />
          <DocShot
            src="admin-plugins-captcha.webp"
            alt="人机验证插件"
            caption="系统设置 · 集成插件 · 人机验证：GeeTest 与 Vaptcha"
          />
          <DocShot
            src="admin-plugins-upstream.webp"
            alt="上游开通插件"
            caption="系统设置 · 集成插件 · 上游开通：KangHostx、ZJMF Finance 各保持独立 provider key"
          />
        </section>
      </DocPage>
    </SectionShell>
  </div>
</template>

<script setup lang="ts">
import PageHead from '../../components/PageHead.vue'
import SectionShell from '../../components/SectionShell.vue'
import DocPage from '../../components/DocPage.vue'
import DocShot from '../../components/DocShot.vue'
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
