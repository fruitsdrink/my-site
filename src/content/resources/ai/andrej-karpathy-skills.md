---
title: karpathy-guidelines（Andrej Karpathy）
description: 四条行为准则：先想清楚、极简实现、手术式改动、可验证目标；针对 LLM 乱假设、过度设计、顺手改无关代码。
url: https://github.com/multica-ai/andrej-karpathy-skills
type: tool
category: ai
stack: [cursor, claude]
status: bookmarked
discoveredFrom: multica-ai/andrej-karpathy-skills
discoveredAt: 2026-05-24
github: https://github.com/multica-ai/andrej-karpathy-skills
tags: [skill, agent, guidelines, karpathy]
searchKeywords: [karpathy, karpathy-guidelines, andrej-karpathy-skills, 编码准则, CLAUDE.md]
draft: false
---

源自 [Karpathy 对 LLM 写代码问题的观察](https://x.com/karpathy/status/2015883857489522876)。仓库内 skill 名为 **`karpathy-guidelines`**。

## 四条原则

| 原则 | 针对的问题 |
|------|------------|
| Think Before Coding | 静默假设、不澄清、不提 tradeoff |
| Simplicity First | 过度抽象、功能蔓延 |
| Surgical Changes | 顺手改无关代码/注释 |
| Goal-Driven Execution | 模糊「修好就行」、缺少可验证标准 |

## 安装（Agent Skill）

```bash
npx skills add multica-ai/andrej-karpathy-skills@karpathy-guidelines -g -y
```

Skill 源文件：[`skills/karpathy-guidelines/SKILL.md`](https://github.com/multica-ai/andrej-karpathy-skills/tree/main/skills/karpathy-guidelines)。

## Cursor

- **本项目已克隆时**：规则在 [`.cursor/rules/karpathy-guidelines.mdc`](https://github.com/multica-ai/andrej-karpathy-skills/blob/main/.cursor/rules/karpathy-guidelines.mdc)，`alwaysApply: true`。
- **其它项目**：复制该 `.mdc` 到目标仓库的 `.cursor/rules/`，或把 [`CLAUDE.md`](https://github.com/multica-ai/andrej-karpathy-skills/blob/main/CLAUDE.md) 合并进项目说明。

详见仓库 [CURSOR.md](https://github.com/multica-ai/andrej-karpathy-skills/blob/main/CURSOR.md)。

## Claude Code

```bash
curl -o CLAUDE.md https://raw.githubusercontent.com/multica-ai/andrej-karpathy-skills/main/CLAUDE.md
```

或使用 Claude Code 插件（见仓库 README；插件包名 `andrej-karpathy-skills`）。

## 备注

偏**谨慎而非速度**； trivial 修改可酌情简化。可与项目自有 `AGENTS.md` / rules 合并，不必替代领域规范。
