import { FastifyInstance, RouteShorthandOptions } from 'fastify'
import { Pencil } from '../types/pencil'
import { PencilRepoImpl } from '../repository/pencil-repo'

const pencilRouter = (server: FastifyInstance, opts: RouteShorthandOptions, done: (error?: Error) => void) => {
  const pencilRepo = PencilRepoImpl.of()

  interface IdParam {
    id: string
  }

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

  server.get<{ Params: IdParam }>('/v1/pencils/:id', opts, async (request, reply) => {
    try {
      const id = request.params.id
      const pencil: Pencil | null = await pencilRepo.getPencilById(id)
      if (pencil) {
        return reply.status(200).send(pencil)
      } else {
        return reply.status(404).send({ msg: `Not Found Pencil: ${id}` })
      }
    } catch (error) {
      console.error(`GET /pencils/${request.params.id} Error: ${error}`)
      return reply.status(500).send(`[Server Error]: ${error}`)
    }
  })

  server.put<{ Params: IdParam }>('/v1/pencils/:id', opts, async (request, reply) => {
    try {
      const id = request.params.id
      const body = request.body as Pencil
      let pencil: Pencil | null = await pencilRepo.updatePencil(id, body)
      if (pencil) {
        return reply.status(200).send(pencil)
      } else {
        return reply.status(404).send({ msg: `Not Found Pencil: ${id}` })
      }
    } catch (error) {
      console.error(`PUT /pencils/${request.params.id} Error: ${error}`)
      return reply.status(500).send(`[Server Error]: ${error}`)
    }
  })

  server.delete<{ Params: IdParam }>('/v1/pencils/:id', opts, async (request, reply) => {
    try {
      const id = request.params.id
      const pencil: Pencil | null = await pencilRepo.deletePencil(id)
      if (pencil) {
        return reply.status(200).send(pencil)
      } else {
        return reply.status(404).send({ msg: `Not Found Pencil: ${id}` })
      }
    } catch (error) {
      console.error(`DELETE /pencils/${request.params.id} Error: ${error}`)
      return reply.status(500).send(`[Server Error]: ${error}`)
    }
  })

  done()
}

export { pencilRouter }
