const redis = require('async-redis');

const client = redis.createClient(6379, 'redis');

client.on("error", function(error) {
  console.error(error);
});

const ignore = ['presence', 'typ']

const handleMessage = (err, message) => {
  if (ignore.includes(message.type)) {
    return;
  }
  console.log('fb: writing: ', message);
  client.zadd('fb:thread:' + message.threadID, message.timestamp, JSON.stringify(message));
  client.zadd('fb:sender:' + message.senderID, message.timestamp, JSON.stringify(message));

  //update thread last active
}

const getUnknownIds = async (ids) => {
  const unknown = [];
  for (const id of ids) {
    const found = await client.hget('fb:contact:'+id, 'id');
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
    await client.hmset('fb:contact:' + contact.id, contact);
    await client.sadd('fb:contacts', contact.id);
    await client.hset('g:fb:contacts', contact.gid, contact.id);
    await client.hset('g:contacts:' + contact.gid, 'fid', contact.id);
  }
}

module.exports = {
  handleMessage,
  getUnknownIds,
}