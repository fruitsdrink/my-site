# 墨栈 · 站点结构与更新指南

本文档从项目定案整理而来，供 session 结束后维护站点时查阅。站名、accent、部署平台等若有变更，请同步更新本文「定案速查表」。

---

## 文档与代码同步（必读）

**凡改动影响站点行为、路由、内容 schema、导航或维护流程的代码，必须在同一变更中更新文档。**

| 改了什么 | 应更新 |
|----------|--------|
| 新增/删除 Content Collection、字段 | 本文第三节 meta、`content.config.ts` 注释、[templates/](templates/) |
| 新增/删除页面路由、筛选逻辑 | 本文第二节目录、第四节（资源筛选）、[AGENTS.md](AGENTS.md) |
| 首页入口、feed、导航、页脚 | 本文第一、四节；`site.config.ts` 若改描述/社交 |
| 部署 URL、构建命令 | 本文第六节定案表、`astro.config.mjs` |
| 仅改单篇内容 | 只改 `src/content/`，一般不必改手册 |

Agent 与人类维护者均遵守；PR / 提交前对照上表自检。

---

## 一、整体怎么分模块

站点 = **一个 Astro 静态站** + **六类内容（Content Collections）** + **壳子（导航 / 主题 / 搜索 / 页脚）**。

```
┌──────────────────────────────────────────────────────────────────┐
│  壳子：布局 / 导航 / 主题 / 搜索 / 页脚(社交链接)                  │
├──────────────────────────────────────────────────────────────────┤
│  首页 (E)：六入口 + 「最近动态」混排                                │
├─────────┬─────────┬──────────┬─────────────┬──────────┬────────┤
│  notes  │  docs   │ projects │ discoveries │resources │palettes│
│  笔记   │  文档   │  作品    │  开源发现   │  资源    │  配色  │
└─────────┴─────────┴──────────┴─────────────┴──────────┴────────┘
```

| 模块 | 用途 | 典型内容 | 列表 | 详情页 |
|------|------|----------|------|--------|
| **notes** | 开发/学习随记、踩坑、短文 | 今天试了 Convex | `/notes` | 有 |
| **docs** | 系统整理、对比、教程笔记 | Auth 选型、部署备忘 | `/docs` | 有（TOC 由 meta 控制） |
| **projects** | 个人开发与开源作品 | chronovia-desk | `/projects` | 有 |
| **discoveries** | 别人维护的开源仓库/产品 | 花笺 floral-notepaper | `/discoveries` | **无单条详情** |
| **resources** | 开发用库/服务/npm/参考站 | Clerk、nuqs、Pexels | `/resources` | **无单条详情**；有类型/分类筛选页 |
| **palettes** | 收藏的中国色/参考配色 | 只此青绿 | `/palettes` | **无（v1 仅列表）** |

### 站点主题 vs 配色收藏（必须分离）

| 概念 | 作用 |
|------|------|
| **站点壳配色** | 暖石灰 + 炭墨 + 铜赭 accent（暂时）→ 导航、背景、按钮 |
| **palettes 收藏** | 只此青绿、中国色等 → **只存在 palettes 数据里**，不当全站主题 |

首页 **不展示** 配色条；配色仅在「配色」栏目查看。

### 全站页脚与社交

- 组件：`src/components/SiteFooter.astro`
- 配置：`src/site.config.ts` → `author`、`social[]`（`label`、`href`、`icon`）
- 新增社交平台：扩展 `social` 数组；新图标类型需在 `SiteFooter.astro` 增加对应 SVG 分支

---

## 二、推荐目录结构

```text
src/
  content/
    notes/*.mdx
    docs/*.mdx
    projects/*.mdx
    discoveries/*.md           # 开源发现
    resources/**/*.md          # 可用子目录，如 inspiration/
    palettes/*.md
  content.config.ts
  site.config.ts               # 站名、描述、作者、社交链接
  layouts/
    BaseLayout.astro           # Header + main + Footer
    PostLayout.astro
    DocLayout.astro
    ProjectLayout.astro
  components/
    SiteHeader.astro
    SiteFooter.astro
    DiscoveriesTable.astro
    ResourcesTable.astro
    ResourcesFilterBar.astro
  pages/
    index.astro
    notes/...
    docs/...
    projects/index.astro
    projects/[...slug].astro
    discoveries/index.astro
    resources/index.astro
    resources/type/[type].astro
    resources/category/[category].astro
    resources/type/[type]/category/[category].astro
    palettes/index.astro
    search.astro
    palettes/[id].json.ts
    palettes/index.json.ts
  lib/
    collections.ts
    feed.ts
    discoveries.ts             # 开源发现排序、状态文案
    resources.ts               # 筛选 URL、枚举、排序
  styles/global.css
public/
  favicon.svg, favicon.ico, favicon-dark.ico
docs/
  HANDBOOK.md                  # 本手册
  AGENTS.md
  templates/
```

