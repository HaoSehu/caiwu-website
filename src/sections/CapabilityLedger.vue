<template>
  <section id="capabilities" class="section">
    <div class="wrap">
      <p class="lede">
        左侧为业务子域，右侧是该子域下的功能项与涉及的数据表。所有条目在仓库中都有对应实现。
      </p>

      <div class="docs">
        <nav class="docs__nav" aria-label="能力子域">
          <a
            v-for="(g, i) in groups"
            :key="g.key"
            class="docs__nav-item"
            :class="{ 'is-active': active === i }"
            href="javascript:void(0)"
            :aria-current="active === i ? 'true' : undefined"
            @click.prevent="active = i"
          >
            {{ g.title }}
          </a>
        </nav>

        <div class="docs__body">
          <h3>{{ groups[active].title }}</h3>
          <p class="docs__desc">{{ groups[active].desc }}</p>

          <dl class="items">
            <div v-for="item in groups[active].items" :key="item.name" class="item">
              <dt>{{ item.name }}</dt>
              <dd>{{ item.note }}</dd>
            </div>
          </dl>

          <p class="tables">
            <span>涉及数据表</span>
            <code v-for="t in groups[active].tables" :key="t">{{ t }}</code>
          </p>
        </div>
      </div>

      <div class="extra">
        <div class="extra__block">
          <h4>工程约束</h4>
          <ul>
            <li v-for="rule in engineeringRules" :key="rule">
              <span class="extra__mark" aria-hidden="true"></span>{{ rule }}
            </li>
          </ul>
        </div>

        <div class="extra__block">
          <h4>插件能力域</h4>
          <ul class="plugins">
            <li v-for="g in pluginGroups" :key="g.dir">
              <span class="plugins__domain">{{ g.domain }}</span>
              <code>{{ g.dir }}</code>
              <span class="plugins__items">{{ g.items.join('、') }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { engineeringRules, pluginGroups } from '../data/content'

const active = ref(0)

const groups = [
  {
    key: 'catalog',
    title: '商品与计费',
    desc: '三层分类管理产品，配置与价格在下单时冻结为快照，后续调价不影响已生成的订单与账单。',
    tables: ['product_types', 'first_product_groups', 'products', 'product_configs'],
    items: [
      { name: '三层商品分类', note: '业务类型 → 一级分组 → 产品，官网按业务类型分组展示' },
      { name: '产品配置与定价', note: '配置项、计费周期、库存与起售价，支持与上游批量同步' },
      { name: '机型与规格目录', note: 'CPU 型号与实例规格独立维护，供产品配置引用' },
      { name: '优惠券', note: '活动绑定产品组，支持公开领取与定向发放，高额券单独授权' },
      { name: '会员等级与折扣', note: '按等级设置产品组折扣，结算时参与计价' },
    ],
  },
  {
    key: 'order',
    title: '订单与账单',
    desc: '订单记录契约，账单记录结算，支付记录真实入账。三者以 ID 互联，详情页各只展示自己那部分事实。',
    tables: ['orders', 'invoices', 'invoice_items', 'payments'],
    items: [
      { name: '下单与订单详情', note: '含配置快照与定价快照，仅在订单详情展示' },
      { name: '账单与行项目', note: '应付、实付、到期日与支付明细；账单详情不展示产品配置' },
      { name: '组合支付', note: '余额与支付宝混合支付，同一账单可拆分资金来源' },
      { name: '取消与退款', note: '取消订单与账单；退款走独立流程并写入台账' },
      { name: '人工补录', note: '订单与账单补录使用专用权限码，默认不下发任何角色' },
      { name: '对账', note: '账单与订单状态不一致时触发对账，标记待人工处理' },
    ],
  },
  {
    key: 'provision',
    title: '开通与续费',
    desc: '支付回调内同步履约，开通指令下发到上游插件；失败进入重试，长任务独占队列避免阻塞。',
    tables: ['orders', 'service_instances', 'integration_plugins'],
    items: [
      { name: '自动开通', note: '回调幂等触发，按上游 provider 下发开通指令' },
      { name: '失败重试与挂起', note: '按策略重试；超期未付或欠费按规则挂起、释放' },
      { name: '续费', note: '续费预览生成报价，确认后生成独立账单' },
      { name: '升级与降配', note: '升级按差价结算，生成独立订单' },
      { name: '流量包', note: '按实例追加流量，独立计价' },
      { name: '自动续费', note: '单个服务可开启，按周期自动生成账单' },
    ],
  },
  {
    key: 'service',
    title: '服务管控',
    desc: '控制台动作不做本地模拟，全部下发到上游 runtime 插件；执行前校验归属、业务状态与上游状态。',
    tables: ['service_instances', 'operation_logs', 'upstream_snapshots'],
    items: [
      { name: '电源操作', note: '开机、关机、重启、强制关机、强制重启' },
      { name: '重装与改密', note: '重装需指定系统镜像；改密成功后清空远程快照缓存' },
      { name: 'NAT 端口转发', note: '解析上游自定义模块后按端点提交创建与删除' },
      { name: '安全组', note: '规则的增删与应用；模块未开放时返回固定错误码' },
      { name: '监控', note: '代理上游图表数据并缓存 600 秒，支持强制刷新' },
      { name: 'VNC', note: '公开令牌 600 秒，兑换 60 秒一次性中转令牌，校验 Origin' },
      { name: '操作日志', note: '每次成功动作写入日志，记录操作人与结果' },
    ],
  },
  {
    key: 'finance',
    title: '财务与台账',
    desc: '账务以事件为单位记录。充值、退款、返佣、提现分属不同子域，各自结算、互不改写。',
    tables: ['finance_ledger', 'balance_accounts', 'referral_accounts'],
    items: [
      { name: '余额账户', note: '可用与冻结分离，扣减与退还均写台账' },
      { name: '充值', note: '生成支付单，回调入账；人工充值使用专用权限码' },
      { name: '账务台账', note: '14 类事件：支付、退款、充值、人工充扣、返佣冻结/释放/反转、提现申请/通过/驳回等' },
      { name: '报表与冲正', note: '按事件与子域汇总；冲正为新增反向事件，不改历史记录' },
      { name: '支付边界审计', note: '校验 payments 仅含第三方真实入账，余额支付不得落表' },
    ],
  },
  {
    key: 'growth',
    title: '分销与增长',
    desc: '返佣以账单实收额为基数，先冻结后释放；退款时对已释放奖励做反转，避免负余额。',
    tables: ['referrals', 'promotion_ambassadors', 'member_levels', 'referral_withdrawals'],
    items: [
      { name: '推荐绑定', note: '仅允许首次绑定；双方最近登录 IP 相同时拒绝' },
      { name: '奖励结算', note: '新购与续费费率分开，按推广大使档位取值，无档位回退全局费率' },
      { name: '冻结与释放', note: '奖励先入冻结子域，到期后释放到可用余额' },
      { name: '提现', note: '余额或支付宝，门槛可配，同一用户只允许一笔待处理' },
      { name: '会员权益', note: '等级折扣与专属价格，作用于商品组' },
    ],
  },
  {
    key: 'support',
    title: '工单与通知',
    desc: '工单是四态状态机，用户端、管理端与自动关闭任务共用同一套状态；通知按场景与渠道矩阵投递。',
    tables: ['tickets', 'ticket_replies', 'user_notifications', 'message_scenes'],
    items: [
      { name: '工单流程', note: '开启 → 客户回复 → 员工回复 → 已关闭，关闭原因区分管理员、用户与自动' },
      { name: '回复与撤回', note: '支持引用回复与撤回自己的回复；关闭后不可再回复' },
      { name: '催办与自动关闭', note: '超阈值未更新自动关闭；接近阈值时对员工已回复的工单催办一次' },
      { name: '站内通知', note: '按场景与用户偏好写入，模板渲染失败回退调用方文案' },
      { name: '邮件与短信', note: '按场景逐渠道展开，渠道未启用则跳过；多维限流' },
    ],
  },
  {
    key: 'system',
    title: '系统与治理',
    desc: '权限、插件、调度与日志构成这套系统的运维面，也是它能在生产环境长期运行的原因。',
    tables: ['staff', 'roles', 'permissions', 'integration_plugins'],
    items: [
      { name: '角色与权限码', note: '66 项权限码，63 处管理端权限门，敏感写操作单独授权' },
      { name: '插件管理', note: '启用、配置与连通性测试；敏感字段加密，前端仅显示是否已配置' },
      { name: '调度与队列', note: '查看队列分组、触发任务、重试失败任务' },
      { name: '日志', note: '操作与接口日志，按用户、路径、时间检索' },
      { name: '系统就绪检查', note: '数据库、队列、缓存与上游连通性一次性体检' },
      { name: '登录风控', note: '验证码通道按失败次数触发；未启用时以账号与 IP 软锁定兜底' },
    ],
  },
]
</script>

<style scoped>
.lede {
  padding-bottom: var(--s5);
  border-bottom: 1px solid var(--divider);
  max-width: 76ch;
  font-size: 14.5px;
  line-height: 1.9;
  color: var(--text-2);
}

/* 文档站式两栏：左导航 + 右内容，没有卡片阴影 */
.docs {
  display: grid;
  grid-template-columns: 200px minmax(0, 1fr);
  gap: var(--s8);
  margin-top: var(--s6);
}

.docs__nav {
  display: flex;
  flex-direction: column;
  border-left: 1px solid var(--divider);
}

.docs__nav-item {
  padding: 8px var(--s4);
  font-size: 14px;
  color: var(--text-2);
  border-left: 2px solid transparent;
  margin-left: -1px;
  transition: color 0.2s var(--ease), border-color 0.2s var(--ease);
}

.docs__nav-item:hover {
  color: var(--green-darker);
}

.docs__nav-item.is-active {
  color: var(--green-darker);
  border-left-color: var(--green);
  font-weight: 600;
}

.docs__body h3 {
  font-size: 22px;
  letter-spacing: 0;
}

.docs__desc {
  margin-top: var(--s3);
  font-size: 14.5px;
  line-height: 1.85;
  color: var(--text-2);
  max-width: 72ch;
}

.items {
  margin: var(--s5) 0 0;
}

.item {
  display: grid;
  grid-template-columns: 176px minmax(0, 1fr);
  gap: var(--s4);
  padding: 11px 0;
  border-top: 1px solid var(--divider);
}

.item dt {
  font-size: 13.5px;
  font-weight: 600;
  color: var(--text-1);
}

.item dd {
  margin: 0;
  font-size: 13.5px;
  line-height: 1.8;
  color: var(--text-2);
}

.tables {
  margin-top: var(--s4);
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
  font-size: 12px;
  color: var(--text-3);
}

.tables > span {
  margin-right: 4px;
}

.tables code {
  font-size: 11.5px;
  color: var(--text-2);
  background: var(--white-mute);
  border-radius: 3px;
  padding: 2px 8px;
}

/* 附加区：两栏，无卡片 */
.extra {
  margin-top: var(--s8);
  padding-top: var(--s6);
  border-top: 1px solid var(--divider);
  display: grid;
  grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
  gap: var(--s8);
}

.extra__block h4 {
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0;
}

.extra__block ul {
  list-style: none;
  margin: var(--s3) 0 0;
  padding: 0;
}

.extra__block > ul > li {
  display: flex;
  align-items: baseline;
  gap: 10px;
  font-size: 13.5px;
  color: var(--text-2);
  padding: 8px 0;
  border-bottom: 1px solid var(--divider);
  line-height: 1.7;
}

.extra__mark {
  flex: none;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--green);
  margin-top: 0.65em;
}

