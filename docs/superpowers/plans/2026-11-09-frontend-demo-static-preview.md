# 三端静态预览（/demo/）实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 让 `E:\caiwu` 三个真实前端（admin / console / www）以纯静态演练版发布到官网 `www.cixx.cn/demo/` 下，不连后端、数据脱敏虚构。

**Architecture:** 在 `@caiwu/shared` 的 `createHttpClient` 上加可选 axios adapter；demo 模式下 adapter 从同源静态 `/demo/data/<app>.json` 懒加载数据集，按 `METHOD 路径`（支持单段通配）返回成功信封，未命中返回空。三端 demo 构建切 hash 路由、注入假 token、改站内相对跨站链接。数据集由本地副本库（`idc_demo`）脱敏后经 Laravel 内部请求导出，提交在官网仓库，随站点发布。

**Tech Stack:** Vue 3 + Vite + TS、axios adapter、Laravel（导出脚本）、Node 内置 http（本地静态服务器）、Playwright（冒烟）。

**Spec:** `D:\caiwu-website\docs\superpowers\specs\2026-11-08-frontend-demo-static-preview-design.md`

**仓库说明：** 两个仓库都要改——官网 `D:\caiwu-website`（GitHub Pages，分支 `main`）与后端仓库 `E:\caiwu`。官网仓库当前有未提交改动（`index.html`、`CLAUDE.md`、`vite.config.ts`、`src/data/content.ts`、`.github/workflows/deploy-pages.yml` 的域名切换与 `public/CNAME`、`public/_headers` 新增），**Task 0 先把它们提交掉**，之后的提交都建立在这个基线上。

## Global Constraints

- 生产构建行为零变化：所有差异化逻辑必须由 `import.meta.env.MODE === 'demo'` 或 `.env.demo` 门控，不得改动默认分支。
- 不改三端 `src/pages`、`src/domains`、`src/api` 业务代码；允许改的只有各端 request 入口、两个 router、`consoleUrl.js`、`public-redirect.ts`、`main` 入口。
- `.env.demo` 不含任何真实凭据；`VITE_API_BASE_URL` 固定为相对路径 `/demo/api`（永不发真实请求，仅满足各端 request 的非空断言）。
- 数据集不得包含真实 PII、密钥、营收数字；自由文本整体替换为虚构内容；金额按固定系数缩放；时间戳按导出时刻平移。
- 数据集键统一为 `"<METHOD> <path>"` 大写方法、前导 `/`、无查询串；通配仅支持单段 `*`。
- 官网产物 `dist/` 由 `npm run build` 整体重写，不手改；demo 数据源文件放在 `demo/`（非 `public/`），由拼装脚本拷入。
- 提交信息用中文 conventional（`feat:` / `fix:` / `chore:` / `docs:`）。

## Review Focus

- 未命中接口的返回必须是 `{code:0,message:'ok',data:{}}`——返回 404/网络错误会让三端拦截器连环弹错并踢回登录页（三端拦截器只看 `code === 0`）。
- 写操作（POST/PUT/PATCH/DELETE）必须走同一 adapter 返回成功，否则下单、改配置、标记已读等页面会卡死在错误提示。
- 数据集键含路径参数时（`/products/{id}`）必须由单段通配命中，否则详情页全部空白。
- demo 模式必须能在任意 `/demo/<app>/` 子路径下工作：hash 路由不能用死 base，资产 base 必须来自 `.env.demo`。
- 数据集经 `fetch` 懒加载失败（文件缺失/404）时页面不能白屏：adapter 要以空数据集继续返回成功信封。

---

### Task 0: 提交官网仓库现有域名迁移改动（基线）

**Files:**
- Commit: 官网仓库当前全部未提交改动（`.github/workflows/deploy-pages.yml`、`CLAUDE.md`、`README.md`、`index.html`、`src/data/content.ts`、`vite.config.ts`、`public/CNAME`、`public/_headers`）

**Interfaces:**
- Consumes: 无
- Produces: 干净基线，后续任务各自提交

- [ ] **Step 1: 确认改动内容与构建通过**

Run: `cd /d/caiwu-website && git status --short && npm run build`
Expected: 列出上述文件；`vue-tsc` 与 `vite build` 均退出码 0。

- [ ] **Step 2: 提交**

```bash
git add .github/workflows/deploy-pages.yml CLAUDE.md README.md index.html src/data/content.ts vite.config.ts public/CNAME public/_headers
git commit -m "chore: 官网迁移至 GitHub Pages 与 www.cixx.cn 域名"
```

---

### Task 1: shared 客户端支持注入 adapter

**Files:**
- Modify: `E:\caiwu\shared\runtime\http\client.ts:61-89`（`CreateHttpClientOptions`）、`:133-139`（`axios.create`）
- Test: `E:\caiwu\shared\tests\http-client.test.mjs`