---

## 三、各模块 Meta（frontmatter）

实现时用 Zod 校验（`src/content.config.ts`）。**(必填)** 表示 schema 要求。

### 1. `notes` — 笔记

```yaml
title: (必填)
description: (必填)
pubDate: (必填) 2025-05-22
updatedDate: 可选
tags: [] 可选
draft: false 可选
series: 可选
seriesOrder: 可选
```

**正文：** MDX。**更新：** `src/content/notes/<slug>.mdx`，模板 [templates/note.mdx](templates/note.mdx)。

---

### 2. `docs` — 文档

```yaml
title: (必填)
description: (必填)
pubDate: (必填)
updatedDate: 可选
tags: [] 可选
draft: false 可选
toc: true | false
order: 可选
sidebar: 可选
```

**正文：** MDX。**更新：** `src/content/docs/<slug>.mdx`，模板 [templates/doc.mdx](templates/doc.mdx)。

---

### 3. `projects` — 作品

```yaml
title: (必填)
description: (必填)
github: (必填) 项目仓库 URL
cover: (必填) 列表卡片封面图 URL
coverAlt: 可选
downloadUrl: 可选  如 Releases
stack: [] 可选
status: active | maintenance | archived  默认 active
pubDate: (必填)
updatedDate: 可选
tags: [] 可选
draft: false 可选
```

**列表：** 左图右文卡片。**详情：** `ProjectLayout` 含 GitHub / 下载按钮 + MDX 正文。

**更新：** `src/content/projects/<slug>.mdx`，模板 [templates/project.mdx](templates/project.mdx)。

---

### 4. `discoveries` — 开源发现

```yaml
title: (必填)
description: (必填)
github: (必填) 仓库 URL
stack: [] 可选
status: (必填) bookmarked | tried | using | deprecated
discoveredFrom: 可选
discoveredAt: (必填)
introUrl: 可选  作品介绍/演示视频
license: 可选  如 MIT
tags: [] 可选
searchKeywords: [] 可选
draft: false 可选
```

**列表：** 表格（名称链 GitHub、技术栈、状态、日期）；名称下可显示许可证、`introUrl`（介绍）、来源。**无单条详情页。**

与 **projects**（个人作品）和 **resources**（npm/SaaS/图库等开发资源）分开收录。

**更新：** `src/content/discoveries/<slug>.md`，模板 [templates/discovery.md](templates/discovery.md)

---

### 5. `resources` — 资源

