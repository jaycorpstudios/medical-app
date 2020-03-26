import '@babel/polyfill'
import setMongooseConfig from './config/mongoose'
import config from './config/constants'
import app from './config/express'
const debug = require('debug')('villafeet-api')

if (config.NODE_ENV !== 'test') {
  setMongooseConfig()
  app.listen(config.PORT, () => {
    debug(`server started on port ${config.PORT} (${config.ENV})`)
  })
}

export default app
