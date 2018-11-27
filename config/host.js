/* 默认开发环境 */
const ENV = require('./env');

/* 开发环境 */
let hostConfig = {
  adminHost: '',
  originUrl: ''
}

if (process.env.NODE_ENV === 'development') {
  Object.assign(hostConfig, {
    adminHost: '',
    originUrl: ''
  })
}

module.exports = hostConfig