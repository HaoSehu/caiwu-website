// 开发者文档。全部条目对应 E:\caiwu 仓库的真实目录、真实脚本与真实配置，
// 改动前先在该仓库核对，不要凭印象补充。

export type DocSection = {
  id: string
  title: string
  lead: string
}

/* ---------------- 文档索引 ---------------- */

export const docIndex = [
  {
    to: '/devguide/quickstart',
    kicker: '01',
    title: '快速开始',
    desc: '环境要求、后端启动、三个前端与 App 的跑法，以及本地会的几个坑。',
  },
  {
    to: '/devguide/backend',
    kicker: '02',
    title: '后端开发',
    desc: 'Controller / FormRequest / Resource / Service 分层，业务服务域与代码边界。',
  },
  {
    to: '/devguide/api',
    kicker: '03',
    title: '接口开发',
    desc: '命名空间、鉴权链路、统一响应外层、业务码、分页口径与限流阈值。',
  },
  {
    to: '/devguide/frontend',
    kicker: '04',
    title: '前端开发',
    desc: '四端前端的目录约定、TDesign 使用规则、状态共享与各自的状态管理边界。',
  },
  {
    to: '/devguide/plugin',
    kicker: '05',
    title: '插件开发',
    desc: '七个能力域的目录映射、入口类与 config.php 写法、加载器预检与硬性约束。',
  },
  {
    to: '/devguide/database',
    kicker: '06',
    title: '数据库与迁移',
    desc: '三张核心表的职责边界、迁移规则、db:upgrade 升级入口与版本账本。',
  },
  {
    to: '/devguide/deploy',
    kicker: '07',
    title: '部署与运维',
    desc: '单机宝塔拓扑、计划任务、队列分组、Redis 分层、监控端点与回滚。',
  },
  {
    to: '/devguide/verify',
    kicker: '08',
    title: '测试与验证',
    desc: '各端验证命令、根 workspace 脚本、体积门禁、测试分层与提交前检查。',
  },
]

export const docMeta = {
  version: '当前主分支',
  stack: 'PHP 8.2 · Laravel 12 · Vue 3 · Flutter',
  entry: 'docs/ 目录是文档唯一真源',
}

/* ---------------- 快速开始 ---------------- */

export const quickEnv = [
  { item: 'PHP', value: '8.2+', note: '后端运行环境' },
  { item: 'Composer', value: '—', note: 'PHP 依赖' },
  { item: 'MySQL', value: '8', note: '业务库' },
  { item: 'Redis', value: '6+', note: '缓存与分布式锁' },
  { item: 'Node.js', value: '20.19+', note: '管理端与控制台的 package 约束' },
  { item: 'Flutter SDK', value: 'Dart ^3.8.0', note: '仅 App 需要' },
]

export const quickSteps = [
  {
    step: '安装后端依赖并初始化',
    cmd: 'cd backend\ncomposer install\nphp artisan key:generate\nphp artisan migrate',
    note: '仅本地开发直接 migrate 建表；生产与预发布走 db:upgrade。',
  },
  {
    step: '启动后端',
    cmd: 'php artisan app:serve',
    note: '统一入口，同时拉起 HTTP、VNC Relay 与业务队列 Worker。不要用 php artisan serve 替代。',
  },
  {
    step: '带调度运行',
    cmd: 'php artisan app:serve --with-schedule --without-vnc\nphp artisan vnc:relay',
    note: '调度交给心跳任务；Relay 单独进程，退出不影响 HTTP 与调度。',
  },
  {
    step: '启动前端',
    cmd: 'npm run dev:admin-v3\nnpm run dev:user-v3-www\nnpm run dev:user-v4-console',
    note: '三个端口分别是 5174 / 5175 / 5173。',
  },
  {
    step: '启动 App',
    cmd: 'cd app_flutter\nflutter run --dart-define=API_BASE=http://10.0.2.2:8000/api',
    note: '10.0.2.2 是 Android 模拟器访问宿主机 127.0.0.1 的地址。',
  },
]

