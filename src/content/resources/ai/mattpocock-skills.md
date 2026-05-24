---
title: mattpocock/skills
description: 工程向 Agent Skills 合集：TDD、排障、PRD/拆 issue、triage、写 skill 等。
url: https://github.com/mattpocock/skills
type: tool
category: ai
stack: [cursor, claude]
status: using
discoveredFrom: 本机 ~/.agents/skills
discoveredAt: 2026-05-24
github: https://github.com/mattpocock/skills
tags: [skill, agent, engineering]
searchKeywords: [matt pocock, tdd, grill-me, to-issues, setup-matt-pocock-skills]
draft: false
---

## 安装（按需挑选）

```bash
npx skills add mattpocock/skills@tdd -g -y
npx skills add mattpocock/skills@write-a-skill -g -y
npx skills add mattpocock/skills@setup-matt-pocock-skills -g -y
```

新仓库首次用工程类 skill 前，先跑 **`setup-matt-pocock-skills`**（issue tracker、triage 标签、`docs/agents/`）。

## 本机已装（节选）

| Skill | 用途 |
|-------|------|
| `tdd` | 红-绿-重构，竖切交付 |
| `diagnose` | 难 bug / 性能回归 |
| `write-a-skill` | 写新 skill 的结构与清单 |
| `grill-me` / `grill-with-docs` | 拷问方案、对齐领域语言 |
| `to-prd` / `to-issues` | 从对话出 PRD、拆 issue |
| `triage` | issue 状态机 |
| `prototype` | 可玩原型验证设计 |
| `caveman` | 极简回复省 token |

路径：`~/.agents/skills/<name>`。
