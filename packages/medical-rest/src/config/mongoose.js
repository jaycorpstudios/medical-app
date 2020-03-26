import mongoose from 'mongoose'
import util from 'util'
import config from './constants'
const debug = require('debug')('villafeet-api')

const setMongooseConfig = () => {
  // plugin native promise in mongoose
  mongoose.Promise = global.Promise

  mongoose.connect(config.DB, {
    useNewUrlParser: true,
    server: {
      socketOptions: {
        keepAlive: 1,
      },
    },
  })

  mongoose.connection.on('error', error => {
    throw new Error(`unable to connect to database: ${config.DB} ${error}`)
  })
  mongoose.connection.once('connected', () => {
    debug(`Successfully connected 👀 to ${config.DB}`)
  })
  mongoose.connection.once('disconnected', () => {
    debug(`Successfully disconnected from ${config.DB}`)
  })
  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      debug('dBase connection closed due to app termination')
      process.exit(0)
    })
  })
  process.on('unhandledRejection', error => {
    // Will print "unhandledRejection err is not defined"
    debug('Unhandled Rejection:', error)
    process.exit(0)
  })

  // print mongoose logs in dev env
  if (config.MONGOOSE_DEBUG) {
    mongoose.set('debug', (collectionName, method, query, doc) => {
      debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc)
    })
  }
}

export default setMongooseConfig
