import { startFastify } from './server'
import * as dotenv from 'dotenv'

dotenv.config()
const host = process.env.FASTIFY_HOST || '0.0.0.0'
const port = process.env.FASTIFY_PORT || '8888'

// start your server
const server = startFastify(host, parseInt(port))

export { server }
