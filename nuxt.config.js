
module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#cc9557' },
  /*
  ** Global CSS
  */
  css: [
    '@/assets/css/grid.css',
    '@/assets/css/main.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/global',
    '@/plugins/axios',
    '@/plugins/lazyload',
    { src: '~plugins/draggable.js', ssr: false },
    { src: '~plugins/quill-editor.js', ssr: false },
    { src: '~plugins/swiper.js', ssr: false }
  ],
  cache: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/pwa',
  ],
  proxy: {
    '/currency': {
      target: 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange',
      pathRewrite: {
        '^/currency' : ''
      }
    }
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    proxy: true
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    optimization: {
      splitChunks: {
        chunks: 'async',
      }
    },
    splitChunks: {
      pages: true,
      vendor: true,
      commons: true,
      runtime: true,
      layouts: true
    },
    cache: true,
    extend(config, { dev, isClient }) {
      if (isClient) {
        const vendor = config.entry.vendor
        const vendor2 = [
          'element-ui',
          'vue-quill-editor'
        ]
        config.entry.vendor = vendor.filter(x => !vendor2.includes(x))
        config.entry.vendor2 = vendor2
      }
    }
  }
}
