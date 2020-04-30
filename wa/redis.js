const redis = require('async-redis');
const { v4 } = require('uuid');

const client = redis.createClient(6379, 'redis');

client.on("error", function(error) {
  console.error(error);
});

const handleMessage = async (message) => {
  const from = message.author || message.from;
  client.zadd('wa:thread:' + message.from, JSON.stringify(message));
  client.zadd('wa:sender:' + message.senderID);
}

const handleThreads = async (chats) => {
  for (const chat of chats) {
    await client.set('wa:threadinfo:' + chat.id._serialized, JSON.stringify(chat));
  }
}

const getUnknownContacts = async (ids) => {
  const unknown = [];
  for (const id of ids) {
    const found = await client.hget('wa:contact:'+id, 'id');
    console.log('found:', found)
    if (!found) {
      unknown.push(id)
    }
  }
  return unknown
}

const saveContacts = async (contacts) => {
  for (const contact of contacts) {
    contact.gid = v4();
    await client.hmset('wa:contact:'+contact.id, contact);
    await client.sadd('wa:contacts', contact.id);
    await client.hmset('g:contacts:' + contact.gid, 'wid', contact.id);
  }
}

module.exports = {
  handleMessage,
  handleThreads,
  saveContacts,
  getUnknownContacts
}