// 全部内容取自 E:\caiwu 仓库的代码与文档，可直接对照核验。

export const brand = {
  name: '创欧云',
  product: 'Caiwu 业务财务系统',
  domain: 'www.cixx.cn',
  tagline: '面向 IDC 与云服务商的业务与财务经营系统',
  repo: 'https://github.com/HaoSehu/caiwu',
  repoLabel: 'HaoSehu/caiwu',
  apiDocs: 'https://caiwu-api.apifox.cn',
  license: 'AGPL-3.0',
}

export const heroFacts = [
  { value: '448', label: '接口路由' },
  { value: '313', label: '后端服务类' },
  { value: '122', label: '数据库迁移' },
  { value: '22', label: '已接入插件' },
]

// 对象边界（后端真实约定）
export const objects = [
  { table: 'orders', name: '订单', rule: '购买契约：产品、配置、周期、数量与定价快照' },
  { table: 'invoices', name: '账单', rule: '结算凭证：应付、实付、行项目与支付明细' },
  { table: 'payments', name: '支付', rule: '第三方资金流入：余额支付与手动开服不产生记录' },
  { table: 'finance_ledger', name: '台账', rule: '事件流水：充值、退款、返佣、提现、系统调整' },
]

// 业务闭环：真实的处理顺序
export const flow = [
  { label: '选配下单', detail: '三层分类选品，按周期与配置定价，冻结配置与价格快照' },
  { label: '生成账单', detail: '按订单生成应付账单与行项目，支持组合支付' },
  { label: '支付回调', detail: '网关异步通知先验签，幂等写入支付记录' },
  { label: '同步履约', detail: '回调内触发开通，失败进入重试与人工介入' },
  { label: '续费升级', detail: '续费预览、升级报价、流量包追加，均生成独立账单' },
  { label: '入账留痕', detail: '按事件类型写入账务台账，子域分别结算' },
]

// 能力清单：管理端与用户端真实存在的功能项
// 插件域与真实已接入的插件
export const pluginGroups = [
  { domain: '上游服务器', dir: 'servers', items: ['KangHostx', 'ZJMF Finance', 'Demo'] },
  { domain: '支付网关', dir: 'gateways', items: ['支付宝', '易支付', 'Demo'] },
  { domain: '短信', dir: 'sms', items: ['阿里云短信', 'Stay33', 'Demo'] },
  { domain: '验证码', dir: 'captcha', items: ['极验', 'Vaptcha'] },
  { domain: '实名认证', dir: 'certification', items: ['百度人脸', 'Stay33', 'Demo'] },
  { domain: '邮件', dir: 'mail', items: ['SMTP', '多 SMTP 轮询', 'Demo'] },
  { domain: '存储扩展', dir: 'addons', items: ['阿里云 OSS', '腾讯云 COS', '七牛', 'FTP'] },
]

// 技术要点：每条都对应代码里的具体实现
export const techRows = [
  {
    topic: '接口命名空间',
    spec: '/api/v2/admin · /api/v2/client · /api/v2/site',
    note: '旧 /api/admin、/api/client、/api/site 已删除，不保留兼容层',
  },
  {
    topic: '鉴权链路',
    spec: 'Sanctum + ensure.admin / ensure.client + permission 码',
    note: '管理端 63 处权限门；支付回调在中间件内先验签再处理',
  },
  {
    topic: '响应规范',
    spec: 'code = 0；data.list / total / page / page_size',
    note: '校验失败统一 42200，字段错误置于 data.errors，单响应控制在 100KB 内',
  },
  {
    topic: '并发与限流',
    spec: '全局限流 120 次/分 · 回调 60 次/分 · 登录 5 次/分',
    note: '仅在 .env 显式配置 TRUSTED_PROXIES 时才信任代理头',
  },
  {
    topic: '队列拓扑',
    spec: 'provision · business · automation · backup',
    note: 'provision 单独成组，超时可达 1200 秒而不阻塞业务与通知',
  },
  {
    topic: '调度模型',
    spec: 'schedule:run → queue:drain → 四组子进程 Worker',
    note: '每组独立 Redis 互斥锁，另有探针检测残锁并释放',
  },
  {
    topic: '插件边界',
    spec: 'backend/plugins/{domain}/{slug}',
    note: '业务控制器不依赖插件实现类，敏感配置加密存储',
  },
  {
    topic: '数据升级',
    spec: 'php artisan db:upgrade',
    note: '互斥锁 + 版本校验 + 生产强制全库备份，失败不推进版本',
  },
]

