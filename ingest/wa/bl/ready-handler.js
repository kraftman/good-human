
const redis = require('../db/redis.js');
const utils = require('./bl-utils.js')



const handleReady = async (client) => {
  const chats = await client.getChats();
  const userIds = utils.getThreadUsers(chats);
  let unknownIds = await redis.getUnknownContacts(userIds);
  unknownIds = unknownIds.slice(0,10);
  console.log('unknown:', unknownIds)
  const newContacts = await utils.getUserInfo(client, unknownIds);
  console.log('got user info:', newContacts);
  
  console.log('savign new contacts: ', newContacts)
  await redis.saveContacts(newContacts);
}

module.exports = {
  handleReady
}