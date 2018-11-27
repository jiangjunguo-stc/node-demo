const logUtils = require('./logUtils');
const HOST = require('../config/host')

module.exports = {
  // 处理 options
  treatOptions: async (ctx, next) => {
    if (ctx.method === 'OPTIONS') {
      let requestHeader = ctx.request.header || ''
      ctx.set("Access-Control-Allow-Origin", requestHeader.origin)
      ctx.set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS")
      ctx.set("Access-Control-Allow-Credentials", true)
      ctx.set("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept")
      // ctx.status = 204
      return ctx.body = {}
    }
    return await next()
  },
  /* 跨域配置 */
  allowOrigin: async (ctx, next) => {
    let allowOriginUrl = HOST.originUrl
    let requestHeader = ctx.request.header || ''
    // requestHeader.origin = requestHeader.origin || `${process.env.NODE_ENV === 'production' ? 'https://' : 'http://'}${requestHeader.host.split(':').shift()}`
    logUtils.log('[Allow Origin Cross:]' + requestHeader.origin && allowOriginUrl.indexOf(requestHeader.origin) > -1)
    // if (process.env.NODE_ENV !== 'local' && requestHeader.origin && allowOriginUrl.indexOf(requestHeader.origin) > -1) {
    //   ctx.set("Access-Control-Allow-Origin", requestHeader.origin)
    //   ctx.set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS")
    //   ctx.set("Access-Control-Allow-Credentials", true)
    //   return await next()
    // }
    if (/development|test|local|production/.test(process.env.NODE_ENV)) {
      ctx.set("Access-Control-Allow-Origin", requestHeader.origin)
      ctx.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
      ctx.set("Access-Control-Allow-Credentials", true)
      return await next()
    }
  }
}
