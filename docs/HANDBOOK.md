# 墨栈 · 站点结构与更新指南

本文档从项目定案整理而来，供 session 结束后维护站点时查阅。站名、accent、部署平台等若有变更，请同步更新本文「定案速查表」。

---

## 一、整体怎么分模块

站点 = **一个 Astro 静态站** + **四类内容（Content Collections）** + **若干静态页**。

```
┌─────────────────────────────────────────────────────────┐
│  壳子：布局 / 导航 / 主题(明亮·暗黑·系统) / 搜索 / 字体   │
├─────────────────────────────────────────────────────────┤
│  首页 (E)：四入口 + 「最近动态」混排                      │
├──────────┬──────────┬──────────┬──────────────────────┤
│  notes   │  docs    │ resources│  palettes            │
│  笔记    │  文档    │  资源    │  配色（仅列表+JSON）  │
└──────────┴──────────┴──────────┴──────────────────────┘
```

| 模块 | 用途 | 典型内容 | 列表 | 详情页 |
|------|------|----------|------|--------|
| **notes** | 开发/学习随记、踩坑、短文 | 今天试了 Convex | `/notes` | 有 |
| **docs** | 系统整理、对比、教程笔记 | Auth 选型、部署备忘 | `/docs` | 有（TOC 由 meta 控制） |
| **resources** | 发现的库/服务/工具/npm | Clerk、nuqs、Lucide | `/resources` | **无（v1 仅列表）** |
| **palettes** | 收藏的中国色/参考配色 | 只此青绿、某落地页色 | `/palettes` | **无（v1 仅列表）** |

### 站点主题 vs 配色收藏（必须分离）

| 概念 | 作用 |
|------|------|
| **站点壳配色** | 暖石灰 + 炭墨 + 铜赭 accent（暂时）→ 导航、背景、按钮 |
| **palettes 收藏** | 只此青绿、中国色等 → **只存在 palettes 数据里**，不当全站主题 |

首页 **不展示** 配色条；配色仅在「配色」栏目查看。

---

## 二、推荐目录结构（实现后）

```text
src/
  content/
    notes/*.mdx
    docs/*.mdx
    resources/*.md
    palettes/*.md
  content.config.ts
  layouts/
    BaseLayout.astro
    PostLayout.astro
    DocLayout.astro
    ListLayout.astro
  pages/
    index.astro
    notes/...
    docs/...
    resources/index.astro
    palettes/index.astro
    search.astro
    palettes/[id].json.ts   # Agent 用 JSON，建议保留
  styles/global.css
public/fonts/
public/favicon.svg          # 主图标（随系统明暗）
public/favicon.ico          # 明亮模式回退
public/favicon-dark.ico     # 暗黑模式回退
docs/                       # 本手册与模板
```

---

## 三、各模块 Meta（frontmatter）

实现时用 Zod 校验。**(必填)** 表示建议必填。

### 1. `notes` — 笔记

```yaml
title: (必填) 显示标题
description: (必填) 摘要，列表/搜索用
pubDate: (必填) 2025-05-22
updatedDate: 可选
tags: [] 可选
draft: false 可选，true 则不构建、不列表
series: 可选
seriesOrder: 可选
```

**正文：** 过程、结论、代码片段、踩坑。使用 **MDX**。

**更新：** 在 `src/content/notes/` 新建 `slug.mdx`。

---

### 2. `docs` — 文档

```yaml
title: (必填)
description: (必填)
pubDate: (必填)
updatedDate: 可选
tags: [] 可选
draft: false 可选
toc: true | false   # 是否显示目录（按篇控制）
order: 可选
sidebar: 可选       # 侧栏分组，如「部署」
```

**正文：** 长文、对比、步骤。`toc: true` 用于多标题长文；`toc: false` 用于短文。

**更新：** `src/content/docs/xxx.mdx`。

---

### 3. `resources` — 资源（v1 仅列表）

```yaml
title: (必填)
description: (必填) 一句：是什么、为什么记
url: (必填)
type: (必填) ui | icons | npm | service | tool | template | article
category: (必填) auth | database | backend | storage | email | payments | observability | ai | styling | utils
stack: [] 可选，如 [nodejs, nextjs]
status: (必填) bookmarked | tried | using | deprecated
discoveredFrom: 可选
discoveredAt: (必填)
npm: 可选
github: 可选
pricing: 可选 free | freemium | paid | oss
tags: [] 可选
searchKeywords: [] 可选
draft: false 可选
```

