module.exports = {
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  server: {
    port: 3000, // default: 3000
    host: "0.0.0.0", // default: localhost
    open: true // 自动打开浏览器
  },
  /*
   ** Global CSS
   */
  css: [
    "element-ui/lib/theme-chalk/index.css",
    "element-ui/lib/theme-chalk/reset.css",
    "~assets/css/main.css"
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ["@/plugins/element-ui"],
  /*
   ** Nuxt.js modules
   */
  modules: [
    "@nuxtjs/axios"
    // 'axios'
  ],
  /*
   ** Build configuration
   */
  build: {
    transpile: [/^element-ui/],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESlint on save
      // if (ctx.isDev && ctx.isClient){
      //   config.module.rules.push({
      //     enforce:'pre',
      //     test:/\.(js|vue)/,
      //     loader: 'eslint-loader',
      //     exclude:/(node_modules)/
      //   })
      // }
    },
    // github.com/nuxt/nuxt.js/issues/3804
    cache: false
  }
};
