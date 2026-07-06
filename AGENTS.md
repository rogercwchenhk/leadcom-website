## 项目概述

Leadcom 励康信息技术官网 - 广东励康信息技术有限公司官方网站，提供 IT 维保、AI Agent 部署、腾讯云代理等服务。

## 技术栈

- 纯静态 HTML/CSS（无框架）
- Python 内置 http.server 提供静态服务
- 无依赖管理、无构建过程

## 目录结构

```
/workspace/projects/
├── index.html                    # 首页
├── leadcom_about_us.html         # 关于我们
├── leadcom_it_maintenance.html    # IT运维服务
├── leadcom_tencent_cloud.html     # 腾讯云代理
├── leadcom_ai_solutions_no_tencent.html  # AI解决方案
├── leadcom_success_cases.html     # 成功案例
├── images/                        # 静态资源
├── scripts/
│   ├── coze-preview-build.sh     # 预览构建脚本
│   ├── coze-preview-run.sh        # 预览运行脚本
│   ├── coze-deploy-build.sh       # 部署构建脚本
│   └── coze-deploy-run.sh         # 部署运行脚本
└── .coze                          # 项目配置
```

## 关键入口

- 预览服务：使用 Python http.server 在 5000 端口提供静态文件服务
- 部署服务：同上，静态服务器模式

## 运行与预览

- 预览：`bash scripts/coze-preview-run.sh`
- 部署：`bash scripts/coze-deploy-run.sh`
- 端口：5000（IPv4 全接口 0.0.0.0:5000）

## 用户偏好与长期约束

- 纯静态网站，无需构建步骤
- 使用 Python 内置 http.server，依赖 python-3.13 运行时
- 所有脚本需具备幂等性（可重复执行不冲突）

## 常见问题和预防

- 端口冲突：脚本内置 fuser 清理 5000 端口
- 工作目录：脚本基于自身位置推导项目根目录，不依赖调用时 pwd
