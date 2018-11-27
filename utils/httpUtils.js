'use strict'

// let request = require('request')
// const j = request.jar()
// request = request.defaults({ jar: j })
const querystring = require('querystring')
const logUtils = require('./logUtils')
const multiparty = require('multiparty')
const fs = require('fs')
let count = 0
module.exports = {
  get: async (api, clientParams, ctx) => {
    let _p = clientParams || {}
    let request = require('request')
    const j = request.jar()
    var cookie = request.cookie('JSESSIONID=' + ctx.session.JSESSIONID)
    j.setCookie(cookie, api.url)
    const options = {
      url: api.url,
      qs: _p,
      json: true,
      withCredentials: true,
      credentials: 'include',
      crossDomain: true,
      jar: j
    }
    console.log(`--log-->:GET:\nurl: ${JSON.stringify(options.url)}\n`)
    console.log(`qs: ${JSON.stringify(options.qs)}`)
    return new Promise((resolve, reject) => {
      request(options, function (err, response, data) {
        if (err) {
          reject(err)
        }
        var cookies = j.getCookies(api.url)
        cookies.forEach(cookie => {
          ctx.session[cookie.key] = cookie.value
        })
        console.log(`${api.url}: ${JSON.stringify(data)}`)
        resolve(data)
      })
    })
  },
  post: async (api, clientParams, ctx) => {
    let request = require('request')
    const j = request.jar()
    let _p = clientParams || {}
    console.log(`--log-->:POST:\n:param: ${JSON.stringify(_p)}\n`)
    var cookie = request.cookie('JSESSIONID=' + ctx.session.JSESSIONID)
    j.setCookie(cookie, api.url)
    let options = {
      url: api.url,
      json: _p,
      withCredentials: true,
      credentials: 'include',
      crossDomain: true,
      jar: j
    }
    return new Promise((resolve, reject) => {
      request.post(options, function (err, response, data) {
        if (err) {
          reject(err)
        }
        var cookies = j.getCookies(api.url)
        cookies.forEach(cookie => {
          ctx.session[cookie.key] = cookie.value
        })
        console.log(`${api.url}: ${JSON.stringify(data)}`)
        let date = new Date()
        date.setTime(date.getTime() + 24 * 60 * 60 * 1000)
        resolve(data)
      })
    })
  },
  postPDFStream: async (api, clientParams, ctx) => {
    let _p = clientParams || {}
    let request = require('request')
    const j = request.jar()
    console.log(`--log-->:POST:\n:param: ${JSON.stringify(_p)}\n`)
    var cookie = request.cookie('JSESSIONID=' + ctx.session.JSESSIONID)
    j.setCookie(cookie, api.url)
    let options = {
      url: api.url,
      json: _p,
      withCredentials: true,
      credentials: 'include',
      crossDomain: true,
      contentType: 'application/pdf',
      responseType: 'arraybuffer',
      jar: j
    }
    return new Promise((resolve, reject) => {
      request.post(options, function (err, response, data) {
        if (err) {
          reject(err)
        }
        var cookies = j.getCookies(api.url)
        cookies.forEach(cookie => {
          ctx.session[cookie.key] = cookie.value
        })
        console.log(`${api.url}: ${JSON.stringify(data)}`)
        let date = new Date()
        date.setTime(date.getTime() + 24 * 60 * 60 * 1000)
        resolve(data)
      })
    })
  },
  postImgStream: async (api, clientParams, ctx) => {
    let _p = clientParams || {}
    console.log(`--log-->:POST:\n:param: ${JSON.stringify(_p)}\n`)
    let options = {
      url: api.url,
      json: _p,
      withCredentials: true,
      credentials: 'include',
      crossDomain: true,
      contentType: 'image/jpeg'
    }
    return new Promise((resolve, reject) => {
      request.post(options, function (err, response, data) {
        if (err) {
          reject(err)
        }
        console.log(`${api.url}: ${JSON.stringify(data)}`)
        let date = new Date()
        date.setTime(date.getTime() + 24 * 60 * 60 * 1000)
        resolve(data)
      })
    })
  },
  plainPost: async (api, clientParams, ctx) => {
    let _p = clientParams || {}
    let request = require('request')
    const j = request.jar()
    var cookie = request.cookie('JSESSIONID=' + ctx.session.JSESSIONID)
    j.setCookie(cookie, api.url)
    let options = {
      url: `${api.url}?${querystring.stringify(_p)}`,
      json: {},
      withCredentials: true,
      credentials: 'include',
      crossDomain: true,
      jar: j
    }
    console.log(`--log-->:POST:\n:URL: ${JSON.stringify(options.url)}\n`)
    // console.log(`${api.json}: ${JSON.stringify(options.json)}`)
    return new Promise((resolve, reject) => {
      request.post(options, function (err, response, data) {
        if (err) {
          reject(err)
        }
        var cookies = j.getCookies(api.url)
        cookies.forEach(cookie => {
          ctx.session[cookie.key] = cookie.value
        })
        console.log(`${api.url}: ${JSON.stringify(data)}`)
        resolve(data)
      })
    })
  },
  put: async (api, clientParams, ctx) => {
    let _p = clientParams || {}
    let options = {
      url: api.url,
      body: JSON.stringify(_p),
      // json: true,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      }
    }

    logUtils.log('PUT:' + JSON.stringify(options, null, '  '))
    console.log(`--log-->:PUT:\n: ${JSON.stringify(options.url)}\n`)
    console.log(`${JSON.stringify(options.body)}`)
    return new Promise((resolve, reject) => {
      request(options, function (err, response, data) {
        if (err) {
          reject(err)
        }
        resolve(data)
      })
    })
  },
  putWidthParamsInUrl: async (api, clientParams, ctx) => {
    let _p = clientParams || {}
    let options = {
      url: api.url,
      qs: _p,
      json: true,
      method: 'PUT'
    }

    logUtils.log('PUT:' + JSON.stringify(options, null, '  '))
    console.log(`--log-->:PUT:\n ${JSON.stringify(options.url)}\n`)
    console.log(`${JSON.stringify(options.qs)}`)
    return new Promise((resolve, reject) => {
      request(options, function (err, response, data) {
        if (err) {
          reject(err)
        }
        resolve(data)
      })
    })
  },
  upload: async (api, clientParams, ctx) => {
    let _p = clientParams || {}
    let options = {
      url: api.url,
      body: JSON.stringify(_p),
      method: 'PUT',
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }

    logUtils.log('UPLOAD:' + JSON.stringify(options, null, '  '))
    console.log(`--log-->:UPLOAD:\n ${JSON.stringify(options.url)}\n`)
    console.log(`${JSON.stringify(options.body)}`)
    return new Promise((resolve, reject) => {
      request(options, function (err, response, data) {
        if (err) {
          reject(err)
        }
        resolve(data)
      })
    })
  },
  uploadExcel: async (api, clientParams, ctx) => {
    let _p = clientParams || {}
    console.log(`--log-->:UPLOAD:\n ${JSON.stringify(_p)}\n`)
    // console.log(`${JSON.stringify(options.body)}`)
    return new Promise((resolve, reject) => {
      let form = new multiparty.Form()
      form.parse(ctx.req, function (err, fields, files) {
        let r = request.post(
          api.url + '?orgId=' + _p.orgId + '&authorizeType=' + _p.authorizeType,
          (err, res, body) => {
            if (err) {
              reject(err)
            }
            resolve(body)
          }
        )
        console.log(r)
        let formData = r.form()
        formData.append('file', fs.createReadStream(files.file[0].path))
      })
    })
  },
  delete: async (api, clientParams, ctx) => {
    let _p = clientParams || {}
    let options = {
      url: api.url,
      // body: JSON.stringify(_p),
      // json: true,
      qs: _p,
      json: true,
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }

    logUtils.log('DELETE:' + JSON.stringify(options, null, '  '))
    console.log(`-log-->:DELETE ${JSON.stringify(options.url)}\n`)
    console.log(`${JSON.stringify(options.qs)}`)
    return new Promise((resolve, reject) => {
      request(options, function (err, response, data) {
        if (err) {
          reject(err)
        }
        resolve(data)
      })
    })
  },
  deleteWidthParamsInUrl: async (api, clientParams, ctx) => {
    let _p = clientParams || {}
    let options = {
      url: api.url,
      qs: _p,
      json: true,
      method: 'DELETE'
    }

    logUtils.log('DELETE:' + JSON.stringify(options, null, '  '))
    console.log(`--log-->:DELETE ${JSON.stringify(options.url)}\n`)
    console.log(`${JSON.stringify(options.qs)}`)
    return new Promise((resolve, reject) => {
      request(options, function (err, response, data) {
        if (err) {
          reject(err)
        }
        resolve(data)
      })
    })
  }
}
