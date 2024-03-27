import { FastifyPluginAsync } from 'fastify'

const listRoutes: FastifyPluginAsync = async (fastify, options) => {
  fastify.post('/lists', async (request, reply) => {
    reply.send({ hello: 'post' })
  })

  fastify.get('/lists', async (request, reply) => {
    reply.send({ hello: 'get' })
  })

  fastify.get('/lists/:id', async (request, reply) => {
    reply.send({ hello: 'get one' })
  })

  fastify.put('/lists', async (request, reply) => {
    reply.send({ hello: 'put' })
  })

  fastify.delete('/lists', async (request, reply) => {
    reply.send({ hello: 'delete' })
  })
}

export default listRoutes
