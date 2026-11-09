<template>
  <div>
    <PageHead
      kicker="Beginner"
      title="新手引导"
      lead="两块内容：先把站点从能打开推进到能做生意，再把后台每天要看的设置与管理讲清楚。"
    />

    <SectionShell title="新手引导" index="/beginner" :items="beginnerIndex">
      <DocPage>
        <section class="blk">
          <h2>三篇文档</h2>
          <div class="idx">
            <RouterLink v-for="d in beginnerIndex" :key="d.to" :to="d.to" class="idx__card">
              <span class="idx__no">{{ d.kicker }}</span>
              <h3>{{ d.title }}</h3>
              <p>{{ d.desc }}</p>
              <span class="idx__more">阅读 <span aria-hidden="true">→</span></span>
            </RouterLink>
          </div>
        </section>

        <section class="blk">
          <h2>与其他文档的关系</h2>
          <ul class="notes">
            <li><strong><RouterLink to="/install" class="link">安装与部署</RouterLink></strong>：从空服务器装起来，偏运维。</li>
            <li><strong>新手引导</strong>：装好之后怎么配，偏管理员上手。</li>
            <li><strong><RouterLink to="/userguide" class="link">使用文档</RouterLink></strong>：各角色的日常操作，偏操作手册。</li>
            <li><strong><RouterLink to="/devguide" class="link">开发者文档</RouterLink></strong>：代码与接口，偏研发。</li>
          </ul>
        </section>

        <section class="blk">
          <h2>后台全貌</h2>
          <DocShot
            src="admin-dashboard-v2.webp"
            alt="管理端数据看板"
            caption="管理端首页：数据看板、待办中心与收入趋势"
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
import { beginnerIndex } from '../data/beginner'
</script>

<style scoped>
.idx {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--s4);
  margin-top: var(--s4);
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

.link {
  color: var(--green-darker);
}

.link:hover {
  text-decoration: underline;
}
</style>
