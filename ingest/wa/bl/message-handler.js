
const influx = require('../db/influx.js');
const redis = require('../db/redis')

const _checkExisting = async (msg) => {
  
  const unknownIds = await redis.getUnknownContacts([ msg.id.user]);
  const newContacts = await utils.getUserInfo(unknownIds);
  
  console.log('savign new contacts: ', newContacts)
  await redis.saveContacts(newContacts);
}
const handleMessage = async (msg) => {
  console.log(msg);
  await _checkExisting(client, msg);
  await influx.writeEvents([msg]);
}

module.exports = {
  handleMessage
}