**Interfaces:**
- Consumes: 现有 `createHttpClient(options)` 行为
- Produces: `CreateHttpClientOptions` 新增可选字段 `adapter?: AxiosAdapter`（类型从 `axios` 导入），透传给 `axios.create({ adapter: options.adapter })`；不传时为 `undefined`，axios 行为不变

- [ ] **Step 1: 写失败测试**

在 `shared/tests/http-client.test.mjs` 末尾追加：

```js
// 注入自定义 adapter 后，请求不再走网络，且信封解包仍生效
{
  const { createHttpClient: create } = await import('../runtime/http/client.ts')
  const seen = []
  const client = create({
    baseURL: 'https://api.example.test/api',
    showError: () => {},
    unwrapEnvelope: true,
    adapter: (config) => {
      seen.push(config.url)
      return Promise.resolve({
        data: { code: 0, message: 'ok', data: { picked: true } },
        status: 200, statusText: 'OK', headers: {}, config, request: {},
      })
    },
  })
  const result = await client.get({ url: '/v2/admin/ping' })
  assert.deepEqual(result, { picked: true })
  assert.deepEqual(seen, ['/v2/admin/ping'])
}
```

- [ ] **Step 2: 运行确认失败**

Run: `cd /e/caiwu && node --experimental-strip-types shared/tests/http-client.test.mjs`
Expected: FAIL（请求打到真实网络或断言失败，`seen` 为空数组）。

- [ ] **Step 3: 实现**

`client.ts`：`import type { AxiosAdapter } from "axios";`（并入现有 axios import）；`CreateHttpClientOptions` 增加：

```ts
/** 自定义 axios adapter（演示模式注入静态数据集，生产不传） */
adapter?: AxiosAdapter;
```

`axios.create({ ... })` 增加 `adapter: options.adapter,`。

- [ ] **Step 4: 运行全部 shared 测试**

Run: `cd /e/caiwu && npm run test --workspace shared`
Expected: 全部 PASS。

- [ ] **Step 5: 提交（E:\caiwu）**

```bash
git add shared/runtime/http/client.ts shared/tests/http-client.test.mjs
git commit -m "feat(shared): createHttpClient 支持注入自定义 axios adapter"
```

---

### Task 2: shared 演示 adapter（数据集匹配与信封）

**Files:**
- Create: `E:\caiwu\shared\runtime\http\demoAdapter.ts`
- Modify: `E:\caiwu\shared\runtime\index.ts`（导出）、`E:\caiwu\shared\package.json`（test 脚本追加新测试）
- Test: `E:\caiwu\shared\tests\demo-adapter.test.mjs`

**Interfaces:**
- Consumes: `axios` 的 `AxiosAdapter` 类型
- Produces:

```ts
export interface DemoDataset {
  meta?: { app?: string; exported_at?: string };
  endpoints: Record<string, unknown>;   // "GET /v2/admin/orders" -> 该接口的 data 载荷
}
export interface CreateDemoAdapterOptions {
  dataset?: DemoDataset;          // 直接注入（测试、本地）
  dataUrl?: string;               // 懒加载一次的同源静态 JSON；dataset 优先
  fallbackData?: unknown;         // 未命中返回值，默认 {}
  onMatch?: (key: string) => void;// 测试用
}
export function buildDemoKey(method: string, url: string): string;
export function matchDemoKey(dataset: DemoDataset, method: string, url: string): { key: string; data: unknown } | null;
export function createDemoAdapter(options: CreateDemoAdapterOptions): AxiosAdapter;
```

行为约定：
- `buildDemoKey('get', 'https://x/api/v2/admin/orders?page=2&_t=1')` → `"GET /v2/admin/orders"`（去 origin、去查询串、去 `_t`、去尾斜杠、补前导 `/`）。
- 匹配顺序：精确键 → 通配键（键中 `*` 只匹配一个路径段，如 `"GET /v2/admin/products/*"` 命中 `"GET /v2/admin/products/12"`）；同方法内通配按键名字典序取先命中者。
- 任意方法（含写操作）命中返回 `{ code: 0, message: 'ok', data }`；未命中返回 `fallbackData`。
- HTTP 状态恒 200、`statusText: 'OK'`。
- 提供 `dataUrl` 时，首个请求触发 `globalThis.fetch(dataUrl)`，成功后缓存；失败（网络错/非 2xx/JSON 解析失败）标记为空数据集并**继续返回成功信封**，只在 `console.warn` 打一条。

- [ ] **Step 1: 写失败测试**

创建 `shared/tests/demo-adapter.test.mjs`：

