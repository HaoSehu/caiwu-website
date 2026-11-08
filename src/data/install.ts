// 安装与部署文档。步骤、路径、命令全部取自 E:\caiwu 的
// docs/参考资料/运维/宝塔部署项目指南.md、部署与调度指南.md 与本地启动指南.md。
// 换服务器环境前先回仓库核对，不要凭印象补写。

export const installIndex = [
  {
    to: '/install/requirements',
    kicker: '01',
    title: '环境与宝塔',
    desc: '服务器规格、宝塔面板安装、Nginx / PHP / MySQL / Redis 版本与 PHP 扩展、禁用函数。',
  },
  {
    to: '/install/sites',
    kicker: '02',
    title: '站点与域名',
    desc: '四个站点的创建、根目录、伪静态规则、可信代理与 SSL。',
  },
  {
    to: '/install/backend',
    kicker: '03',
    title: '后端部署',
    desc: '上传代码、配置 .env、安装依赖、初始化或升级数据库、文件权限与缓存。',
  },
  {
    to: '/install/frontend',
    kicker: '04',
    title: '前端构建',
    desc: '三个前端各自的 .env、构建命令、产物目录与发布方式。',
  },
  {
    to: '/install/schedule',
    kicker: '05',
    title: '定时任务与进程',
    desc: '每分钟 schedule:run、四组队列、VNC Relay 守护与 PHP 绝对路径。',
  },
  {
    to: '/install/firstrun',
    kicker: '06',
    title: '上线后的首批配置',
    desc: '站点信息、支付、短信、邮件、验证码、插件、商品与权限的配置顺序。',
  },
  {
    to: '/install/troubleshoot',
    kicker: '07',
    title: '部署排错',
    desc: '502、刷新 404、Composer 报错、队列不动、上传过大、缓存不生效。',
  },
  {
    to: '/install/checklist',
    kicker: '08',
    title: '上线检查清单',
    desc: '发布前逐项核对：服务、权限、计划任务、站点配置与安全项。',
  },
]

/* ---------------- 01 环境与宝塔 ---------------- */

export const serverSpecs = [
  { item: '操作系统', value: 'CentOS 7+ / Ubuntu 20.04+ / Debian 10+', note: '宝塔推荐 Linux。' },
  { item: '面板', value: '宝塔 Linux 面板', note: '未安装先按官方文档装好面板。' },
  { item: 'Nginx', value: '1.20+', note: 'Web 服务器，四个站点共用。' },
  { item: 'PHP', value: '8.2 或 8.3', note: '项目要求 PHP 8.2+。' },
  { item: 'MySQL', value: '8.0', note: '表结构依赖 8.0 的窗口函数与 JSON 能力。' },
  { item: 'Redis', value: '7.0+', note: '缓存与分布式锁。' },
  { item: 'Node.js', value: '20.19+', note: '仅构建前端时需要。' },
]

export const phpExtensions = [
  { name: 'fileinfo', need: '必需', note: '上传文件的 MIME 类型识别。' },
  { name: 'redis', need: '必需', note: '缓存与分布式锁；队列仍走 database，会话仍走 file。' },
  { name: 'pdo_mysql', need: '必需', note: '数据库连接。' },
  { name: 'opcache', need: '建议', note: '生产性能；不装不影响功能。' },
]

export const phpBuiltin = [
  'ctype、filter、hash、mbstring、openssl、session、tokenizer 在宝塔各 PHP 版本里默认已编译进核心，无需额外安装。',
  '项目不使用 bcmath、intl、zip、curl、gd、imagick，不需要装。',
]

export const disabledFunctions = [
  {
    name: 'proc_open',
    action: '删除（放开）',
    why: 'schedule:run 派发调度事件、queue:drain 拉起 worker 都走 Symfony Process；被禁用会直接抛 LogicException。',
  },
  {
    name: 'putenv',
    action: '删除（放开）',
    why: '只有 composer install 需要：Composer 的 xdebug-handler 无条件调用 putenv()，被禁用会 Fatal error。',
  },
]