```yaml
title: (必填)
description: (必填)
url: (必填)
type: (必填) ui | icons | npm | service | tool | template | article
category: (必填) auth | database | backend | storage | email | payments | observability | ai | styling | utils
stack: [] 可选
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

**列表：** 表格（名称、类型、分类、状态、日期）；类型/分类可点击筛选。**无单条详情页。**

**筛选路由（可组合，AND）：**

| URL | 含义 |
|-----|------|
| `/resources` | 全部 |
| `/resources/type/{type}` | 仅类型 |
| `/resources/category/{category}` | 仅分类 |
| `/resources/type/{type}/category/{category}` | 类型 + 分类（仅生成内容中存在的组合） |

筛选条可单独移除某一维或「清除全部」。枚举与 URL 生成见 `src/lib/resources.ts`。

**子目录：** 如 `resources/inspiration/*.md` 仅作文件组织，`category` 仍须符合 schema。

**模板：** [templates/resource.md](templates/resource.md)

---

### 6. `palettes` — 配色

```yaml
id: (必填) 稳定 slug
title: (必填)
description: (必填)
style: light | dark | mixed
format: css-variables | tailwind | other
discoveredFrom: 可选
sourceUrl: (必填) 原文/作品链接，用于署名与免责
sourceTitle: 可选 来源标题（链接文字；缺省用 discoveredFrom）
sourceAuthor: 可选 作者/公众号名（列表展示为「作者 · 标题」）
sourceAuthorUrl: 可选 作者主页；无则作者仅文本
discoveredAt: (必填)
tags: [] 可选
searchKeywords: [] 可选
draft: false 可选
colors: (必填)
gradients: 可选
usage: 可选
```

构建后 **`/palettes/{id}.json`** 供 Agent 引用。**模板：** [templates/palette.md](templates/palette.md)

**收录去重（必做）：** 新增或批量导入配色后运行 `npm run check:palettes`（`npm run build` 会自动执行）。脚本检查：

| 检查项 | 失败时 |
|--------|--------|
| `id` 唯一 | 报错，禁止构建 |
| `title` 唯一（非 draft） | 报错 |
| 全部 `colors[].hex` 组合相同 | 报错（视为重复配色） |
| 文件名与 `id` 不一致 | 警告 |
| 同一 `sourceUrl` 或正文中的公众号链接 | 控制台列出已有 `id`（同源多篇如系列配色属正常，但新增前需确认不是重复收录） |

`sourceUrl` **必填**；`sourceTitle` 建议填写便于展示。检查脚本会拒绝无来源的条目；正文中的公众号链接仍可作为同源去重辅助。

---

## 四、首页「最近动态」

首页 **E · 门户分块**：

- 上部：**六入口**（笔记 / 文档 / 作品 / 开源发现 / 资源 / 配色），显示数量
- 下部：**最近动态**，从 notes + docs + projects + discoveries + resources 按日期降序取 N 条（`SITE.homeFeedLimit`）

| 列 | 来源 |
|----|------|
| 日期 | `pubDate` 或 `discoveredAt` |
| 类型 | 笔记 / 文档 / 作品 / 开源发现 / 资源 |
| 标题 | `title` |
| 链接 | 笔记、文档、作品 → 详情；开源发现 → `/discoveries`；资源 → `/resources` |

---

## 五、日常更新流程

| 做什么 | 操作 |
|--------|------|
| 记开源仓库/产品 | `src/content/discoveries/<slug>.md`，[templates/discovery.md](templates/discovery.md) |
| 记 npm/服务 | `src/content/resources/<slug>.md`，[templates/resource.md](templates/resource.md) |
| 写笔记 | `src/content/notes/<slug>.mdx`，[templates/note.mdx](templates/note.mdx) |
| 写文档 | `src/content/docs/<slug>.mdx`，[templates/doc.mdx](templates/doc.mdx) |
| 上架作品 | `src/content/projects/<slug>.mdx`，[templates/project.mdx](templates/project.mdx) |
| 收配色 | 先 `npm run check:palettes` 确认未重复 → `src/content/palettes/<slug>.md`（`id` = 文件名），[templates/palette.md](templates/palette.md) |
| 改社交/站名 | `src/site.config.ts` + 必要时 `SiteFooter.astro` |
| 改资源筛选枚举 | `src/lib/resources.ts` + `content.config.ts` + **本文第三节、第四节** |
| 预览 | `npm run dev` |
| 发布前 | `npm run check:palettes` → `npm run build`（构建已含检查 + Pagefind） |
| **改路由/集合/壳子** | **同步更新本文 + [AGENTS.md](AGENTS.md)** |

---

## 六、技术与体验定案

| 项目 | 定案 |
|------|------|
| 框架 | Astro 6，静态站 |
| 首页 | E 门户（六入口）+ 最近动态 |
| 站名 | 临时 **墨栈** |
| 部署 | **Cloudflare Workers**，`https://mostack.fruitsdrink.workers.dev`（`astro.config.mjs` → `site`） |
| CSS | Tailwind |
| 默认主题 | **明亮** |
| 主题切换 | 明亮 / 暗黑 / 系统 |
| discoveries | 列表；**无单条详情** |
| resources | 列表 + 类型/分类筛选；**无单条详情** |
| palettes | 仅列表 + JSON；v1 无 HTML 详情 |
| projects | 列表 + 详情 |
| docs TOC | frontmatter `toc` |
| 内容格式 | notes / docs / projects → MDX；discoveries / resources / palettes → `.md` |
| 搜索 | Pagefind（build 后） |
| RSS / 评论 | v1 无 |
| 语言 | 中文为主 |
| 字体 | Noto Sans SC + JetBrains Mono；@fontsource；禁止 Google Fonts |
| 壳 accent | 铜赭（暂时） |
| 布局 | 宽工具站；全站页脚含社交链接 |

---

## 七、给 Agent 的约定

详见 [AGENTS.md](AGENTS.md)。**改代码须同步改文档**（见本文开头）。

---

## 八、Session 关闭后速记

1. 内容进 `src/content/<类型>/`
2. 对照第三节 meta
3. 资源靠 meta + 筛选路由；配色给 AI 用 `/palettes/{id}.json`
4. 壳色与 palettes 不要混
5. **动 schema / 路由 / 导航 / 页脚 → 更新 HANDBOOK + AGENTS**

---

## 九、相关文件

| 文件 | 说明 |
|------|------|
| [AGENTS.md](AGENTS.md) | AI 协作约定（含文档同步） |
| [templates/](templates/) | 六类内容复制模板 |
