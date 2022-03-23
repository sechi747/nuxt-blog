
<div align="center"><h2>Nuxt-Blog</h2></div>

>基于 vue + nuxt.js 技术实现的静态博客。

源码地址: [https://github.com/sechi747/nuxt-blog](https://github.com/sechi747/nuxt-blog)

在线预览: [https://plantsechi.top](https://plantsechi.top)


## 1.介绍

基于 vue + nuxt.js 技术实现的静态博客，在 [此项目](https://github.com/sechi747/nuxt-blog) 的基础上进行二次开发。

---

目前仅包括基础的博客、标签、分类等功能，后期可能会视情况分析。


## 2.使用前必读

`/nuxt.config.js`: 基本信息配置（title, description, icon 等）

`/config/index.js`: 首页每页显示文章数量

`/Conmmonents`: 组件

`/layouts`: 布局文件

`/pages`: 页面文件

`/assets`: 全局 css 样式

`/static`: 静态资源

`/content`: 文章目录，仅支持markdown

文件头设置，title(标题), date(发布时间), updated(最后更新时间), categories(分类), tags(标签)。

```md
---
title: hello, world
date: 2020/06/14 20:57:00
updated: 2021/11/29 11:39:36
categories: 
  - 随笔
tags: 
  - 博客
  - 网站
---

```


## 3.快速启动

```bash
# git clone
git clone git@github.com:sechi747/nuxt-blog.git
cd nuxt-blog

# 安装依赖
$ npm install

# 本地运行
$ npm run dev

# 构建项目
$ npm run build
$ npm run start

# 生成dist目录
$ npm run generate

```

## 4.更新记录

### 2022-03-23

1. 初始化 



## 5.LICENSE

[LICENSE](./LICENSE)
