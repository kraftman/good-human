const fastify = require('fastify')({ logger: true });

fastify.post('/query', async (request, reply) => {
  console.log(request.body)
  // lookup use from redis
  // update projection
  return { hello: 'world' }
})

fastify.post('/', async (request, reply) => {
  console.log(request.body)
  // lookup use from redis
  // update projection
  return { hello: 'world' }
})


fastify.post('/write', async (request, reply) => {
  console.log(request.body)
  // lookup use from redis
  // update projection
  return { hello: 'world' }
})

fastify.get('/', async (request, response) => {
  return {
    this: 'out'
  }
})

const start = async () => {
  try {
    await fastify.listen(9090, '0.0.0.0')
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()