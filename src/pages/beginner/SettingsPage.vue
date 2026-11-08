<template>
  <div>
    <PageHead
      kicker="Beginner · 02"
      title="系统设置"
      lead="站点信息、管理员与权限、验证码、站务与系统接口，五块设置决定了前台长什么样、谁能进后台、外部能力怎么接。"
    />

    <SectionShell title="新手引导" index="/beginner" :items="beginnerIndex">
      <DocPage>
        <section class="blk">
          <h2>站点信息</h2>
          <div class="table-wrap">
            <table class="tbl">
              <thead>
                <tr><th>字段</th><th>说明</th></tr>
              </thead>
              <tbody>
                <tr v-for="f in siteSettingFields" :key="f.field">
                  <td class="nowrap">{{ f.field }}</td>
                  <td>{{ f.note }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section class="blk">
          <h2>管理员设置</h2>
          <div class="table-wrap">
            <table class="tbl">
              <thead>
                <tr><th>项</th><th>说明</th></tr>
              </thead>
              <tbody>
                <tr v-for="a in adminSettings" :key="a.item">
                  <td class="nowrap">{{ a.item }}</td>
                  <td>{{ a.note }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section class="blk">
          <h2>验证码设置</h2>
          <div class="table-wrap">
            <table class="tbl">
              <thead>
                <tr><th>设置项</th><th>说明</th></tr>
              </thead>
              <tbody>
                <tr v-for="c in captchaSettings" :key="c.field">
                  <td><code class="nowrap">{{ c.field }}</code></td>
                  <td>{{ c.note }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <ul class="notes">
            <li v-for="b in captchaBehaviors" :key="b">{{ b }}</li>
          </ul>
        </section>

        <section class="blk">
          <h2>站务设置</h2>
          <div class="table-wrap">
            <table class="tbl">
              <thead>
                <tr><th>区域</th><th>说明</th></tr>
              </thead>
              <tbody>
                <tr v-for="s in stationSettings" :key="s.area">
                  <td class="nowrap">{{ s.area }}</td>
                  <td>{{ s.note }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section class="blk">
          <h2>系统接口管理</h2>
          <div class="table-wrap">
            <table class="tbl">
              <thead>
                <tr><th>能力</th><th>说明</th></tr>
              </thead>
              <tbody>
                <tr v-for="s in interfaceSettings" :key="s.area">
                  <td class="nowrap">{{ s.area }}</td>
                  <td>{{ s.note }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section class="blk">
          <h2>设置界面</h2>
          <DocShot src="admin-site-info.webp" alt="站点设置" caption="站点内容 · 站点设置：站点名称、Logo、备案号与联系方式" />
          <DocShot src="admin-site-hero.webp" alt="首页 Banner" caption="站点内容 · 首页 Banner：轮播图文与跳转链接" />
          <DocShot src="admin-account-policy.webp" alt="账户策略" caption="系统维护 · 账户策略：强制实名、手机号、邮箱三项开关" />
          <DocShot src="admin-staff.webp" alt="员工管理" caption="权限管理 · 员工管理" />
          <DocShot src="admin-roles.webp" alt="角色权限" caption="权限管理 · 角色权限：按权限码勾选，资金写入类单独授权" />
          <DocShot src="admin-notifications.webp" alt="消息配置" caption="通知模板 · 消息配置：站内信、邮件与短信的模板与变量" />
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
import {
  adminSettings,
  beginnerIndex,
  captchaBehaviors,
  captchaSettings,
  interfaceSettings,
  stationSettings,
  siteSettingFields,
} from '../../data/beginner'
</script>
