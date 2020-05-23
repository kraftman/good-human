// 
const fastify = require('fastify')({ logger: true });

fastify.post('/email', async (request, reply) => {
  console.log(request.body)
  // parse seen/spoken to recently
  // emit a new seen/spoken to event to influxdb
  // or add a 'defer' flag to redis for the person
  return { hello: 'world' }
})


const start = async () => {
  try {
    await fastify.listen(8080, '0.0.0.0')
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()