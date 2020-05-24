
const influx = require('../db/influx.js');
const redis = require('../db/redis')

const _checkExisting = async (client, msg) => {
  
  const unknownIds = await redis.getUnknownContacts([ msg.id.id]);
  const newContacts = await utils.getUserInfo(unknownIds);
  
  console.log('savign new contacts: ', newContacts)
  await redis.saveNewContacts(newContacts);
}
const handleMessage = async (client, msg) => {
  console.log(msg);
  await _checkExisting(client, msg);
  await influx.writeEvents([msg]);
}

module.exports = {
  handleMessage
}