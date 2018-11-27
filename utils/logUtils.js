"use strict";
/* 日志模块 */
const ENV = require('../config/env')

module.exports = {
  // 生产环境 工具方法
  responseError (message, ctx) {
    return ctx.body = {
      result: "1",
      message: message,
      refresh: false
    }
  },
  // 生产环境打印日志
  print (msg) {
    console.log('\n' + '--> ' + msg + '\n')
  },
  // 开发环境打印日志
  log (msg) {
    if (ENV.isPro) {
      return false
    }
    // console.log('\033[32m[Log:]' + msg + '\033[0m');
    console.log('\n' + '--log--> ' + msg + '\n')
  },
  err (msg) {
    if (ENV.isPro) {
      return false
    }
    // console.log('\033[31m[Error:]' + err + '\033[39m');
    console.error('\n' + '--log--> ' + msg + '\n')
  }
}
