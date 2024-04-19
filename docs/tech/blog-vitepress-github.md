# 如何搭建个人博客：VitePress + GitHub Pages

:::tip :pushpin: 为什么要写博客？
在一本书上看到 **"社交媒体是你的另一张脸"** 被触动了（也就是 **"简历会加分"**）。于是我决定将自己的学习过程记录下来，分享给更多的人。

对书籍感兴趣的可阅读 [《每一天梦想练习》](/life/reading/everyday-dream-exercise)。
:::

## 0. 前置条件
- Node.js >= 18.0.0
- Git + GitHub账号
- Markdown编辑器（Evan You推荐VSCode）

## 1. vitepress新建项目

```bash
# 新建文件夹 <blog-viterpess-github>可自定义
mkdir blog-viterpess-github && cd blog-viterpess-github

# 初始化package.json
npm init -y

# 安装vitepress
npm install -D vitepress

# 使用vitepress初始化项目
npx vitepress init
```
运行 `npx vitepress init` 后，会提示你输入一些配置信息，可参考如下：
```shell
┌  Welcome to VitePress!
│
◇  Where should VitePress initialize the config?
│  ./docs
│
◇  Site title:
│  My Awesome Project
│
◇  Site description:
│  A VitePress Site
│
◆  Theme:
│  ● Default Theme (Out of the box, good-looking docs)
│  ○ Default Theme + Customization
│  ○ Custom Theme
└
```

## 2. 撰写博客
这里以撰写一篇博客为例，新建一个 `docs/about.md` 文件：
```shell
# 运行项目
npm run docs:dev

# 新建about.md文件
cd docs && touch about.md
echo "#this i about page" > about.md

```
访问 https://loclahost:5173/about.html 查看效果。

![](/tech/images/blog_about.png)

更多vitepress的写作技巧可参考 [vitepress官网](https://vitepress.dev/)。
## 3. 部署到GitHub Pages

### 3.1 新建GitHub仓库
新建仓库，仓库名称一般是 `<username>.github.io`，例如我的GitHub用户名是 `yaoo5`，那么仓库名称就是 `yaoo5.github.io`。

### 3.2 添加 `.github/workflows/deploy.yml` 文件
```yaml
# copy from https://vitepress.dev/guide/deploy#github-pages

# Sample workflow for building and deploying a VitePress site to GitHub Pages
#
name: Deploy VitePress site to Pages

on:
  # Runs on pushes targeting the `main` branch. Change this to `master` if you're
  # using the `master` branch as the default branch.
  push:
    branches: [main]

  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:

# Sets permissions of the GITHUB_TOKEN to allow deployment to GitHub Pages
permissions:
  contents: read
  pages: write
  id-token: write

# Allow only one concurrent deployment, skipping runs queued between the run in-progress and latest queued.
# However, do NOT cancel in-progress runs as we want to allow these production deployments to complete.
concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  # Build job
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0 # Not needed if lastUpdated is not enabled
      # - uses: pnpm/action-setup@v3 # Uncomment this if you're using pnpm
      # - uses: oven-sh/setup-bun@v1 # Uncomment this if you're using Bun
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm # or pnpm / yarn
      - name: Setup Pages
        uses: actions/configure-pages@v4
      - name: Install dependencies
        run: npm ci # or pnpm install / yarn install / bun install
      - name: Build with VitePress
        run: npm run docs:build # or pnpm docs:build / yarn docs:build / bun run docs:build
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: docs/.vitepress/dist

  # Deployment job
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    needs: build
    runs-on: ubuntu-latest
    name: Deploy
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### 3.3 配置GitHub Actions
代码提交到Github仓库后，修改以下配置：
`Settings` -> `Pages` -> `Build and deployment` -> `Source` 改为 `Github Actions`

### 3.4 访问
访问 `https://<username>.github.io` 即可看到你的博客网站。

## 参考
- [使用VitePress和Github搭建个人博客网站，可以自动构建和发布](https://jzplp.github.io/2023/blog-github.html)
