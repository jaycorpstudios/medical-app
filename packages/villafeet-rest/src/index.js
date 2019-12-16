import setMongooseConfig from './config/mongoose'
import config from './config/env'
import app from './config/express'
const debug = require('debug')('villafeet-api')

//TODO: FIX START ISSUE https://babeljs.io/docs/en/babel-polyfill/
setMongooseConfig()

// module.parent check is required to support mocha watch
// src: https://github.com/mochajs/mocha/issues/1912
if (!module.parent) {
  app.listen(config.port, () => {
    debug(`server started on port ${config.port} (${config.env})`)
  })
}

export default app
