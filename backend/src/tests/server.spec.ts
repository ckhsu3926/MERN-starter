import { FastifyInstance } from 'fastify'
import { describe, test, expect, beforeAll } from 'vitest'
import { startFastify } from '../server'

describe('my test suite01', () => {
  test('it works', () => {
    const expected = true
    const actual = true

    expect(actual).toBe(expected)
  })
})

describe('test my server', () => {
  let server: FastifyInstance
  beforeAll(() => {
    server = startFastify('0.0.0.0', 8888)
  })

  test('ping should return pong', async () => {
    const response = await server.inject({ method: 'GET', url: '/ping' })

    expect(response.statusCode).toBe(200)
    const res = JSON.parse(response.body)
    expect(res.msg).toBe('pong')
  })
})

describe('<TODO> test db connection', () => {})
