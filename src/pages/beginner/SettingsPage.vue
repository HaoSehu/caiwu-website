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
          <DocShot src="admin-site-info-v2.webp" alt="站点设置" caption="站点设置 · 基础信息：站点名称、Logo、Favicon、官方 QQ 群与服务条款链接" />
          <DocShot src="admin-site-hero-v2.webp" alt="首页 Banner" caption="站点设置 · 首页 Banner：轮播图文与跳转链接" />
          <DocShot src="admin-account-policy-v2.webp" alt="账户策略" caption="账户策略：是否强制开启实名、绑定手机号、绑定邮箱" />
          <DocShot src="admin-staff-v2.webp" alt="员工管理" caption="员工管理：账号、角色、权限项数与最近登录" />
          <DocShot src="admin-roles-v2.webp" alt="角色权限" caption="角色权限：角色、权限范围与员工数" />
          <DocShot src="admin-notifications-v2.webp" alt="消息配置" caption="消息配置：按消息类型维护邮件、短信与站内消息的启用状态" />
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
