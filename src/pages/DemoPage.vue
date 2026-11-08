<template>
  <div>
    <PageHead
      kicker="Live Demo"
      title="实时预览"
      lead="嵌入的是管理后台、用户控制台与官网门户的真实前端构建产物。数据在构建时打入，不连接后端，界面与交互和实际系统一致。"
    />

    <section class="section">
      <div class="wrap">
        <div class="bar">
          <div class="bar__tabs" role="tablist" aria-label="选择客户端">
            <button
              v-for="app in demoApps"
              :key="app.key"
              type="button"
              role="tab"
              :aria-selected="active === app.key"
              :class="{ 'is-active': active === app.key }"
              @click="active = app.key"
            >
              {{ app.name }}
              <span class="bar__who">{{ app.who }}</span>
            </button>
          </div>

          <div class="bar__actions">
            <button type="button" class="bar__btn" @click="reload">重新加载</button>
            <a class="bar__btn" :href="current.url" target="_blank" rel="noreferrer noopener">新窗口打开</a>
          </div>
        </div>

        <p class="hint">{{ current.desc }}</p>

        <div class="frame">
          <iframe
            :key="reloadKey + active"
            :src="current.url"
            :title="`${current.name}预览`"
            loading="lazy"
            referrerpolicy="no-referrer"
          ></iframe>
        </div>

        <div class="pages">
          <span class="pages__label">可浏览的页面</span>
          <span v-for="page in current.pages" :key="page" class="pages__item">{{ page }}</span>
        </div>

        <div class="notes">
          <h3>关于这个预览</h3>
          <ul>
            <li v-for="note in demoNotes" :key="note">{{ note }}</li>
          </ul>
          <div class="notes__code">
            <p>本地构建与启动：</p>
            <pre><code>npm run build:demo   # 构建三端演练版到 frontend-demo/dist
npm run demo:serve   # 在 4311 / 4312 / 4313 启动三端，4314 为入口页</code></pre>
          </div>
        </div>
      </div>
    </section>

    <FinalCta />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import PageHead from '../components/PageHead.vue'
import FinalCta from '../sections/FinalCta.vue'
import { demoApps, demoNotes } from '../data/demo'

const active = ref(demoApps[0].key)
const reloadKey = ref(0)

const current = computed(() => demoApps.find((app) => app.key === active.value) ?? demoApps[0])

function reload() {
  reloadKey.value += 1
}
</script>

<style scoped>
.bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--s4);
  flex-wrap: wrap;
  padding-bottom: var(--s3);
  border-bottom: 1px solid var(--divider);
}

.bar__tabs {
  display: flex;
  gap: var(--s2);
  flex-wrap: wrap;
}

.bar__tabs button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  font-size: 14px;
  color: var(--text-2);
  border: 1px solid var(--divider);
  border-radius: 4px;
  transition: color 0.2s var(--ease), border-color 0.2s var(--ease),
    background-color 0.2s var(--ease);
}

.bar__tabs button:hover {
  border-color: var(--green);
  color: var(--green-darker);
}

.bar__tabs button.is-active {
  background: var(--green-darker);
  border-color: var(--green-darker);
  color: #fff;
}

.bar__who {
  font-size: 11.5px;
  opacity: 0.7;
}

.bar__actions {
  display: flex;
  gap: var(--s2);
}

.bar__btn {
  font-size: 13px;
  color: var(--text-2);
  padding: 7px 12px;
  border: 1px solid var(--divider);
  border-radius: 4px;
  transition: color 0.2s var(--ease), border-color 0.2s var(--ease);
}

.bar__btn:hover {
  color: var(--text-1);
  border-color: var(--text-3);
}

.hint {
  margin-top: var(--s3);
  font-size: 13.5px;
  color: var(--text-2);
}

.frame {
  margin-top: var(--s3);
  border: 1px solid var(--divider);
  border-radius: 6px;
  overflow: hidden;
  background: var(--white-soft);
}

.frame iframe {
  display: block;
  width: 100%;
  height: min(78vh, 820px);
  border: 0;
}

.pages {
  margin-top: var(--s4);
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
}

.pages__label {
  font-size: 12px;
  color: var(--text-3);
  margin-right: 4px;
}

.pages__item {
  font-size: 12px;
  color: var(--text-2);
  background: var(--white-mute);
  border-radius: 3px;
  padding: 3px 9px;
}

.notes {
  margin-top: var(--s6);
  padding-top: var(--s5);
  border-top: 1px solid var(--divider);
}

.notes h3 {
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0;
}

.notes ul {
  margin: var(--s3) 0 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 7px;
}

.notes li {
  position: relative;
  padding-left: 16px;
  font-size: 13.5px;
  line-height: 1.8;
  color: var(--text-2);
}

.notes li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.7em;
  width: 6px;
  height: 1px;
  background: var(--green);
}

.notes__code {
  margin-top: var(--s4);
}

.notes__code p {
  font-size: 12.5px;
  color: var(--text-3);
  margin-bottom: 6px;
}

.notes__code pre {
  margin: 0;
  background: var(--code-bg);
  border-radius: 6px;
  padding: 14px var(--s4);
  overflow-x: auto;
}

.notes__code code {
  font-family: var(--font-mono);
  font-size: 12px;
  line-height: 1.9;
  color: #c8f7e0;
  white-space: pre;
}

@media (max-width: 768px) {
  .frame iframe {
    height: 70vh;
  }

  /* 手机上一行放不下三个 tab 加两个按钮，改成整行平铺，点按面积更大 */
  .bar {
    flex-direction: column;
    align-items: stretch;
    gap: var(--s3);
  }

  .bar__tabs {
    display: grid;
    grid-template-columns: 1fr;
    gap: 6px;
  }

  .bar__tabs button {
    justify-content: space-between;
    width: 100%;
    min-height: 44px;
  }

  .bar__actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .bar__btn {
    text-align: center;
    padding-block: 11px;
  }
}
</style>