export const quickCaveats = [
  '本地联调统一用 127.0.0.1，不要混用 localhost。',
  '本地默认 CACHE_STORE=file；生产必须 redis，否则 Cache::lock 不能跨进程互斥，支付回调与返佣会并发出错。',
  '本地 .env 指向开发库，不要对生产库执行迁移、初始化或 --reset。',
  '三个前端各有 .env.dev（开发地址）与 .env（构建地址），两份都不入库。',
  '前端 dev 脚本用 --mode dev 读 .env.dev，build 用 --mode production 读 .env。',
]

export const repoTree = [
  { path: 'backend/', desc: 'Laravel 12 API、业务服务层、插件实现与 Artisan 命令' },
  { path: 'frontend-admin-v3/', desc: '管理后台，Vue 3 + TypeScript + TDesign + Vite，端口 5174' },
  { path: 'frontend-user-v3-www/', desc: '官网门户，Vue 3 + TDesign + Vite，端口 5175' },
  { path: 'frontend-user-v4-console/', desc: '用户控制台，Vue 3 + TypeScript + TDesign + Vite，端口 5173' },
  { path: 'app_flutter/', desc: 'Android App，Flutter + TDesign Flutter，独立构建，不入根 npm workspace' },
  { path: 'shared/', desc: '跨端共享包：状态映射、运行时、内容安全渲染、控制台基础组件' },
  { path: 'docs/', desc: '长期开发文档：架构、后端、前端、数据库、产品规格、执行计划' },
]

/* ---------------- 后端开发 ---------------- */

export const backendLayers = [
  {
    layer: 'Controller',
    path: 'app/Http/Controllers/Admin/V2 · Client/V2',
    rule: '只做参数接收、调用服务、返回 Resource。不写复杂业务，不直接调用 Http::* 第三方客户端。',
  },
  {
    layer: 'FormRequest',
    path: 'app/Http/Requests/Admin/V2 · Client/V2',
    rule: '写操作、复杂查询、批量操作、导入导出、支付账单实名上游相关接口必须用它做校验与归一化。',
  },
  {
    layer: 'Resource',
    path: 'app/Http/Resources/',
    rule: '响应字段投影。v2 禁止宽 Resource，也禁止列表与详情共用同一份输出。',
  },
  {
    layer: 'Service / Action',
    path: 'app/Services/',
    rule: '业务主层，按 Finance、Order、ProductCatalog、Provisioning、Upstream、Integrations、Notification、Ticket 等领域收敛。',
  },
  {
    layer: 'Model',
    path: 'app/Models/',
    rule: '表关系与简单领域方法。跨域取数走 Service，不在 Model 里串业务。',
  },
  {
    layer: 'Job / Command',
    path: 'app/Jobs/ · app/Console/Commands/',
    rule: '异步任务与 Artisan 命令。队列分组定义在 config/queue.php，不散落在任务类里。',
  },
]

export const serviceDomains = [
  'Admin', 'Auth', 'Automation', 'Client', 'ClientServiceConsole', 'Content',
  'Finance', 'Integrations', 'Mail', 'Messaging', 'Notification', 'Order',
  'Pricing', 'ProductCatalog', 'Provisioning', 'Referral', 'Site', 'Sms',
  'System', 'Ticket', 'Upstream', 'User', 'Verification',
]

export const backendRules = [
  '控制器不直接调用第三方 Http 客户端；上游与支付调用经 Services/Integrations/Plugins 与 Services/Upstream。',
  '请求 DTO 与权限上下文在 FormRequest 完成，Controller 不手写大量 $request->input(...) 再拼数组。',
  '金额用整数分或字符串 decimal，不允许隐式 float；日期时间在文档里写明格式与时区。',
  '排序字段必须白名单映射，禁止把用户输入直接传给 orderBy / orderByRaw。',
  '批量 ID 使用数组，例如 ids: [1, 2, 3]，新增接口禁止逗号字符串。',
  '涉及财务、订单、余额、返佣、开通、回调的路径必须考虑事务、幂等与审计字段。',
]

export const backendMetrics = [
  { value: '448', label: '路由定义', detail: 'admin 304 · client 122 · site 19 · web 3' },
  { value: '313', label: 'Services 文件', detail: '23 个业务服务域' },
  { value: '64', label: 'Controller', detail: '管理端 38 · 用户端 18 · 站点与公共 8' },
  { value: '67', label: '权限码', detail: 'App\\Support\\AdminPermissions 常量' },
  { value: '122', label: '迁移文件', detail: '只新增，不改历史迁移' },
  { value: '22', label: '插件', detail: '7 个能力域' },
]

