# CLAUDE.md

Caiwu 业务财务系统的产品介绍站（品牌「创欧云」），面向 IDC / 云服务商。Vue 3 + Vite + TypeScript，无 UI 框架，样式手写。

## 内容规则

**`src/data/content.ts` 是全站文案与数字的唯一真源，且每条事实都必须能在后端仓库 `E:\caiwu` 中核对。** 修改任何数字（接口路由数、服务类数、权限门数、插件清单、限流参数）或能力描述前，先到 `E:\caiwu` 的 `backend/`、`plugins/`、`docs/ARCHITECTURE.md`、`backend/app/Support/AdminPermissions.php` 确认。该路径不可访问时，直接告诉用户核对不了，凭推测写进去的数字会毁掉这个站点的立站前提。

新增文案时不要写营销话术或形容词堆叠；这个站的语言是"对象边界 + 具体实现"，例如"支付回调先验签，幂等写入支付记录"。

## 页面结构

每个页面由 `src/pages/` 下的组件编排 `src/sections/` 里的区块，区块从 `content.ts` 取数据。内容分页在 `src/router.ts`。新增页面：`pages/X.vue` + `router.ts` 路由 + `App.vue` 的 `titles` 映射 + `SiteMasthead` 导航项，四处都要改。

## 静态部署

站点是纯静态页：`npm run build` 产出 `dist/`，直接扔到任意静态托管，**没有任何后端接口、环境变量或构建期注入**。页面数据全部编译进 JS，新增数据也走 `content.ts`，不要引入 `fetch` 或运行时配置。"实时预览"页只是外链到 `demo.coyjs.cn`，不在本站内嵌。

路由用的是 `createWebHistory`（无 `#`），所以托管方必须把所有路径回退到 `index.html`，否则 `/features` 这类直接访问或刷新会 404。目前仓库里没有 `_redirects` / `vercel.json` / `404.html` 之类的配置；部署到不自动处理 SPA 回退的服务器时要补上。`dist/` 是构建产物，会随 `npm run build` 整体重写，不要手改。

## 视觉规则

参照 cn.vuejs.org：深色渐变首屏、超大标题、大量留白、深色代码块、深色多栏页脚。颜色、间距、字体一律用 `src/styles/base.css` 里的 CSS 变量（`--green`、`--deep`、`--s1`~`--s8` 等），不要写裸色值；响应式断点用 768px/960px 一类的既有断点。字体是裁剪过的 woff2 子集，**页面上出现 `chars.txt` 之外的字符会缺字**，新增生僻字或符号时提醒用户重新生成子集。

## 命令

```bash
npm run dev      # 预览端口以 .claude/launch.json 的 5190 为准，README 里的 5173 已过时
npm run build    # vue-tsc --noEmit && vite build
```

本项目不是 git 仓库，改坏了没有版本可回退；做较大改动前先提醒用户。
