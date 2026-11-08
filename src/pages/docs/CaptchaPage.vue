<template>
  <div>
    <PageHead
      kicker="Developer Docs · 09"
      title="验证码接口"
      lead="行为验证以插件接入，目前支持 GeeTest 与 Vaptcha。验证码何时弹出由登录风控决定，不在页面里写死。"
    />

    <DocShell>
      <DocPage>
        <section class="blk">
          <h2>已接入插件</h2>
          <div class="table-wrap">
            <table class="tbl">
              <thead>
                <tr><th>slug</th><th>名称</th><th>capabilities</th><th>说明</th></tr>
              </thead>
              <tbody>
                <tr v-for="p in captchaPlugins" :key="p.slug">
                  <td><code class="nowrap">{{ p.slug }}</code></td>
                  <td class="nowrap">{{ p.name }}</td>
                  <td class="muted">{{ p.caps }}</td>
                  <td>{{ p.note }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section class="blk">
          <h2>触发与校验</h2>
          <div class="rules">
            <div v-for="f in captchaFlow" :key="f.step" class="rules__row">
              <p class="rules__name">{{ f.step }}</p>
              <p class="rules__detail">{{ f.detail }}</p>
            </div>
          </div>
        </section>

        <section class="blk">
          <h2>实现要点</h2>
          <ul class="notes">
            <li v-for="n in captchaNotes" :key="n">{{ n }}</li>
          </ul>
        </section>

        <section class="blk">
          <h2>前端契约</h2>
          <p class="lead">
            后端需要验证码时，登录接口返回业务码 <code>42200</code> 且 <code>data</code> 带
            <code>captcha_required: true</code>。前端据此拉起验证组件，完成后把结果随表单重新提交，而不是自行判断何时验证。
          </p>
          <pre class="code-block"><code>{
  "code": 42200,
  "message": "请完成人机验证后重试",
  "data": { "captcha_required": true }
}</code></pre>
        </section>
      </DocPage>
    </DocShell>
  </div>
</template>

<script setup lang="ts">
import PageHead from '../../components/PageHead.vue'
import DocShell from '../../components/DocShell.vue'
import DocPage from '../../components/DocPage.vue'
import { captchaFlow, captchaNotes, captchaPlugins } from '../../data/devguide'
</script>
