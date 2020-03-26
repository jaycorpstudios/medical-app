import mongoose from 'mongoose'
import util from 'util'
import config from './constants'
const debug = require('debug')('villafeet-api')
const Mockgoose = require('mockgoose').Mockgoose
const mockgoose = new Mockgoose(mongoose)

const connect = async () => {
  await mockgoose.prepareStorage()
  const mockOptions = {
    reconnectTries: 1, // Number.MAX_VALUE Never stop trying to reconnect
  }
  mongoose.connect('mongodb://example.com/test', mockOptions, err => {
    if (err) {
      throw new Error(`Unable to connect Test Mock DB ${err}`)
    }
  })
  mongoose.connection.on('error', () => {
    throw new Error(`unable to connect to database: ${config.DB}`)
  })
  mongoose.connection.once('connected', () => {
    debug(`Successfully connected to ${config.DB}`)
  })
  mongoose.connection.once('disconnected', () => {
    debug(`Successfully disconnected from ${config.DB}`)
  })
  mongoose.set('debug', (collectionName, method, query, doc) => {
    debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc)
  })
}

const close = async () => {
  try {
    const { connections } = mongoose
    const { childProcess } = mockgoose.mongodHelper.mongoBin
    childProcess.kill()
    await Promise.all(connections.map(c => c.close()))
    await mongoose.disconnect()
  } catch (err) {
    console.log('Error in afterAll : ', err)
  }
}

const mockgooseConfig = () => {
  // plugin native promise in mongoose
  mongoose.Promise = global.Promise
  return {
    connect,
    close,
  }
}

export default mockgooseConfig()