export const disabledKeep = [
  '其余函数一律保留禁用，不要清空整个列表。',
  'symlink：项目与 Composer 都不需要。',
  'exec、shell_exec、system、passthru、popen、pcntl_exec：项目代码里没有调用点。',
  '不同宝塔版本默认清单不同，以面板实际列表为准：有就删，没有就跳过。',
]

export const disabledVerify = `php --ini    # 确认 Loaded Configuration File 指向面板里的 php.ini
php -r "var_dump(function_exists('proc_open'), function_exists('putenv'), extension_loaded('fileinfo'), extension_loaded('redis'), extension_loaded('pdo_mysql'));"

# 五项都应为 true；命令行 PHP 必须与站点使用同一个安装目录`

export const disabledNotes = [
  '面板改的是 php.ini，FPM 与 CLI 共用同一份配置，放开后在两边同时生效。',
  '保存后必须重启 PHP，否则运行中的 FPM 进程仍用旧配置。',
  '每次升级或重装 PHP 小版本后，宝塔可能恢复默认禁用清单，需要重新检查这两项。',
  '放开 proc_open 会削弱 PHP 沙箱强度：一旦出现任意代码执行漏洞，攻击者可派生系统进程。因此只放开这一项，不清空清单。',
  '补充手段：上传目录由 Nginx 直接静态服务，媒体扩展名白名单不含 PHP；proc_open 的调用点都以参数数组形式发起，不经过 shell。',
]

export const dnsAndNetwork = [
  '先为 api、www、console、admin 四个域名添加 DNS 记录，确认都解析到同一台服务器。',
  '防火墙只对公网开放 80 与 443。',
  'MySQL、Redis 与 VNC Relay 的 8100 仅监听内网或 127.0.0.1，不要对公网放行。',
  'HTTPS 部署前先在宝塔为四个站点申请并绑定证书，四个公开地址必须统一为 HTTP 或 HTTPS。',
  '记录宝塔站点运行用户（通常为 www），后续只授予该用户 storage 与 bootstrap/cache 的写权限。',
]

/* ---------------- 02 站点与域名 ---------------- */

export const siteTable = [
  { site: '后端 API', domain: 'api.你的域名', root: 'backend/public', runtime: 'PHP 8.2 / 8.3' },
  { site: '官网 / 用户入口', domain: 'www.你的域名', root: 'frontend-user-v3-www/dist', runtime: '静态' },
  { site: '用户控制台', domain: 'console.你的域名', root: 'frontend-user-v4-console/dist', runtime: '静态' },
  { site: '管理端', domain: 'admin.你的域名', root: 'frontend-admin-v3/dist', runtime: '静态' },
]

export const apiRewrite = `# VNC WebSocket 仅由 API 站点转发到内部 Relay（不用 VNC 时整段可删）
location ^~ /ws/vnc {
    proxy_http_version 1.1;
    proxy_set_header Host              $host;
    proxy_set_header X-Real-IP         $remote_addr;
    proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header Upgrade           $http_upgrade;
    proxy_set_header Connection        "upgrade";
    proxy_buffering off;
    proxy_read_timeout 3600s;
    proxy_send_timeout 3600s;
    proxy_pass http://127.0.0.1:8100;
}

location / {
    try_files $uri $uri/ /index.php?$query_string;
}`

export const spaRewrite = `location / {
    try_files $uri $uri/ /index.html;
}`

export const siteRules = [
  '四个站点都用宝塔创建的默认 Nginx 配置，不要在配置文件里替换或粘贴完整 server {}，以免覆盖宝塔生成的 SSL、PHP-FPM 与日志设置。',
  '只需编辑每个站点的「设置 → 伪静态」。',
  '三个前端不要添加 /api、/uploads、/media 或 /ws/vnc 代理：浏览器直接访问 API 域名。',
  '保存伪静态后使用宝塔的配置检查与重载，不手工编辑 Nginx 配置文件。',
]