```js
import assert from 'node:assert/strict'
import { buildDemoKey, matchDemoKey, createDemoAdapter } from '../runtime/http/demoAdapter.ts'

// 1. 键规范化
assert.equal(buildDemoKey('get', 'https://api.example.test/api/v2/admin/orders?page=2&_t=1730000000'), 'GET /v2/admin/orders')
assert.equal(buildDemoKey('POST', '/v2/site/products/12/quote'), 'POST /v2/site/products/12/quote')
assert.equal(buildDemoKey('get', '/v2/site/config/'), 'GET /v2/site/config')

// 2. 精确与通配匹配
const dataset = {
  endpoints: {
    'GET /v2/admin/orders': { list: [{ id: 1 }], total: 1 },
    'GET /v2/admin/products/*': { id: 0, name: '通配商品' },
    'POST /v2/site/products/*/quote': { total: '99.00' },
  },
}
assert.deepEqual(matchDemoKey(dataset, 'GET', '/v2/admin/orders?page=1')?.data, { list: [{ id: 1 }], total: 1 })
assert.deepEqual(matchDemoKey(dataset, 'GET', '/v2/admin/products/12')?.data, { id: 0, name: '通配商品' })
assert.deepEqual(matchDemoKey(dataset, 'POST', '/v2/site/products/7/quote')?.data, { total: '99.00' })
assert.equal(matchDemoKey(dataset, 'GET', '/v2/admin/nope'), null)

// 3. adapter 返回成功信封，未命中返回空对象
const adapter = createDemoAdapter({ dataset })
const resp = await adapter({ url: '/v2/admin/orders', method: 'get', headers: {} })
assert.deepEqual(resp.data, { code: 0, message: 'ok', data: { list: [{ id: 1 }], total: 1 } })
assert.equal(resp.status, 200)
const miss = await adapter({ url: '/v2/admin/nope', method: 'get', headers: {} })
assert.deepEqual(miss.data, { code: 0, message: 'ok', data: {} })

// 4. dataUrl 加载失败时仍返回成功信封
const failing = createDemoAdapter({ dataUrl: 'http://127.0.0.1:1/never.json' })
const fallback = await failing({ url: '/v2/admin/orders', method: 'get', headers: {} })
assert.deepEqual(fallback.data, { code: 0, message: 'ok', data: {} })
```

- [ ] **Step 2: 运行确认失败**

Run: `cd /e/caiwu && node --experimental-strip-types shared/tests/demo-adapter.test.mjs`
Expected: FAIL，`Cannot find module '../runtime/http/demoAdapter.ts'`。

- [ ] **Step 3: 实现 `shared/runtime/http/demoAdapter.ts`**

按上述行为约定实现（约 100 行）。要点：`buildDemoKey` 用 `new URL(url, 'http://demo.local')` 取 pathname；删除空段后拼回；`matchDemoKey` 先取 `endpoints[exact]`，再遍历同方法键把 `*` 编译为 `[^/]+` 正则按字典序测试；`createDemoAdapter` 内部 `let datasetPromise` 惰性初始化（dataset 直接可用时同步就绪），resolve 后构造响应。响应对象需含 `config`、`request: {}`。

- [ ] **Step 4: 导出与测试脚本**

`shared/runtime/index.ts` 追加 `export * from "./http/demoAdapter";`。
`shared/package.json` 的 `test` 脚本在 `http-client.test.mjs` 之后追加 `&& node --experimental-strip-types ./tests/demo-adapter.test.mjs`。

- [ ] **Step 5: 运行**

Run: `cd /e/caiwu && npm run test --workspace shared`
Expected: 全部 PASS。

- [ ] **Step 6: 提交（E:\caiwu）**

```bash
git add shared/runtime/http/demoAdapter.ts shared/runtime/index.ts shared/package.json shared/tests/demo-adapter.test.mjs
git commit -m "feat(shared): 新增演示 axios adapter（静态数据集匹配与成功信封）"
```

---

### Task 3: 管理端 demo 接线

**Files:**
- Create: `E:\caiwu\frontend-admin-v3\.env.demo`
- Modify: `E:\caiwu\frontend-admin-v3\src\utils\request\index.ts`、`E:\caiwu\frontend-admin-v3\src\router\index.ts:78`、`E:\caiwu\frontend-admin-v3\src\main.ts`、`E:\caiwu\frontend-admin-v3\package.json`、`E:\caiwu\.gitignore:65`
- Test: 构建产物检查（无单测，本任务以构建 + grep 验证）

**Interfaces:**
- Consumes: `createDemoAdapter`（Task 2）、`adapter` 选项（Task 1）
- Produces: `dist-demo/` 产物，hash 路由，假 token。`.env.demo` 模板见下

- [ ] **Step 1: 写 `.env.demo`**

```ini
VITE_BASE_URL=/demo/admin/
VITE_ADMIN_ASSET_BASE_URL=/demo/admin/
VITE_API_BASE_URL=/demo/api
VITE_APP_TITLE=创欧云
VITE_PUBLIC_SITE_URL=/demo/www/
VITE_SESSION_COOKIE_DOMAIN=
VITE_DEMO_DATA_URL=/demo/data/admin.json
```

- [ ] **Step 2: request 入口注入 adapter**

`src/utils/request/index.ts` 的 `createHttpClient({...})` 增加：

