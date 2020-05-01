const redis = require('async-redis');

const client = redis.createClient(6379, 'localhost');

const export = async () => {
  const allIds = await client.hgetall('g:contacts:')
}