/* ---------------- 接口开发 ---------------- */

export const apiNamespaces = [
  { ns: '/api/v2/admin/*', auth: 'auth:sanctum + ensure.admin + permission:{code}', note: '管理端，每个写操作按权限码单独把关' },
  { ns: '/api/v2/client/*', auth: 'auth:sanctum + ensure.client', note: '用户端；支付、实名、VNC token 等公开入口有独立签名与限流' },
  { ns: '/api/v2/site/*', auth: '公开', note: '站点公开数据：商品目录、内容、公告等' },
  { ns: '/api/health · /api/ready', auth: '公开', note: '存活检查与就绪检查（DB / Cache / Storage / Scheduler）' },
]

export const apiResponse = {
  success: `{
  "code": 0,
  "message": "操作成功",
  "data": {},
  "timestamp": 1760000000
}`,
  paging: `{
  "code": 0,
  "message": "操作成功",
  "data": {
    "list": [],
    "total": 0,
    "page": 1,
    "page_size": 20
  },
  "timestamp": 1760000000
}`,
  validation: `{
  "code": 42200,
  "message": "参数验证失败",
  "data": {
    "errors": {
      "email": ["邮箱不能为空"]
    }
  },
  "timestamp": 1760000000
}`,
}

export const apiErrorCodes = [
  { code: '0', meaning: '成功' },
  { code: '40001', meaning: '签名验证失败（回调入口）' },
  { code: '40100', meaning: '未登录、未认证或登录已过期' },
  { code: '40300', meaning: '无权限、角色不匹配、账号被禁用' },
  { code: '40301', meaning: '账户策略未满足：需先实名认证' },
  { code: '40302', meaning: '账户策略未满足：需先绑定手机号' },
  { code: '40303', meaning: '账户策略未满足：需先绑定邮箱' },
  { code: '40400', meaning: '资源不存在' },
  { code: '40901', meaning: '实例开通租约被其他任务占用' },
  { code: '42200', meaning: '参数校验失败或一般业务校验失败' },
  { code: '50000', meaning: '通用服务端错误' },
]

export const apiRules = [
  '成功固定 code = 0；失败为非 0，按业务码区间映射 HTTP 状态（40100→401、40300→403、40400→404、42200→422、50000→500）。',
  '分页只有 page 与 page_size 两个参数，单页上限是 Pagination::MAX_PAGE_SIZE（当前 100）。v2 不接受 per_page、pageSize、limit/offset。',
  '请求与响应字段一律 snake_case。',
  '布尔 query 参数接受 1/0、true/false、on/off、yes/no，非法值统一进 42200。',
  '默认 JSON 响应控制在 100KB 以内；文件流、受控资源预览与 WebSocket 是唯一例外。',
  '接口的增删改必须同步到 Apifox 项目「caiwu 创欧云 API」，代码与文档两侧都完成才算完成。',
]

export const apiThrottle = [
  { scope: '全局限流 api', limit: '已登录 600 次/分 · 匿名 120 次/分', key: '按用户 id，匿名按 IP' },
  { scope: '管理端登录', limit: '5 次/分', key: 'v2-admin-login' },
  { scope: '管理端 MFA 校验', limit: '10 次/分', key: 'v2-admin-login-mfa' },
  { scope: '管理端补录与冲正', limit: '20 次/分', key: 'admin-manual-*' },
  { scope: '管理端敏感写', limit: '30 次/分', key: '人员、角色、数据库、设置、插件' },
  { scope: '公开商品报价', limit: '10 次/分', key: 'product-quote，按 IP' },
  { scope: '公开商品浏览', limit: '60 次/分', key: 'site-product-browse，按 IP' },
  { scope: '实名初始化 / 扫码 / 回调', limit: '5 / 30 / 30 次/分', key: '按 IP 分桶' },
]

/* ---------------- 前端开发 ---------------- */

