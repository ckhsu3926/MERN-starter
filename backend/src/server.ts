import fastify, { FastifyInstance } from 'fastify'

const server: FastifyInstance = fastify({
  logger: {
    transport: {
      target: 'pino-pretty'
    },
    level: 'debug'
  }
})

const startFastify: (port: number) => FastifyInstance = (port) => {
  const listenAddress = '0.0.0.0'
  const fastifyConfig = {
    port: port,
    host: listenAddress
  }

  server.listen(fastifyConfig, (error, _) => {
    if (error) {
      console.error(error)
    }
  })

  server.get('/ping', async (_, reply) => {
    return reply.status(200).send({ msg: 'pong' })
  })

  return server
}

export { startFastify }
