'use strict'

const config = {
  dev: false
}

if (process.env.NODE_ENV !== 'production') {
  config.dev = true
}

module.exports = config