.plugins li {
  flex-wrap: wrap;
  gap: 8px !important;
}

.plugins__domain {
  flex: none;
  width: 84px;
  color: var(--text-1);
  font-weight: 600;
  font-size: 13px;
}

.plugins code {
  flex: none;
  font-size: 11px;
  color: var(--green-darker);
  background: rgba(66, 184, 131, 0.12);
  border-radius: 3px;
  padding: 1px 7px;
}

.plugins__items {
  font-size: 12.5px;
  color: var(--text-3);
}

@media (max-width: 980px) {
  .docs {
    grid-template-columns: 1fr;
    gap: var(--s4);
  }

  .docs__nav {
    flex-direction: row;
    flex-wrap: wrap;
    border-left: 0;
    border-bottom: 1px solid var(--divider);
    padding-bottom: var(--s2);
  }

  .docs__nav-item {
    border-left: 0;
    border-bottom: 2px solid transparent;
    margin-left: 0;
    padding: 7px 12px;
  }

  .docs__nav-item.is-active {
    border-bottom-color: var(--green);
  }

  .extra {
    grid-template-columns: 1fr;
    gap: var(--s6);
  }
}

@media (max-width: 620px) {
  .item {
    grid-template-columns: 1fr;
    gap: 4px;
  }
}
</style>
