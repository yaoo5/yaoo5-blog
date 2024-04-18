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
      // { text: '前端', link: '/front-end/overview' },
      // { text: 'Node.js', link: '/node.js/overview' },
      // { text: '算法', link: '/leetcode/overview' },
      { text: '生活感悟', link: '/life/overview' },
      { text: '更新日志', link: '/changelog' },
      { text: '关于我', link: '/about' }
    ],
    sidebar: {
      '/front-end': [
        { text: '更新日志', link: '/changelog.md' }
      ],
      '/node.js': [
        { text: '更新日志', link: '/changelog.md' }
      ],
      '/leetcode': [
        { text: '更新日志', link: '/changelog.md' }
      ],
      '/life': [
        { text: 'Overview', link: '/life/overview.md' },
        { text: '更新日志', link: '/changelog.md' },
        {
          text: '读书',
          items: [
            { text: '《每一天梦想练习》', link: '/life/reading/everyday-dream-exercise' },
          ]
        }
      ],
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/yaoo5' }
    ]
  }
})
