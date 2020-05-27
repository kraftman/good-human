const redis = require('async-redis');
const { v4 } = require('uuid');

const client = redis.createClient(6379, 'redis');

client.on("error", function(error) {
  console.error(error);
});

const getUnknownContacts = async (ids) => {
  const unknown = [];
  for (const id of ids) {
    const found = await client.hget('wa:contacts', id._serialized);
    //console.log('found:', found)
    if (!found) {
      unknown.push(id)
    }
  }
  return unknown
}

const saveContacts = async (contacts) => {
  for (const contact of contacts) {
    contact.gid = v4();
    // add to list of whatsapp contacts
    await client.hset('wa:contacts', contact.id._serialized, JSON.stringify(contact));
    // create new global user
    await client.sadd('g:contacts', contact.gid)
    await client.hset('g:contacts:' + contact.gid, 'wid', contact.id._serialized);
  }
}

module.exports = {
  saveContacts,
  getUnknownContacts
}