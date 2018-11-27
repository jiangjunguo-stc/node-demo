/**
 * APIlist 列表
 * http://2i1597b475.51mypc.cn:26180/swagger-ui.html#/
 *
 */
const fetch = require('../utils/httpUtils')
const API = require('../config/api')
const comUtils = require('../utils/comUtils')

module.exports = {
  // 获取验证码
  getCheckCode: async (ctx, next) => {
    let clientParams = comUtils.getClientParams(ctx)
    let remoteData = await fetch.plainPost(API.getCheckCode, clientParams, ctx)
    ctx.body = remoteData
  }
}