export const frontends = [
  {
    name: 'frontend-admin-v3',
    stack: 'Vue 3 · TS · TDesign Vue Next · Pinia · Less · Vite',
    port: '5174',
    entry: 'src/main.ts · src/permission.ts · src/router/modules/',
    notes: [
      'UI 只用 TDesign Vue Next，图标只用 tdesign-icons-vue-next。',
      '权限码与后端 App\\Support\\AdminPermissions 对齐。',
      '多标签页默认开启；可缓存页面必须在路由 meta.keepAliveName 与组件 defineOptions({ name }) 写同一个名字，否则缓存静默失效。',
      '标签缓存键是 route.path，不要改成 fullPath。',
      '管理列表页不做说明型页头大卡片。',
    ],
  },
  {
    name: 'frontend-user-v3-www',
    stack: 'Vue 3 · TDesign Vue Next · Pinia · Sass · Vite',
    port: '5175',
    entry: 'src/main.js · src/app/（bootstrap、router、runtime、stores）',
    notes: [
      '<t-xxx> 组件必须收录进 scripts/tdesign-resolver.mjs，否则静默渲染成空元素且构建不报错。',
      '图标一律显式 import { XxxIcon } from "tdesign-icons-vue-next"，不使用 <t-icon name>。',
      'MessagePlugin / DialogPlugin 走 es/message/plugin 等子路径，样式由 bootstrap.ts 统一补齐。',
      '构建附带 sitemap 与 prerender，逻辑放脚本，不在页面里硬拼。',
    ],
  },
  {
    name: 'frontend-user-v4-console',
    stack: 'Vue 3 · TS · TDesign Vue Next · Pinia · Less · Vite',
    port: '5173',
    entry: 'src/main.ts · src/permission.ts · src/pages/client/',
    notes: [
      '业务能力与后端 /api/v2/client/* 一一对齐。',
      '财务记录页（账单、订单、充值）禁止使用统计或指标卡片。',
      '订单、账单、充值列表统一用 domains/finance/useRecords.ts 的 useRecordList 引擎，不自造列表逻辑。',
      '与 v3 管理端 store 同名但语义不同，不做跨端合并。',
    ],
  },
  {
    name: 'app_flutter',
    stack: 'Flutter · Dart ^3.8 · tdesign_flutter · dio · go_router · provider',
    port: '—',
    entry: 'lib/main.dart · lib/app.dart · lib/core/router/router.dart',
    notes: [
      '禁止任何 WebView 或网页嵌套，由 tool/check_no_webview.dart 守卫。',
      '视觉基线由 tool/check_visual_rules.dart 守卫：禁止渐变头、浮卡、玻璃拟态回流。',
      'API_BASE / WS_BASE / VNC_ORIGIN 全部由 --dart-define 覆盖，禁止写死地址。',
      '断点用 Material 3 的 600/840，与 Web 端 768/992/1200 不同。',
      '只消费 /api/v2/client/* 与站点公开接口，不改后端接口结构。',
    ],
  },
]

export const frontendShared = [
  '@caiwu/shared/status：状态映射、颜色与标签，页面不另写一套。',
  '@caiwu/shared/runtime：session、network、routeLoading 与 HTTP runtime。',
  '@caiwu/shared/content：Markdown / HTML 安全渲染（含 sanitizer）。',
  '@caiwu/shared/user-v3：DataState、LoadingState、StatusTag 等控制台基础组件。',
]

/* ---------------- 插件开发 ---------------- */

export const pluginDomains = [
  { domain: 'payment', dir: 'backend/plugins/gateways', contract: 'PluginPaymentGateway → PaymentGatewayInterface', plugins: '支付宝、易支付、Demo' },
  { domain: 'verification', dir: 'backend/plugins/certification', contract: 'PluginVerificationDriver → VerificationDriver', plugins: '百度人脸、Stay33、Demo' },
  { domain: 'captcha', dir: 'backend/plugins/captcha', contract: 'GeeTestService / 登录风控验证码调用链', plugins: '极验、Vaptcha' },
  { domain: 'mail', dir: 'backend/plugins/mail', contract: 'PluginMailDriver → MailDriver', plugins: 'SMTP、多 SMTP 轮询、Demo' },
  { domain: 'sms', dir: 'backend/plugins/sms', contract: 'PluginSmsDriver → SmsDriver', plugins: '阿里云短信、Stay33、Demo' },
  { domain: 'upstream', dir: 'backend/plugins/servers', contract: 'PluginUpstreamDriver → UpstreamDriver', plugins: 'KangHostx、ZJMF Finance、Demo' },
  { domain: 'addons', dir: 'backend/plugins/addons', contract: 'PluginRuntimeRegistry::execute()', plugins: '阿里云 OSS、腾讯云 COS、七牛、FTP' },
]

