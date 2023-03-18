import mongoose from 'mongoose'

const host = process.env.MONGO_HOST || 'localhost'
const port = process.env.MONGO_PORT || 27017
const database = process.env.MONGO_DATABASE || 'fastify'

export const establishConnection = () => {
  if (!process.env.JEST_WORKER_ID && mongoose.connection.readyState === 0) {
    mongoose.connect(`mongodb://${host}:${port}/${database}`)

    mongoose.connection.on('connected', () => {
      console.log('MongoDB connection successful.')
    })

    mongoose.connection.on('error', (err) => {
      console.error('Error in DB connection: ', JSON.stringify(err, undefined, 2))
    })
  }
}
