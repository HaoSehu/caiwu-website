# 三端静态预览（/demo/）设计文档

日期：2026-11-08
状态：待评审
涉及仓库：`D:\caiwu-website`（官网，GitHub Pages）、`E:\caiwu`（后端 + 三端前端）

## 一、要做什么

把 `E:\caiwu` 里三个真实前端（管理后台 `frontend-admin-v3`、用户控制台 `frontend-user-v4-console`、官网门户 `frontend-user-v3-www`）做成**不连任何后端**的静态演练版，挂在官网 `www.cixx.cn` 的 `/demo/` 下，让访客不登录、无数据也能点完主要界面。

官网现有「实时预览」页（`src/pages/DemoPage.vue`）的文案已经承诺了这个产品形态：

- 展示真实前端构建产物，不是截图；
- 不连接任何后端，所有请求由构建时打进产物的内存数据集响应，数据均为虚构；
- 写操作只在页面内生效，刷新后回到演示初始状态。

本设计就是把这段承诺落地。注意：文案里的域名 `demo.coyjs.cn`（在 `src/data/demo.ts`）已过时，本设计改为同域 `/demo/`，`demo.ts` 需要同步改（见第七节）。

## 二、为什么现在没有

`demo.coyjs.cn` 目前 DNS 不解析；官网 `package.json` 里的 `demo:build`/`demo:serve`/`demo:data` 脚本指向的 `console-demo/`（官网侧）与 `frontend-demo/`（后端侧）**两个目录都不存在**，git 历史里也从未提交过。也就是说，之前描述过的演练管线是文档先行、代码从未落地，现在要从零建。

## 三、已核实的事实（设计依据）

### 3.1 前端请求层

- 三端所有 API 请求都经过 `@caiwu/shared` 的 `createHttpClient()`（`shared/runtime/http/client.ts:127`），内部是 `axios.create()`，挂在 `client.defaults.adapter` 上的还有安全请求去重（`attachSafeRequestDedupe`）。
- 各端入口只是包一层：admin 用 `unwrapEnvelope: true` 返回 `data`；console/www 返回完整信封 `{code, message, data}`，只有 `code === 0` 才放行。
- 请求 URL 全部是相对路径（`/v2/admin/...`、`/v2/client/...`、`/v2/site/...`），与 `VITE_API_BASE_URL` 拼接。**没有任何页面直接 `fetch` 后端**，媒体文件除外（走 `<img src>`/`<video src>`，见 3.4）。
- 响应拦截器对 `code !== 0` 会调用各端注入的 `showError`；对 HTTP 401/业务 40100 会清 token、跳登录。**演练版必须让所有匹配的请求返回 `code: 0`，并在未命中时也返回合法的空信封**，否则页面会连环弹错、被踢回登录页。

### 3.2 路由与登录态

- admin 和 console 的 router 已经读 `VITE_BASE_URL`：`createWebHistory(import.meta.env.VITE_BASE_URL)`（`frontend-admin-v3/src/router/index.ts:78`、`frontend-user-v4-console/src/router/index.ts:95`）。
- www 的 router 是 `createWebHistory()` 无 base（`frontend-user-v3-www/src/app/router/index.ts:8`），且没有任何 env 变量注入 base。**这是三端里唯一必须改 router 的地方。**
- 登录态：三端都用 `createSessionDriver()` 写 Cookie（`admin_token` / `client_token`）。driver 同时会读 localStorage 迁移旧值。cookieDomain 来自 `VITE_SESSION_COOKIE_DOMAIN`，console/www 生产配 `.coyjs.cn`。
- 路由守卫：admin 在 `permission.ts:13` 的 `beforeEach` 里要求 token 存在，否则跳 `/admin/login`；console 在 `permission.ts:23` 要求 `requireAuth` 页面有 token，否则跳 `/client/login`；www 的守卫只处理 meta，不拦未登录。**演练版要么预置一个假 token 让守卫通过，要么在 demo 模式下让守卫放行。**

### 3.3 部署形态

