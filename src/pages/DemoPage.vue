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

        <div v-if="!demoAvailable" class="unavailable">
          <strong>在线演示暂未随本站发布</strong>
          <p>
            在线演示由源码仓库构建后生成静态产物。当前这次发布没有包含它，
            因此无法在这里嵌入界面。稍后重新发布即可恢复；需要先看界面的话，
            可以读使用文档里的截图，或直接从源码仓库本地启动。
          </p>
        </div>

        <template v-else>
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
        </template>

        <div class="notes">
          <h3>数据与限制</h3>
          <ul>
            <li v-for="note in demoNotes" :key="note">{{ note }}</li>
          </ul>
        </div>
      </div>
    </section>

    <FinalCta />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import PageHead from '../components/PageHead.vue'
import FinalCta from '../sections/FinalCta.vue'
import { demoApps, demoNotes } from '../data/demo'

const active = ref(demoApps[0].key)
const reloadKey = ref(0)

// 在线演示由 caiwu 仓库构建后拼进 /demo/。构建未就绪时 iframe 会是空白，
// 这里先探测入口是否可用，不可用时给出明确说明而不是留白。
const demoAvailable = ref(true)

const current = computed(() => demoApps.find((app) => app.key === active.value) ?? demoApps[0])

function reload() {
  reloadKey.value += 1
}

onMounted(async () => {
  // 站点是 History 路由，任何未知路径都会回退到自己的 index.html，
  // 所以只看状态码或响应都判断不出来；改为识别在线演示入口自身的内容特征。
  try {
    const res = await fetch(demoApps[0].url, { headers: { accept: 'text/html' } })
    if (!res.ok) {
      demoAvailable.value = false
      return
    }
    const html = await res.text()
    // 在线演示入口由 caiwu 的前端产物生成，带自己的 title 与资源目录；
    // 站点回退页没有 /demo/ 下的资源引用。
    demoAvailable.value = /\/demo\/admin\/assets\//.test(html)
  } catch {
    demoAvailable.value = false
  }
})
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

.unavailable {
  margin-top: var(--s3);
  padding: var(--s5);
  border: 1px dashed var(--divider);
  border-radius: 6px;
  background: var(--white-soft);
}

.unavailable strong {
  font-size: 15px;
}

.unavailable p {
  margin-top: var(--s2);
  font-size: 13.5px;
  line-height: 1.85;
  color: var(--text-2);
  max-width: 68ch;
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
