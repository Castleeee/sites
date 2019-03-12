module.exports = {
  theme: 'reco',
  port:9999,
  title: '会走路的三百块',
  description: '年轻人的博客',
  base:'/',
  themeConfig: {

    nav: [
      { text: '分类', items: [
        { text: '后端', link: '/categories/backEnd' },
          { text: '前端', link: '/categories/frontEnd' },
          { text: '大数据', link: '/categories/bigData' },
          { text: '分布式', link: '/categories/Distributed' },
          { text: '日记', link: '/categories/life' },
          { text: '传送门', link: '/categories/article' }
          ],icon: 'reco-category' },
      { text: 'Tags', link: '/tags/',icon: 'reco-tag'},
      { text: 'about me', link: '/about',icon: 'reco-up' },
      { text: '简书', link: 'https://www.jianshu.com/u/04777e91e2ef',icon: 'reco-jianshu' },
      { text: 'GitHub', link: 'https://github.com/Castleeee',icon: 'reco-github' },

    ],

    sidebar:'auto',
    logo: '/head.png',
    lastUpdated:'Last Updated',
  },

head: [
    ['link', { rel: 'icon', href: '/logo.ico',type:"image/x-icon" }]
  ],
  searchMaxSuggestions:5
};
