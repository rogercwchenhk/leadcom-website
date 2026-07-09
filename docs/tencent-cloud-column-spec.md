# 腾讯云专栏设计方案

> 版本: v1.0 | 日期: 2026-07-09
> 目标: 在 Leadcom 官网创建 WorkBuddy/CodeBuddy 腾讯云产品博客专栏，支撑微信公众号推广

## 1. 专栏定位

Leadcom 作为腾讯云 WorkBuddy + CodeBuddy 代理商，通过 4 篇博客文章建立产品认知和行业信任。

## 2. 架构

```
blog.html（修改）
├── 行业洞察 (2篇，已有)
├── AI 部署实战 (4篇，已有)
├── 腾讯云 (4篇，新增) ← 替换"即将上线"
│   ├── 1. blog-tencent-codebuddy-starter.html (教程)
│   ├── 2. blog-tencent-workbuddy-starter.html (教程)
│   ├── 3. blog-tencent-workbuddy-manufacturing.html (场景)
│   └── 4. blog-tencent-workbuddy-service.html (场景)
└── IT 维保实战 (筹备中)

tencent-cloud.html（修改）
├── 已有内容不变
└── 底部新增「最新技术文章」板块 (4 篇文章卡片)
```

## 3. 文章统一结构

```
Hero 区: 标题 + 副标题 + 阅读时长 + 分类标签
摘要引言: 3 句话点出问题、方案、价值
正文: 1500-2500字，4-5 个小标题
实战小节: 表格/清单总结
底部 CTA: 免费咨询 / 申请试用 → tencent-cloud.html
相关文章: 2-3 篇交叉推荐
```

## 4. 写法约定

- 标题公式: "数字 + 场景 + 动词"
- 正文每段 ≤ 4 行
- 代码/配置用 `<pre>` 块
- 禁用词: "裁员""替代""淘汰"
- 统一措辞: "释放人力做高价值工作"

## 5. 文章清单

| # | 文件名 | 标题 | 类型 | 字数 |
|---|--------|------|------|------|
| 1 | blog-tencent-codebuddy-starter.html | CodeBuddy 企业版上手：从开通到第一个 AI 提效项目 | 教程 | ~2000 |
| 2 | blog-tencent-workbuddy-starter.html | WorkBuddy 企业版入门：对话、文档、知识库三大核心 | 教程 | ~2200 |
| 3 | blog-tencent-workbuddy-manufacturing.html | WorkBuddy × 制造业：对接 MES/ERP/QMS 实战配置 | 场景 | ~2500 |
| 4 | blog-tencent-workbuddy-service.html | WorkBuddy × 服务业：多系统查询从 15 分钟到 3 秒 | 场景 | ~2200 |

## 6. 内链策略

- 每篇文章底部 CTA → tencent-cloud.html
- 每篇文章底部"相关文章"→ 交叉推荐其他 3 篇
- tencent-cloud.html 底部 → 4 篇文章卡片
- blog.html 腾讯云分类 → 4 篇文章

## 7. tencent-cloud.html 更新

- 页面底部新增 `<section class="latest-articles">`
- 展示 4 篇文章卡片（标题 + 摘要 + 阅读链接）
- 已有内容不变
