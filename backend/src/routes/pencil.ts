import { FastifyInstance, RouteShorthandOptions } from 'fastify'
import { Pencil } from '../types/pencil'
import { PencilRepoImpl } from '../repository/pencil-repo'

const pencilRouter = (server: FastifyInstance, opts: RouteShorthandOptions, done: (error?: Error) => void) => {
  const pencilRepo = PencilRepoImpl.of()

  server.get('/v1/pencils', opts, async (_, reply) => {
    try {
      const pencils: Array<Pencil> = await pencilRepo.getPencils()
      return reply.status(200).send({ pencils })
    } catch (error) {
      console.error(`GET /pencils Error: ${error}`)
      return reply.status(500).send(`[Server Error]: ${error}`)
    }
  })

  server.post('/v1/pencils', opts, async (request, reply) => {
    try {
      const reqBody: Pencil = request.body as Pencil
      const pencil: Pencil = await pencilRepo.addPencil(reqBody)
      return reply.status(201).send(pencil)
    } catch (error) {
      console.error(`POST /pencils Error: ${error}`)
      return reply.status(500).send(`[Server Error]: ${error}`)
    }
  })

  done()
}

export { pencilRouter }