export const pluginStructure = `backend/plugins/{domain}/{slug}/
├── {Name}Plugin.php   # 入口类，必须存在，execute(array $request): array
├── config.php         # 元信息 + 后台配置表单 schema，必须存在
├── lib/               # SDK、协议封装、适配服务
├── logic/             # 较重的业务逻辑
├── controller/        # 回调适配类；不会自动注册 Laravel 路由
├── vendor/            # 插件自带依赖，可选
└── *.png              # 后台图标，可选`

export const pluginConfigExample = `<?php

declare(strict_types=1);

use Caiwu\\Plugins\\Gateways\\AliPay\\AliPayPlugin;

return [
    'info' => [
        'domain' => 'payment',
        'slug' => 'ali_pay',
        'key' => 'alipay',
        'name' => '支付宝当面付',
        'version' => '1.0.0',
        'entry' => AliPayPlugin::class,
        'capabilities' => ['precreate', 'query', 'notify_verify'],
    ],
    'config' => [
        'private_key' => [
            'title' => '应用私钥',
            'type' => 'textarea',
            'secret' => true,      // 加密存储，前端只显示是否已配置
            'required' => true,
        ],
    ],
];`

export const pluginRules = [
  '插件入口类不直接实现平台契约，而是提供 execute(array $request): array，由 PluginRuntimeRegistry 与领域 adapter 转换。',
  '加载器对 lib/、logic/、controller/ 与根目录 PHP 做声明类预检：拒绝声明进 App\\、Illuminate\\ 核心命名空间，拒绝跨插件命名空间。',
  '插件不得注册系统级路由、调度或全局中间件。',
  '插件不需要 TLS 证书，也不依赖 CA。',
  '敏感配置字段标 secret: true，进入加密存储，前端只展示是否已配置与脱敏预览。',
  'ZJMF Finance 保持独立 provider key zjmf_finance_api，不得折叠为 hosting_panel_api；adapter 必须显式声明方法，不恢复 __call() 动态转发。',
]

/* ---------------- 数据库与迁移 ---------------- */

export const dbCoreTables = [
  {
    table: 'orders',
    role: '购买契约',
    detail: '承载买了什么产品、配置、周期、数量与定价快照；config_snapshot 与 config_pricing_snapshot 只在订单详情展示。',
  },
  {
    table: 'invoices',
    role: '结算凭证',
    detail: '承载应付、实付、账单状态、行项目与支付明细；账单详情不展示产品配置快照。',
  },
  {
    table: 'payments',
    role: '第三方资金流入',
    detail: '只记录支付宝等外部渠道的真实入账；余额支付、手动开服与免费订单不产生 Payment，且禁止物理删除。',
  },
  {
    table: 'finance_ledger',
    role: '事件流水',
    detail: '充值、退款、返佣、提现、系统调整按事件追加，任何时点余额都能由事件重算。',
  },
]

export const dbRules = [
  { rule: '迁移只新增', detail: '不改历史迁移文件；历史激进迁移禁止补跑。表名与字段名统一 snake_case。' },
  { rule: '唯一升级入口', detail: 'php artisan db:upgrade：互斥锁 + 版本校验 + 生产强制全库备份，失败不推进版本。' },
  { rule: '版本账本', detail: '版本写在 system_installation，升级流水写在 system_upgrade_runs；只读检查用 db:upgrade-status。' },
  { rule: '结构真源', detail: '以实库 information_schema 为准；docs/DATABASE.md 由 export_database_structure.php 导出，不手工编辑。' },
  { rule: '本地例外', detail: 'php artisan migrate 只用于隔离开发环境调试，不进生产流程。' },
]

