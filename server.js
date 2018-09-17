'use strict'

const http = require('http')
const helmet = require('helmet')
const express = require('express')
const { Nuxt, Builder } = require('nuxt')
const { getLogger, terminate } = require('@restood/utils')
const config = require('./nuxt.config')

const logger = getLogger('apps/order')
const app = express()
const server = http.createServer(app)
const port = +process.env.PORT || 3000

const nuxt = new Nuxt(config)

if (!module.parent && config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}

app.use(helmet())
app.use(nuxt.render)

if (!module.parent) {
  server.listen(port, () => {
    logger.info(`Server listening on http://localhost:${port}`)

    process.on('SIGINT', terminate(0, 'SIGINT'))
    process.on('SIGTERM', terminate(0, 'SIGTERM'))
    process.on('uncaughtException', terminate(1, 'uncaughtException'))
    process.on('unhandledRejection', terminate(1, 'unhandledRejection'))
  })
}
