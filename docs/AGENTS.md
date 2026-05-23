# Agent 协作约定 · 墨栈

供 Cursor / 其他 Agent 在本仓库内实现或改内容时阅读。

## 文档与代码同步（强制）

**完成任何影响站点结构、路由、Content Collection schema、导航、页脚、筛选逻辑或构建/部署方式的代码变更后，必须在同一任务中更新文档。**

| 优先更新 | 文件 |
|----------|------|
| 维护流程、meta、目录、定案 | [HANDBOOK.md](HANDBOOK.md) |
| Agent 行为、路径、定案摘要 | 本文件 [AGENTS.md](AGENTS.md) |
| 新增 frontmatter 字段 | 对应 [templates/](templates/) + HANDBOOK 第三节 |

仅修改 `src/content/` 下某一篇正文、且未改 schema/路由时，可不改手册。

提交前自检：手册描述是否与 `src/pages/`、`content.config.ts`、`site.config.ts` 一致。

---

## 项目是什么

个人 Node 向知识库：笔记、文档、个人作品、开源发现、开发资源、UI 配色。静态 Astro 站，中文为主。

## 定案（勿擅自改除非用户要求）

- **首页：** 门户 E（**六入口** + 最近动态），首页无配色条
- **站名：** 临时「墨栈」
- **projects：** 列表 + 详情页（**个人作品**）
- **discoveries：** 列表；**无单条详情**（**别人的开源仓库/产品**）
- **resources：** 列表 + 类型/分类/组合筛选；**无单条详情**（npm/SaaS/图库等）
- **palettes：** v1 仅列表 + `/palettes/{id}.json`，无 HTML 详情
- **docs：** `toc` 由每篇 frontmatter 控制
- **MDX：** notes、docs、projects
- **主题：** 默认明亮；明亮 / 暗黑 / 系统
- **页脚：** `SiteFooter` + `site.config.ts` 的 `social`
- **RSS：** v1 无
- **部署：** Cloudflare Workers — `https://mostack.fruitsdrink.workers.dev`

## 配色引用（重要）

- 站点壳主题与 **palettes 收藏** 分离
- 勿用 palettes 驱动全站 CSS
- 用户说「参考某配色」：读 `/palettes/{id}.json` 或 `src/content/palettes/`
- 使用 JSON 的 `colors[]`、`usage` 等，勿从 HTML 猜 hex

## 字体

- 正文与标题：Noto Sans SC
- 代码：JetBrains Mono
- `@fontsource` 自托管，**不用 Google Fonts**

## 内容位置

| 类型 | 路径 | 详情页 |
|------|------|--------|
| notes | `src/content/notes/*.mdx` | `/notes/{id}` |
| docs | `src/content/docs/*.mdx` | `/docs/{id}` |
| projects | `src/content/projects/*.mdx` | `/projects/{id}` |
| discoveries | `src/content/discoveries/*.md` | 无 |
| resources | `src/content/resources/**/*.md` | 无（筛选见下） |
| palettes | `src/content/palettes/*.md` | 无（仅 JSON） |

Meta 定义见 [HANDBOOK.md](HANDBOOK.md)。

## 开源发现 vs 资源 vs 作品

- **discoveries**：别人维护的 GitHub 仓库/开源产品；必填 `github` URL；勿与个人作品或 npm 包条混放
- **projects**：本人作品；必填 `cover`、详情页
- **resources**：开发中用的服务、npm、UI 参考等；必填 `url` + `type` + `category`

## 配色收录

- **新增 palette 前** 运行 `npm run check:palettes`；构建会自动执行
- 禁止重复：`id`、标题、相同 `colors` 色值组合
- `id` 与文件名一致；**必填 `sourceUrl`**；建议填 `sourceTitle`；有作者则填 `sourceAuthor`（可选 `sourceAuthorUrl`）
- 若检查列出同一来源下已有 `id`，先确认不是重复收录再添加

## 资源筛选（实现参考）

- 逻辑与枚举：`src/lib/resources.ts`
- 组件：`ResourcesTable.astro`、`ResourcesFilterBar.astro`
- 组合 URL：`/resources/type/{type}/category/{category}`（静态路径仅含实际数据组合）
- 改 `RESOURCE_TYPES` / `RESOURCE_CATEGORIES` 时同步 `content.config.ts` 与 HANDBOOK

## 开源发现（实现参考）

- 排序与状态文案：`src/lib/discoveries.ts`
- 列表组件：`DiscoveriesTable.astro`
- 页面：`/discoveries`

## 维护手册

人类维护流程、meta、模板：[HANDBOOK.md](HANDBOOK.md)
