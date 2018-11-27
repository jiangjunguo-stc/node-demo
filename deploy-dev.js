/**
 * 酒店机开发环境部署
 */

let process = require('child_process')
let uploadFiles = [
  `${__dirname}/config/`,
  `${__dirname}/controllers/`,
  `${__dirname}/deploy/`,
  `${__dirname}/routes/`,
  `${__dirname}/utils/`,
  `${__dirname}/app.js`,
  `${__dirname}/package.json`
].join(' ')

let remote = '' // 远程目录

process.exec(`scp -r ${uploadFiles} ${remote}`)

// 确认日志
console.log('\033[32m-> 确定把Node源代码发布到开发环境？\033[0m')