- 官网现在是 **GitHub Pages + 自定义域名 `www.cixx.cn`**：push `main` → `.github/workflows/deploy-pages.yml` → 构建 `dist/` → `configure-pages` → `upload-pages-artifact` → `deploy-pages`。CNAME 由 CI 每次写入 `dist/CNAME`。
- GitHub Pages 对未匹配路径只给**一个全局 `404.html`**。官网 CI 现在把 `dist/index.html` 复制成 `dist/404.html` 做 SPA 回退。
- **直接后果：`/demo/admin/`、`/demo/console/`、`/demo/www/` 三个独立 SPA 不能共用这一个 404 回退。** history 路由在刷新/直链时会落到官网的 404.html 然后被官网 router 吃掉，变成官网首页。
- 解决办法：**demo 构建走 hash 路由**（`createWebHashHistory`），`/demo/admin/#/finance/orders` 这类地址不依赖服务器回退，任何静态托管都能跑。这是 demo 与生产构建唯一必须的 router 差异。
- `public/_headers` 是 CDN/Netlify 系托管识别的配置，**GitHub Pages 本身会忽略它**；实际安全头由 CDN 层决定。预览页是否被 `frame-ancestors`/`X-Frame-Options` 拦住，需要部署后实测（`_headers` 里现在写的是 `X-Frame-Options: SAMEORIGIN`，同域 iframe 是允许的；如果 CDN 另配 CSP 则要单独给 `/demo/*` 放行 frame-ancestors）。

### 3.4 数据与媒体

- 本地库 `idc`：86 张表、约 36.8 万行、371 MB。关键行数：users 507、services 228、orders 563、invoices 3092、payments 458、tickets 83、products 140、content_articles 14、settings 117；日志类三张表约 25 万行。
- **本地库是真实数据，不是模拟数据**：507 个用户中 345 个有真实邮箱/手机号；`settings` 明文存支付宝私钥、短信 AccessKey/SecretKey、SMTP 密码、极验 key；`service_connection_snapshots` 里有上游服务器 IP/端口/密钥。
- 媒体文件在 `backend/public/media/`，其中 **15 个文件已进 git**（8 个 mp4 + logo/二维码等），另有 `img_*`/`vid_*` 被 `.gitignore` 忽略。前端用 `<img>`/`<video>` 直接加载 `/media/...` 或绝对 URL（`settings` 里 `basic.site_logo` 目前是 `https://api.coyjs.cn/media/logo.svg`）。**演练版如果直连线上媒体，就违背了「不连接任何后端」；必须把这些资源拷进 demo 产物。**
- 三端 e2e 已有大量接口桩可参考形状：admin 98 个 `page.route`、console 106 个、www 38 个，其中 admin 有 52 个不同的 `/v2/...` 路径模式。这些可以作为「哪些接口需要非空数据」的清单。
- 形状校验：`createHttpClient` 只校验 `res.code === 0`，不校验字段。**但页面会因缺字段而渲染空表格/空图**，所以每个接口的真实响应形状必须从后端序列化器生成，不能手搓。

## 四、方案

### 4.1 总体结构

```
www.cixx.cn/
├── index.html              # 官网（现有，不变）
├── assets/...
└── demo/
    ├── index.html          # 入口页（三端选择 + 说明）
    └── {admin,console,www}/
        ├── index.html
        └── assets/...
```

- 官网仓库新增 `demo/` 源目录放入口页，构建后与三端产物一起进 `dist/demo/`。
- 官网「实时预览」页（`src/pages/DemoPage.vue` + `src/data/demo.ts`）改成指向同站 `/demo/...` 的相对 URL。

### 4.2 data 层：运行时请求拦截，不改业务代码

在 `@caiwu/shared` 新增一个**演示适配器**，demo 模式通过 `createHttpClient` 的可选参数注入；生产环境不传，行为完全不变：

```ts
// shared/runtime/http/demoAdapter.ts（新增）
export interface DemoAdapterOptions {
  data: DemoDataset;   // { "GET /v2/admin/orders": 响应体 | [响应体...] , ... }
  // 可选：把写操作的内存结果覆盖回读接口，模拟下单/支付后的状态变化
}
export function createDemoAdapter(options): AxiosAdapter
```

