---
title: tdd（Matt Pocock）
description: 测试驱动：竖切、公开接口测行为，避免「先写一堆测试再写实现」。
url: https://github.com/mattpocock/skills/tree/main/skills/engineering/tdd
type: tool
category: ai
stack: [cursor, claude]
status: using
discoveredFrom: mattpocock/skills
discoveredAt: 2026-05-24
github: https://github.com/mattpocock/skills
tags: [skill, agent, testing, tdd]
searchKeywords: [tdd, red-green-refactor, 测试驱动]
draft: false
---

## 安装

```bash
npx skills add mattpocock/skills@tdd -g -y
```

## 何时用

用户提 TDD、red-green-refactor、测试先行修 bug / 做功能时。

## 要点

- 测**行为**（公开 API），不测实现细节
- 禁止「水平切片」：不要一次性写完所有测试再写所有代码
- 每轮：一个失败测试 → 最小实现 → 重构

## 本机

`~/.agents/skills/tdd`。