// 工程约束：写在仓库文档里的规则
export const engineeringRules = [
  '迁移只新增，不修改历史迁移',
  '支付记录禁止物理删除',
  '控制器不直接调用第三方 Http 客户端',
  '第三方能力全部经集成插件层',
  '上游供应商保持独立 provider key',
  '账务、开通、回调必须事务与幂等',
]

export const platforms = [
  {
    name: '管理后台',
    stack: 'Vue 3 · TypeScript · TDesign Vue Next · Vite',
    who: '平台运营、财务、客服',
    pages: ['用户与实名', '商品与定价', '订单 · 账单 · 退款', '账务台账与报表', '优惠券与分销', '工单', '插件与调度', '权限与日志'],
  },
  {
    name: '官网门户',
    stack: 'Vue 3 · Vite · TDesign Vue Next · Pinia · Sass',
    who: '访客与客户',
    pages: ['产品分类与选购', '公告与帮助中心', '注册登录', '服务条款'],
  },
  {
    name: '用户控制台',
    stack: 'Vue 3 · TypeScript · TDesign Vue Next · Vite',
    who: '客户与开发者',
    pages: ['服务实例与运行状态', '开关机 · 重装 · 改密', 'NAT 与安全组', '监控与 VNC', '账单 · 订单 · 充值', '分销与提现', '工单'],
  },
  {
    name: 'Android App',
    stack: 'Flutter · TDesign Flutter',
    who: '移动场景下的客户',
    pages: ['服务管控', '账单与充值', '工单', '公告', 'SSH 终端', 'VNC 远程桌面'],
  },
]

export const nav = [
  { id: 'home', label: '概览', to: '/' },
  { id: 'features', label: '产品能力', to: '/features' },
  { id: 'architecture', label: '技术架构', to: '/architecture' },
  { id: 'userguide', label: '使用文档', to: '/userguide' },
  { id: 'devguide', label: '开发者文档', to: '/devguide' },
  { id: 'demo', label: '实时预览', to: '/demo' },
  { id: 'compare', label: '方案对比', to: '/compare' },
  { id: 'scenarios', label: '适用场景', to: '/scenarios' },
  { id: 'start', label: '开源上手', to: '/start' },
]

// 对外入口
export const resources = [
  {
    label: '接口文档',
    value: 'caiwu-api.apifox.cn',
    href: 'https://caiwu-api.apifox.cn',
    desc: 'Apifox 托管的完整接口清单与数据结构',
    icon: 'api' as const,
  },
  {
    label: '代码仓库',
    value: 'github.com/HaoSehu/caiwu',
    href: 'https://github.com/HaoSehu/caiwu',
    desc: 'AGPL-3.0 开源，含架构、后端、前端与数据库约束文档',
    icon: 'github' as const,
  },
  {
    label: '开发者交流群',
    value: 'QQ 群 994857138',
    href: 'https://qm.qq.com/q/se4JU0fz7U',
    desc: '使用问题、部署经验与需求讨论',
    icon: 'qq' as const,
  },
]

/* ===================== 方案对比 ===================== */

