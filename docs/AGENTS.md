# Agent 协作约定 · 墨栈

供 Cursor / 其他 Agent 在本仓库内实现或改内容时阅读。

## 项目是什么

个人 Node 向知识库：笔记、文档、开发中发现的服务与 npm 包、收藏的 UI 配色。静态 Astro 站，中文为主。

## 定案（勿擅自改除非用户要求）

- **首页：** 门户 E（四入口 + 最近动态），首页无配色条
- **站名：** 临时「墨栈」
- **resources / palettes：** v1 仅列表页，无详情页
- **docs：** `toc` 由每篇 frontmatter 控制
- **MDX：** notes、docs 使用 MDX
- **主题：** 默认明亮；支持明亮 / 暗黑 / 系统
- **RSS：** v1 无
- **部署：** 未定

## 配色引用（重要）

- 站点壳主题（暖石灰、炭墨、铜赭）与 **palettes 收藏** 分离
- 勿用 palettes 数据驱动全站 CSS 主题
- 用户说「参考某配色」时：读取 `/palettes/{id}.json` 或 `src/content/palettes/` 对应文件
- 使用 JSON 中的 `colors[]`、`usage`、`cssVariables`（若存在），勿从 HTML 或截图猜 hex

## 字体

- 正文与标题：Noto Sans SC（`font-display` 同栈，标题用字重区分）
- 代码：JetBrains Mono
- `@fontsource` 自托管，**不用 Google Fonts**
- fallback：系统中文栈

## 内容位置

| 类型 | 路径 |
|------|------|
| notes | `src/content/notes/*.mdx` |
| docs | `src/content/docs/*.mdx` |
| resources | `src/content/resources/*.md` |
| palettes | `src/content/palettes/*.md` |

Meta 定义见 [HANDBOOK.md](HANDBOOK.md)。

## 维护手册

人类维护流程、meta 字段、模板：[HANDBOOK.md](HANDBOOK.md)
