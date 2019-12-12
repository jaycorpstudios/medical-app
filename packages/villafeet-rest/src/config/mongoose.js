import mongoose from 'mongoose'
import util from 'util'
import config from './env'

const debug = require('debug')('villafeet-api:index')

const setMongooseConfig = () => {
  // plugin native promise in mongoose
  mongoose.Promise = global.Promise

  // connect to mongo db or mock if running tests
  if (process.env.NODE_ENV === 'test') {
    const Mockgoose = require('mockgoose').Mockgoose
    const mockgoose = new Mockgoose(mongoose)
    mockgoose.prepareStorage().then(() => {
      const mockOptions = {
        reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
      }
      mongoose.connect('test', mockOptions, err => {
        if (err) {
          throw new Error(`Unable to connect Test Mock DB ${err}`)
        }
      })
    })
  } else {
    mongoose.connect(config.db, {
      server: {
        socketOptions: {
          keepAlive: 1,
        },
      },
    })
  }

  mongoose.connection.on('error', () => {
    throw new Error(`unable to connect to database: ${config.db}`)
  })
  mongoose.connection.once('connected', () => {
    console.log(`Successfully connected to ${config.db}`)
  })
  mongoose.connection.once('disconnected', () => {
    console.log(`Successfully disconnected from ${config.db}`)
  })
  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('dBase connection closed due to app termination')
      process.exit(0)
    })
  })
  process.on('unhandledRejection', error => {
    // Will print "unhandledRejection err is not defined"
    console.log('Unhandled Rejection:', error)
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