export const trustedProxy = {
  why: '反代之后 REMOTE_ADDR 恒为反代地址；不在应用侧声明可信代理，$request->ip() 永远返回反代 IP。',
  effects: [
    '全站限流（含支付回调 60 次/分）退化为共用一个桶，攻击者打满即让真实回调被 429。',
    '支付轮询凭证的客户端 IP 绑定形同虚设。',
    '审计日志 IP 全为反代地址，追溯不可用。',
  ],
  env: `# 单机宝塔：Nginx 与 PHP-FPM 同机，反代地址即 127.0.0.1
TRUSTED_PROXIES=127.0.0.1

# 独立负载均衡：填 LB 的内网地址
# TRUSTED_PROXIES=10.0.0.10,10.0.0.11`,
  verify: '改完执行 php artisan config:cache。带 X-Forwarded-For: 203.0.113.9 请求任一 API，日志 ip_address 应为 203.0.113.9。',
  caution: '只写反代或负载均衡自己的 IP，不要写 0.0.0.0/0 或 *。',
}

/* ---------------- 03 后端部署 ---------------- */

export const backendEnv = `APP_NAME="创欧云"
APP_ENV=production
APP_DEBUG=false
APP_KEY=                            # 首次初始化脚本会在为空时生成
APP_URL=https://api.你的域名.com
FRONTEND_URL=https://www.你的域名.com
CLIENT_CONSOLE_URL=https://console.你的域名.com
ADMIN_URL=https://admin.你的域名.com
CLIENT_SESSION_COOKIE_DOMAIN=.你的域名.com   # 生产预检要求与 SESSION_DOMAIN 一致
SESSION_DOMAIN=.你的域名.com
SESSION_SECURE_COOKIE=true
INSTALL_ADMIN_PASSWORD=请设置至少12位强密码

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=你的数据库名
DB_USERNAME=你的数据库用户
DB_PASSWORD=你的数据库密码

CACHE_STORE=redis
QUEUE_CONNECTION=database
SESSION_DRIVER=file

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=你的Redis密码`

export const backendEnvNotes = [
  'INSTALL_ADMIN_PASSWORD 是首次初始化默认管理员的临时配置：不能为空、不能用默认值、长度至少 12 位。',
  'FRONTEND_URL、CLIENT_CONSOLE_URL、ADMIN_URL 由后端读入 CORS 白名单；官网裸域与 www 共站等来源用 CORS_EXTRA_ORIGIN_PATTERNS 登记。',
  '这些地址只服务后端 API，不参与前端构建；前端访问的地址来自各前端目录自己的 .env。',
  'CACHE_STORE 生产必须是 redis，否则分布式锁不能跨进程互斥。',
]

export const backendDeploySteps = [
  {
    step: '上传代码',
    cmd: 'git clone <仓库地址> /www/wwwroot/caiwu\n# 或用宝塔 Git 插件 / 文件上传解压',
    note: '项目根目录包含 backend、三个前端与 shared。',
  },
  {
    step: '安装后端依赖',
    cmd: 'cd /www/wwwroot/caiwu/backend\ncomposer install --no-dev --optimize-autoloader',
    note: '生产跳过 dev 依赖。',
  },
  {
    step: '初始化空数据库',
    cmd: 'python3 scripts/install_db.py',
    note: '仅对空库执行：生成 APP_KEY、导入 schema baseline、执行增量迁移、初始化默认配置与管理员。之后不要再跑 key:generate 或 migrate --force。',
  },
  {
    step: '发布到已有数据库',
    cmd: 'php artisan db:upgrade-status\nphp artisan db:upgrade --force\nphp artisan optimize:clear\nphp artisan config:cache && php artisan route:cache',
    note: '已有生产库一律走这条。db:upgrade-status 退出码 2 表示「有活要干」，不是故障。',
  },
  {
    step: '设置文件权限',
    cmd: 'sudo chown -R www:www storage bootstrap/cache\nsudo chmod -R 775 storage bootstrap/cache\nsudo chmod -R 775 public/uploads public/media',
    note: 'www 换成实际站点运行用户。',
  },
  {
    step: '重启 PHP',
    cmd: '# 宝塔 → 软件商店 → PHP → 重启',
    note: '使 config:cache 与新的禁用函数配置生效。',
  },
]

export const dbPathRules = [
  '空库首次部署用 python3 scripts/install_db.py。',
  '已有生产库发布新版本用 php artisan db:upgrade --force。',
  '两条路径互斥，不要混用。',
  '禁止在生产库执行 migrate:fresh、migrate:reset 或 install_db.py --reset。',
]

