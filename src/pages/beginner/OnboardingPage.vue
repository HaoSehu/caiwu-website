<template>
  <div>
    <PageHead
      kicker="Beginner · 01"
      title="新手引导"
      lead="第一次接触这套系统，按五个阶段把站点从能打开推进到能做生意。每一步都对应管理端里的真实入口。"
    />

    <SectionShell title="新手引导" index="/beginner" :items="beginnerIndex">
      <DocPage>
        <section v-for="(s, i) in onboardingSteps" :key="s.phase" class="blk">
          <h2><span class="phase-no num">{{ String(i + 1).padStart(2, '0') }}</span>{{ s.phase }}</h2>
          <ol class="notes">
            <li v-for="item in s.items" :key="item">{{ item }}</li>
          </ol>
        </section>

        <section class="blk">
          <h2>配套阅读</h2>
          <div class="table-wrap">
            <table class="tbl">
              <thead>
                <tr><th>想做的事</th><th>看哪一篇</th></tr>
              </thead>
              <tbody>
                <tr><td>从空服务器装起来</td><td><RouterLink to="/install" class="link">安装与部署</RouterLink></td></tr>
                <tr><td>了解各角色的日常操作</td><td><RouterLink to="/userguide" class="link">使用文档</RouterLink></td></tr>
                <tr><td>系统设置与权限细节</td><td><RouterLink to="/beginner/settings" class="link">系统设置</RouterLink></td></tr>
                <tr><td>上线后每天要看什么</td><td><RouterLink to="/beginner/daily" class="link">运营日常</RouterLink></td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section class="blk">
          <h2>每个阶段的界面</h2>
          <DocShot
            src="admin-site-info.webp"
            alt="站点信息设置"
            caption="基础信息：站点名称、Logo、Favicon、官方 QQ 群与服务条款链接"
          />
          <DocShot
            src="admin-products.webp"
            alt="商品目录"
            caption="商品目录：左侧分类树，右侧商品列表，顶部可新建商品与二级分组"
          />
          <DocShot
            src="admin-staff.webp"
            alt="员工管理"
            caption="员工管理：账号 / 邮箱、昵称、角色、权限项数与状态"
          />
          <DocShot
            src="admin-roles.webp"
            alt="角色权限"
            caption="角色权限：角色、权限范围、员工数与更新时间"
          />
        </section>
      </DocPage>
    </SectionShell>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import PageHead from '../../components/PageHead.vue'
import SectionShell from '../../components/SectionShell.vue'
import DocPage from '../../components/DocPage.vue'
import DocShot from '../../components/DocShot.vue'
import { beginnerIndex, onboardingSteps } from '../../data/beginner'
</script>

<style scoped>
.phase-no {
  display: inline-block;
  margin-right: 10px;
  font-size: 13px;
  font-weight: 400;
  color: var(--green-dark);
}

.link {
  color: var(--green-darker);
}

.link:hover {
  text-decoration: underline;
}
</style>
