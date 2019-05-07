module.exports = {
  theme: 'reco',
  port:9999,
  title: '会走路的三百块',
  description: '年轻人的博客',
  base:'/bingo/',
  themeConfig: {


  nav: [
      { text: '分类', items: [
        { text: '后端', link: '/categories/backEnd' },
          { text: '前端', link: '/categories/frontEnd' },
          { text: '大数据', link: '/categories/bigData' },
          { text: '分布式', link: '/categories/Distributed' },
          { text: '日记', link: '/categories/life' },
          ],icon: 'reco-category' },
      { text: 'Tags', link: '/tags/',icon: 'reco-tag'},
      { text: 'Library', link: '/categories/article',icon: 'reco-up'},
      { text: 'TimeLine', link: '/timeLine/', icon: 'reco-date'},
      { text: 'about me', link: '/about',icon: 'reco-account' },
      { text: '简书', link: 'https://www.jianshu.com/u/04777e91e2ef',icon: 'reco-jianshu' },
      { text: 'GitHub', link: 'https://github.com/Castleeee',icon: 'reco-github' },

    ],
  // //是否使用密码
  //   keyPage: {
  //     keys: ['1118'],
  //     color: '#54eaff', // 登录页动画球的颜色
  //     lineColor: '#43bdfb' // 登录页动画线的颜
  //   }
  // ,
    sidebar:'auto',
    logo: '/head3.png',
    lastUpdated:'Last Updated',
  },

head: [
    ['link', { rel: 'icon', href: '/logo1.ico',type:"image/x-icon" }],
  ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]
  ],

  searchMaxSuggestions:5
};