export const dbUpgradeSteps = `php artisan db:upgrade-status     # 只读检查当前版本与待执行项
php artisan db:upgrade            # 互斥锁 + 版本校验 + 生产强制备份
php artisan db:upgrade --force    # 确认后执行（生产即用这条）`

/* ---------------- 部署与运维 ---------------- */

export const deployTopology = `宝塔站点 (Nginx)
  ├── 官网/用户入口 -> frontend-user-v3-www/dist
  ├── 用户控制台   -> frontend-user-v4-console/dist
  ├── 管理端站点   -> frontend-admin-v3/dist
  └── 后端 API     -> backend/public (PHP-FPM)
                       ├── MySQL 8
                       ├── Redis（缓存与锁）
                       ├── 宝塔计划任务  每分钟 schedule:run
                       └── 宝塔守护进程  php artisan vnc:relay`

export const deploySteps = [
  {
    step: '后端发布',
    cmd: 'cd backend\ngit pull\ncomposer install --no-dev --optimize-autoloader\nphp artisan db:upgrade-status\nphp artisan db:upgrade --force\nphp artisan config:clear && php artisan route:clear && php artisan cache:clear\nphp artisan config:cache && php artisan route:cache',
    note: '首次部署用 scripts/install_db.py 写 schema baseline；之后只用 db:upgrade。',
  },
  {
    step: '前端发布',
    cmd: 'npm ci\nnpm run build:frontends',
    note: '三端各自读取目录下的 .env 生成独立 dist，按站点分别发布，不复制到 backend/public。',
  },
  {
    step: '计划任务',
    cmd: 'cd /项目路径/backend\nphp artisan schedule:run >> /dev/null 2>&1',
    note: '宝塔计划任务，每分钟一次。它会并行消费四条队列，不需要额外的常驻 queue:work。',
  },
]

export const deployEnvKeys = [
  { key: 'APP_ENV / APP_DEBUG', value: 'production / false', note: '生产必须关闭调试' },
  { key: 'APP_URL', value: 'https://api.你的域名', note: 'API、媒体文件与 VNC WebSocket 的基址' },
  { key: 'FRONTEND_URL / CLIENT_CONSOLE_URL / ADMIN_URL', value: '三个前端域名', note: 'CORS allowlist 由此自动生成' },
  { key: 'CACHE_STORE', value: 'redis', note: '必须 redis，否则分布式锁失效' },
  { key: 'SESSION_DRIVER / QUEUE_CONNECTION', value: 'file / database', note: '当前生产口径' },
  { key: 'SANCTUM_TOKEN_EXPIRATION', value: '1440（分钟）', note: '令牌签发后 24 小时失效' },
  { key: 'SANCTUM_IDLE_TIMEOUT', value: '10800（秒）', note: '3 小时无认证请求即失效' },
  { key: 'PLUGIN_INTEGRITY_ENFORCE', value: 'true', note: '插件包摘要不一致即拒绝加载' },
]

export const queueGroups = [
  { name: 'provision', env: 'CAIWU_PROVISION_QUEUES', jobs: '上游开通、续费、状态同步', timeout: 'timeout 可达 1200s' },
  { name: 'business', env: 'CAIWU_BUSINESS_QUEUES', jobs: 'referral,notification,coupon,default', timeout: '常规业务' },
  { name: 'automation', env: 'CAIWU_SCHEDULE_QUEUE', jobs: '调度触发的自动化任务', timeout: '每分钟心跳消费' },
  { name: 'backup', env: 'CAIWU_BACKUP_QUEUE', jobs: 'mysqldump 数据库备份', timeout: 'timeout 900s，单独成组' },
]

export const queueNotes = [
  '四组在运行时按 backup → provision → automation → business 依次认领，任一队列的长任务不阻塞其余队列的下一轮消费。',
  '不要额外配置常驻 queue:work 覆盖同一队列，否则会重复消费。',
  '每组使用独立 Redis 互斥锁；进程被强杀时靠 90 秒心跳判定持有者已死，自动释放。',
  'Redis 分三层：default（DB 0，队列与锁）、cache（DB 1，业务缓存）、volatile（DB 2，短 TTL 临时态）。',
  'cache:clear 只清 DB 1，不会连带清掉 DB 0 上的锁与队列键。',
]

