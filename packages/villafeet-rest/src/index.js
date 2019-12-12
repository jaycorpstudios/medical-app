import setMongooseConfig from './config/mongoose'
import config from './config/env'
import app from './config/express'
const debug = require('debug')('villafeet-api:index')

//TODO: FIX START ISSUE https://babeljs.io/docs/en/babel-polyfill/
setMongooseConfig()

// module.parent check is required to support mocha watch
// src: https://github.com/mochajs/mocha/issues/1912
if (!module.parent) {
  // listen on port config.port
  app.listen(config.port, () => {
    console.log(`server started on port ${config.port} (${config.env})`)
    debug(`server started on port ${config.port} (${config.env})`)
  })
}

export default app