```ts
adapter: import.meta.env.MODE === 'demo'
  ? createDemoAdapter({ dataUrl: import.meta.env.VITE_DEMO_DATA_URL, fallbackData: {} })
  : undefined,
```

顶部 `import { createDemoAdapter } from '@caiwu/shared/runtime';`。

- [ ] **Step 3: 路由切 hash（仅 demo）**

`src/router/index.ts`：`import { createWebHashHistory }` 一并引入；
`history: import.meta.env.MODE === 'demo' ? createWebHashHistory() : createWebHistory(env === 'site' ? '/starter/vue-next/' : import.meta.env.VITE_BASE_URL),`

- [ ] **Step 4: main.ts 预置假 token**

`src/main.ts` 在 `const app = createApp(App);` 之前加：

```ts
// 演练版：无后端，预置假凭证让路由守卫放行；auth/info 由静态数据集返回全权限管理员
if (import.meta.env.MODE === 'demo') {
  setAdminToken('demo-admin-token');
}
```

`import { setAdminToken } from '@/app/runtime/session';`。

- [ ] **Step 5: 构建脚本与忽略白名单**

`package.json` scripts 增加 `"build:demo": "vite build --mode demo --outDir dist-demo"`。
`E:\caiwu\.gitignore` 在 `!frontend-admin-v3/.env.example` 后加 `!frontend-admin-v3/.env.demo`。

- [ ] **Step 6: 验证**

Run: `cd /e/caiwu && npm run build:demo --workspace caiwu-admin-v3`
Expected: `dist-demo/index.html` 存在，资源引用以 `/demo/admin/` 开头：

Run: `grep -o 'src="[^"]*"' /e/caiwu/frontend-admin-v3/dist-demo/index.html | head -3`
Expected: 形如 `src="/demo/admin/assets/index-*.js"`。

- [ ] **Step 7: 提交（E:\caiwu）**

```bash
git add frontend-admin-v3/.env.demo frontend-admin-v3/src/utils/request/index.ts frontend-admin-v3/src/router/index.ts frontend-admin-v3/src/main.ts frontend-admin-v3/package.json .gitignore
git commit -m "feat(admin): 支持 demo 模式构建（静态数据集 + hash 路由 + 假会话）"
```

---

### Task 4: 用户控制台 demo 接线（含跨站跳转）

**Files:**
- Create: `E:\caiwu\frontend-user-v4-console\.env.demo`
- Modify: `E:\caiwu\frontend-user-v4-console\src\utils\request.ts`、`src\router\index.ts:95`、`src\main.ts`、`src\router\modules\public-redirect.ts`、`package.json`、`E:\caiwu\.gitignore`

**Interfaces:**
- Consumes: Task 1/2
- Produces: `dist-demo/`；demo 下回官网链接指向 `/demo/www/`

- [ ] **Step 1: `.env.demo`**

```ini
VITE_BASE_URL=/demo/console/
VITE_CONSOLE_ASSET_BASE_URL=/demo/console/
VITE_API_BASE_URL=/demo/api
VITE_APP_TITLE=创欧云
VITE_PUBLIC_SITE_URL=/demo/www/
VITE_SESSION_COOKIE_DOMAIN=
VITE_DEMO_DATA_URL=/demo/data/console.json
```

- [ ] **Step 2: request 注入 adapter**：同 Task 3 Step 2（`dataUrl` 用 `VITE_DEMO_DATA_URL`）。

- [ ] **Step 3: router 切 hash**：同 Task 3 Step 3 的写法。

- [ ] **Step 4: main.ts 预置 `setClientToken('demo-client-token')`**（demo 门控，`@/app/runtime/session`）。

- [ ] **Step 5: public-redirect demo 分支**

`resolvePublicSiteOrigin()` 开头加：

```ts
if (import.meta.env.MODE === 'demo') return '/demo/www';
```

- [ ] **Step 6: 构建脚本与白名单**：`"build:demo": "vite build --mode demo --outDir dist-demo"`；`.gitignore` 加 `!frontend-user-v4-console/.env.demo`。

- [ ] **Step 7: 验证与提交**

Run: `cd /e/caiwu && npm run build:demo --workspace caiwu-user-v4-console && grep -o 'src="[^"]*"' frontend-user-v4-console/dist-demo/index.html | head -3`
Expected: 资源前缀 `/demo/console/`。

```bash
git add frontend-user-v4-console/.env.demo frontend-user-v4-console/src package.json .gitignore
git commit -m "feat(console): 支持 demo 模式构建（静态数据集 + hash 路由 + 站内跳转）"
```

（`git add` 只列 `src` 目录时留意未预期文件，提交前 `git status` 复核。）

---

### Task 5: 官网门户（www）demo 接线（含跨站跳转）

