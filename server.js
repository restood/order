'use strict'

const http = require('http')
const express = require('express')
const { Nuxt, Builder } = require('nuxt')
const { getLogger } = require('@restood/utils')
const config = require('./nuxt.config')

const logger = getLogger('apps/order')
const app = express()
const server = http.createServer(app)
const port = process.env.PORT || 3000

const nuxt = new Nuxt(config)

if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}

app.use(nuxt.render)

server.listen(port, () => {
  logger.info(`Server listening on http://localhost:${port}`)
})
