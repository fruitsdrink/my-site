---
title: create-skill（Cursor 内置）
description: 在 Cursor 里编写 Agent Skill（SKILL.md 结构、触发描述、scripts/ 等）。
url: https://cursor.com/docs/context/skills
type: tool
category: ai
stack: [cursor]
status: using
discoveredFrom: ~/.cursor/skills-cursor/create-skill
discoveredAt: 2026-05-24
tags: [skill, cursor, authoring]
searchKeywords: [create-skill, SKILL.md, .cursor/skills, .agents/skills]
draft: false
---

## 说明

Cursor 自带 skill，**无需** `npx skills add`。在 Agent 对话中提及「写 skill / SKILL.md」时会自动匹配。

## 目录约定（Cursor 文档）

| 路径 | 作用域 |
|------|--------|
| `.agents/skills/` | 项目 |
| `.cursor/skills/` | 项目 |
| `~/.agents/skills/` | 用户全局 |
| `~/.cursor/skills/` | 用户全局 |

兼容加载 `~/.claude/skills/`、`~/.codex/skills/`。

## 与生态 skill 的关系

- 写 **Cursor 项目/个人 skill** → 本内置 + [write-a-skill](mattpocock-skills.md)
- 写 **可发布到 skills.sh 的 skill** → [skill-creator](skill-creator.md) 或 anthropics 流程
