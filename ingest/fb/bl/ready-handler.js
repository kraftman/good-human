
const utils = require('./utils.js');
const redis = require('../dal/redis.js')

const handleReady = async (api) => {
  const threads = await api.getThreadList(50, null, []);
  let ids = await utils.getParticipantsFromThreads(threads);
  ids = ids.slice(0,1);
  const unknown = await redis.getUnknownIds(ids);
  console.log('found unknown: ', unknown)
  
  const results = await api.getUserInfo(unknown);
  console.log('user details:', results);
  console.log(results);
  redis.saveContacts(results);
}

module.exports = {
  handleReady
}