/* ---------------- 04 前端构建 ---------------- */

export const frontendEnvTable = [
  { dir: 'frontend-user-v3-www', vars: 'VITE_API_BASE_URL · VITE_PUBLIC_SITE_URL · VITE_CONSOLE_SITE_URL' },
  { dir: 'frontend-user-v4-console', vars: 'VITE_API_BASE_URL · VITE_PUBLIC_SITE_URL' },
  { dir: 'frontend-admin-v3', vars: 'VITE_API_BASE_URL' },
]

export const frontendBuild = `cd /www/wwwroot/caiwu

npm run build:frontends -- --dry-run   # 只预览构建目标，不实际构建
npm ci
npm run build:frontends

# 产物分别在三个前端目录的 dist/，不会写入 backend/public`

export const frontendNotes = [
  'VITE_API_BASE_URL 必须含 /api 前缀，例如 https://api.你的域名.com/api。',
  '跨子域共享登录态时各端还要配 VITE_SESSION_COOKIE_DOMAIN=.你的域名.com，与后端 SESSION_DOMAIN 一致。',
  '每个前端目录需要两份 env（均不入库）：.env.dev 给本地开发，.env 给构建。',
  '本地开发各端读取 .env.dev，互不影响。',
  '静态资源默认以根路径 / 发布；需要 CDN 发布时在各前端目录直接执行 npm run build 读取自己的 .env。',
]

/* ---------------- 05 定时任务与进程 ---------------- */

export const cronConfig = `# 宝塔 → 计划任务 → 添加
# 任务类型：Shell 脚本    任务名称：Laravel 调度    执行周期：每分钟

cd /www/wwwroot/caiwu/backend
/www/server/php/83/bin/php artisan schedule:run >> /dev/null 2>&1`

export const relayConfig = `# 宝塔 → 进程守护 → 添加
cd /www/wwwroot/caiwu/backend
/www/server/php/83/bin/php artisan vnc:relay`

export const cronNotes = [
  '必须写 PHP 绝对路径，不要写 php：计划任务的 Shell 环境 PATH 常指向系统自带的旧 PHP，会读到另一份 php.ini，proc_open 可能仍被禁用。',
  '用 php -v 与 /www/server/php/83/bin/php -v 各跑一次，确认是同一个版本。',
  '这条计划任务每分钟触发心跳，并行消费 provision、business、automation、backup 四组队列。',
  '不要额外配置常驻 queue:work 覆盖同一队列，否则会重复消费。',
  'Relay 必须由守护进程常驻并自动重启；确认 127.0.0.1:8100 在监听后再发布新代码。',
  '进程守护与计划任务必须使用同一个 PHP 绝对路径，与 API 站点的 PHP 版本和 php.ini 完全一致。',
]

/* ---------------- 06 首批配置 ---------------- */

export const firstRunOrder = [
  {
    step: '站点信息与首页',
    where: '管理端 → 站点内容 → 站点设置 / 首页 Banner',
    detail: '站点名称、Logo、备案号、联系方式与首屏轮播，改完立即生效。',
  },
  {
    step: '支付接口',
    where: '管理端 → 系统设置 → 集成插件 → 支付',
    detail: '启用支付宝或易支付，填 App ID、私钥与公钥；敏感字段加密保存，只显示是否已配置。',
  },
  {
    step: '短信与邮件',
    where: '管理端 → 系统设置 → 集成插件 → 短信 / 邮件',
    detail: '短信填签名与模板号；邮件填 SMTP 主机、端口与账号。多 SMTP 轮询可配多个账号与冷却时间。',
  },
  {
    step: '验证码与实名',
    where: '管理端 → 系统设置 → 集成插件 → 验证码 / 实名',
    detail: '验证码填 Captcha ID 与 Key；实名按服务商填 AccessKey 与回调地址。',
  },
  {
    step: '上游供应',
    where: '管理端 → 系统设置 → 集成插件 → 上游',
    detail: '绑定 KangHostx、ZJMF Finance 等上游，配置独立 provider key 后再同步商品。',
  },
  {
    step: '商品与商品组',
    where: '管理端 → 产品配置 → 商品管理',
    detail: '先建业务类型与一级分组，再建产品；能同步的先用上游同步拉取价格与库存。',
  },
  {
    step: '权限与员工',
    where: '管理端 → 系统设置 → 权限管理',
    detail: '建角色并勾选权限码，再给员工账号绑定角色。资金写入类权限需单独授予。',
  },
  {
    step: '账户策略',
    where: '管理端 → 系统设置 → 系统维护 → 账户策略',
    detail: '决定是否要求实名、手机号或邮箱后才能下单、支付、充值、提现。默认关闭。',
  },
]

