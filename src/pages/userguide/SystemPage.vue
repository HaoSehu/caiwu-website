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
      </DocPage>
    </UserShell>
  </div>
</template>

<script setup lang="ts">
import PageHead from '../../components/PageHead.vue'
import UserShell from '../../components/UserShell.vue'
import DocPage from '../../components/DocPage.vue'
import { permissionModel, systemAreas, systemNotes } from '../../data/userguide'
</script>
