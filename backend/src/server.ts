import fastify, { FastifyInstance } from 'fastify'
import { establishConnection } from './plugins/mongoose'
import { pencilRouter } from './routes/pencil'

const server: FastifyInstance = fastify({
  logger: {
    transport: {
      target: 'pino-pretty'
    },
    level: 'debug'
  }
})

const startFastify: (host: string, port: number) => FastifyInstance = (host, port) => {
  const fastifyConfig = { port, host }

  server.listen(fastifyConfig, (error, _) => {
    if (error) {
      console.error(error)
    }

    // connect mongodb
    establishConnection()
  })

  server.get('/ping', async (_, reply) => {
    return reply.status(200).send({ msg: 'pong' })
  })

  server.register(pencilRouter, { prefix: '/api' })

  server.ready().then(() => console.log(server.printRoutes()))

  return server
}

export { startFastify }
