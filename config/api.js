const HOST = require('./host')

module.exports = {
  // 获取验证码
  getCheckCode: {
    url: HOST.adminHost + '/registration/user/getCheckCode'
  }
}
