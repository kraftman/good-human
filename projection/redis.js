const red = require('async-redis')

const client = redis.createClient(6379, 'redis');

client.on("error", function(error) {
  console.error(error);
});

const getLastSync = async () => {
  const lastChecked = client.get('proj:lastCheck');
  if (!lastChecked) {
    return 0
  }
  return lastChecked
}

const updateLastOnlineCommunication = (id, event) => {
  // lookup global user
  // update last spoken to
}

module.exports = {
  getLastSync
}