/* ---------------- 07 部署排错 ---------------- */

export const troubleshootItems = [
  {
    symptom: '502 Bad Gateway',
    cause: 'PHP-FPM 未运行、PHP 版本不匹配，或站点根目录指错。',
    fix: '确认 API 站点 PHP 版本为 8.2/8.3 且 FPM 已启动；根目录必须是 backend/public，不是 backend。',
  },
  {
    symptom: '页面刷新后 404',
    cause: '前端站点缺少 History 路由回退。',
    fix: '在三个前端站点的伪静态填入 try_files $uri $uri/ /index.html;。',
  },
  {
    symptom: 'Composer 报 putenv() 未定义',
    cause: 'PHP 禁用函数里保留了 putenv。',
    fix: '在宝塔 PHP 设置的禁用函数中删除 putenv，重启 PHP 后重跑 composer install。',
  },
  {
    symptom: '计划任务跑了但队列不动',
    cause: '计划任务里的 php 解析到了别的版本，proc_open 仍被禁用；或存在多余的常驻 queue:work。',
    fix: '把计划任务改成 PHP 绝对路径；确认 proc_open 已放开；移除覆盖同一队列的常驻 worker。',
  },
  {
    symptom: '上传文件过大失败',
    cause: 'upload_max_filesize 与 post_max_size 太小。',
    fix: '在宝塔 PHP 设置里同时调大这两项；仅在实际遇到 413 时再调站点级 Nginx 上传限制。',
  },
  {
    symptom: '路由或配置更新不生效',
    cause: '生产缓存未刷新，或长驻进程缓存了旧结构。',
    fix: '执行 php artisan optimize:clear 后重新 config:cache 与 route:cache，并重启 PHP-FPM 与队列进程。',
  },
]

/* ---------------- 08 检查清单 ---------------- */

export const launchChecklist = [
  { item: '四个域名解析到同一台服务器', area: '网络' },
  { item: '四个站点已创建且根目录正确', area: '站点' },
  { item: 'API 站点伪静态含 index.php 回退，前端含 index.html 回退', area: '站点' },
  { item: 'TRUSTED_PROXIES 已配置且验证日志 IP 正确', area: '安全' },
  { item: '四个站点 HTTPS 证书已绑定且协议统一', area: '安全' },
  { item: 'backend/.env 中 APP_ENV=production、APP_DEBUG=false', area: '后端' },
  { item: 'CACHE_STORE=redis，且 redis 扩展已安装', area: '后端' },
  { item: '数据库已用 install_db.py 初始化或 db:upgrade 升级', area: '后端' },
  { item: 'storage 与 bootstrap/cache 权限归站点运行用户', area: '后端' },
  { item: 'config:cache 与 route:cache 已执行', area: '后端' },
  { item: '计划任务每分钟执行且使用 PHP 绝对路径', area: '运行' },
  { item: 'VNC Relay 由守护进程常驻，127.0.0.1:8100 在监听', area: '运行' },
  { item: 'MySQL、Redis、8100 未对公网开放', area: '安全' },
  { item: '三个前端已构建且 .env 指向正确的 API 域名', area: '前端' },
  { item: '默认管理员密码已修改为强密码', area: '安全' },
  { item: '已启用至少一个支付、短信与邮件插件', area: '业务' },
  { item: '已建立角色与员工账号，资金写入权限单独授予', area: '业务' },
  { item: '数据库备份计划已配置并验证可恢复', area: '运维' },
]
