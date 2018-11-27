"use strict"

module.exports = {
  getClientParams (ctx) {
    let _clientParams = Object.keys(ctx.request.query).length > 0
      ? ctx.request.query
      : ctx.request.body
    return _clientParams
  },
  checkMissedParams (required, params) {
    return required.filter(param => params[param] === undefined)
  }
}
