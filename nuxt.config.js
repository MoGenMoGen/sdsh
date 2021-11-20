
export default {
  mode: 'universal',
  router:{
    base: '/sdsh',
  },
  /*
  ** Headers of the page
  */
  head: {
    title: '山东商会',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'keywords', content: '山东商会' },
      { hid: 'description', name: 'description', content: '山东商会' },
      {name:"renderer", content:"webkit"},
      {name:"baidu-site-verification", content:"rL56RVqYF3"}
    ],
    link: [
      // { rel: 'icon', type: 'image/x-icon', href: '/zjfy/favicon.ico' }
    ],
    script: [
      { src: 'https://ta.8531.cn/c/js/ta.js?mpid=143',id:'_trs_ta_js',async:'async',defer:'defer' },
      { src: 'https://v1.cnzz.com/z_stat.php?id=1278902410&web_id=1278902410',async:'async',defer:'defer' }, //友盟统计
    ],
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    {src:'element-ui/lib/theme-chalk/index.css'},
    {src:'swiper/dist/css/swiper.css'}
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '@/assets/js/wconfig.js', mode: 'client' },
    { src: '@/plugins/swiper.js', mode: 'client' },
    { src: '@/assets/js/asyncApi.js'},
    { src: '@/plugins/vueqr.js', mode: 'client'},
    { src: '@/plugins/poly.js'},
    { src: '@/plugins/element.js'},
    { src: '@/plugins/axios.js',ssr: true}
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  axios: {
    // baseURL:'https://www.zjfzol.com.cn',
    proxy: true, // 表示开启代理
    // credentials: true // 表示跨域请求时是否需要使用凭证
  },

  proxy: {
    // http://lwkacgr.nat.ipyingshe.com 
    '/open': {
      target: 'http://sdsh.jinkworld.com', // 目标接口域名
      pathRewrite: {
        '^/open': '/open', // 把 /api 替换成 /
        changeOrigin: true // 表示是否跨域
      }
    }

  },
  performance: {
    maxEntrypointSize: 1000000,
    maxAssetSize: 200000,
    assetFilter: function(assetFilename) {
      return assetFilename.endsWith('.js');
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    },
    // 开启打包分析
    analyze: false,
    assetFilter: function(assetFilename) {
      return assetFilename.endsWith('.js');
    },

    optimization: {

      splitChunks: {

        minSize: 10000,

        maxSize: 250000

      }

    },
    //下面解决按需加载（待验证）
    render: {

      resourceHints: false,
    },
    // vendor: ['axios'] // 为防止重复打包
  }
}
