import { beforeAll, describe, expect, it } from 'vitest'
import { FastifyInstance } from 'fastify'
import { startFastify } from '../server'
import { Pencil } from '../types/pencil'

describe('Form test', () => {
  let server: FastifyInstance
  const fastifyHost = '0.0.0.0'
  const fastifyPort = 8888

  beforeAll(async () => {
    server = startFastify(fastifyHost, fastifyPort)
  })

  it('should successfully get a empty list of all pencils', async () => {
    // arrange

    // act
    const response = await server.inject({ method: 'GET', url: '/api/v1/pencils' })

    // assert
    expect(response.statusCode).toBe(200)
    expect(response.body).toStrictEqual(JSON.stringify({ pencils: [] }))
  })

  it('should successfully add pencil', async () => {
    // arrange
    const color = 'red'

    // act
    const response = await server.inject({ method: 'POST', url: '/api/v1/pencils', payload: { color } })

    // assert
    expect(response.statusCode).toBe(201)
    const pencil: Pencil = JSON.parse(response.body)
    expect(pencil.color).toBe(color)
  })

  it('should successfully get specific pencil', async () => {
    // arrange
    const color = 'blue'
    const postResponse = await server.inject({ method: 'POST', url: '/api/v1/pencils', payload: { color } })
    let pencil: Pencil = JSON.parse(postResponse.body)

    // act
    const response = await server.inject({ method: 'GET', url: `/api/v1/pencils/${pencil.id}` })

    // assert
    expect(response.statusCode).toBe(200)
    pencil = JSON.parse(response.body)
    expect(pencil.color).toBe(color)
  })

  it('should successfully update specific pencil', async () => {
    // arrange
    const color = 'beforeColor'
    const postResponse = await server.inject({ method: 'POST', url: '/api/v1/pencils', payload: { color } })
    let pencil: Pencil = JSON.parse(postResponse.body)
    const updatedColor = 'afterColor'

    // act
    const response = await server.inject({
      method: 'PUT',
      url: `/api/v1/pencils/${pencil.id}`,
      payload: { color: updatedColor }
    })

    // assert
    expect(response.statusCode).toBe(200)
    pencil = JSON.parse(response.body)
    expect(pencil.color).toBe(updatedColor)
  })

  it('should successfully delete specific pencil', async () => {
    // arrange
    const postResponse = await server.inject({
      method: 'POST',
      url: '/api/v1/pencils',
      payload: { color: 'deleteColor' }
    })
    let pencil: Pencil = JSON.parse(postResponse.body)

    // act
    const response = await server.inject({ method: 'DELETE', url: `/api/v1/pencils/${pencil.id}` })

    // assert
    expect(response.statusCode).toBe(200)
    const getResponse = await server.inject({ method: 'GET', url: `/api/v1/pencils/${pencil.id}` })
    expect(getResponse.statusCode).toBe(404)
  })
})
