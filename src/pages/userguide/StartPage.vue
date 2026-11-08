<template>
  <div>
    <PageHead
      kicker="User Guide · 01"
      title="开始使用"
      lead="四个入口分别给谁用，每个角色第一天该做哪几件事，以及登录时的风控规则。"
    />

    <UserShell>
      <DocPage>
        <section class="blk">
          <h2>四个入口</h2>
          <div class="table-wrap">
            <table class="tbl">
              <thead>
                <tr><th>入口</th><th>面向</th><th>能做什么</th></tr>
              </thead>
              <tbody>
                <tr v-for="e in entryPoints" :key="e.name">
                  <td class="nowrap"><strong>{{ e.name }}</strong></td>
                  <td class="nowrap muted">{{ e.who }}</td>
                  <td>{{ e.desc }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section class="blk">
          <h2>各角色的第一步</h2>
          <div v-for="f in firstSteps" :key="f.role" class="role-block">
            <h3>{{ f.role }}</h3>
            <ol class="notes">
              <li v-for="s in f.steps" :key="s">{{ s }}</li>
            </ol>
          </div>
        </section>

        <section class="blk">
          <h2>登录与账号</h2>
          <ul class="notes">
            <li v-for="n in loginNotes" :key="n">{{ n }}</li>
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
import { entryPoints, firstSteps, loginNotes } from '../../data/userguide'
</script>

<style scoped>
.role-block + .role-block {
  margin-top: var(--s5);
}

.role-block h3 {
  margin-top: var(--s5);
}
</style>
