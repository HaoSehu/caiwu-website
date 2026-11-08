<template>
  <div>
    <PageHead
      kicker="Developer Docs · 13"
      title="开发规范"
      lead="类型声明、注释、错误与日志、审查闭环、测试与提交。这些规则同时适用于人工开发与代理开发。"
    />

    <DocShell>
      <DocPage>
        <section v-for="s in standardSections" :key="s.title" class="blk">
          <h2>{{ s.title }}</h2>
          <ul class="notes">
            <li v-for="p in s.points" :key="p">{{ p }}</li>
          </ul>
        </section>

        <section class="blk">
          <h2>分层速查</h2>
          <div class="table-wrap">
            <table class="tbl tbl--tight">
              <thead>
                <tr><th>层</th><th>只做</th><th>不做</th></tr>
              </thead>
              <tbody>
                <tr><td>Controller</td><td>接收请求、调用服务、返回响应</td><td>拼第三方请求、写事务、写复杂分支</td></tr>
                <tr><td>FormRequest</td><td>校验、类型与范围归一化</td><td>承载业务流程</td></tr>
                <tr><td>Resource</td><td>输出字段投影</td><td>业务判断、触发写操作</td></tr>
                <tr><td>Service</td><td>业务规则、事务、幂等、审计</td><td>直接拼第三方协议</td></tr>
                <tr><td>Model</td><td>关系、scope、cast、轻量状态判断</td><td>跨表流程</td></tr>
                <tr><td>Job</td><td>异步调度与编排</td><td>内联业务逻辑</td></tr>
              </tbody>
            </table>
          </div>
        </section>
      </DocPage>
    </DocShell>
  </div>
</template>

<script setup lang="ts">
import PageHead from '../../components/PageHead.vue'
import DocShell from '../../components/DocShell.vue'
import DocPage from '../../components/DocPage.vue'
import { standardSections } from '../../data/devguide'
</script>
