<template>
  <SiteMasthead />
  <main>
    <RouterView v-slot="{ Component }">
      <Transition name="page" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </main>
  <SiteColophon />
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import SiteMasthead from './components/SiteMasthead.vue'
import SiteColophon from './components/SiteColophon.vue'

const route = useRoute()

const titles: Record<string, string> = {
  home: 'Caiwu 业务财务系统 · 创欧云',
  'not-found': '页面不存在 · Caiwu 业务财务系统',
  features: '产品能力 · Caiwu 业务财务系统',
  architecture: '技术架构 · Caiwu 业务财务系统',
  install: '安装与部署 · Caiwu 业务财务系统',
  'install-requirements': '环境与宝塔 · 安装与部署',
  'install-sites': '站点与域名 · 安装与部署',
  'install-backend': '后端部署 · 安装与部署',
  'install-frontend': '前端构建 · 安装与部署',
  'install-schedule': '定时任务与进程 · 安装与部署',
  'install-firstrun': '上线后的首批配置 · 安装与部署',
  'install-troubleshoot': '部署排错 · 安装与部署',
  'install-checklist': '上线检查清单 · 安装与部署',
  beginner: '新手引导 · Caiwu 业务财务系统',
  'beginner-onboarding': '新手引导 · Caiwu 业务财务系统',
  'beginner-settings': '系统设置 · 新手引导',
  'beginner-daily': '运营日常 · 新手引导',
  userguide: '使用文档 · Caiwu 业务财务系统',
  'userguide-start': '开始使用 · 使用文档',
  'userguide-catalog': '商品与定价 · 使用文档',
  'userguide-order': '下单与支付 · 使用文档',
  'userguide-finance': '订单、账单与账务 · 使用文档',
  'userguide-service': '服务与工单 · 使用文档',
  'userguide-marketing': '营销与分销 · 使用文档',
  'userguide-site': '站点与内容 · 使用文档',
  'userguide-system': '系统设置与权限 · 使用文档',
  'userguide-logs': '日志与排查 · 使用文档',
  'userguide-faq': '常见问题 · 使用文档',
  devguide: '开发者文档 · Caiwu 业务财务系统',
  'devguide-quickstart': '快速开始 · 开发者文档',
  'devguide-backend': '后端开发 · 开发者文档',
  'devguide-api': '接口开发 · 开发者文档',
  'devguide-frontend': '前端开发 · 开发者文档',
  'devguide-plugin': '插件开发 · 开发者文档',
  'devguide-payment': '支付接口 · 开发者文档',
  'devguide-mail': '邮件接口 · 开发者文档',
  'devguide-sms': '短信接口 · 开发者文档',
  'devguide-captcha': '验证码接口 · 开发者文档',
  'devguide-hook': 'Hook 开发 · 开发者文档',
  'devguide-storage': '远端存储 · 开发者文档',
  'devguide-module': '模块开发 · 开发者文档',
  'devguide-standards': '开发规范 · 开发者文档',
  'devguide-database': '数据库与迁移 · 开发者文档',
  'devguide-deploy': '部署与运维 · 开发者文档',
  'devguide-verify': '测试与验证 · 开发者文档',
  demo: '实时预览 · Caiwu 业务财务系统',
  compare: '方案对比 · Caiwu 业务财务系统',
  scenarios: '适用场景 · Caiwu 业务财务系统',
  start: '开源上手 · Caiwu 业务财务系统',
}

