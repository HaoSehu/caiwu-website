<template>
  <div>
    <PageHead
      kicker="Install Guide"
      title="安装与部署"
      lead="从一台空服务器到四个站点跑起来：环境准备、宝塔站点、后端与环境变量、前端构建、定时任务，以及上线后的首批配置。"
    />

    <SectionShell title="安装与部署" index="/install" :items="installIndex">
      <DocPage>
        <section class="blk">
          <h2>部署形态</h2>
          <p class="lead">
            单台宝塔服务器承载四端：三个前端站点发布静态产物，后端走 PHP-FPM；
            队列与调度合并进每分钟一次的 schedule:run，VNC Relay 独立常驻。
          </p>
          <pre class="code-block"><code>宝塔 Nginx
  ├── 站点 1  官网/用户入口 → frontend-user-v3-www/dist   （静态）
  ├── 站点 2  用户控制台   → frontend-user-v4-console/dist（静态）
  ├── 站点 3  管理端       → frontend-admin-v3/dist      （静态）
  └── 站点 4  后端 API     → backend/public              （PHP-FPM）
                              ├── MySQL 8
                              ├── Redis
                              └── 宝塔计划任务（每分钟 schedule:run）</code></pre>
          <ul class="notes">
            <li>后端只通过 PHP-FPM 运行，不使用 php artisan serve。</li>
            <li>没有常驻 Queue Worker，队列消费并入每分钟的 schedule:run。</li>
            <li>四个站点独立部署，可分配不同的域名。</li>
          </ul>
        </section>

        <section class="blk">
          <h2>八步流程</h2>
          <div class="idx">
            <RouterLink v-for="d in installIndex" :key="d.to" :to="d.to" class="idx__card">
              <span class="idx__no">{{ d.kicker }}</span>
              <h3>{{ d.title }}</h3>
              <p>{{ d.desc }}</p>
              <span class="idx__more">阅读 <span aria-hidden="true">→</span></span>
            </RouterLink>
          </div>
        </section>

        <section class="blk">
          <h2>两条数据库路径</h2>
          <div class="table-wrap">
            <table class="tbl">
              <thead>
                <tr><th>场景</th><th>入口</th><th>说明</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td class="nowrap">空库首次部署</td>
                  <td><code>python3 scripts/install_db.py</code></td>
                  <td>导入 schema baseline、执行增量迁移、写默认配置并初始化管理员。</td>
                </tr>
                <tr>
                  <td class="nowrap">已有生产库升级</td>
                  <td><code>php artisan db:upgrade --force</code></td>
                  <td>自动全库备份、版本与迁移校验、写升级账本；失败按恢复矩阵处理。</td>
                </tr>
              </tbody>
            </table>
          </div>
          <ul class="notes notes--warn">
            <li v-for="r in dbPathRules" :key="r">{{ r }}</li>
          </ul>
        </section>

        <section class="blk">
          <h2>装好之后长这样</h2>
          <p class="lead">管理端首页。数据看板、待办中心与收入趋势是登录后的第一屏。</p>
          <DocShot
            src="admin-dashboard-v2.webp"
            alt="管理端数据看板"
            caption="数据看板：今日与本月营业额、待办中心、商品收入占比与每日收入趋势"
          />
        </section>
      </DocPage>
    </SectionShell>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import PageHead from '../components/PageHead.vue'
import SectionShell from '../components/SectionShell.vue'
import DocPage from '../components/DocPage.vue'
import DocShot from '../components/DocShot.vue'
import { dbPathRules, installIndex } from '../data/install'
</script>

<style scoped>
.idx {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--s4);
  margin-top: var(--s5);
}

.idx__card {
  display: block;
  padding: var(--s5);
  border: 1px solid var(--divider);
  border-radius: 6px;
  transition: border-color 0.22s var(--ease), transform 0.22s var(--ease);
}

.idx__card:hover {
  border-color: var(--green);
  transform: translateY(-2px);
}

.idx__no {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--green-dark);
}

.idx__card h3 {
  margin: 6px 0 0;
  font-size: 16px;
}

.idx__card p {
  margin-top: 6px;
  font-size: 13.5px;
  line-height: 1.75;
  color: var(--text-2);
}

.idx__more {
  display: inline-block;
  margin-top: var(--s3);
  font-size: 13px;
  color: var(--green-darker);
}

@media (max-width: 900px) {
  .idx {
    grid-template-columns: 1fr;
  }
}
</style>