// 对比维度：只比较可核验的结构性差异，不评价具体商业产品
export const compareDimensions = [
  {
    dimension: '对象边界',
    caiwu: '订单 / 账单 / 支付三表分离，职责写入架构文档并有代码约束',
    common: '常合并为一张「订单表」，支付状态与结算金额混在同一记录',
    why: '合并后无法区分「该付」与「实付」，退款、部分付款、组合支付会污染历史',
  },
  {
    dimension: '资金记录',
    caiwu: 'payments 只存第三方真实入账，余额支付与手动开服不落表',
    common: '余额支付也写支付表，导致对账时无法与渠道流水一一对应',
    why: '对账要求平台侧记录与渠道流水能精确匹配',
  },
  {
    dimension: '删除语义',
    caiwu: '支付记录禁止物理删除；冲正写反向事件',
    common: '允许直接删除或修改历史记录',
    why: '财务数据一旦可改写，审计链断裂',
  },
  {
    dimension: '第三方接入',
    caiwu: '七类能力域插件化，控制器不依赖具体实现',
    common: '支付、短信、实名直接写在业务代码里',
    why: '更换供应商需要改动业务逻辑，回归面不可控',
  },
  {
    dimension: '长任务隔离',
    caiwu: 'provision 队列单独成组，超时 1200 秒不阻塞业务与通知',
    common: '所有任务同一队列，一个慢开通拖垮整站通知',
    why: '开通依赖上游，耗时不可控，必须与业务解耦',
  },
  {
    dimension: '权限模型',
    caiwu: '66 项权限码；资金写入类操作单独授权，默认不下发任何角色',
    common: '仅区分管理员与普通用户',
    why: '补录与冲正属于资金写入，误授权等于可以造账',
  },
  {
    dimension: '接口契约',
    caiwu: '统一 /api/v2 命名空间、code=0 响应、分页信封，文档与代码同步',
    common: '接口风格随开发者变化，文档滞后于实现',
    why: '多端（Web / App）共用契约时，风格漂移会直接变成联调成本',
  },
  {
    dimension: '数据升级',
    caiwu: '迁移只新增；升级走 db:upgrade，含互斥锁、版本校验与生产强制备份',
    common: '直接执行迁移，无版本记录与回滚依据',
    why: '生产环境升级失败时需要有据可查的恢复路径',
  },
]

/* ===================== 适用场景 ===================== */

export const scenarios = [
  {
    key: 'idc',
    title: '中小 IDC 与机房',
    pain: '商品、订单、开通用三套表格和人工流程拼在一起，月底对账靠肉眼。',
    fit: '直接从官网下单到上游开通闭环，账单与台账系统生成，对账只需核对渠道流水。',
    points: ['按业务类型分组卖云服务器、物理机、虚拟主机', '支付回调自动开通，失败可重试并可人工介入', '账务台账按事件留痕，月底按子域汇总'],
  },
  {
    key: 'cloud',
    title: '云服务商 / 转售商',
    pain: '上游有多家供应商，接口各不相同，换一家要重写一遍开通逻辑。',
    fit: '上游以插件接入，保持独立 provider key，换供应商只换插件不动业务代码。',
    points: ['KangHostx、ZJMF Finance 已接入，新增供应商按目录扩展', '控制台动作统一走上游 runtime 接口', '商品可与上游批量同步'],
  },
  {
    key: 'agency',
    title: '建站与代运营团队',
    pain: '需要把主机产品卖给客户，但没有自己的计费与工单系统。',
    fit: '三层商品分类加优惠券、会员折扣与分销返佣，客户与代理都能自助下单。',
    points: ['官网门户承担展示与选购', '用户控制台承担自助管理', '工单与通知覆盖售后'],
  },
  {
    key: 'team',
    title: '自建平台的研发团队',
    pain: '要一个可读、可改、边界清楚的业务底座，而不是一个只能用的成品。',
    fit: 'AGPL-3.0 开源，接口文档与架构文档齐备，控制器薄层、服务域清晰、插件可扩展。',
    points: ['Laravel 12 + Vue 3 + Flutter 全栈可改', 'Apifox 提供完整接口清单', '文档即规则，校验脚本纳入提交流程'],
  },
]

/* ===================== 上手 ===================== */

