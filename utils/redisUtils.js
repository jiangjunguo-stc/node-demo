'use strict'
const Redis = require('ioredis')
const logUtils = require('./logUtils')

let redisConfig = {
  name: 'mymaster'
}

redisConfig = Object.assign(redisConfig, {
  host: "192.168.4.65",
  port: 6379
})

console.log(redisConfig)

class RedisStore {
  constructor() {
    if (!(this instanceof RedisStore)) {
      return new RedisStore()
    }

    this.redis = new Redis(redisConfig)

    this.redis.on('connect', function() {
      logUtils.print('KVStore connected.')
    })

    this.redis.on('error', function(err) {
      logUtils.print('KVStore connect error: ' + err)
    })
  }

  async get(sid) {
    // console.log(`get: ${sid}`)
    let data = await this.redis.get(sid)
    // console.log(`data: ${JSON.stringify(data)}`)
    return JSON.parse(data)
  }

  async set(sid, session, ttl) {
    // console.log(`set: ${sid} ${JSON.stringify(session)} ${ttl}`)
    if (typeof ttl === 'number') {
      ttl = Math.ceil(ttl / 1000)
    }
    session = JSON.stringify(session)
    if (ttl) {
      await this.redis.setex(sid, ttl, session)
    } else {
      await this.redis.set(sid, session)
    }
  }

  async destroy(sid) {
    // console.log(`destroy: ${sid}`)
    return await this.redis.del(sid)
  }
}

const storeInstance = new RedisStore()

module.exports = storeInstance