**Files:**
- Create: `E:\caiwu\frontend-user-v3-www\.env.demo`
- Modify: `E:\caiwu\frontend-user-v3-www\src\app\http\request.ts`、`src\app\router\index.ts:8`、`src\main.js`、`src\utils\consoleUrl.js:1-8`、`package.json`、`E:\caiwu\.gitignore`

**Interfaces:**
- Consumes: Task 1/2
- Produces: `dist-demo/`；demo 下控制台链接指向 `/demo/console/`

- [ ] **Step 1: `.env.demo`**

```ini
VITE_WWW_ASSET_BASE_URL=/demo/www/
VITE_API_BASE_URL=/demo/api
VITE_APP_TITLE=创欧云
VITE_PUBLIC_SITE_URL=/demo/www/
VITE_CONSOLE_SITE_URL=/demo/console/
VITE_SESSION_COOKIE_DOMAIN=
VITE_DEMO_DATA_URL=/demo/data/www.json
```

- [ ] **Step 2: request 注入 adapter**：同 Task 3 Step 2。

- [ ] **Step 3: router 切 hash**：`history: import.meta.env.MODE === 'demo' ? createWebHashHistory() : createWebHistory(),`

- [ ] **Step 4: consoleUrl demo 分支**

`normalizeConsoleOrigin()` 开头：

```js
// 演练版三端同站：控制台在 /demo/console/，不跳生产域名
if (import.meta.env.MODE === "demo") return "/demo/console";
```

- [ ] **Step 5: 构建脚本与白名单**：`"build:demo": "vite build --mode demo --outDir dist-demo"`（不跑 sitemap/prerender/budget）；`.gitignore` 加 `!frontend-user-v3-www/.env.demo`。

- [ ] **Step 6: 验证与提交**

Run: `cd /e/caiwu && npm run build:demo --workspace caiwu-user-v3-www && grep -o 'src="[^"]*"' frontend-user-v3-www/dist-demo/index.html | head -3`
Expected: 资源前缀 `/demo/www/`。

```bash
git status --short frontend-user-v3-www
git add frontend-user-v3-www/.env.demo frontend-user-v3-www/src/app/http/request.ts frontend-user-v3-www/src/app/router/index.ts frontend-user-v3-www/src/main.js frontend-user-v3-www/src/utils/consoleUrl.js frontend-user-v3-www/package.json .gitignore
git commit -m "feat(www): 支持 demo 模式构建（静态数据集 + hash 路由 + 站内跳转）"
```

---

### Task 6: 脱敏副本库与数据集导出（后端脚本）

**Files:**
- Create: `E:\caiwu\backend\scripts\demo_anonymize.php`、`E:\caiwu\backend\scripts\demo_export.php`、`E:\caiwu\backend\scripts\demo_endpoints.json`
- Test: 运行脚本 + 抽样 SQL 断言

**Interfaces:**
- Consumes: `backend/.env` 的 DB 配置（源库 `idc`）
- Produces:
  - `idc_demo` 库（脱敏副本）
  - `demo-data/{admin,console,www}.json`，结构 `{ meta: { app, exported_at }, endpoints: { "<METHOD> <path>": data } }`

- [ ] **Step 1: 写 `demo_anonymize.php`**

纯 PDO，不依赖 Laravel。流程：连 `idc` → `DROP DATABASE IF EXISTS idc_demo; CREATE DATABASE idc_demo` → 逐表 `CREATE TABLE idc_demo.t LIKE idc.t; INSERT INTO idc_demo.t SELECT * FROM idc.t` → 在 `idc_demo` 上执行脱敏：

- `users`：`email`→`CONCAT('demo-',id,'@example.test')`（NULL 保持 NULL），`phone`→NULL、`qq`→NULL、`company`→`CONCAT('演示公司 ',id)`、`real_name`/`alipay_real_name`→`CONCAT('演示用户',id)`、`alipay_account`→NULL、`id_card`/`verification_certify_id`→NULL、`last_login_ip`→`'127.0.0.1'`、`password`→固定 bcrypt 假值。
- `admin_users`：`password`/`mfa_secret`→NULL、`mfa_recovery_codes`→NULL、`last_login_ip`→`'127.0.0.1'`、`email`→`CONCAT('admin-',id,'@example.test')`。
- `tickets.subject`→`CONCAT('演示工单 #',id)`；`ticket_replies.content`→`'这是演练版中的示例回复。'`；所有表 `remark`/`admin_note`/`notes`/`suspended_reason` 列→`NULL` 或通用文案（用 information_schema 枚举列批量处理）。
- `settings`：`item_key` 匹配 `%password%`/`%secret%`/`%private_key%`/`%key%`/`%access_key%`/`%captcha_key%` 的 `item_value`→`'demo-secret'`；`site_logo`/`site_favicon`/`support_group_qr`/`client_console_icon`→`/demo/media/<basename>`；`home_hero.slides` 等 JSON 里的 `https://api.coyjs.cn/media/` 与 `https://www.coyjs.cn/media/` 前缀替换为 `/demo/media/`。
- `integration_plugin_configs.secret_json`/`has_secret_json`、`service_connection_snapshots.secret_json`/`hostname`/`ip_address`、`payment_callbacks.payload_json`→`'{}'`/NULL/`'192.0.2.'||(id%250+1)`。
- `personal_access_tokens`、`sessions`、`failed_jobs`、`jobs` → `TRUNCATE`。
- 商业数字缩放：`orders.amount`/`discount`、`invoices.amount`、`payments.amount`、`recharge_records.amount` 等 money 列 `ROUND(x * 0.37, 2)`（列名从 information_schema 取 `decimal(12,2)` 或含 `amount`/`total_sales` 的列）。
- 时间平移：对全部 `datetime`/`timestamp` 列执行 `DATE_ADD(col, INTERVAL :delta DAY)`；`delta = DATEDIFF(NOW(), (SELECT MAX(created_at) FROM idc.orders)) - 2`，保证最新订单约在演练导出前 2 天。
- 最后打印抽查：`SELECT id,email,phone FROM users LIMIT 3`、`SELECT item_key,item_value FROM settings WHERE item_key LIKE '%key%' LIMIT 5`、`SELECT COUNT(*) FROM tickets WHERE subject NOT LIKE '演示工单%'`（应为 0）。

