---
title: find-skills
description: 在对话里帮用户搜索、评估并从 skills.sh 安装 Agent Skill。
url: https://skills.sh/vercel-labs/skills/find-skills
type: tool
category: ai
stack: [cursor, claude]
status: using
discoveredFrom: npx skills
discoveredAt: 2026-05-24
github: https://github.com/vercel-labs/skills
tags: [skill, agent, discovery]
searchKeywords: [find-skills, 找 skill, npx skills find]
draft: false
---

## 安装

```bash
npx skills add https://github.com/vercel-labs/skills --skill find-skills -g -y
```

## 何时用

用户问「有没有 skill 能做 X」「帮我找一个 skill」、想扩展 Agent 能力时。

## 本机

`~/.agents/skills/find-skills`（`~/.claude/skills` 下为符号链接）。