- 实现为 axios adapter：拿到 `config.url` + `config.method` + `params`，去除查询串与 `_t` 时间戳后按 `METHOD path` 匹配。
- 匹配到 → 返回 `{ code: 0, message: 'ok', data }`。
- 未匹配的 GET → 返回 `{ code: 0, message: 'ok', data: 该接口的空形状 }`；空形状也要从「接口→空形状」表拿，缺表时返回 `{}`（会让部分页面空渲染，但不报错）。
- 写操作（POST/PUT/PATCH/DELETE）→ 在内存里改对应读接口的返回并返回成功，刷新复原。
- 需要一个 `demo` 标志：`import.meta.env.MODE === 'demo'` 时各端 request 文件改为传 `adapter: createDemoAdapter(...)`。

改动点（都在各端 `utils/request` 构造处，1 处/端）：
- `frontend-admin-v3/src/utils/request/index.ts`
- `frontend-user-v4-console/src/utils/request.ts`
- `frontend-user-v3-www/src/app/http/request.ts`

以及 `shared/runtime/http/client.ts` 增加一个可选 `adapter` 透传给 `axios.create`（`CreateHttpClientOptions` 加一个字段）。

> 备选方案（不采用）：在浏览器里劫持 `window.fetch`/XHR。理由：axios 适配器层更干净，且三端共用同一实现，不会漏拦截。

### 4.3 数据集从哪来

不手搓 JSON，走「副本库 → 后端序列化器 → JSON」：

1. `mysqldump` 导出本地库到副本库 `idc_demo`。
2. 在副本库上执行脱敏 SQL（字段级替换/清空，见 4.4）。
3. 后端加一个 artisan 命令（例如 `php artisan demo:export`），用副本库启动 Laravel，遍历 `backend/routes/api.php` + 各端 API 模块里出现的路径，按真实 controller 调一次，把响应写成 `demo-data/{admin,console,www}.json`。**形状天然和后端一致。**
4. 日志类大表（`activity_logs`、`schedule_task_runs`、`integration_plugin_runtime_logs`）不导出原始数据，列表接口给前 2 页即可。

**注意：这一步会碰 `E:\caiwu` 后端代码（新增命令与脱敏脚本），属于后续实现阶段，不在本设计文档的「不改文件」范围内。**

### 4.4 脱敏规则

按「整字段替换」而非「打码」：

| 表/字段 | 处理 |
|---|---|
| `users.email` / `phone` / `qq` / `company` / `real_name` / `alipay_*` / `last_login_ip` | 整体换成 `demo-<id>@example.test`、`1380000<id4>`、`演示公司 <id>`、`127.0.0.1` |
| `users.password` / `id_card` / `verification_certify_id` | 置空或固定假值 |
| `admin_users.password` / `mfa_secret` / `mfa_recovery_codes` | 置空或固定假值 |
| `settings` 中 `payment.*_key`、`notification.sms_*`、`notification.email_password`、`system.geetest_*`、`verification.verification_*` | 整体清空或换成 `demo-xxx` 假值 |
| `integration_plugin_configs.secret_json` / `service_connection_snapshots.secret_json` / `hostname` / `ip_address` | 清空或换成 `192.0.2.x`（RFC 5737 文档地址段） |
| `personal_access_tokens.token` | 全部删除 |
| `payment_callbacks.payload_json` | 清空 |
| `media_files` 中 `ftp` 行的绝对 URL（`154.219.97.172`） | 改为本地 demo 媒体相对路径 |
| `content_articles.content`（可能含真实联系方式/链接） | 保留正文，但把外链与联系方式替换为 `example.test` 域名 |

脱敏后的副本库可以留一份本地快照（不进 git），供后续重复导出。

### 4.5 媒体资源

- 把 `backend/public/media/` 里 git 已跟踪的 15 个文件 + 导出后实际被引用的 `img_*` 文件，拷进官网仓库 `public/demo/media/`（或 demo 构建时从后端仓库拷），最终产到 `dist/demo/media/`。
- `settings` 里写死 `https://api.coyjs.cn/media/...` 的绝对 URL，在脱敏 SQL 里改成 `/demo/media/...` 相对路径。
- 视频体积合计约 8.4 MB，如果嫌大可以只保留首页轮播实际用到的 3~4 个。

### 4.6 路由与 base