- [ ] **Step 2: 运行脱敏并抽查**

Run: `cd /e/caiwu/backend && php scripts/demo_anonymize.php`
Expected: 结束打印三组抽查，`NOT LIKE` 计数为 0，`settings` 敏感值为 `demo-secret`。

- [ ] **Step 3: 写 `demo_endpoints.json`**

结构 `{ "admin": ["GET /v2/admin/dashboard/stats", ...], "console": [...], "www": [...] }`，覆盖 DemoPage 宣称的页面所需接口，至少包括：

- admin：`GET /v2/admin/auth/info`、`GET /v2/admin/dashboard/stats`、`GET /v2/admin/dashboard/monthly-revenue`、`GET /v2/admin/orders`、`GET /v2/admin/invoices`、`GET /v2/admin/products`、`GET /v2/admin/tickets`、`GET /v2/admin/users`、`GET /v2/admin/integration-plugins`、`GET /v2/admin/roles`、`GET /v2/admin/settings`；通配：`GET /v2/admin/orders/*`、`GET /v2/admin/invoices/*`、`GET /v2/admin/products/*`。
- console：`GET /v2/client/auth/info`、`GET /v2/site/config`、`GET /v2/client/services`、`GET /v2/client/services/grouped-overview`、`GET /v2/client/invoices`、`GET /v2/client/payments`、`GET /v2/client/tickets`、`GET /v2/client/notifications`、`GET /v2/client/referral/overview`；通配：`GET /v2/client/services/*`、`GET /v2/client/services/*/monitor`、`GET /v2/client/tickets/*`。
- www：`GET /v2/site/home`、`GET /v2/site/config`、`GET /v2/site/product-groups`、`GET /v2/site/product-types`、`GET /v2/site/notices`、`GET /v2/site/help-articles`、`GET /v2/site/content/overview`；通配：`GET /v2/site/products/*`、`GET /v2/site/product-groups/*/catalog`、`GET /v2/site/product-groups/*/children`、`GET /v2/site/product-groups/*/products`。
- 写操作样例（供演示页走通）：`POST /v2/site/products/*/quote`。

带 `*` 的键在导出时：取该路由能命中的第一条真实记录 id（从对应列表响应第一个 `id` 字段），替换 `*` 后导出。列表中缺失则跳过该键并打印警告。

- [ ] **Step 4: 写 `demo_export.php`**

