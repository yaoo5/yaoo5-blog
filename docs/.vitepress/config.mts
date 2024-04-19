import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "yaoo5",
  description: "I'm yaoo5.",
  lastUpdated: true,
  themeConfig: {
    lastUpdated: {
      text: '最后更新时间'
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      // { text: '算法', link: '/leetcode/overview' },
      { text: '技术博客', link: '/tech/overview' },
      { text: '生活感悟', link: '/life/overview' },
      { text: '更新日志', link: '/changelog' },
      { text: '关于我', link: '/about' }
    ],
    sidebar: {
      '/tech': [
        { text: '目录', link: '/tech/overview.md' },
        {
          text: '04.19｜如何搭建个人博客',
          link: '/tech/blog-vitepress-github',
        },
        { text: '更新日志', link: '/changelog.md' },
      ],
      '/leetcode': [
        { text: '更新日志', link: '/changelog.md' }
      ],
      '/life': [
        { text: 'Overview', link: '/life/overview.md' },
        {
          text: '读书',
          items: [
            { text: '《每一天梦想练习》', link: '/life/reading/everyday-dream-exercise' },
          ]
        },
        { text: '更新日志', link: '/changelog.md' },
      ],
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/yaoo5' }
    ]
  }
})
