---
title: Context7（文档 MCP + skill）
description: 查库/框架最新文档与示例，避免只靠训练数据过时。
url: https://context7.com/docs
type: service
category: ai
stack: [cursor, mcp]
status: using
discoveredFrom: 项目 MCP + context7-mcp skill
discoveredAt: 2026-05-24
tags: [skill, mcp, documentation, agent]
searchKeywords: [context7, 库文档, MCP, resolve-library-id]
draft: false
---

## 何时用

用户问第三方库配置、API、迁移、CLI 用法时（React、Astro、Prisma 等）。

## Skill 工作流

1. `resolve-library-id`（库名 + 用户问题）
2. `query-docs`（选中的 library ID + 完整问题）

## 本机 skill

`~/.claude/skills/context7-mcp`（仓库内为实体目录，非符号链接）。

安装 MCP 见 [context7.com/install](https://context7.com/install)。