| 端 | 生产 | demo |
|---|---|---|
| admin | `createWebHistory(VITE_BASE_URL)`，`.env` 里 `/` | `createWebHashHistory('/demo/admin/')` |
| console | `createWebHistory(VITE_BASE_URL)`，`.env` 里 `/` | `createWebHashHistory('/demo/console/')` |
| www | `createWebHistory()` **无 base** | `createWebHashHistory('/demo/www/')`（**需改 router**） |

- admin/console 的 `createWebHistory(...)` 行改成「`MODE === 'demo'` 时用 `createWebHashHistory('/demo/<name>/')`，否则维持原样」。
- www 同样处理，因没有 base 而需要单独改。
- 生产构建完全不受影响（`MODE` 不是 `demo`）。

### 4.7 登录守卫与假 token

- 在 demo 启动时（各端 `main` 最前面或 request 初始化处）写入一个假 token：`admin_token=demo-admin` / `client_token=demo-client`。
- 各端 `.env.demo`：
  ```ini
  VITE_API_BASE_URL=/demo/api      # 任意相对路径，实际不会发出网络请求
  VITE_BASE_URL=/
  VITE_SESSION_COOKIE_DOMAIN=
  VITE_DEMO=true
  ```
- admin 的 `permission.ts` 在 token 存在时还会调 `/v2/admin/auth/info`；这个接口由 demo 数据集返回一个全权限假管理员（参考 `e2e/fixtures.ts` 的 `E2E_ADMIN_INFO`）。
- console 的 `needAuthoritativeProfile` 分支会调 `/v2/client/auth/info`，同样由数据集返回。
- www 无守卫，无需处理。

### 4.8 构建与发布

官网 `.github/workflows/deploy-pages.yml` 加一步（在官网 build 之后、上传 artifact 之前）：

```yaml
- name: Build frontend demos
  working-directory: ../caiwu        # 或 checkout E:\caiwu 到 runner
  run: |
    npm run build:demo --workspace caiwu-admin-v3
    npm run build:demo --workspace caiwu-user-v4-console
    npm run build:demo --workspace caiwu-user-v3-www
```

每端 `package.json` 加 `"build:demo": "vite build --mode demo && <预算检查>"`。

然后拼装：
```
dist/demo/admin/ ← frontend-admin-v3/dist-demo/
dist/demo/console/ ← frontend-user-v4-console/dist-demo/
dist/demo/www/ ← frontend-user-v3-www/dist-demo/
dist/demo/media/ ← backend/public/media/（拷贝）
dist/demo/index.html ← 官网仓库 demo/ 入口页构建产物
```

**问题：GitHub Actions 现在只 checkout 官网仓库。** 三端在另一个仓库 `HaoSehu/caiwu`。有两个办法：
- A：CI 里额外 `actions/checkout` 一份 `HaoSehu/caiwu` 到 `caiwu/` 子目录（需要跨仓库 token，或对方是公开仓库可直接 clone）。
- B：把三端 demo 构建产物作为 release artifact / 预构建目录提交到官网仓库（例如 `demo/prebuilt/`），官网 CI 只做拼装。

推荐 A（产物不进 git）；如果 `HaoSehu/caiwu` 是私有仓库，则用 B。

### 4.9 官网侧文案与入口

- `src/data/demo.ts`：`demoEntry`、`demoApps[].url` 改为 `/demo/`、`/demo/admin/`、`/demo/console/`、`/demo/www/`（同站相对路径）。
- `src/pages/DemoPage.vue` 的 iframe 直接嵌同源路径，无需跨域。
- 官网 `public/_headers` 已写 `X-Frame-Options: SAMEORIGIN`，同域 iframe 允许；如 CDN 层另有 CSP 需实测。

## 五、目标 / 非目标

**目标**
- 三端主要页面（登录后）可不登录、无网络访问，能看到有数据的界面，能点开详情/列表/图表。
- 写操作页面内生效，刷新复原。
- 官网「实时预览」页嵌入的是同域静态产物。
- 生产构建与线上行为零变化。

**非目标**
- 不做真后端（不写 mock server、不引入 MSW）。
- 不覆盖 100% 接口（未命中返回空形状即可）。
- 不做 VNC/SSH 真实连接（和现有文案一致：只展示界面）。
- 不改三端业务组件代码（只动 3 个 request 文件 + 2 个 router 文件 + shared 1 个文件）。

## 六、验收标准