**列表展示（无详情页）：** 依赖 frontmatter，勿把关键信息只写正文。

| status | 含义 |
|--------|------|
| bookmarked | 先收藏 |
| tried | 试过 |
| using | 在用 |
| deprecated | 不再推荐 |

**模板文件：** [templates/resource.md](templates/resource.md)

---

### 4. `palettes` — 配色（v1 仅列表 + Agent JSON）

```yaml
id: (必填) 稳定 slug，如 zhici-qinglv，勿随意改
title: (必填)
description: (必填)
style: light | dark | mixed
format: css-variables | tailwind | other
discoveredFrom: 可选
discoveredAt: (必填)
tags: [] 可选
searchKeywords: [] 可选
draft: false 可选
colors: (必填)
gradients: 可选
usage: 可选
```

**colors 每项：**

```yaml
colors:
  - name: 石青
    role: background | surface | text | muted | border | accent | accent-secondary | highlight | other
    hex: "#1e4d5c"
```

**usage 示例（给 Agent / Pencil）：**

```yaml
usage:
  nav: { background: 石青, text: 绢本 }
  buttonPrimary: { background: 青绿, text: 绢本 }
```

构建后应存在 **`/palettes/{id}.json`**，引用配色时用该 URL，勿从 HTML 猜色。

**模板文件：** [templates/palette.md](templates/palette.md)

---

## 四、首页「最近动态」

首页方案 **E · 门户分块**：

- 上部：四个入口（笔记 / 文档 / 资源 / 配色），可显示数量
- 下部：**最近动态**，从 notes + docs + resources 按日期降序取 N 条

| 列 | 来源 |
|----|------|
| 日期 | `pubDate` 或 `discoveredAt` |
| 类型 | notes / docs / resources |
| 标题 | `title` |
| 链接 | 笔记/文档 → 详情；资源 v1 → 列表页（或筛选锚点） |

---

## 五、日常更新流程

| 做什么 | 操作 |
|--------|------|
| 记 npm/服务 | `src/content/resources/<slug>.md`，复制 [templates/resource.md](templates/resource.md) |
| 写笔记 | `src/content/notes/<slug>.mdx`，复制 [templates/note.mdx](templates/note.mdx) |
| 写文档 | `src/content/docs/<slug>.mdx`，设 `toc`，复制 [templates/doc.mdx](templates/doc.mdx) |
| 收配色 | `src/content/palettes/<slug>.md`，复制 [templates/palette.md](templates/palette.md) |
| 预览 | `npm run dev` |
| 发布前 | `npm run build`（含 Pagefind 索引） |
| 改站名/壳色/字体 | 布局与 `global.css` / Tailwind theme；见定案速查表 |

---

## 六、技术与体验定案

| 项目 | 定案 |
|------|------|
| 框架 | Astro 6，静态站 |
| 首页 | E 门户 + 最近动态 |
| 站名 | 临时 **墨栈** |
| 部署 | **待定**（Vercel / Cloudflare / GitHub Pages） |
| CSS | Tailwind |
| 默认主题 | **明亮**（无 localStorage 时不加 `dark`） |
| 主题切换 | 明亮 / 暗黑 / 系统 |
| resources / palettes | **仅列表**，v1 无详情页 |
| docs TOC | frontmatter `toc: true \| false` |
| 内容格式 | notes/docs 用 **MDX**；resources 可用 `.md` |
| 搜索 | Pagefind（build 后生成） |
| RSS | v1 **不上** |
| 评论 | 无 |
| 语言 | 中文为主，不做 i18n |
| 字体 | Noto Sans SC 全文（含标题）；JetBrains Mono 代码；@fontsource 自托管 |
| 字体 fallback | 系统中文栈；**禁止 Google Fonts** |
| 壳 accent | 铜赭（**暂时**） |
| 布局 | 宽工具站，非窄栏博客 |
| Node | 资源/笔记侧重 Node 技术栈 |

---

## 七、给 Agent 的约定

详见 [AGENTS.md](AGENTS.md)。

---

## 八、Session 关闭后速记

1. 内容一律进 `src/content/<类型>/`
2. 对照第三节 meta 填 frontmatter
3. 资源/配色：**列表靠 meta**，详情页 v1 无
4. 配色给 AI 画图：说 `palette id: xxx` → `/palettes/xxx.json`
5. 壳色与 palettes **不要混**

---

## 九、相关文件

| 文件 | 说明 |
|------|------|
| [AGENTS.md](AGENTS.md) | AI 协作约定 |
| [templates/](templates/) | 四类内容复制模板 |