export const opsEndpoints = [
  { path: '/api/health', desc: '存活检查' },
  { path: '/api/ready', desc: '就绪检查：心跳存活、任务运行状态、队列状态、DB / Cache / Storage' },
]

export const opsBackup = [
  '定时备份脚本 backend/scripts/backup_mysql.sh，从 .env 读取连接信息。',
  'BACKUP_DIR 默认 backend/storage/backups/mysql，BACKUP_RETENTION_DAYS 默认 14 天。',
  '宝塔计划任务每天 03:00 执行一次即可。',
]

export const opsRollback = [
  '后端回退：代码回滚 + composer install；迁移仅在可逆时才 rollback。',
  '数据库：禁止在生产直接 migrate:rollback 不可逆迁移，走备份还原。',
  '前端：按站点独立回滚，直接恢复旧 dist。',
  '支付、开通、返佣相关回退前先冻结 schedule:run，避免边回滚边产生新的异步动作。',
]

/* ---------------- 测试与验证 ---------------- */

export const verifySteps = [
  { scope: 'backend/', cmd: 'composer analyse && composer format:check && composer audit:plugins', note: '静态分析、格式与插件边界' },
  { scope: 'backend/（测试）', cmd: 'php artisan test', note: 'tests/Unit · tests/Feature · plugins 三个 suite' },
  { scope: 'frontend-admin-v3/', cmd: 'npm run build', note: 'vue-tsc --noEmit + vite build' },
  { scope: 'frontend-user-v3-www/', cmd: 'npm run build', note: '含 sitemap、prerender 与体积检查；重构时追加 verify:refactor' },
  { scope: 'frontend-user-v4-console/', cmd: 'npm run build', note: '含体积检查；重构时追加 verify:refactor' },
  { scope: 'app_flutter/', cmd: 'flutter analyze && flutter test', note: '另跑 check_no_webview.dart 与 check_visual_rules.dart' },
  { scope: 'shared/', cmd: 'npm run typecheck:shared && npm run test:shared', note: '改共享包后按影响范围补前端 build' },
]

export const verifyRootCommands = `npm run dev:admin-v3 / dev:user-v3-www / dev:user-v4-console
npm run build:frontends          # 三端统一构建，附体积门禁
npm run lint:frontends
npm run typecheck:frontends
npm run test:shared
npm run verify:frontends         # lint + typecheck + build + 重构守卫`

export const sizeBudgets = [
  { scope: 'admin 首屏 gzip', budget: '560,000 B' },
  { scope: 'www 首屏 gzip（闭包口径）', budget: '145,000 B' },
  { scope: 'console 首屏 gzip', budget: '420,000 B' },
  { scope: 'www 单分片 raw', budget: '180,000 B' },
  { scope: 'www 样式分片 raw', budget: '70,000 B' },
]

export const testLayers = [
  { layer: '冒烟测试', detail: '登录、下单、支付回调、开通、账单生成五条主链路，改动相关模块必跑。' },
  { layer: '回归测试', detail: '受影响业务域的全部既有用例，加本次新增用例。' },
  { layer: '全量测试', detail: 'php artisan test 三个 suite 全绿，前端 verify:frontends 全绿。' },
  { layer: '发布验收', detail: '按 docs/参考资料/运维/测试指南.md 的验收清单逐项确认。' },
]

export const hardRules = [
  { area: '提交流程', rule: '改完先给出改动与验证摘要，确认后才提交。提交信息格式是 Fix: / Feat: / Refactor: 加中文描述。' },
  { area: '先查后改', rule: '新增接口或功能前，先查已有实现与测试，不猜测接口、业务或目录；优先复用或扩展现有能力。' },
  { area: '最小范围', rule: '不保留无调用方的旧代码或运行时兼容层；不顺手回滚、覆盖或格式化非本任务的改动。' },
  { area: '资金与账务', rule: 'payments 只记录第三方真实入账；余额支付、手动开服与免费订单不产生 Payment。Payment 禁止物理删除。' },
  { area: '前端一致性', rule: '不混用 UI 框架；状态文案与颜色先复用 @caiwu/shared，不在页面另写一套。' },
  { area: '文档同步', rule: '路由、结构变更后运行生成脚本，绝不手工编辑 docs/自动生成/。' },
]
