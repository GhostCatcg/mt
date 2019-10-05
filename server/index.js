import Koa from 'koa'
const consola = require('consola')
import mongoose from 'mongoose'
import bodyParser from 'koa-bodyparser'
import session from 'koa-generic-session'
import Redis from 'koa-redis'
import json from 'koa-json'
import dbConfig from './dbs/config'
import passport from './interface/utils/passport'
import users from './interface/users'
// import geo from './interface/geo'
// import search from './interface/search'
// import categroy from './interface/categroy'
// import cart from './interface/cart'

const { Nuxt, Builder } = require('nuxt')

import cors from "koa2-cors" // 导入cors 配置跨域



const app = new Koa()
// const host = process.env.HOST || 'localhost'
// const host = '0.0.0.0'
// const port = process.env.PORT || 3000
// const port = 3000

// 使用nuxt.config.js的配置
// const {
//   host = process.env.HOST || 'http://localhost',
//   port = process.env.PORT || 8080
// } = nuxt.options.server


app.use(cors()) // 注入跨域


app.keys = ['mt', 'keyskeys']
app.proxy = true
app.use(session({key: 'mt', prefix: 'mt:uid', store: new Redis()}))
app.use(bodyParser({
  extendTypes:['json','form','text']
}))
app.use(json())

mongoose.connect(dbConfig.dbs,{
  useNewUrlParser:true
})
app.use(passport.initialize())
app.use(passport.session())



// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(app.env === 'production')

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // 使用nuxt.config.js配置
  const {
    host = process.env.HOST || 'http://localhost',
    port = process.env.PORT || 8080
  } = nuxt.options.server


  // 路由
  app.use(users.routes()).use(users.allowedMethods())
  // app.use(geo.routes()).use(geo.allowedMethods())
  // app.use(search.routes()).use(search.allowedMethods())
  // app.use(categroy.routes()).use(categroy.allowedMethods())
  // app.use(cart.routes()).use(cart.allowedMethods())
  app.use(ctx => {
    ctx.status = 200 // koa defaults to 404 when it sees that status is unset

    return new Promise((resolve, reject) => {
      ctx.res.on('close', resolve)
      ctx.res.on('finish', resolve)
      nuxt.render(ctx.req, ctx.res, promise => {
        // nuxt.render passes a rejected promise into callback on error.
        promise.then(resolve).catch(reject)
      })
    })
  })

  app.listen(port, host)
  consola.ready({message: `Server listening on http://${host}:${port}`, badge: true})
}

start()
