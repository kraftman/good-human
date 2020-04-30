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

const handleThreads = async(threads) => {
  for (const thread of threads) {
    await client.set('fb:threadinfo:'+thread.threadID, JSON.stringify(thread));
  }
}

module.exports = {
  handleMessage,
  handleThreads,
}