export const startSteps = [
  {
    step: '获取代码',
    cmd: 'git clone https://github.com/HaoSehu/caiwu.git',
    note: '主分支为 main，仓库含后端、三端 Web、App 与共享包。',
  },
  {
    step: '安装后端依赖',
    cmd: 'cd backend && composer install',
    note: 'PHP 8.2+，需 MySQL 8 与 Redis。',
  },
  {
    step: '初始化与升级数据库',
    cmd: 'php artisan db:upgrade',
    note: '唯一升级入口：含互斥锁、版本校验，生产环境强制全库备份。',
  },
  {
    step: '启动本地服务',
    cmd: 'php artisan app:serve',
    note: '统一入口，不要用 php artisan serve 替代。',
  },
  {
    step: '启动前端',
    cmd: 'npm run dev:admin-v3',
    note: '管理端 5174；官网 5175；控制台 5173。',
  },
]

export const verifyCommands = [
  { scope: 'backend/', cmd: 'composer analyse && composer format:check && composer audit:plugins' },
  { scope: 'frontend-admin-v3/', cmd: 'npm run build' },
  { scope: 'frontend-user-v3-www/', cmd: 'npm run build' },
  { scope: 'frontend-user-v4-console/', cmd: 'npm run build' },
  { scope: 'app_flutter/', cmd: 'flutter analyze && flutter test' },
]

/* ===================== 实现深度 ===================== */

export const deepDives = [
  {
    title: '支付回调的幂等与边界',
    body: '回调是未认证入口，先限流再验签。验签通过后以支付流水号为幂等键写入 payments，重复通知只更新不新增。余额支付、手动开服与免费订单不产生支付记录，因此 payments 与渠道流水可以逐条对齐。',
    tags: ['payments', 'signature', 'idempotency'],
  },
  {
    title: '组合支付如何不破坏对账',
    body: '一张账单可同时使用余额与支付宝。支付明细挂在账单下，payments 只记录真实入账的那一部分，余额扣减写台账而非支付表。对账时账单合计 = 台账余额扣减 + payments 合计。',
    tags: ['invoices', 'mix_payment', 'ledger'],
  },
  {
    title: '控制台动作的门禁三层',
    body: '先查服务归属，再判业务状态（挂起、终止、异常不可操作），最后判上游状态（pending、suspended、deleted 等）。三层都通过才下发指令，成功后写操作日志并清除快照缓存。',
    tags: ['service_console', 'permission', 'operation_log'],
  },
  {
    title: 'VNC 两级令牌',
    body: '取链接时签发 600 秒公开令牌，载荷不含密码。每次用公开令牌兑换都签发独立的 60 秒中转令牌，单个公开令牌最多兑换 30 次，并校验 Origin 白名单，避免同一凭证被并发复用。',
    tags: ['vnc', 'token', 'origin'],
  },
  {
    title: '登录风控的双轨设计',
    body: '验证码启用时按账号与 IP 的失败次数触发；未启用时以软锁定兜底。账号维度要求失败来自至少三个不同 IP 才锁定，防止单个 IP 用他人账号名制造账号级拒绝服务。',
    tags: ['auth', 'rate_limit', 'abuse'],
  },
  {
    title: '返佣与退款的对称性',
    body: '奖励以账单实收额为基数，先进冻结子域，到期释放。退款时对已释放的奖励写一条反转事件，而不是修改原记录。台账因此始终保持只追加，任何时点都能重算余额。',
    tags: ['referral', 'refund', 'finance_ledger'],
  },
]

export const metrics = [
  { value: '448', label: '接口路由', detail: 'admin 304 · client 122 · site 19 · web 3' },
  { value: '313', label: '后端服务类', detail: 'Finance、Order、Provisioning、Upstream 等 23 个业务域' },
  { value: '64', label: 'API 控制器', detail: '管理端 38 · 用户端 18 · 站点与公共 8' },
  { value: '122', label: '数据库迁移', detail: '只新增，不改历史迁移' },
  { value: '67', label: '管理端权限码', detail: '资金写入类单独授权' },
  { value: '22', label: '已接入插件', detail: '7 个能力域，同一域可替换供应商' },
]

// 旧的锚点式导航（保留给首页内部跳转）
export const sectionNav = [
  { id: 'overview', label: '概览' },
  { id: 'capabilities', label: '产品能力' },
  { id: 'platforms', label: '客户端' },
  { id: 'tech', label: '技术' },
  { id: 'open', label: '开源' },
]
