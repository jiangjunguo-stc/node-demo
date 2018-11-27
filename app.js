const Koa = require('koa')
const app = new Koa()
const logger = require('koa-logger')
// const session = require('koa-generic-session');
const session = require('koa-session');
// 跨域, option配置
const accessUtils = require('./utils/access')
const convert = require('koa-convert')
const json = require('koa-json')
const bodyparser = require('koa-bodyparser')()
const storeInstance = require('./utils/redisUtils');
//接口
const pcAdminRouter = require('./routes/pcAdmin')

app.use(convert(json()));
app.use(convert(bodyparser));
app.use(convert(logger()));
app.use(accessUtils.treatOptions)
app.use(accessUtils.allowOrigin)
// 头部添加响应时间
app.use(async (ctx, next) => {
  ctx.session = null;
  const start = new Date();
  await next();
  const ms = new Date() - start;
  ctx.set('X-Response-Time', ms + 'ms');
  ctx.set('Cache-Control', 'no-cache');
});

// session
app.keys = ['admin'];
app.use(session({
  store: storeInstance,
  key: 'admin',
  prefix: 'admin',
  ttl: 24 * 60 * 60 * 1000,
  rolling: true,  // 在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
  cookie: { secure: false }
}, app));

app.use(pcAdminRouter.routes(), pcAdminRouter.allowedMethods())

app.on('error', function (err, ctx) {
  console.error('server error', err, ctx);
});

module.exports = app