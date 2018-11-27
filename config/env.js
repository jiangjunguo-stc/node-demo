// module.exports = {
//   isPro   : (process.env.NODE_ENV === 'production') ? true : false,
//   isDev   : (process.env.NODE_ENV === 'development') ? true : false,
//   isTest  : (process.env.NODE_ENV === 'test') ? true : false
// }

const ENV = {
  isPro   : (process.env.NODE_ENV === 'production') ? true : false,
  isTest  : (process.env.NODE_ENV === 'test') ? true : false,
  isDev   : (process.env.NODE_ENV === 'development') ? true : false,
  isLocal : (!process.env.NODE_ENV || process.env.NODE_ENV === '' || process.env.NODE_ENV === 'undefined') ? true : false
}

console.log('\n当前环境: ' + (ENV.isPro
  ? "生产"
  : (ENV.isTest
    ? "测试"
    : (ENV.isDev ? "开发" : "本地"))
  )
);

module.exports = ENV