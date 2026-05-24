---
title: skill-creator
description: 带评测与迭代的 Skill 创作流程：起草、跑用例、对比有无 skill 的效果。
url: https://skills.sh/anthropics/skills/skill-creator
type: tool
category: ai
stack: [cursor, claude]
status: bookmarked
discoveredFrom: anthropics/skills
discoveredAt: 2026-05-24
github: https://github.com/anthropics/skills
tags: [skill, agent, authoring]
searchKeywords: [skill-creator, 写 skill, eval, anthropics]
draft: false
---

## 安装

```bash
npx skills add https://github.com/anthropics/skills --skill skill-creator -g -y
```

## 与 write-a-skill 的区别

| | skill-creator | write-a-skill（Matt Pocock） |
|--|---------------|------------------------------|
| 侧重 | 评测、基准、描述优化 | 结构、渐进披露、清单 |
| 来源 | anthropics/skills | mattpocock/skills |

写自己的 skill 时，Cursor 内置 **create-skill** 也可先用；要量化触发准确率时再考虑本 skill。
