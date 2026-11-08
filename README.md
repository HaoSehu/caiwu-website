# Caiwu 官网（产品介绍站）

面向 IDC / 云服务商，介绍 **Caiwu 业务财务系统** 的静态站点。不是营销获客落地页，而是把系统讲清楚：能力清单、对象边界、技术实现与开源入口。

## 运行

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # 产物在 dist/
npm run preview
```

技术栈：Vue 3 + Vite + TypeScript，无 UI 框架依赖，纯手写样式。

## 两个部分

| 目录 | 内容 |
| --- | --- |
| 根目录 | 产品介绍站（本 README 说明的对象） |
| `console-demo/` | 三端真实前端的静态演练版，被「实时预览」页以 iframe 嵌入 |

演练版的构建、数据来源与脱敏规则见 [console-demo/README.md](console-demo/README.md)。

## 目录

```
src/
├── App.vue                 # 页面编排
├── components/             # 顶部导航、页脚
├── sections/               # 各内容区块
├── data/content.ts         # 全站文案与数据（唯一内容真源）
├── styles/base.css         # 设计令牌与基础样式
└── assets/fonts/           # 思源黑体子集（woff2）
```

## 视觉

参照 cn.vuejs.org 的设计语言：深色渐变首屏、超大标题、左对齐的「小标题 + 说明」功能区、
文档站式的左导航右内容、深色代码块、深色多栏页脚。主色取 Vue 品牌绿 `#42b883`，深色区用 `#35495e`。

## 内容来源

`src/data/content.ts` 中所有条目均可在仓库中核对：

- 业务能力、数据对象、插件清单 → `backend/` 的控制器、服务域与 `plugins/` 目录
- 队列分组、调度、限流、响应规范 → `docs/ARCHITECTURE.md` 与 `backend/routes/`
- 权限码数量 → `backend/app/Support/AdminPermissions.php`

## 相关入口

- 代码仓库：https://github.com/HaoSehu/caiwu （AGPL-3.0）
- 接口文档：https://caiwu-api.apifox.cn
- 开发者交流群：QQ 994857138
