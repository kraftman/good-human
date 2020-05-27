
const influx = require('../db/influx.js');
const redis = require('../db/redis');
const utils = require('./bl-utils');

const _checkExisting = async (client, msg) => {
  const unknownIds = await redis.getUnknownContacts([ { _serialized: msg.id.remote } ]);
  console.log('unkown:', unknownIds)
  if (!unknownIds[0]) {
    return
  }
  //unknownIds[0].user = unknownIds[0].id;
  //unknownIds[0].server
  const reformated = [{_serialized: msg.id.remote}]
  const newContacts = await utils.getUserInfo(client, reformated);

  console.log('got user info:', newContacts)
  console.log('savign new contacts: ', newContacts)
  try {
    await redis.saveContacts(newContacts);
  } catch (err) {
    console.error('redis failed:', err)
  }
}
const handleMessage = async (client, msg) => {
  console.log(msg);
  await _checkExisting(client, msg);
  await influx.writeEvents([msg]);
}

module.exports = {
  handleMessage
}