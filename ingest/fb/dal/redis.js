const redis = require('async-redis');
const { v4 } = require('uuid');

const client = redis.createClient(6379, 'redis');

client.on("error", function(error) {
  console.error(error);
});

const getUnknownIds = async (ids) => {
  const unknown = [];
  for (const id of ids) {
    const found = await client.hget('fb:contacts', id);
    if (!found) {
      unknown.push(id)
    }
  }
  return unknown
}

const saveContacts = async (contacts) => {
  for (let [id, contact] of Object.entries(contacts)) {
    contact.id = id;
    contact.gid = v4();
    console.log('creating new contact:', contact);
    // add to list of fb contacts
    await client.hset('fb:contacts', id, JSON.stringify(contact));
    // create new global users
    await client.sadd('g:contacts', contact.gid);
    await client.hset('g:contacts:' + contact.gid, 'fid', id);
    const now = Math.floor((new Date() / 1000));
    await client.hset('g:contacts:' + contact.gid, 'firstSeen', now);
  }
}

module.exports = {
  saveContacts,
  getUnknownIds,
}