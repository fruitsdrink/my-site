---
title: create-rule（Cursor 内置）
description: 创建 .cursor/rules 与持久化编码约定（含 AGENTS.md、RULE.md）。
url: https://cursor.com/docs/context/rules
type: tool
category: ai
stack: [cursor]
status: using
discoveredFrom: ~/.cursor/skills-cursor/create-rule
discoveredAt: 2026-05-24
tags: [skill, cursor, rules]
searchKeywords: [create-rule, .cursor/rules, 项目规则]
draft: false
---

## 说明

Cursor 自带 skill，用于新增或调整 **Rules**（始终应用 / 按 glob / 智能应用）。

## 与 Skill 的分工

| | Rules | Skills |
|--|-------|--------|
| 形态 | `.cursor/rules/*.mdc` 等 | 文件夹 + `SKILL.md` |
| 典型用途 | 仓库级硬性约定 | 任务型工作流、脚本 |
| 迁移 | `/migrate-to-skills` 可把部分动态 rule 转为 skill |

墨栈仓库的 `docs/AGENTS.md`、`.cursor/rules/docs-sync.mdc` 属于规则层，不是 skill 条目。
