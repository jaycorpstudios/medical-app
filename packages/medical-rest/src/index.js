import '@babel/polyfill'
import setMongooseConfig from './config/mongoose'
import config from './config/env'
import app from './config/express'
const debug = require('debug')('villafeet-api')
const { NODE_ENV = 'development' } = process.env

if (NODE_ENV !== 'test') {
  setMongooseConfig()
  app.listen(config.port, () => {
    debug(`server started on port ${config.port} (${config.env})`)
  })
}

export default app
