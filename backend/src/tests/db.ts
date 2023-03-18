import mongoose from 'mongoose'
import { GenericContainer, StartedTestContainer } from 'testcontainers'

let mongoContainer: StartedTestContainer

// connect to mongo container
export const connect = async (image = 'mongo') => {
  mongoContainer = await new GenericContainer(image).withExposedPorts(27017).start()
  const uri = `mongodb://${mongoContainer.getHost()}:${mongoContainer.getMappedPort(27017)}`
  await mongoose.connect(uri)
}

// close db connection
export const closeDatabase = async () => {
  try {
    await mongoose.connection.dropDatabase()
    if (mongoose.connection.readyState === 1) {
      await mongoose.disconnect()
    }
    await mongoContainer.stop()
  } catch (error) {
    throw new Error(`Close DB container error: ${error}`)
  }
}

// delete db collections
export const clearDatabase = async () => {
  const collections = mongoose.connection.collections

  for (const key in collections) {
    const collection = collections[key]
    await collection.deleteMany({})
  }
}

// Get Mongodb Connection string
export const getMongodbConnectionString = () => {
  return mongoContainer ? `mongodb://${mongoContainer.getHost()}:${mongoContainer.getMappedPort(27017)}` : ''
}
