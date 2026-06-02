# 陕西省体能协会 — 信息展示网站

> 本网站为**陕西体能协会**的公益信息展示站点，数据来源于公开资料整理。

## 网站内容

| 页面 | 说明 |
|------|------|
| [首页](index.html) | 协会概况、核心业务、最新动态 |
| [关于协会](about.html) | 成立背景、宗旨使命、发展历程、协会领导 |
| [新闻动态](news.html) | 协会活动、培训通知、赛事资讯 |
| [会员单位](members.html) | 高校会员单位介绍、会员权益与服务 |
| [联系我们](contact.html) | 联系方式、地址、入会咨询 |

## 一键部署到 GitHub Pages

### 方式一：Fork + Pages（推荐）

1. **Fork 本仓库** 到你的 GitHub 账号下
2. 进入仓库 **Settings → Pages**
3. 在 **Source** 处选择 `Deploy from a branch`
4. 分支选 `main`，目录选 `/ (root)`
5. 点击 **Save**，等待 1-2 分钟
6. 访问 `https://<你的用户名>.github.io/<仓库名>/`

### 方式二：手动创建新仓库

```bash
# 1. 在 GitHub 创建一个新仓库（命名为 sxptxh 或同项目名）

# 2. 在本地初始化并推送
git init
git add .
git commit -m "初始化：陕西省体能协会信息展示网站"
git branch -M main
git remote add origin https://github.com/<你的用户名>/<仓库名>.git
git push -u origin main

# 3. 到 GitHub 仓库 Settings → Pages 中启用
```

### 方式三：使用 gh-pages 分支

在仓库 Settings → Pages 中，选择 `gh-pages` 分支作为源，或使用 GitHub Actions 自动部署。

## 项目结构

```
.
├── index.html       # 首页
├── about.html       # 关于协会
├── news.html        # 新闻动态
├── members.html     # 会员单位
├── contact.html     # 联系我们
├── css/
│   └── style.css    # 全局样式
├── images/          # 图片资源目录
└── README.md        # 本文件
```

## 技术特点

- **纯静态 HTML + CSS** — 无需后端，无需构建工具
- **响应式设计** — 适配桌面、平板、手机
- **友好配色** — 深蓝主色调 + 金色点缀，专业沉稳
- **SEO 优化** — 各页面含 meta 描述和关键词

## 数据声明

本网站信息来源于以下公开渠道：
- 国家体育总局官网
- 陕西省体育局
- 百度百科
- 各高校新闻网
- 企查查企业信息

如有信息变动或需要更新，欢迎提交 Issue 或 Pull Request。

## 许可

本网站为公益信息展示用途，数据来源于公开资料。