// 每页的搜索摘要。留空的页面沿用首页 description。
const descriptions: Record<string, string> = {
  'not-found': '这个地址没有对应的页面，请从概览、使用文档或安装部署重新进入。',
  features:
    'Caiwu 的八个业务子域：商品与计费、订单与账单、开通与续费、服务管控、财务与台账、分销与增长、工单与通知、系统与治理，每条功能列出涉及的数据表。',
  architecture:
    'Laravel 12 + MySQL 8 + Redis 的后端分层与鉴权链，四组队列、插件边界与 db:upgrade 升级路径，附六个实现细节。',
  userguide: '面向管理员、财务、客服与客户的操作说明：商品、下单支付、账务、服务工单、营销、站点与系统设置。',
  'userguide-start': '四个入口分别给谁用、各角色的第一步、登录风控规则。',
  'userguide-catalog': '三层商品分类、产品配置与计费周期、CPU 机型与实例规格、上游供应同步。',
  'userguide-order': '从产品目录选配到支付与开通的完整路径，四种支付方式与状态含义。',
  'userguide-finance': '订单、账单、支付、台账四类记录的边界，退款路径与只追加的台账规则。',
  'userguide-service': '服务状态与六类控制台动作的三层门禁，工单四态与客服处理。',
  'userguide-marketing': '优惠券与活动、会员折扣、推广返佣与提现审核。',
  'userguide-site': '站点信息、首页 Banner、公告、帮助中心与媒体库。',
  'userguide-system': '员工与 67 个权限码、账户策略、自动化任务、集成插件与数据库维护。',
  'userguide-logs': '七类日志：运行、API、支付网关、短信邮件、调度与操作留痕。',
  'userguide-faq': '八个高频现象的处理入口：服务未开通、账单对不上、重复回调、验证码收不到等。',
  install: '从空服务器到四个站点上线：宝塔环境、伪静态、后端 .env、前端构建、定时任务与上线检查清单。',
  'install-requirements': '服务器规格、宝塔安装、PHP 扩展与必须放开的禁用函数 proc_open / putenv。',
  'install-sites': '四个站点的根目录、API 与前端两套伪静态、TRUSTED_PROXIES 与 SSL。',
  'install-backend': '后端 .env 关键项、install_db.py 与 db:upgrade 两条数据库路径、文件权限与缓存。',
  'install-frontend': '三个前端各自的构建变量、构建命令与产物发布。',
  'install-schedule': '每分钟 schedule:run 撑起四组队列，VNC Relay 独立守护，PHP 必须写绝对路径。',
  'install-firstrun': '上线后的八步配置顺序：站点、支付、短信邮件、验证码实名、上游、商品、权限、账户策略。',
  'install-troubleshoot': '502、刷新 404、Composer putenv 报错、队列不动、上传超限与缓存不生效。',
  'install-checklist': '发布前逐项核对：网络、站点、安全、后端、运行、前端、业务与运维共 18 项。',
  beginner: '上线后怎么配：五阶段上手、系统设置与验证码、运营日常与隐私服务。',
  'beginner-onboarding': '把站点从能打开推进到能做生意：五阶段的配置顺序。',
  'beginner-settings': '站点信息、管理员与权限码、验证码设置、站务设置与系统接口管理。',
  'beginner-daily': '任务与日志、自动化、用户与业务管理、商品与插件、日常问题与隐私服务。',
  devguide: '按开发环节组织的工程文档：启动、后端分层、接口契约、四端前端、插件、数据库、部署与验证。',
  'devguide-quickstart': '环境要求、后端启动、三个前端与 App 的运行方式，以及本地联调的注意事项。',
  'devguide-backend': 'Controller / FormRequest / Resource / Service 分层、23 个业务服务域与代码边界。',
  'devguide-api': '三套命名空间、统一响应外层、业务码、分页口径与限流阈值。',
  'devguide-frontend': '三个 Vue 端与 Flutter App 的目录约定、TDesign 规则与 shared 共享边界。',
  'devguide-plugin': '七个能力域的目录映射、config.php 写法、加载器预检与插件硬性约束。',
  'devguide-payment': 'PaymentGatewayInterface 的九个方法、预下单与回调入账链路。',
  'devguide-mail': 'MailDriver 契约、SMTP 与多 SMTP 轮询插件的配置与限流。',
  'devguide-sms': 'SmsDriver 契约、验证码模板契约与阿里云、Stay33 插件。',
  'devguide-captcha': 'GeeTest 与 Vaptcha 插件、登录风控触发条件与 captcha_required 载荷。',
  'devguide-hook': 'ScheduleHook 契约、13 个钩子点与清单注册方式。',
  'devguide-storage': 'media.storage 能力、六个 storage.* 动作与本地远程迁移命令。',
  'devguide-module': '以 Service 为域的模块边界、目录骨架与资金唯一写口。',
  'devguide-standards': '类型声明、注释、错误与日志、审查闭环、测试与提交规范。',
  'devguide-database': '订单、账单、支付、台账的职责边界，迁移只新增与 db:upgrade 升级入口。',
  'devguide-deploy': '单机宝塔拓扑、计划任务、Redis 分层、监控端点与回滚。',
  'devguide-verify': '各端验证命令、根 workspace 脚本、体积门禁与测试分层。',
  demo: '直接嵌入管理后台、用户控制台与官网门户的真实前端构建产物，可点击但无后端。',
  compare: '对象边界、资金记录、删除语义、权限模型等八个维度的设计取舍。',
  scenarios: '中小 IDC、云服务商与转售商、建站代运营团队、自建平台研发团队的适用与不适用场景。',
  start: 'AGPL-3.0 开源，从克隆到跑起来的最短路径与各端验证命令。',
}

function setMeta(name: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('name', name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

watch(
  () => route.name,
  (name) => {
    const key = String(name)
    document.title = titles[key] ?? titles.home
    const desc = descriptions[key]
    if (desc) setMeta('description', desc)
  },
  { immediate: true },
)
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.18s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