纯 PHP + 内置 HTTP 内核以外的最简方案：复用 Laravel 命令行。实现为 artisan 风格脚本：
`DB_DATABASE=idc_demo php backend/scripts/demo_export.php`（脚本内先断言当前连接库名以 `idc_demo` 结尾，否则 `exit 1`，防止误连生产库）。
流程：boot Laravel（`bootstrap/app.php`）→ 为 `admin_users` 首个用户与 `users` 首个用户各创建一个 Sanctum token（`createToken('demo-export')`）→ 对 `demo_endpoints.json` 每个 app 的键：解析 method/path（`*` 用 Step 3 的替换）→ 构造 `Illuminate\Http\Request::create('/api'.$path, $method)` 并设 `Authorization: Bearer <token>` → `$kernel->handle($request)` → 解 JSON，取 `data` 字段写入 `endpoints[key]` → 最后写三个 JSON 文件到 `E:\caiwu\demo-data\`，`meta.exported_at` 用 `date('c')` → 删除临时 token。

- [ ] **Step 5: 运行导出并抽查**

Run: `cd /e/caiwu && php backend/scripts/demo_export.php`
Expected: 生成 `demo-data/admin.json`、`console.json`、`www.json`；抽查：
Run: `node -e "const d=require('/e/caiwu/demo-data/admin.json'); console.log(Object.keys(d.endpoints).length, JSON.stringify(d.endpoints['GET /v2/admin/dashboard/stats']).slice(0,120))"`
Expected: 键数 ≥ 14，stats 有 `today`/`counts` 字段且数字非真实营收（已缩放）。

- [ ] **Step 6: 提交（E:\caiwu）**

```bash
git add backend/scripts/demo_anonymize.php backend/scripts/demo_export.php backend/scripts/demo_endpoints.json
git commit -m "feat(backend): 新增演示数据脱敏与静态数据集导出脚本"
```

（`demo-data/` 产物不进 `E:\caiwu` git，由 Task 7 拷入官网仓库。）

---

### Task 7: 官网仓库 demo 入口页、拼装与本地服务器

**Files:**
- Create: `D:\caiwu-website\demo\index.html`、`D:\caiwu-website\demo\build-demo.mjs`、`D:\caiwu-website\demo\serve.mjs`
- Modify: `D:\caiwu-website\package.json`
- Test: 本地拼装 + 静态服务器 + 浏览器访问

**Interfaces:**
- Consumes: 三端 `dist-demo/`（Task 3-5）、`E:\caiwu\demo-data/`（Task 6）
- Produces: `dist/demo/{index.html,admin/,console/,www/,data/,media/}`；`npm run demo:serve` 在 4320 端口提供整站

- [ ] **Step 1: 写入口页 `demo/index.html`**

静态单页（无框架、无外部请求），深色风格与官网一致，三个卡片分别链接 `./admin/`、`./console/`、`./www/`，页脚说明「数据均为虚构，写操作刷新即复原」。

- [ ] **Step 2: 写 `demo/build-demo.mjs`**

Node ESM，无依赖。参数 `--caiwu <path>`（默认 `E:/caiwu`），流程：

1. `demo/data/*.json` 已存在则跳过；不存在则 `console.error` 提示先跑 Task 6 的导出并 `exit 1`。
2. 对 `admin/console/www`：`spawnSync(npm, ['run','build:demo','--workspace',<ws>], { cwd: caiwu, stdio: 'inherit' })`，失败即退出。
3. 组装 `dist/demo/`：拷贝 `demo/index.html`、`demo/data/*`、`<caiwu>/frontend-*/dist-demo/` → `dist/demo/{admin,console,www}/`。
4. 媒体：扫描 `demo/data/*.json` 文本里所有 `/demo/media/<file>` 文件名，从 `<caiwu>/backend/public/media/` 拷贝命中的文件到 `dist/demo/media/`；缺失文件打印警告。
5. 打印各目录文件数汇总。

- [ ] **Step 3: 写 `demo/serve.mjs`**

Node 内置 `http`：静态文件服务器，根目录 `dist/`，端口 4320（`--port` 可覆盖）；只读、防目录穿越（`path.normalize` 后必须在根内）；扩展名→Content-Type 映射（html/js/css/json/svg/png/jpg/webp/mp4/woff2/ico）；未找到返回 404 并打印路径。

- [ ] **Step 4: 脚本入口**

官网 `package.json` scripts：

```json
"demo:build": "node demo/build-demo.mjs",
"demo:serve": "node demo/serve.mjs"
```

- [ ] **Step 5: 先把数据集拷入官网仓库**

```bash
mkdir -p /d/caiwu-website/demo/data
cp /e/caiwu/demo-data/*.json /d/caiwu-website/demo/data/
```

- [ ] **Step 6: 拼装与冒烟**

Run: `cd /d/caiwu-website && npm run build && npm run demo:build && npm run demo:serve`（后台）
Expected: 服务在 `http://127.0.0.1:4320/demo/` 可打开入口页；`/demo/admin/`、`/demo/console/`、`/demo/www/` 返回 200 且是各自 SPA 的 index.html。

- [ ] **Step 7: 提交（官网仓库）**

```bash
git add demo/index.html demo/build-demo.mjs demo/serve.mjs package.json demo/data
git commit -m "feat(demo): 新增三端演练版入口页、拼装脚本与本地静态服务器"
```

---

### Task 8: 官网「实时预览」页指向同站 /demo/

**Files:**
- Modify: `D:\caiwu-website\src\data\demo.ts`、`D:\caiwu-website\src\pages\DemoPage.vue:73-78`（本地构建说明代码块）
- Test: 浏览器访问官网 dev 服务

**Interfaces:**
- Consumes: Task 7 的产物路径
- Produces: `demoEntry = '/demo/'`；`demoApps[].url` 为 `/demo/{admin,console,www}/`

- [ ] **Step 1: 改 `src/data/demo.ts`**

删除 `isLocal` 分支，`demoEntry` 固定 `/demo/`，三个 `url` 固定 `/demo/admin/`、`/demo/console/`、`/demo/www/`；`demoNotes` 保留并补一条「演练版与官网同域，直接访问 /demo/ 亦可」。文件头注释改为「静态演练版由仓库 demo/ 目录构建，见 docs/superpowers/specs/」。

- [ ] **Step 2: 改 DemoPage 的构建说明**

代码块改为：

```
npm run demo:build   # 拼装三端演练版到 dist/demo（需本地先跑后端导出）
npm run demo:serve   # 在 4320 端口本地预览整站
```

并把「本地构建与启动」的旧命令删掉。

- [ ] **Step 3: 验证**

Run: `cd /d/caiwu-website && npm run dev`（后台）+ 浏览器打开 `http://127.0.0.1:5190/demo`
Expected: 页面渲染，iframe 的 `src` 为 `/demo/admin/` 等相对路径（未部署时 iframe 404 是预期，页面本身不报错）。

- [ ] **Step 4: 提交（官网仓库）**

```bash
git add src/data/demo.ts src/pages/DemoPage.vue
git commit -m "feat(site): 实时预览页改为同站 /demo/ 相对路径"
```

---

### Task 9: CI 构建与发布三端演练版

**Files:**
- Modify: `D:\caiwu-website\.github\workflows\deploy-pages.yml`

**Interfaces:**
- Consumes: Task 7 的 `npm run demo:build`、`demo/data/`
- Produces: Pages 产物包含 `/demo/`

- [ ] **Step 1: 工作流加 checkout 与构建步骤**

在 build job 的 `npm ci` 之前加：

```yaml
      - uses: actions/checkout@v4
        with:
          repository: HaoSehu/caiwu
          path: caiwu
          ref: main   # 固定 ref，避免上游进行中改动破坏发布；升级演练版时改这里
```

在 `npm run build` 之后、SPA fallback 之前加：

```yaml
      - name: Build frontend demos
        run: npm run demo:build -- --caiwu ./caiwu
```

`on:` 增加 `repository_dispatch:`。

- [ ] **Step 2: 本地验证 YAML 语法**

Run: `cd /d/caiwu-website && node -e "const y=require('fs').readFileSync('.github/workflows/deploy-pages.yml','utf8'); if(!/demo:build/.test(y)) process.exit(1); console.log('ok')"`
Expected: `ok`。

- [ ] **Step 3: 提交（官网仓库）**

```bash
git add .github/workflows/deploy-pages.yml
git commit -m "ci: 发布时构建并拼装三端演练版到 /demo/"
```

---

### Task 10: 端到端冒烟（Playwright）

**Files:**
- Create: `D:\caiwu-website\demo\smoke-demo.mjs`
- Test: 自身即测试

**Interfaces:**
- Consumes: `dist/` 拼装产物（Task 7）、`@playwright/test`（从 `E:\caiwu` 解析或官网 devDependency 添加）
- Produces: 可重复运行的冒烟脚本；非零退出码表示失败

- [ ] **Step 1: 写脚本**

启动 `demo/serve.mjs`（子进程）→ Playwright chromium 依次打开：

1. `/demo/admin/`：等待 3 秒，断言 `#app` 内有内容（`document.body.innerText.length > 50`），断言页面出现 `/demo/admin/#/` 的 hash，断言无 `page.on('request')` 命中 `api.coyjs.cn` 或 `api.cixx.cn`。
2. `/demo/console/`：同上。
3. `/demo/www/`：同上，并断言首页可见文字包含「创欧云」。
4. 任一页出现 `console` 的 `error` 类型且文本含「网络异常」或「登录状态已失效」→ 失败。
5. 结束时杀掉服务进程，退出码汇总。

- [ ] **Step 2: 运行**

Run: `cd /d/caiwu-website && npm run demo:build && node demo/smoke-demo.mjs`
Expected: 输出三端 PASS，退出码 0。

- [ ] **Step 3: 提交（官网仓库）**

```bash
git add demo/smoke-demo.mjs
git commit -m "test(demo): 新增三端演练版 Playwright 冒烟脚本"
```

---

## Self-Review 记录

- 覆盖检查：设计文档 §4.2→Task 1/2/3-5；§4.3-4.5→Task 6/7；§4.6→Task 3-5；§4.7→Task 3-5；§4.8→Task 9；§4.8.1→Task 4/5；§4.9→Task 8；验收标准 1-4→Task 10；验收 5（生产零变化）→Global Constraints + Task 0 基线构建；验收 6→Task 10。
- 未覆盖/推迟：CDN 层 CSP 与 `_headers` 实测（部署后人工验证，见设计文档风险 3）；数据集首次全量导出的人工抽查在 Task 6 Step 5 只抽查三处，提交前需人工过一遍（设计文档风险 1）。
- 类型一致性：`DemoDataset`/`createDemoAdapter`/`buildDemoKey`/`matchDemoKey` 在 Task 2 定义，Task 3-5 只消费 `createDemoAdapter({ dataUrl, fallbackData })`；`VITE_DEMO_DATA_URL` 在三个 `.env.demo` 中同名。