1. `www.cixx.cn/demo/admin/`、`/demo/console/`、`/demo/www/` 三页可打开，无网络请求打到 `api.coyjs.cn`（DevTools Network 可验证）。
2. 打开后无需登录，直接落在仪表盘/服务总览/首页。
3. 首页看板有数字、订单列表有行、账单详情可打开、商品选购能走到合计。
4. 下单/支付/改配置操作不报错，刷新后回到初始态。
5. `npm run build`（生产）产物与改动前一致（hash 路由与 fake token 只在 demo 模式生效）。
6. 官网「实时预览」页 iframe 可加载三端，控制台无 CSP/跨域错误。

## 七、需要改的文件清单

**官网 `D:\caiwu-website`**
- `src/data/demo.ts`（URL 改为 /demo/...）
- `src/pages/DemoPage.vue`（如需调整 iframe 说明）
- `demo/index.html` + `demo/` 入口页源文件（新增）
- `package.json`（新增 `demo:build` 等脚本）
- `.github/workflows/deploy-pages.yml`（新增 demo 构建与拼装步骤）
- `public/_headers`（如需给 `/demo/*` 调 CSP）

**后端仓库 `E:\caiwu`**
- `shared/runtime/http/client.ts`（`CreateHttpClientOptions` 加 `adapter`）
- `shared/runtime/http/demoAdapter.ts`（新增）
- `shared/runtime/index.ts`（导出 demoAdapter）
- `frontend-admin-v3/src/utils/request/index.ts`、`frontend-user-v4-console/src/utils/request.ts`、`frontend-user-v3-www/src/app/http/request.ts`（demo 注入）
- `frontend-admin-v3/src/router/index.ts`、`frontend-user-v4-console/src/router/index.ts`、`frontend-user-v3-www/src/app/router/index.ts`（demo hash 路由）
- 各端 `.env.demo`（新增 3 个）
- 各端 `package.json`（`build:demo` 脚本）
- `backend/scripts/export_demo_data.php`（新增，从副本库导出 JSON）
- `backend/scripts/demo_anonymize.sql` 或 `.php`（脱敏脚本，新增）

**不动的**：三端所有 `src/pages`、`src/domains`、`src/api` 业务代码；backend 路由与 controller。

## 八、风险与未决

1. **真数据误用风险**：脱敏脚本必须先在副本库执行并人工抽查，尤其 `content_articles` 正文、`settings` 值、`media` 文件名（现有文件名含「哲风壁纸」等版权素材名，可能涉及第三方素材）。
2. **GitHub Pages 的 404 回退**：hash 路由能绕开，但 `/demo/admin`（无尾斜杠）会 404 吗？实测确认；必要时在入口页用 `/demo/admin/` 带斜杠链接。
3. **CDN 层 header**：`_headers` 被 Pages 忽略，实际 header 由 CDN 控制；是否放行 iframe 需要实测。
4. **三端产物体积**：admin 6.9 MB + console 5.3 MB + www 3.2 MB + 媒体 8.4 MB ≈ 24 MB，GitHub Pages 单站点限制 1 GB、单文件 100 MB，没问题；但首屏加载要按需。
5. **`public/media` 里被 gitignore 的 `img_*`**：如果列表页引用这些图，导出时要么补拷、要么换成已跟踪文件。
6. **`frontend-user-v3-www` 的 Vite 版本与其他两端不同**（6.2.2 vs admin/console），`MODE` 与 base 处理需分别验证。
7. **admin 的 `locales`/`unsafe-eval`**：admin CSP 有 `'unsafe-eval'`（vue-i18n），demo 构建保留原样即可。

## 九、给实现者的决定（我的选择）

- **hash 路由**：选它，因为 GitHub Pages 只有一个 404.html，history 路由三 SPA 无法共存。
- **axios adapter 而非 fetch 劫持**：因为三端已统一走 `createHttpClient`，adapter 是唯一入口。
- **从副本库经序列化器导出而非手写 JSON**：因为 178/106/19 个接口形状各异，手写必错。
- **不引入 MSW**：多一个依赖和 service worker 层，且与 axios adapter 能力重复。
- **入口页单独做 `/demo/index.html`**：让「实时预览」页文案稳定，不把入口页与官网主站耦合。
