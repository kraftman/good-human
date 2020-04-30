const redis = require('async-redis');

const client = redis.createClient('redis');

client.on("error", function(error) {
  console.error(error);
});

const handleMessage = (message) => {
  const from = message.author || message.from;
  client.zadd('wa:thread:' + message.from, JSON.stringify(message));
  client.zadd('wa:sender:' + message.senderID);
}

module.exports = {
  handleMessage
}