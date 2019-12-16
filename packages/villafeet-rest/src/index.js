import setMongooseConfig from './config/mongoose'
import config from './config/env'
import app from './config/express'
const debug = require('debug')('villafeet-api')

setMongooseConfig()

app.listen(config.port, () => {
  debug(`server started on port ${config.port} (${config.env})`)
})

export default app
