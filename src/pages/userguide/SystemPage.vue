<template>
  <div>
    <PageHead
      kicker="User Guide · 08"
      title="系统设置与权限"
      lead="权限码决定菜单与接口的双重准入；账户策略只拦关键写操作；插件与数据库维护都在这里。"
    />

    <UserShell>
      <DocPage>
        <section class="blk">
          <h2>权限模型</h2>
          <div class="rules">
            <div v-for="p in permissionModel" :key="p.item" class="rules__row">
              <p class="rules__name">{{ p.item }}</p>
              <p class="rules__detail">{{ p.note }}</p>
            </div>
          </div>
        </section>

        <section class="blk">
          <h2>设置区域</h2>
          <div class="table-wrap">
            <table class="tbl">
              <thead>
                <tr><th>区域</th><th>说明</th></tr>
              </thead>
              <tbody>
                <tr v-for="a in systemAreas" :key="a.area">
                  <td class="nowrap">{{ a.area }}</td>
                  <td>{{ a.note }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section class="blk">
          <h2>注意事项</h2>
          <ul class="notes notes--warn">
            <li v-for="n in systemNotes" :key="n">{{ n }}</li>
          </ul>
        </section>

        <section class="blk">
          <h2>设置界面</h2>
          <DocShot src="admin-staff.webp" alt="员工管理" caption="员工管理：账号、邮箱、昵称、角色与权限项数" />
          <DocShot src="admin-roles.webp" alt="角色权限" caption="角色权限：角色、权限范围与员工数" />
          <DocShot src="admin-account-policy.webp" alt="账户策略" caption="账户策略：强制实名、手机号与邮箱三项开关" />
          <DocShot src="admin-automation.webp" alt="自动化策略" caption="自动化策略：服务生命周期与账单提醒参数" />
          <DocShot src="admin-system-database.webp" alt="数据库状态" caption="数据库状态：表名、行数、大小与更新时间" />
          <DocShot src="admin-plugins-payment.webp" alt="集成插件" caption="集成插件 · 支付渠道：七类能力域共用同一套安装、配置与启用流程" />
        </section>
      </DocPage>
    </UserShell>
  </div>
</template>

<script setup lang="ts">
import PageHead from '../../components/PageHead.vue'
import UserShell from '../../components/UserShell.vue'
import DocPage from '../../components/DocPage.vue'
import DocShot from '../../components/DocShot.vue'
import { permissionModel, systemAreas, systemNotes } from '../../data/userguide'
</script>
